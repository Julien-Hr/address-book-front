import React from "react";

interface IFiltersByLetters {
  letterSelected: string;
  action: Function;
}

export default function FiltersByLetters(props: IFiltersByLetters) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  const handleClick = (letter: string) => {
    if (letter.toLowerCase() === props.letterSelected) {
      props.action('')
    } else {
      props.action(letter.toLowerCase())
    }
  }

  return (
    <div className="flex justify-center w-full overflow-auto">
      {alphabet.map((letter, index) => (
        <div
        key={index}
          className={`p-2 m-1 w-8 h-8 border border-black rounded-full shadow-sm hover:bg-indigo-500 
          hover:text-white flex justify-center items-center cursor-pointer font-semibold ${
            props.letterSelected.toLowerCase() === letter
              ? "bg-indigo-500 text-white"
              : ""
          } `}
          onClick={()=>handleClick(letter)}
        >
          {letter.toUpperCase()}
        </div>
      ))}
    </div>
  );
}
