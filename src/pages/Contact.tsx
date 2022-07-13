import React, { useEffect, useState } from "react";
import validator from "validator";
import { useToast } from "@chakra-ui/react";
import FormContact from "../components/FormContact";
import {
  NAME_LENGTH,
  FIRSTNAME_LENGTH,
  ADDRESS_LENGTH,
  ERROR_INPUT_EMPTY,
  ERROR_INPUT_MAIL,
  SUCCESS_ADD_CONTACT,
} from "../constant/constante";
import { addContact, getContacts } from "../api/contactRequest";
import { IContact } from "../interface/contact.interface";
import CardContact from "../components/CardContact";
import FormUpdate from "../components/FormUpdate";
import { toastError, toastSuccess } from "../functions/toast";
import FiltersByLetters from "../components/FiltersByLetters";

export default function Contact() {
  const [displayForm, setDisplayForm] = useState(false);
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [mail, setMail] = useState("");
  const [address, setAddress] = useState("");
  const toast = useToast();
  const [contact, setContact] = useState<IContact[]>([]);
  const [contactSelected, setcontactSelected] = useState<IContact>();
  const [letterSelected, setLetterSelected] = useState("");

  const clearForm = () => {
    setName("");
    setFirstname("");
    setMail("");
    setAddress("");
  };

  const handleCancel = () => {
    clearForm();
    setDisplayForm(false);
  };

  const handleSubmit = () => {
    if (
      name.trim().length > NAME_LENGTH &&
      firstname.trim().length > FIRSTNAME_LENGTH &&
      address.trim().length > ADDRESS_LENGTH &&
      validator.isEmail(mail, { allow_utf8_local_part: false })
    ) {
      addContact({ name, firstname, mail: mail.toLowerCase(), address })
        .then(() => {
          toastSuccess(
            SUCCESS_ADD_CONTACT.title,
            SUCCESS_ADD_CONTACT.message,
            toast
          );
          setFlag(true);
        })
        .catch((res) =>
          toastError("Erreur ajout contact !", res.response.data.message, toast)
        );
      handleCancel();
    } else {
      if (
        !(name.trim().length > NAME_LENGTH) ||
        !(firstname.trim().length > FIRSTNAME_LENGTH) ||
        !(address.trim().length > ADDRESS_LENGTH)
      ) {
        toastError(ERROR_INPUT_EMPTY.title, ERROR_INPUT_EMPTY.message, toast);
      } else {
        if (!validator.isEmail(mail, { allow_utf8_local_part: false })) {
          toastError(ERROR_INPUT_MAIL.title, ERROR_INPUT_MAIL.message, toast);
        }
      }
    }
  };

  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (flag) {
      getContacts().then((res) => setContact(res));
      setFlag(false);
    }
  }, [contact, flag, letterSelected]);

  return (
    <div className=" min-h-screen p-5">
      <h1 className="text-center text-2xl font-semibold">Carnet d'addresse</h1>

      <div className="mt-10">
        <button
          className="text-white bg-indigo-500 font-semibold p-2 rounded-lg shadow-lg"
          onClick={() => setDisplayForm(true)}
        >
          Ajouter un contact
        </button>
      </div>

      <div className=" w-full mt-5 flex justify-center">
        <FiltersByLetters
          letterSelected={letterSelected}
          action={setLetterSelected}
        />
      </div>

      {displayForm && (
        <FormContact
          name={name}
          setName={setName}
          firstname={firstname}
          setFirstname={setFirstname}
          address={address}
          setAddress={setAddress}
          mail={mail}
          setMail={setMail}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      )}

      {contactSelected && (
        <FormUpdate
          contact={contactSelected}
          action={() => {
            setcontactSelected(undefined);
            setFlag(true);
          }}
        />
      )}

      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {letterSelected !== '' &&  contact.filter(c => c.name.split('')[0].toLowerCase() === letterSelected.toLowerCase() ).map((c) => (
            <CardContact
              key={c._id}
              contact={c}
              action={() => setcontactSelected(c)}
            />
          ))}
          {/* Sort  */}
          {letterSelected === '' && contact.sort((c1, c2) => {
            if (c1.name > c2.name) return 1
            if (c1.name < c2.name) return -1
            return 0
          }).map((c) => (
            <CardContact
              key={c._id}
              contact={c}
              action={() => setcontactSelected(c)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
