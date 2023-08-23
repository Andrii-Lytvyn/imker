import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./EventsAdmin.module.css";
import DatePicker from "react-datepicker";
import type { Dayjs } from "dayjs";
import { TimePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { eventData } from "../../Events/helpers/eventData";
import { currentDate } from "../../Events/helpers/formattedDate";
import { useEventsSelector } from "../../../redux/eventsStore/eventsSelector";
import axios from "axios";
import { IEvent } from "../../Events/interface/IEventsData";
// import { ICreateEvents } from "./interface/ICreateEvents";

const baseURL = "https://63bb362a32d17a50908a3770.mockapi.io";

// Редактирование Eventа
const editedEvent = async (editEvent: IEvent) => {
  try {
    const { data } = await axios.put(
      `${baseURL}/user_login/${editEvent.id}`,
      editEvent
    );

    console.log("🚀 editedEvent:", data);
  } catch (error) {
    toast.error(`Ошибка сервера getAllEvents ${error}`);
  }
};

const EditEventAdmin = (): JSX.Element => {
  const navigate = useNavigate();
  const { event_edit } = useEventsSelector();
  const [eventEditForm, setEventEditForm] = useState(event_edit);
  const [dateStartField, setDateStartField] = useState<Date | null>(null);
  const [dateEndField, setDateEndField] = useState<Date | null>(null);
  const [timeStart, setTimeStart] = useState<Dayjs | null>(null);
  const [timeEnd, setTimeEnd] = useState<Dayjs | null>(null);

  const onChangeStart = (time: Dayjs | null) => {
    setTimeStart(time);
  };
  const onChangeEnd = (time: Dayjs | null) => {
    setTimeEnd(time);
  };

  const collectEventsData = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEventEditForm((prev: IEvent) => ({ ...prev, [name]: value }));
  };

  const eventFormData = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const choosedDateStart = dateStartField?.toISOString().substring(0, 10);
    const choosedDateEnd = dateEndField?.toISOString().substring(0, 10);

    if (choosedDateStart !== undefined && choosedDateStart > currentDate()) {
      const editEvent = {
        ...eventEditForm,
        dateStart: choosedDateStart,
        dateEnd: choosedDateEnd,
        startTime: timeStart?.format("HH:mm") || "",
        endTime: timeEnd?.format("HH:mm") || "",
      };
      console.log("🚀  editEvent:", editEvent);
      //////////////////////

      editedEvent(editEvent);

      navigate("/eventsadm");
      resetForm();
    } else {
      toast.warning("Datum kleiner als das aktuelle Datum", {
        autoClose: 3000,
      });
    }
  };

  const resetForm = () => {
    setDateStartField(null);
    setDateEndField(null);
    setTimeStart(null);
    setTimeEnd(null);
    setEventEditForm(eventData);
  };
  return (
    <div className={styles.form_container}>
      <h2>Edit Event</h2>
      <form className={styles.form} onSubmit={eventFormData}>
        <div className={styles.item}>
          <div className={styles.form_field}>
            <label>Event Name</label>
            <input
              type="text"
              name="title"
              value={eventEditForm.title}
              onChange={collectEventsData}
            />
          </div>
          <div className={styles.form_field}>
            <label>Event Address</label>
            <input
              type="text"
              name="address"
              value={eventEditForm.address}
              onChange={collectEventsData}
            />
          </div>
          <div className={styles.form_field}>
            <label>Event author</label>
            <input
              type="text"
              name="author"
              value={eventEditForm.author}
              onChange={collectEventsData}
            />
          </div>
        </div>
        <div className={styles.location}>
          <label>Event Location Link</label>
          <input
            type="text"
            name="location"
            value={eventEditForm.location}
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
              checked={eventEditForm.status === "EXPECTED"}
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
              checked={eventEditForm.status === "ENDED"}
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
              checked={event_edit.status === "ARCHIVE"}
            />
            <label htmlFor="option3">ARCHIVE</label>
          </div>
        </div>
        <div>
          <div className={styles.time}>
            <div className={styles.required}>
              <span style={{ color: "red" }}> Required *</span>
              <DatePicker
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
                value={eventEditForm.description === "" ? null : timeEnd}
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
            value={eventEditForm.description}
            onChange={collectEventsData}
          />
        </div>

        <div className={styles.photo}>
          <input type="file" accept=".jpg, .jpeg, .png" />
        </div>
        <div>
          <button type="submit" className={styles.create_btn}>
            Save
          </button>

          <button
            type="button"
            className={styles.create_btn}
            onClick={() => navigate("/eventsadm")}
          >
            back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEventAdmin;
