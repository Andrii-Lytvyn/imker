import { useEffect, useState } from "react";
import {
  IUsersOnEvents,
  initIUsersOnEvents,
} from "./interfaces/IUsersOnEvents";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import {
  IUserDto,
  initIUserDto,
} from "../AdminPage/UserAdmin/interfaces/IUserDto";

interface UsersOnEventsProps {
  location: {
    eventId: string | undefined;
    dateEnd: string | undefined;
  };
}

export default function UsersOnEvent(props: UsersOnEventsProps): JSX.Element {
  const [eventId] = useState(props.location.eventId);
  const [dateEnd] = useState(props.location.dateEnd);
  const [{ users }, setUsersOnEvents] =
    useState<IUsersOnEvents>(initIUsersOnEvents);
  const [me, setMe] = useState<IUserDto>(initIUserDto);
  const [isInList, setIsInList] = useState<boolean | null>(null);
  const [isOutdated, setIsOutdated] = useState<boolean | null>(null);
  const [isBtnShow, setIsBtnShow] = useState<boolean | null>(null);
  const isLogined = localStorage.getItem("IMKER");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}/users`, {
          withCredentials: true,
        });
        const userList = response.data;
        setUsersOnEvents(userList);

        if (isLogined === "true") {
          const getMyId = await axios.get(`/api/me`, {
            withCredentials: true,
          });
          const userDto = getMyId.data;
          setMe(userDto);

          setIsInList(users.some((obj) => obj.id === me.id));
        }
        setIsBtnShow(me.role === "ADMIN" || me.role === "MEMBER");
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };

    fetchData();

    if (props.location.dateEnd) {
      const eventDateEnd = new Date(dateEnd!);
      const currentDate = new Date();
      setIsOutdated(eventDateEnd > currentDate);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, me.id]);

  const unfollowEvent = async () => {
    try {
      await axios.delete(`/api/events/${eventId}/unfollow`, {
        withCredentials: true,
      });
      setIsInList(false);
      const updatedUsers = users.filter((user) => user.id !== me.id);
      setUsersOnEvents({ users: updatedUsers });
    } catch (error) {
      console.error("Error during unfollow request:", error);
    }
  };

  const followEvent = async () => {
    try {
      await axios.put(`/api/events/${eventId}/follow`, {
        withCredentials: true,
      });
      setIsInList(false);
      const updatedUsers = [me, ...users];
      setIsInList(true);
      setUsersOnEvents({ users: updatedUsers });
    } catch (error) {
      console.error("Error during unfollow request:", error);
    }
  };

  return (
    <div className="container mt-4">
      {users.length > 0 && (
        <div className="d-flex flex-column align-items-start">
          <p className="mb-2">Teilnehmende Gemeinschaftsmitglieder:</p>
          <AvatarGroup max={4}>
            {users.map(({ id, name, image }) => (
              <Avatar
                key={id}
                alt={name}
                src={"https://imker.fra1.digitaloceanspaces.com/" + image}
                sx={{ width: 70, height: 70 }}
                onContextMenu={(e) => e.preventDefault()}
              />
            ))}
          </AvatarGroup>
        </div>
      )}

      {isOutdated && isBtnShow && (
        <div className="mt-3 text-center">
          {!isInList && (
            <button className="button_imker" onClick={followEvent}>
              An diesem Event teilnehmen
            </button>
          )}
          {isInList && (
            <button className="button_imker" onClick={unfollowEvent}>
              Eventteilnahme stornieren
            </button>
          )}
        </div>
      )}
    </div>
  );
}
