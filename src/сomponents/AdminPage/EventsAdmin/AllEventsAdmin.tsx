import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import styles from "./EventsAdmin.module.css";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/dispatch.selector";
import {
  eventsStatus,
  getOneEvent,
  statusEvt,
} from "../../../redux/eventsStore/eventsSlice";
import { useEventsSelector } from "../../../redux/eventsStore/eventsSelector";
import Loader from "../../Loader/Loader";

const AllEvents = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { events } = useEventsSelector();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const quantityOnPage = 6;
  const startIndex = (Number(page) - 1) * quantityOnPage;

  useEffect(() => {});

  const editCurrentEvent = (id: string) => {
    dispatch(getOneEvent(id));
    dispatch(eventsStatus(statusEvt.editEvnt));
  };

  const getLinkParams = (_: ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: value.toString() });
  };

  return (
    <div>
      {events.length === 0 ? (
        <div className={styles.event_loader}>
          <Loader />
        </div>
      ) : (
        <>
          <h4>Total count of events : {events.length}</h4>
          <div className={styles.edit_block}>
            <Pagination
              count={
                events.length !== null
                  ? Math.ceil(events.length / quantityOnPage)
                  : 0
              }
              page={Number(page)}
              size="large"
              onChange={getLinkParams}
            />
            <ul className={styles.edit}>
              {events
                ?.map(
                  ({ name, idEvent, dateStart, shortDescription }, index) => (
                    <li key={index} className={styles.event_list}>
                      <div className={styles.edit_info}>
                        <span>{name}</span>
                        <span>{dateStart}</span>
                        <p className={styles.edit_container}>
                          {shortDescription.substring(0, 200)}...
                        </p>
                        <button
                          className="button_imker"
                          type="button"
                          onClick={() => editCurrentEvent(idEvent)}
                        >
                          Edit
                        </button>
                      </div>
                    </li>
                  )
                )
                .slice(startIndex, startIndex + quantityOnPage)}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default AllEvents;
