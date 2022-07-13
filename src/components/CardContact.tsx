import React from 'react'
import { IoMail, IoMap } from 'react-icons/io5'
import { IContact } from '../interface/contact.interface'

interface ICardContact {
  contact:  IContact,
  action: Function
}

export default function CardContact(props: ICardContact) {
  return (
    <div className='border border-black p-5 rounded-lg grid grid-cols-1 w-full m-1 shadow-lg'>
      <div className='flex'>
        <p className='font-bold'>{props.contact.name}</p>
        <p className='ml-2 font-semibold'>{props.contact.firstname}</p>
      </div>

      <div className='mt-2 flex items-center justify-between'>
        <IoMail size={20}/>
        <p className='flex-1 w-full ml-2'>{props.contact.mail}</p>
      </div>
      
      <div className='flex'>
        <IoMap size={20}/>
        <p className='ml-2'>{props.contact.address}</p>
      </div>
      
      <button className='mt-4 rounded-lg bg-indigo-500 text-white font-semibold' onClick={()=>props.action(props.contact)}>Modifier</button>
    </div>
  )
}
