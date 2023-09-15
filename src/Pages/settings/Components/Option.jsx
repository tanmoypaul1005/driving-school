import Switch from "@mui/material/Switch";
import React from "react";
import { alpha, styled } from "@mui/material/styles";
import Logo from "../../../Components/Image/Logo";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#F89818",
    "&:hover": {
      backgroundColor: alpha("#F89818", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#F89818",
  },
}));

function Option({
  label,
  source,
  className,
  hasSwitch,
  onClick,
  checked,
  type,
  onChange,
  isActive = false,
}) {
  return (
    <div
      className={`bg-white ${isActive?'':'border-[1px]'} border-cTextFieldGrey text-sm h-10 rounded-md flex justify-between 
        cursor-pointer  ${className} ${
        isActive ? "text-cBrand bg-cSettingsOptionBgColor font-fw600":"important_text text-cBlack"
      }`}
      onClick={onClick}
    >
      <div className="mt-[10px] pl-3 important_text"> {label} </div>
      {hasSwitch ? (
        <GreenSwitch checked={checked} onChange={() => onChange(type)} />
      ) : (
        <div className="mt-[10px] pr-3">
          {" "}
          <Logo source={source} />{" "}
        </div>
      )}
    </div>
  );
}

export default Option;
