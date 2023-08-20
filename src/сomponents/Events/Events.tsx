import styles from "./Events.module.css";
import { currentDate, formattedDate } from "./helpers/formattedDate";
import { FcAlarmClock } from "react-icons/fc";
import { ImLocation } from "react-icons/im";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useEventsSelector } from "../../redux/eventsStore/eventsSelector";

// const baseURL = "https://63bb362a32d17a50908a3770.mockapi.io";

// // Получение  всех Events
// const getAllEvents = async () => {
//   try {
//     const { data } = await axios.get(`${baseURL}/user_login`);

//     return data;
//   } catch (error) {
//     toast.error(`Ошибка сервера getAllEvents ${error}`);
//   }
// };

const Events = (): JSX.Element => {
  const { events } = useEventsSelector();

  // const dispatch = useAppDispatch();
  // const [events, setEvents] = useState<IEvents[]>([]);

  // useEffect(() => {
  //   const getEvt = async () => {
  //     try {
  //       const requestEvent = await getAllEvents();
  //       dispatch(getEvents(requestEvent));
  //       console.log("🚀  requestEvent:", requestEvent);

  //       setEvents(requestEvent);
  //     } catch (error) {
  //       console.log("🚀  error:", error);
  //     }
  //   };
  //   getEvt();
  // }, [dispatch]);

  return (
    <>
      <h2>Our Events</h2>
      <div className={styles.cont}>
        {events.length === 0 ? (
          <div className={styles.event_loader}>
            <Loader />
          </div>
        ) : (
          <ul className={styles.event_list}>
            {events.map(({ title, id, date, startTime, endTime }) =>
              date > currentDate() ? (
                <li key={id} className={styles.list}>
                  <div className={styles.day}>
                    <span>{formattedDate(date).month}</span>
                    <h4>{formattedDate(date).day}</h4>
                  </div>
                  <div className={styles.time_event}>
                    <Link to={`/events/${id}`}>{title}</Link>
                    <div className={styles.time}>
                      <FcAlarmClock size={20} />
                      <span>{`${startTime} - ${endTime}`}</span>
                      <ImLocation size={20} style={{ color: "red" }} />
                    </div>
                  </div>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default Events;
