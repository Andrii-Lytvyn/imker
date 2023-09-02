import { useEffect, useState } from "react";
import axios from "axios";
import { IUserEvents, initIUserEvents } from "./interfaces/IUserEvents";

export default function UserEvents(): JSX.Element {
  const [{ events }, setUserEvents] = useState<IUserEvents>(initIUserEvents);

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

  return (
    <div>
      {events.map(
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
          <div key={idEvent}>
            {title} {dateStart}
            <hr />
          </div>
        )
      )}
    </div>
  );
}
