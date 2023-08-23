import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import styles from "./EventsAdmin.module.css";
import DatePicker from "react-datepicker";
import { EventStatus } from "../../Events/interface/IEventsData";
import type { Dayjs } from "dayjs";
import { TimePicker } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ICreateEvents } from "./interface/ICreateEvents";
import { eventData } from "../../Events/helpers/eventData";
import { currentDate } from "../../Events/helpers/formattedDate";

const baseURL = "https://63bb362a32d17a50908a3770.mockapi.io";

//Функция отправки на бек
const createNewEvent = async (createNewEvent: ICreateEvents) => {
  try {
    const data = await axios.post(`${baseURL}/user_login`, createNewEvent);
    console.log("🚀  data:", data);
  } catch (error) {
    console.log("🚀  newEventCreate", error);
  }
};
const AddEventAdmin = (): JSX.Element => {
  const navigate = useNavigate();
  const { editId } = useParams();
  const [eventForm, setEventForm] = useState(eventData);
  const [dateStartField, setDateStartField] = useState<Date | null>(null);
  const [dateEndField, setDateEndField] = useState<Date | null>(null);
  const [timeStart, setTimeStart] = useState<Dayjs | null>(null);
  const [timeEnd, setTimeEnd] = useState<Dayjs | null>(null);

  const onChangeStart = (time: Dayjs | null) => {
    setTimeStart(time);
  };
  const onChangeEnd = (times: Dayjs | null) => {
    setTimeEnd(times);
  };

  const collectEventsData = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEventForm((prev) => ({ ...prev, [name]: value }));
  };

  const eventFormData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const choosedDateStart = dateStartField?.toISOString().substring(0, 10);
    const choosedDateEnd = dateEndField?.toISOString().substring(0, 10);

    if (choosedDateStart !== undefined && choosedDateStart > currentDate()) {
      const newEvent = {
        ...eventForm,
        dateStart: choosedDateStart,
        dateEnd: choosedDateEnd,
        startTime: timeStart?.format("HH:mm") || "",
        endTime: timeEnd?.format("HH:mm") || "",
      };
      toast.success("createNewEvent");
      createNewEvent(newEvent); // Отправка на бек
      //////////////////////
      resetForm();
    } else {
      toast.warning("Datum kleiner als das aktuelle Datum", {
        autoClose: 3000,
      });
    }
  };

  const resetForm = () => {
    setTimeStart(null);
    setDateStartField(null);
    setDateEndField(null);
    setTimeEnd(null);
    setEventForm(eventData);
  };

  return (
    <div className={styles.form_container}>
      <h2>Create New Event</h2>
      {editId ? (
        ""
      ) : (
        <button type="button" onClick={() => navigate("/eventsadm-edit")}>
          Edit Event
        </button>
      )}
      <form className={styles.form} onSubmit={eventFormData}>
        <div className={styles.item}>
          <div className={styles.form_field}>
            <label>Event Name</label>
            <input
              type="text"
              name="title"
              value={eventForm.title}
              onChange={collectEventsData}
            />
          </div>
          <div className={styles.form_field}>
            <label>Event Address</label>
            <input
              type="text"
              name="address"
              value={eventForm.address}
              onChange={collectEventsData}
            />
          </div>
          <div className={styles.form_field}>
            <label>Event author</label>
            <input
              type="text"
              name="author"
              value={eventForm.author}
              onChange={collectEventsData}
            />
          </div>
        </div>
        <div className={styles.location.trim()}>
          <label style={{ color: "red" }}>Event Location Link Required *</label>
          <input
            type="text"
            name="location"
            value={eventForm.location}
            onChange={collectEventsData}
          />
        </div>
        <div className={styles.status_container}>
          <label>Event status : </label>
          <div className={styles.status}>
            <input
              type="radio"
              id="option1"
              name="status"
              onChange={collectEventsData}
              value="EXPECTED"
              checked={eventForm.status === "EXPECTED"}
            />
            <label htmlFor="option1">EXPECTED</label>
          </div>
          <div className={styles.status}>
            <input
              type="radio"
              id="option2"
              name="status"
              value="ENDED"
              onChange={collectEventsData}
              checked={eventForm.status === ("ENDED" as EventStatus)}
            />
            <label htmlFor="option2">ENDED</label>
          </div>
          <div className={styles.status}>
            <input
              type="radio"
              id="option3"
              name="status"
              value="ARCHIVE"
              onChange={collectEventsData}
              checked={eventForm.status === ("ARCHIVE" as EventStatus)}
            />
            <label htmlFor="option3">ARCHIVE</label>
          </div>
        </div>
        <div>
          <div className={styles.time}>
            <div className={styles.required}>
              <span style={{ color: "red" }}> Required *</span>
              <DatePicker
                required
                className={styles.date_picker}
                selected={dateStartField}
                onChange={(date) => setDateStartField(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date start"
              />
            </div>

            <div>
              <DatePicker
                className={styles.date_picker}
                selected={dateEndField}
                onChange={(date) => setDateEndField(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date end"
              />
            </div>
            <div>
              <TimePicker
                value={timeStart}
                onChange={onChangeStart}
                placeholder="Event start"
                className={styles.time_border}
              />
            </div>
            <div>
              <TimePicker
                value={timeEnd}
                onChange={onChangeEnd}
                placeholder="Event end"
                className={styles.time_border}
              />
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <label>Description</label>
          <textarea
            name="description"
            rows={10}
            value={eventForm.description}
            onChange={collectEventsData}
          />
        </div>

        <div className={styles.photo}>
          <input type="file" accept=".jpg, .jpeg, .png" />
        </div>
        <button type="submit" className={styles.create_btn}>
          Create
        </button>
      </form>
    </div>
  );
};

export default AddEventAdmin;
