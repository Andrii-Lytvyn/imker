import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IUserEvents, initIUserEvents } from "./interfaces/IUserEvents";

export default function UserEvents(): JSX.Element {
  const [{ events }, setUserEvents] = useState<IUserEvents>(initIUserEvents);
  const unFollowId = useRef("0");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/events/myeventslist`, {
          withCredentials: true,
        });
        const userDto = response.data;
        setUserEvents(userDto);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };

    fetchData();
  }, []);

  const unfollowEvent = async () => {
    try {
      await axios.delete(`/api/events/${unFollowId.current}/unfollow`, {
        withCredentials: true,
      });

      const updatedEvents = events.filter(
        (event) => event.idEvent !== unFollowId.current
      );
      setUserEvents({ events: updatedEvents });
    } catch (error) {
      console.error("Error during unfollow request:", error);
    }
  };

  return (
    <div key={unFollowId.current} className="container">
      {events.length ? (
        events.map(
          ({
            idEvent,
            title,
            // address,
            // author,
            // status,
            // description,
            // shortDescription,
            // location,
            // quantityOfMembers,
            // photo,
            dateStart,
            // dateEnd,
            // startTime,
            // endTime,
          }) => (
            <div
              key={idEvent}
              className="d-flex justify-content-between rounded bg-light p-2 m-3"
            >
              {idEvent} {title} {dateStart}
              <button
                className="btn btn-warning"
                onClick={() => {
                  unFollowId.current = idEvent;
                  unfollowEvent();
                }}
              >
                unfollow event
              </button>
            </div>
          )
        )
      ) : (
        <p>No sheduled events</p>
      )}
    </div>
  );
}
