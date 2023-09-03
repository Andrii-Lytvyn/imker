import axios from "axios";
import { ChangeEvent, useState } from "react";
import { IUserDto } from "../../AdminPage/UserAdmin/interfaces/IUserDto";
// import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { Select } from "@chakra-ui/react";
import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

interface UserEditAdminProps {
  location: {
    state: IUserDto;
  };
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));


export default function UserEditAdmin(props: UserEditAdminProps): JSX.Element {
  const [
    {
      id,
      name,
      email,
      image,
      phone,
      plz,
      role,
      state,
    },
    setNewEditFormData,
  ] = useState<IUserDto>(props.location.state);
  // const [text, setText] = useState("");
  // const initText = textOfPost;
  // const [value, setValue] = useState<string>();
  const [imageData, setImageData] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const width = 200;
  const height = 250;

  const collectNewUserData = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewEditFormData((prev) => ({
      ...prev,
      [name]: value,
      // textOfPost: text,
      // authorId: "1",
    }));
    console.log("role:", { role }, "state", { state });

  };

  const handleSaveUser = async () => {
    console.log("save pressed");
    let linkVar: string | undefined = undefined;

    if (imageData && selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          `/api/files/upload?width=${width}&height=${height}&category=AVATAR`,
          formData
        );
        linkVar = response.data.id.toString();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    try {
      await axios.put(`/api/users/admin/${id}`, {
        name,
        image: linkVar || image,
        phone,
        plz,
        role,
        state,
      },
        { withCredentials: true, });
    } catch (error) {
      console.error(
        "There was an error when sending a users data to Back:",
        error
      );
    }

    toast.success("User has been successfully updated!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    // setValue("");
    window.location.reload();
  }


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImageData(url);
    }
  };

  return (
    <>
      <div className="container containerPostCreate">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            // alt={userInfo?.name}
            src={"/api/files/" + image}
            variant="rounded"
            sx={{ width: 200, height: 250, margin: 5, fontSize: 60 }}
          />
        </StyledBadge>
        <div className="d-flex align-items-center fs-4 m-2">
          <p className="col-md-2 me-2 text-end">User id:</p>
          <p>{id}</p>
        </div>
        <div className="d-flex align-items-center fs-4 m-2">
          <p className="col-md-2 me-2 text-end">User email:</p>
          <p>{email}</p>
        </div>
        <div className="d-flex align-items-center fs-4 m-2">
          <label htmlFor="name" className="col-md-2 me-2 text-end">
            User name:
          </label>
          <input
            className="form-control fs-5"
            name="name"
            defaultValue={name}
            onChange={collectNewUserData}
            required
          />
        </div>

        <div className="d-flex align-items-center fs-4 m-2">
          <label
            htmlFor="phone"
            className="col-md-2 me-2 text-end"
          >
            User phone:
          </label>
          <input
            className="form-control fs-5"
            name="phone"
            defaultValue={phone}
            onChange={collectNewUserData}
            required
          />
        </div>

        <div className="d-flex align-items-center fs-4 m-2">
          <label htmlFor="plz" className="col-md-2 me-2 text-end">
            User PLZ:
          </label>
          <input
            className="form-control fs-5"
            name="plz"
            defaultValue={plz}
            onChange={collectNewUserData}
          />
        </div>

        <div className="d-flex align-items-center fs-4 m-2">
          <label htmlFor="role" className="col-md-2 me-2 text-end">
            User role:
          </label>
          <Select name="role" className="col-md-2 me-2 text-center fs-6" defaultValue={role} onChange={collectNewUserData}>
            <option value='USER'>USER</option>
            <option value='MEMBER'>MEMBER</option>
            <option value='ADMIN'>ADMIN</option>
          </Select>
        </div>

        <div className="d-flex align-items-center fs-4 m-2">
          <label htmlFor="state" className="col-md-2 me-2 text-end">
            User state:
          </label>
          <Select name="state" className="col-md-2 me-2 text-center fs-6" defaultValue={state} onChange={collectNewUserData}>
            <option value='NOT_CONFIRMED' >NOT_CONFIRMED</option> , DELETED
            <option value='CONFIRMED'>CONFIRMED</option>
            <option value='BANNED'>BANNED</option>
            <option value='DELETED'>DELETED</option>
          </Select>
        </div>

        <div className="d-flex align-items-center flex-column m-3">
          <label htmlFor="fileInput" className="file_upload">
            Change my avatar image
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept=".jpg, .jpeg"
            style={{ display: "none" }}
          />
          <p className="text-start fs-6">
            Recommended resolution: {width}x{height}px
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={handleSaveUser}
        >
          Save User to Data Base
        </button>
      </div>
    </>
  );
}
