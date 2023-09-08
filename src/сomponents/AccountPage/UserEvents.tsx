import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IUserEvents, initIUserEvents } from "./interfaces/IUserEvents";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { IEvent } from "../Events/interface/IEventsData";
import { formatDate } from "../Events/helpers/formattedDate";
import { Link } from "react-router-dom";

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

        const filteredEvents = eventsList.events
          .filter((event: IEvent) => {
            const eventDateEnd = new Date(event.dateEnd);
            const currentDate = new Date();
            return eventDateEnd >= currentDate;
          })
          .sort((a: IEvent, b: IEvent) => {
            const dateA: Date = new Date(a.dateStart);
            const dateB: Date = new Date(b.dateStart);
            return dateA.getTime() - dateB.getTime();
          });

        setUserEvents({ events: filteredEvents });
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
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div key={unFollowId.current} className="container">
      <div style={{ minHeight: "30vh" }}>
        {currentEvents.length ? (
          currentEvents.map(
            ({ idEvent, title, shortDescription, dateStart }) => (
              <div
                key={idEvent}
                className="d-flex justify-content-between rounded bg-light p-2 mb-2"
              >
                <div className="d-flex">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      backgroundColor: "var(--terracotta)",
                      width: "100px",
                      height: "60px",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    <p style={{ fontWeight: "bold" }}>
                      {formatDate(dateStart)?.day}
                    </p>
                    <p>{formatDate(dateStart)?.month}</p>
                  </div>
                  <div className="text-left ms-2">
                    <Link to={"/events/" + idEvent}>
                      <p style={{ fontWeight: "bold" }}> {title} </p>
                    </Link>
                    <p>{shortDescription}</p>
                  </div>
                </div>
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
          <div>
            <p className="fs-4 text-center mt-4">
              Es sind keine geplanten Veranstaltungen für Sie vorhanden
            </p>
            <p className="fs-6 text-center" style={{ marginTop: "180px" }}>
              Hinweis: anmeldungen für unsere Veranstaltungen können nur von
              Mitgliedern unserer Gemeinschaft eingereicht werden
            </p>
          </div>
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
