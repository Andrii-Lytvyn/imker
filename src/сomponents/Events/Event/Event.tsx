import css from "./Event.module.css";
import { useParams } from "react-router-dom";
import { dataEventov } from "../eventObj";
import { BiTimeFive } from "react-icons/bi";
import { BsCalendar2Week } from "react-icons/bs";
import { MdOutlinePlace } from "react-icons/md";
import { formatDate } from "../helpers/formattedDate";

const Event = (): JSX.Element => {
  const { id } = useParams();
  const event = dataEventov.find((item) => item.id === id);

  return (
    <div className={css.evt_base}>
      <h2>EventName : {event?.name}</h2>
      <div className={css.evt_container}>
        <div className={css.container}>
          <img
            className={css.img_container}
            src={`${event?.photo}`}
            alt={event?.name}
            width={250}
          />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
            perspiciatis laboriosam animi, ipsum, dolorum ab laudantium
            accusamus commodi ducimus nisi esse repellendus ratione molestias
            sit magni soluta perferendis vero pariatur. Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Distinctio perspiciatis
            laboriosam animi, ipsum, dolorum ab laudantium accusamus commodi
            ducimus nisi esse repellendus ratione molestias sit magni soluta
            perferendis vero pariatur. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Distinctio perspiciatis laboriosam animi, ipsum,
            dolorum ab laudantium accusamus commodi ducimus nisi esse
            repellendus ratione molestias sit magni soluta perferendis vero
            pariatur. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Distinctio perspiciatis laboriosam animi, ipsum, dolorum ab
            laudantium accusamus commodi ducimus nisi esse repellendus ratione
            molestias sit magni soluta perferendis vero pariatur. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Distinctio
            perspiciatis laboriosam animi, ipsum, dolorum ab laudantium
            accusamus commodi ducimus nisi esse repellendus ratione molestias
          </p>
        </div>
        <div className={css.item_container}>
          <h3 className={css.title_event}>Veranstaltungsdetails</h3>
          <ul>
            {[
              {
                title: "Date",
                icon: <BsCalendar2Week />,
                content: formatDate(event?.date),
              },
              {
                title: "Time",
                icon: <BiTimeFive />,
                content: `${event?.start} - ${event?.end}`,
              },
              {
                title: "Place",
                icon: <MdOutlinePlace />,
                content: event?.address,
              },
              {
                title: "Map",
                mapSrc:
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9745.415657533345!2d13.489924931312242!3d52.36400236607848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a846d3cf283051%3A0x9014409747516a08!2z0JDRjdGA0L7Qv9C-0YDRgiDQkdC10YDQu9C40L0g0JHRgNCw0L3QtNC10L3QsdGD0YDQsyDQmNC90YLQtdGA0L3QsNGG0LjQvtC90LDQu9GM!5e0!3m2!1sru!2sde!4v1691266901739!5m2!1sru!2sde",
              },
            ].map((item, index) => (
              <li key={index} className={css.item}>
                <h4 className={css.title}>{item.title} :</h4>
                {item.icon && (
                  <span className={css.icon} style={{ color: "#c74817" }}>
                    {item.icon} {item.content}
                  </span>
                )}
                {item.mapSrc && (
                  <div className={css.map}>
                    <iframe
                      src={item.mapSrc}
                      className={css.map}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Event;
