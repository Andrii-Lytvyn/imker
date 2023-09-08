import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import styles from "./EventsAdmin.module.css";
import DatePicker from "react-datepicker";
import { EventStatus } from "../../Events/interface/IEventsData";
import type { Dayjs } from "dayjs";
import { TimePicker } from "antd";
import { toast } from "react-toastify";
import { eventData } from "../../Events/helpers/eventData";
import { currentDate } from "../../Events/helpers/formattedDate";
import { createNewEvent } from "./eventsOperation/eventsOperation";
import { useAppDispatch } from "../../../hooks/dispatch.selector";
import {
  addEvent,
  eventsStatus,
  statusEvt,
} from "../../../redux/eventsStore/eventsSlice";

const AddEventAdmin = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [eventForm, setEventForm] = useState(eventData);
  const [dateStartField, setDateStartField] = useState<Date | null>(null);
  const [dateEndField, setDateEndField] = useState<Date | null>(null);
  const [timeStart, setTimeStart] = useState<Dayjs | null>(null);
  const [timeEnd, setTimeEnd] = useState<Dayjs | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const width = 900;
  const height = 350;

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
    if (eventForm.shortDescription !== "") {
      const choosedDateStart =
        dateStartField?.toISOString().substring(0, 10) ?? "";
      const choosedDateEnd = dateEndField?.toISOString().substring(0, 10) ?? "";

      if (choosedDateStart !== undefined && choosedDateStart > currentDate()) {
        let linkVar: string = "";

        if (imageData && selectedFile) {
          const formData = new FormData();
          formData.append("file", selectedFile);

          try {
            const response = await axios.post(
              `/api/files/upload?width=${width}&height=${height}&category=EVENT`,
              formData
            );
            linkVar = response.data.id.toString();
            // console.log("File uploaded:", linkVar);
          } catch (error) {
            console.error("Error uploading file:", error);
          }
          const newEvent = {
            ...eventForm,
            dateStart: choosedDateStart,
            dateEnd: choosedDateEnd,
            photo: linkVar,
            startTime: timeStart?.format("HH:mm") || "",
            endTime: timeEnd?.format("HH:mm") || "",
          };
          toast.success("createNewEvent");
          createNewEvent(newEvent);
          dispatch(addEvent(newEvent));
          dispatch(eventsStatus(statusEvt.allEvnt));
          // console.log("🚀  newEvent:", newEvent);
          //////////////////////
          resetForm();
        } else {
          toast.warning("Datum kleiner als das aktuelle Datum", {
            autoClose: 3000,
          });
        }
      }
    } else {
      toast.warning(
        "Füllen Sie das Feld Kurze Ereignisbeschreibung mit maximal 250 Zeichen aus.",
        {
          autoClose: 3000,
        }
      );
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImageData(url);
    } else {
      setImageData("");
    }
  };

  const resetForm = () => {
    setTimeStart(null);
    setDateStartField(null);
    setDateEndField(null);
    setTimeEnd(null);
    setImageData(null);
    setEventForm(eventData);
  };

  return (
    <div className={styles.form_container}>
      <h2>Create New Event</h2>
      <form className={styles.form} onSubmit={eventFormData}>
        <div className={styles.item}>
          <div className={styles.form_field}>
            <label>Event Name</label>
            <input
              type="text"
              name="title"
              value={eventForm.title.trim()}
              onChange={collectEventsData}
            />
          </div>
          <div className={styles.form_field}>
            <label>Event Address</label>
            <input
              type="text"
              name="address"
              value={eventForm.address.trim()}
              onChange={collectEventsData}
            />
          </div>
          <div className={styles.form_field}>
            <label>Event author</label>
            <input
              type="text"
              name="author"
              value={eventForm.author.trim()}
              onChange={collectEventsData}
            />
          </div>
        </div>
        <div className={styles.location}>
          <label style={{ color: "red" }}>Event Location Link Required *</label>
          <input
            type="text"
            name="location"
            value={eventForm.location.trim()}
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
        <div className={styles.location}>
          <label>Short Event Description </label>
          <input
            type="text"
            name="shortDescription"
            value={eventForm.shortDescription.trim()}
            onChange={collectEventsData}
          />
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
          <label htmlFor="fileInput" className="file-upload">
            Choose image
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
            required
            style={{ display: "none" }}
          />
          <br />
          {imageData && (
            <img
              src={imageData}
              alt="Image"
              style={{
                width: "50%",
                maxWidth: "50%",
                height: "auto",
              }}
            />
          )}
        </div>
        <button type="submit" className="button_imker">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddEventAdmin;
