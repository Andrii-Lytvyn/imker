import { useEffect, useState } from "react";
import {
  IUsersOnEvents,
  initIUsersOnEvents,
} from "./interfaces/IUsersOnEvents";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { IUserDto, initIUserDto } from "../AdminPage/UserAdmin/interfaces/IUserDto";

interface UsersOnEventsProps {
  location: {
    state: string | undefined;
  };
}

export default function UsersOnEvent(props: UsersOnEventsProps): JSX.Element {
  const [eventId] = useState(props.location.state);
  const [{ users }, setUsersOnEvents] =
    useState<IUsersOnEvents>(initIUsersOnEvents);
  const [{ id: userId }, setMe] = useState<IUserDto>(initIUserDto)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}/users`, {
          withCredentials: true,
        });
        const userList = response.data;
        setUsersOnEvents(userList);

        const getMyId = await axios.get(`/api/me`, {
          withCredentials: true,
        });
        const userDto = getMyId.data;
        setMe(userDto);

      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };

    fetchData();
  }, [eventId]);

  return (
    <div className="container bg-light d-flex justify-content-between">
    {users.length > 0 && (
        <AvatarGroup max={4}>
          {users.map(({ id, name, image }) => (
            <Avatar
              key={id}
              alt={name}
              src={"/api/files/" + image}
              sx={{ width: 70, height: 70 }}
            />
          ))}
        </AvatarGroup>
    )}
    <button className="btn btn-warning">Follow Event {userId}</button>
  </div>
    );
}
