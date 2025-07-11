"use client";

import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { Input } from "./input";


interface Props<T extends FieldValues> {
  field:ControllerRenderProps<T, Path<T>>
  placeholder?:string;
  className?:string;
  maxLength?:number;
}

export const InputTogglePassword = <T extends FieldValues>({field, placeholder, className, maxLength}:Props<T>) => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <div className="w-full relative">
      <Input type={!show ? "password" : "text"} placeholder={placeholder} className={`pr-10 ${className}`} maxLength={maxLength} {...field}/>
      <button type="button" className="absolute top-2 right-2 text-gray-700 dark:text-white" onClick={() => setShow(!show)}>
        {!show ? (<IoEyeOutline/>) : (<IoEyeOffOutline/>)}
      </button>
    </div>
  );
};