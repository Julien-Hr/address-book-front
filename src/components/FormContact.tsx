import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import InputGroup from './InputGroup'
import validator from "validator";


interface IFormPoppin {
  name: string;
  setName: Function;
  firstname: string;
  setFirstname: Function;
  address: string;
  setAddress: Function;
  mail: string;
  setMail: Function;

  handleCancel: Function;
  handleSubmit: Function;
}

export default function FormPoppin(props: IFormPoppin) {
  const {name,
    setName,
    firstname,
    setFirstname,
    address,
    setAddress,
    mail,
    setMail,
    handleCancel,
    handleSubmit
  } = props

  const [validateEmail, setValidateEmail] = useState(false);

  useEffect(()=>{
    if (validator.isEmail(mail, { allow_utf8_local_part: false })) setValidateEmail(true)
  },[mail])

  return (
    <div className="flex justify-center items-center w-screen h-screen backdrop-blur-sm fixed top-0 left-0">
      <div className=" content-center h-fit rounded-lg shadow-lg border border-black p-2 bg-slate-300 bg-opacity-80 ">
        <div className="flex justify-between w-full">
          <h2
            className="flex-1 text-center w-full font-bold
                text-xl"
          >
            Ajout d'un contact{" "}
          </h2>
          <button className="hover:text-red-600" onClick={() => handleCancel()}>
            {<IoCloseOutline size={32} />}
          </button>
        </div>
        <div className="grid gap-2 mt-4 m-5">
          <InputGroup
            label="Nom"
            type={"text"}
            placeholder="Dupon"
            value={name}
            setValue={setName}
          />
          <InputGroup
            label="Prénom"
            type={"text"}
            placeholder="Jean"
            value={firstname}
            setValue={setFirstname}
          />
          <InputGroup
            label="Mail"
            type={"email"}
            placeholder="jean.dupon@gmail.com"
            value={mail}
            setValue={setMail}
          />
          <InputGroup
            label="Adresse"
            type={"text"}
            placeholder="12 rue des dupon"
            value={address}
            setValue={setAddress}
          />
        </div>
        <div className=" mt-4 grid grid-cols-6 gap-2">
          <button
            className=" col-span-2 rounded-lg  text-indigo-500 font-semibold"
            onClick={() => handleCancel()}
          >
            Annuler
          </button>
          <button
            className={`col-span-4 rounded-lg ${
              validateEmail
                ? "bg-indigo-500 text-white"
                : "bg-slate-500 text-slate-300 cursor-no-drop "
            }  font-semibold `}
            onClick={() => (validateEmail ? handleSubmit() : null)}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
