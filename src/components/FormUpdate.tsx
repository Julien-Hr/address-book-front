import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoCalendar, IoCloseOutline, IoGlobe, IoMail } from "react-icons/io5";
import { updateContactAddress } from "../api/contactRequest";
import { ERROR_UPDATE, SUCCESS_UPDATE } from "../constant/constante";
import { toastError, toastSuccess } from "../functions/toast";
import { IContact } from "../interface/contact.interface";
import InputGroup from "./InputGroup";
import * as moment from 'moment-timezone'

interface IFormUpdate {
  contact: IContact;
  action: Function;
}

export default function FormUpdate(props: IFormUpdate) {
  const toast = useToast();

  const [newAddress, setNewAddress] = useState(props.contact.address);
  const handleClose = () => {
    props.action();
  };

  const updateAddress = () => {
    updateContactAddress(props.contact._id, newAddress)
      .then(() =>
        {toastSuccess(SUCCESS_UPDATE.title, SUCCESS_UPDATE.message, toast)
        handleClose()}
      )
      .catch((res) =>
        toastError(ERROR_UPDATE.title, res.response.data.message, toast)
      );
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen backdrop-blur-sm fixed top-0 left-0">
      <div className=" content-center h-fit rounded-lg shadow-lg border border-black p-2 bg-slate-300 bg-opacity-80 ">
        <div className="flex justify-between w-full">
          <h2
            className="flex-1 text-center w-full font-bold
                text-xl"
          >
            Modification d'un contact{" "}
          </h2>
          <button className="hover:text-red-600" onClick={() => handleClose()}>
            {<IoCloseOutline size={32} />}
          </button>
        </div>
        <div className="grid gap-2 mt-4 m-5">
          <div className="flex font-bold">
            <p>{props.contact.name}</p>
            <p className="ml-2">{props.contact.firstname}</p>
          </div>

          <div className="flex items-center justify-between">
            <IoMail size={20} />
            <p className="flex-1 w-full ml-2">{props.contact.mail}</p>
          </div>

          <div className="flex items-center justify-between">
            <IoCalendar size={20} />
            <p className="flex-1 w-full ml-2">
              {moment
                .tz(props.contact.creationDate, "Indian/Reunion")
                .format("DD/mm/yyyy HH:mm:ss")}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <IoGlobe size={20} />
            <p className="flex-1 w-full ml-2">
              {props.contact.ip}
            </p>
          </div>

          <InputGroup
            label="Adresse"
            type={"text"}
            placeholder="12 rue des dupon"
            value={newAddress}
            setValue={setNewAddress}
          />
        </div>
        <div className=" mt-4 grid grid-cols-6 gap-2">
          <button
            className=" col-span-2 rounded-lg  text-indigo-500 font-semibold"
            onClick={() => handleClose()}
          >
            Annuler
          </button>
          <button
            className={`col-span-4 rounded-lg bg-indigo-500 text-white font-semibold `}
            onClick={() => updateAddress()}
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}
