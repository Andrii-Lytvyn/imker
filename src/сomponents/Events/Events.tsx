import { formattedDate } from "./helpers/formattedDate";
import { FcAlarmClock } from "react-icons/fc";
import { ImLocation } from "react-icons/im";
const dataEventov = [
  {
    name: "Carlie",
    members: "4",
    place: "007 DuBuque Spur",
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    author: "Rose Purdy",
    photo: "https://loremflickr.com/640/480/nature",
    status: "status 1",
    date: "2023-05-10T06:00:46.513Z",
    start: "12:00",
    end: "16:00",
    id: 1,
  },
  {
    name: "Otho",
    members: "9",
    place: "00499 Sauer Port",
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    author: "Rita Mann",
    photo: "https://loremflickr.com/640/480/nature",
    status: "status 2",
    date: "2024-08-09T18:51:36.471Z",
    start: "15:00",
    end: "16:00",
    id: 2,
  },
  {
    name: "Rhea",
    members: "6",
    place: "4827 Jacklyn Burgs",
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    author: "Mrs. Lawrence Wintheiser",
    photo: "https://loremflickr.com/640/480/nature",
    status: "status 3",
    date: "2021-06-27T05:07:10.137Z",
    start: "2:00",
    end: "12:00",
    id: 3,
  },
  {
    name: "Edward",
    members: "6",
    place: "0401 Savanah Throughway",
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    author: "Ed Homenick",
    photo: "https://loremflickr.com/640/480/nature",
    status: "status 4",
    date: "2023-08-27T22:47:22.917Z",
    start: "15:00",
    end: "19:00",
    id: 4,
  },
  {
    name: "Keira",
    members: "5",
    place: "9468 Edythe Branch",
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    author: "Benjamin Lind",
    photo: "https://loremflickr.com/640/480/nature",
    status: "status 5",
    date: "2023-10-20T17:10:11.921Z",
    start: "09:00",
    end: "11:00",
    id: 5,
  },
  {
    name: "Hans",
    members: "4",
    place: "759 Batz Forks",
    description:
      "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    author: "Meghan Hagenes",
    photo: "https://loremflickr.com/640/480/nature",
    status: "status 6",
    date: "2022-12-31T04:04:22.873Z",
    start: "18:00",
    end: "21:00",
    id: 6,
  },
  {
    name: "Joseph",
    members: "1",
    place: "3972 Mills Walk",
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    author: "Tommy Mills",
    photo: "https://loremflickr.com/640/480/nature",
    status: "status 7",
    date: "2023-09-20T10:52:38.860Z",
    start: "07:00",
    end: "12:00",
    id: 7,
  },
  {
    name: "Lonnie",
    members: "1",
    place: "2274 Halvorson Extensions",
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    author: "Pat Satterfield DDS",
    photo: "https://loremflickr.com/640/480/nature",
    status: "status 8",
    date: "2024-12-27T05:17:23.139Z",
    start: "22:00",
    end: "23:00",
    id: 8,
  },
];
import css from "./Events.module.css";
import { Link } from "react-router-dom";
const Events = (): JSX.Element => {
  return (
    <>
      <h2> Our Events</h2>
      <div className={css.cont}>
        <ul className={css.event_list}>
          {dataEventov
            .map(({ name, id, date, start, end }) => (
              <li key={id} className={css.list}>
                <div className={css.day}>
                  <h4>{formattedDate(date).day}</h4>
                  <span>{formattedDate(date).month}</span>
                </div>
                <div className={css.time_event}>
                  <Link to={`/events/${id}`}>{name}</Link>
                  <div className={css.time}>
                    <FcAlarmClock size={20} />
                    <span>{`${start} - ${end}`}</span>
                    <ImLocation size={20} style={{ color: "red" }} />
                  </div>
                </div>
              </li>
            ))
            .slice(4)}
        </ul>
      </div>
    </>
  );
};

export default Events;
