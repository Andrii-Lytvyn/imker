import axios from "axios";
import { Pagination } from "@mui/material";
import { toast } from "react-toastify";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./EventsAdmin.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/dispatch.selector";
import { getEvents, getOneEvent } from "../../../redux/eventsStore/eventsSlice";
import linkToServer from "../../globalLinkToServer";
import { useEventsSelector } from "../../../redux/eventsStore/eventsSelector";
import Loader from "../../Loader/Loader";

// Получение  всех Events
const getAllEvents = async (page: number) => {
  try {
    //для Бека
    const { data } = await axios.get(
      `${linkToServer}/api/events?orderBy=dateStart&desc=false&page=${page}`
    );

    console.log("🚀  data:", data);

    return data;
  } catch (error) {
    toast.error(`Ошибка сервера getAllEvents ${error}`);
  }
};

const EditAllEvents = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { events } = useEventsSelector();
  const [count, setCount] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;

  useEffect(() => {
    const getEvt = async () => {
      try {
        const requestEvent = await getAllEvents(Number(page) - 1);
        setCount(requestEvent.count);
        dispatch(getEvents(requestEvent.events));
      } catch (error) {
        console.log("🚀  error:", error);
      }
    };
    getEvt();
  }, [dispatch, page]);

  const editCurrentEvent = (id: string) => {
    dispatch(getOneEvent(id));
    navigate(`/eventsadm-edit/${id}`);
  };
  const getLinkParams = (_: ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: value.toString() });
  };

  return (
    <div>
      <button type="button" onClick={() => navigate(`/eventsadm`)}>
        back
      </button>
      {events.length === 0 ? (
        <div className={styles.event_loader}>
          <Loader />
        </div>
      ) : (
        <div>
          <ul className={styles.edit}>
            {events?.map(({ name, idEvent, dateStart, description }) => (
              <li key={idEvent}>
                <div className={styles.edit_info}>
                  <span>{name}</span>
                  <span>{dateStart}</span>
                  <p>{description.slice(0, 20)}...</p>
                  <button
                    type="button"
                    onClick={() => editCurrentEvent(idEvent)}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Pagination
            count={count !== null ? Math.ceil(count / 3) : 0}
            page={Number(page)}
            size="large"
            onChange={getLinkParams}
          />
        </div>
      )}
    </div>
  );
};

export default EditAllEvents;
