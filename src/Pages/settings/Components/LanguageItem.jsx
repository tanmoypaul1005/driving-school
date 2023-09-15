import React from "react";
import { ILangCheck } from "../../../App/Utility/source";

function LanguageItem({ label, isActive, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer ">
      <div className="flex flex-row justify-between text-cBodyText">
        <li className={`text-fs14 ${isActive ? "font-fw600" : "font-fw400"}`}>
          {" "}
          {label}{" "}
        </li>
        {isActive ? <img src={ILangCheck} alt="lang check" /> : <div></div>}
      </div>
      {/* <hr /> */}
    </div>
  );
}

export default LanguageItem;
