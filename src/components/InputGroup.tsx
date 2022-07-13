import React from "react";

interface IInputGroup {
  label: string;
  type: React.HTMLInputTypeAttribute 
  placeholder: string;
  value: string;
  setValue?: Function;
}



export default function InputGroup(props: IInputGroup) {

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue!(e.target.value);
  }

  return (
    <div className="flex justify-between items-center">
      <label className=" whitespace-nowrap">{props.label} : </label>
      <input
        className="pl-2 m-1 border border-black rounded-lg "
        placeholder={props.placeholder}
        name={props.label}
        type={props.type}
        value={props.value}
        onChange={handleChangeText}
      />
    </div>
  );
}
