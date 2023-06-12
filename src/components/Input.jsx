import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { ErrorMessage } from "formik";

export function Input({ label, name, type, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="mt-3 relative w-full flex flex-col">
        <input
          type={type !== "password" ? type : showPassword ? "text" : "password"}
          id={name}
          className="block px-2.5 pb-2.5 pt-4 w-full border-black text-gray-900 bg-transparent rounded appearance-none focus:outline-none peer focus:ring-0 focus:border-black border-[.9px] focus:border-[1px]"
          placeholder=""
          name={name}
          {...props}
        />

        {name === "password" && (
          <i
            className="absolute right-2.5 top-[20%] cursor-pointer hover:bg-gray-100 px-1 py-1 rounded text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <BiShow size={20} /> : <BiHide size={20} />}
          </i>
        )}

        <label
          htmlFor={name}
          className="absolute duration-300 transform -translate-y-4 scale-95 top-2 z-10 text-gray-500 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-95 peer-focus:-translate-y-4 left-1 pointer-events-none"
        >
          {label}
        </label>
      </div>
      {/* <ErrorMessage name={name}>
        {(msg) => (
          <div className="text-xs text-red-500 text-left w-full">
            <p className="error-messages">{msg}</p>
          </div>
        )}
      </ErrorMessage> */}
    </>
  );
}

