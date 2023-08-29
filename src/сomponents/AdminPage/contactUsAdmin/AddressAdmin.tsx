import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import linkToServer from "../../globalLinkToServer";
import { IAddress, initIAddress } from "../../ContactUs/interfaces/IAddress";
import { toast } from "react-toastify";

export default function AddressAdmin() {
  const [{ address, phone, email }, setAddressFormData] =
    useState<IAddress>(initIAddress);
  const [isNoChange, setIsNoChange] = useState(true);

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await axios.get(`${linkToServer}/api/address`);
        const getAddress = response.data;
        setAddressFormData(getAddress);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };

    getAddress();
  }, []);

  const collectAddressData = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAddressFormData((prev) => ({ ...prev, [name]: value }));

    setIsNoChange(false);
  };

  const handleSetNewAddress = async () => {
    try {
      await axios.put(`${linkToServer}/api/address`, {
        address,
        phone,
        email,
      });
    } catch (error) {
      console.error(
        "There was an error when sending a new address to Back:",
        error
      );
    }

    toast.success("New addres has been successfully set!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    setIsNoChange(true);
  };

  return (
    <>
      <p className="fs-4 mt-4 mb-4">Change Postadresse:</p>
      <div className="d-flex align-items-center fs-4 m-2">
        <label htmlFor="address" className="col-md-2 me-2 text-end">
          Address:
        </label>
        <input
          className="form-control fs-5"
          name="address"
          defaultValue={address}
          onChange={collectAddressData}
          required
        />
      </div>

      <div className="d-flex align-items-center fs-4 m-2">
        <label htmlFor="phone" className="col-md-2 me-2 text-end">
          Phone number:
        </label>
        <input
          className="form-control fs-5"
          name="phone"
          defaultValue={phone}
          onChange={collectAddressData}
          required
        />
      </div>

      <div className="d-flex align-items-center fs-4 m-2">
        <label htmlFor="email" className="col-md-2 me-2 text-end">
          E-mail:
        </label>
        <input
          className="form-control fs-5"
          name="email"
          defaultValue={email}
          onChange={collectAddressData}
        />
      </div>

      <div className="d-flex justify-content-end fs-4 m-2">
        <button
          type="button"
          className={
            "col-md-3 btn m-2 " + (isNoChange ? "btn-secondary" : "btn-primary")
          }
          onClick={handleSetNewAddress}
          disabled={isNoChange}
        >
          Save new address to Data Base
        </button>
      </div>
    </>
  );
}
