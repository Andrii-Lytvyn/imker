import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import styles from "./EventsAdmin.module.css";
import DatePicker from "react-datepicker";
import { EVENT_STATUS, EventStatus } from "../../Events/interface/IEventsData";
import type { Dayjs } from "dayjs";
import { TimePicker } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ICreateEvents } from "./interface/ICreateEvents";

const eventData = {
  title: "",
  members: "",
  address: "",
  location: "",
  description: "",
  author: "",
  photo: "",
  status: EVENT_STATUS.EXPECTED,
  date: "",
  startTime: "",
  endTime: "",
};

//const baseURL = "https://63bb362a32d17a50908a3770.mockapi.io";
const baseURL = "http://localhost:8080";

//Функция отправки на бек
const newEventCreate = async (createNewEvent: ICreateEvents) => {
  try {
    const data = await axios.post(`${baseURL}/api/events`, createNewEvent);
    console.log("🚀  data:", data);
  } catch (error) {
    console.log("🚀  newEventCreate", error);
  }
};

const EventsAdmin = (): JSX.Element => {
  const [eventForm, setEvtForm] = useState(eventData);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
    setEvtForm((prev) => ({ ...prev, [name]: value }));
  };

  const eventFormData = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const createNewEvent = {
      ...eventForm,
      date: selectedDate?.toISOString().substring(0, 10),
      startTime: timeStart?.format("HH:mm") || "",
      endTime: timeEnd?.format("HH:mm") || "",
    };
    console.log(createNewEvent);
    toast.success("createNewEvent");
    newEventCreate(createNewEvent); // Отправка на бек

    //////////////////////
    setEvtForm(eventData); //обнуляет поля
    setSelectedDate(null); //обнуляет поля
    setTimeStart(null); //обнуляет поля
    setTimeEnd(null); //обнуляет поля
  };

  return (
    <div className={styles.form_container}>
      <h2>Create New Event</h2>
      <button type="button">
        {" "}
        <Link to="edit">Edit Event</Link>
      </button>
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
        <div className={styles.location}>
          <label>Event Location Link</label>
          <input
            type="text"
            name="location"
            value={eventForm.location}
            onChange={collectEventsData}
          />
        </div>
        <div className={styles.status_container}>
          <label>Event status</label>
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
            <div>
              <DatePicker
                className={styles.date_picker}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select event date"
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

export default EventsAdmin;
