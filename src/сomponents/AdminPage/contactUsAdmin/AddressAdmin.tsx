import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import linkToServer from "../../globalLinkToServer";
import { IAddress, initIAddress } from "../../ContactUs/interfaces/IAddress";
import { toast } from "react-toastify";

export default function AddressAdmin() {
  const [{ address, phone, email }, setAddressFormData ] =
    useState<IAddress>(initIAddress);

  const [
    { address: oldAddress, phone: oldPhone, email: oldEmail },
    setAddress,
  ] = useState<IAddress>(initIAddress);

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await axios.get(`${linkToServer}/api/address`);
        const getAddress = response.data;
        setAddress(getAddress);
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
  };

  const handleSetNewAddress = async () => {

    try {
      await axios.put(`${linkToServer}/api/address`, {
        address, 
        phone, 
        email
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

    setAddressFormData(initIAddress);
  };

  return <>
   <div className="d-flex align-items-center fs-4 m-2">
          <label htmlFor="address" className="col-md-2 me-2 text-end">
          address:
          </label>
          <input
            className="form-control fs-5"
            name="address"
            defaultValue={oldAddress}
            onChange={collectAddressData}
            required
          />
        </div>

        <div className="d-flex align-items-center fs-4 m-2">
          <label
            htmlFor="phone"
            className="col-md-2 me-2 text-end"
          >
            Phone number:
          </label>
          <input
            className="form-control fs-5"
            name="phone"
            defaultValue={oldPhone}
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
            defaultValue={oldEmail}
            onChange={collectAddressData}
          />
        </div>
  
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={handleSetNewAddress}
        >
          Save new address to Data Base
        </button>
  </>;
}
