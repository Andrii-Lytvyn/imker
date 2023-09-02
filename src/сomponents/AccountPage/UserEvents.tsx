import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IUserEvents, initIUserEvents } from "./interfaces/IUserEvents";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function UserEvents(): JSX.Element {
  const [{ events }, setUserEvents] = useState<IUserEvents>(initIUserEvents);
  const unFollowId = useRef("0");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/events/myeventslist`, {
          withCredentials: true,
        });
        const eventsList = response.data;
        setUserEvents(eventsList);
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

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div key={unFollowId.current} className="container">
      <div style={{ minHeight: '22vh' }}>
      {currentEvents.length ? (
        currentEvents.map(
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
            dateEnd,
            // startTime,
            // endTime,
          }) => (
            <div
              key={idEvent}
              className="d-flex justify-content-between rounded bg-light p-2 m-3"
            >
              {idEvent} {title} {dateStart} {dateEnd}
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

      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(events.length / eventsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
        />
      </Stack>
    </div>
  );
}
