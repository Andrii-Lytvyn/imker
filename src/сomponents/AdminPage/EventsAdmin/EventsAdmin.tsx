import { ChangeEvent, FormEvent, useState } from "react";
import css from "./EventsAdmin.module.css";
import DatePicker from "react-datepicker";
import { EVENT_STATUS, EventStatus } from "../../Events/interface/IEventsData";
import type { Dayjs } from "dayjs";
import { TimePicker } from "antd";
import { Link } from "react-router-dom";

const eventData = {
  name: "",
  members: "",
  address: "",
  location: "",
  description: "",
  author: "",
  photo: "",
  status: EVENT_STATUS.EXPECTED,
  date: "",
  start: "",
  end: "",
};

const EventsAdmin = (): JSX.Element => {
  const [evtForm, setEvtForm] = useState(eventData);
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

    const updatedEvtForm = {
      ...evtForm,
      date: selectedDate?.toISOString().substring(0, 10),
      start: timeStart?.format("HH:mm") || "",
      end: timeEnd?.format("HH:mm") || "",
    };
    console.log(updatedEvtForm);

    setEvtForm(eventData);
    setSelectedDate(null);
  };

  return (
    <div className={css.form_container}>
      <h2>Create New Event</h2>
      <button type="button">
        {" "}
        <Link to="edit">Edit Event</Link>
      </button>
      <form className={css.form} onSubmit={eventFormData}>
        <div className={css.item}>
          <div className={css.form_field}>
            <label>Event Name</label>
            <input
              type="text"
              name="name"
              value={evtForm.name}
              onChange={collectEventsData}
            />
          </div>
          <div className={css.form_field}>
            <label>Event Address</label>
            <input
              type="text"
              name="address"
              value={evtForm.address}
              onChange={collectEventsData}
            />
          </div>
          <div className={css.form_field}>
            <label>Event author</label>
            <input
              type="text"
              name="author"
              value={evtForm.author}
              onChange={collectEventsData}
            />
          </div>
        </div>
        <div className={css.location}>
          <label>Event Location Link</label>
          <input
            type="text"
            name="location"
            value={evtForm.location}
            onChange={collectEventsData}
          />
        </div>
        <div className={css.status_container}>
          <label>Event status</label>
          <div className={css.status}>
            <input
              type="radio"
              id="option1"
              name="status"
              onChange={collectEventsData}
              value="EXPECTED"
              checked={evtForm.status === "EXPECTED"}
            />
            <label htmlFor="option1">EXPECTED</label>
          </div>
          <div className={css.status}>
            <input
              type="radio"
              id="option2"
              name="status"
              value="ENDED"
              onChange={collectEventsData}
              checked={evtForm.status === ("ENDED" as EventStatus)}
            />
            <label htmlFor="option2">ENDED</label>
          </div>
          <div className={css.status}>
            <input
              type="radio"
              id="option3"
              name="status"
              value="ARCHIVE"
              onChange={collectEventsData}
              checked={evtForm.status === ("ARCHIVE" as EventStatus)}
            />
            <label htmlFor="option3">ARCHIVE</label>
          </div>
        </div>
        <div>
          <div className={css.time}>
            <div>
              <DatePicker
                className={css.date_picker}
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
                className={css.time_border}
              />
            </div>
            <div>
              <TimePicker
                value={timeEnd}
                onChange={onChangeEnd}
                placeholder="Event end"
                className={css.time_border}
              />
            </div>
          </div>
        </div>
        <div className={css.description}>
          <label>Description</label>
          <textarea
            name="description"
            rows={10}
            value={evtForm.description}
            onChange={collectEventsData}
          />
        </div>
        <button type="submit" className={css.create_btn}>
          Create
        </button>
      </form>
    </div>
  );
};

export default EventsAdmin;
