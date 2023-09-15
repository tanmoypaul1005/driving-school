import React, { useState } from "react";
import { iHidePass, iInformation, iShowPass } from "../../App/Utility/source";
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from "react-i18next";
import { k_role } from "../../App/Utility/const";
import useUtilityStore from "../../App/Stores/UtilityStore";
const CommonInput = ({
  onClick,
  onChange,
  name,
  warningBorder = false,
  value,
  type = "text",
  label,
  placeholder,
  className2 = "",
  className3 = "",
  className4 = "",
  max_input,
  min_input,
  min_number,
  max_number,
  is_readonly = false,
  no_label = false,
  icon = null,
  withStar = true,
  pipe = false,
  textarea = false,
  rows,
  cols = 15,
  togglePasswordBtn = false,
  required = false,
  disabled = false,
  startDate,
  inputIcon = false,
  notEditable = false,
  disableIcon = iInformation,
  unnecessaryCharacters = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);
  const { role } = useUtilityStore();

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }
  const { t } = useTranslation();

  function handleKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    if (["/", "*", "#", "<", ">", "+", "-", ".", ","].includes(keyValue)) {
      event.preventDefault();
    }
  }
  return (
    <div>
      {!no_label && (
        <div
          className={`text-cHighlighted capitalize-first important_text mb-s8 w-full ${(required === true && withStar === true) ? "req-field" : ""}`}>
          {label}
        </div>
      )}

      <div
        className={`${className2} ${icon && "relative flex justify-center items-center w-full"
          }`}
      >
        <div className={`${togglePasswordBtn === true ? "relative" : ""} relative`}>
          {inputIcon && <div className="absolute left-0 pb-s14 pt-s10 ml-s10 mr-s10">
            <img className="w-s18 h-s18" src={inputIcon} alt="" /></div>}
          {!textarea && (
            <input
              onKeyPress={unnecessaryCharacters ? handleKeyPress : ""}
              disabled={disabled}
              required={required}
              onClick={onClick}
              onChange={onChange}
              type={inputType}
              name={name}
              value={value && value}
              data-date-format={type === "date" ? "DD MMMM YYYY" : ""}
              maxLength={max_input ? max_input : 4096}
              onInput={maxLengthCheck}
              minLength={min_input ? min_input : 0}
              max={max_number}
              // onFocus={(e) => { if (type === "date") e.target.readOnly = true }}
              onKeyDown={(e) => {
                if (type === "date") e.preventDefault();
                if (type === 'number' && ["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
              }}
              // onkeydown="return false"
              min={
                type === "number"
                  ? min_number
                  : type === "date"
                    ? startDate
                      ? startDate
                      : new Date().toISOString().split("T")[0]
                    : ""
              }
              className={`text-fs16 font-fw400 bg-cTextFieldGrey border  ${warningBorder ? "border-cRed" : "border-cNmSelect"}   ${!inputIcon ? 'px-5' : 'px-10'}  py-s7 w-full rounded-br4 text-cTextBlack ${className3} ${togglePasswordBtn === true ? "pr-s50" : ""}${disabled ? "cursor-not-allowed" : "cursor-text"}`}
              placeholder={placeholder}
              readOnly={is_readonly}
            />
          )}
          {togglePasswordBtn === true ? (
            <img
              onClick={() => {
                setShowPassword(!showPassword);
                if (inputType === "password") {
                  setInputType("text");
                } else {
                  setInputType("password");
                }
              }}
              src={showPassword === true ? iShowPass : iHidePass}
              alt="show-hide-icon"
              className="absolute p-2 cursor-pointer top-1 right-3"
            />
          ) : (
            ""
          )}

          {disabled === true && notEditable === true ? (
            <Tooltip title={role === k_role?.school ? t("Not Editable") : "Not Editable"}>
              <img
                src={disableIcon}
                alt="show-hide-icon"
                className="absolute top-1 right-3 p-1.5 cursor-pointer"
              />
            </Tooltip>
          ) : (
            ""
          )}
        </div>

        {textarea && (
          <textarea
            maxLength={max_input ? max_input : 4096}
            name={name}
            required={required}
            onChange={onChange}
            value={value && value}
            className={`px-5 py-3 w-full h-full rounded-br4 border resize-none bg-cTextFieldGrey border-cNmSelect text-cTextBlack ${className3}`}
            rows={rows}
            cols={cols}
            placeholder={placeholder}
          ></textarea>
        )}

        {icon && (
          <div
            className={`absolute right-1 px-2 ${pipe && "border-l"} border-cInputBorder text-gray-600 ${className4}`}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonInput;