

import axios from 'axios';
import { apiURL } from '../constant/constante';
import { IContactDto } from '../dto/contact.dto';
import { IContact } from '../interface/contact.interface';


export const addContact = (data: IContactDto) => {
  return axios.post(apiURL, data)
}

export const getContacts = async () => {
  const contactArray: IContact[] = (await axios.get(apiURL)).data;
  return contactArray
}

export const updateContactAddress = async (id: number, address: string) => {
  return axios.patch(apiURL,{id, address})
}