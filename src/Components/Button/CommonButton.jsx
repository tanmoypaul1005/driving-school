import React, { useEffect, useState } from "react";
import { iCloseRed } from "../../App/Utility/source";

const CommonButton = ({
  btnLabel = "Trek",
  colorType = "primary",
  isDisabled = false,
  customStyle,
  onClick,
  width = "w-[155px]",
  type = "button",
  roundedFull = true,
  icon = "",
  iconRight = "",
  text = "text-fs14",
  showActiveDot = false,
  activeDotActionFN = () => { },
}) => {
  // colorType="basic", "danger", "primary", "success", "warning"
  const [colorCode, setColorCode] = useState("bg-cPlaceholder");
  const [textColorCode, setTextColorCode] = useState("text-white");

  const colorCheckup = (colorType) => {
    switch (colorType) {
      case "basic":
        setColorCode("bg-cLine");
        setTextColorCode("text-cTextBlack");
        break;
      case "danger":
        setColorCode("bg-cWarning");
        setTextColorCode("text-white");
        break;
      case "primary":
        setColorCode("bg-cBrand hover:bg-cBrandDark");
        setTextColorCode("text-white");
        break;
      case "disabled":
        setColorCode("bg-cBluishGray hover:bg-cBluishGray");
        setTextColorCode("text-white");
        break;
      case "secondary":
        setColorCode("bg-cInvoiceLesson hover:bg-cInvoiceLesson");
        setTextColorCode("text-cNero");
        break;
      case "success":
        setColorCode("bg-cSuccess");
        setTextColorCode("text-white");
        break;
      case "warning":
        setColorCode("bg-cWarning");
        setTextColorCode("text-white");
        break;
      case "white":
        setColorCode("bg-cCard");
        setTextColorCode("text-cBrandColor");
        break;
      case "BrandColor":
        setColorCode("cBrandColor");
        setTextColorCode("text-white");
        break;

      case "BackgroundAndCategory":
        setColorCode("cBackgroundAndCategory");
        setTextColorCode("text-cBrandColor");
        break;

      case "FilterClearButton":
        setColorCode("bg-cBrandColor2");
        setTextColorCode("text-cWarning");
        break;

      default:
        setColorCode("bg-cPlaceholder");
        setTextColorCode("text-cTextBlack");
        break;
    }
  };

  useEffect(() => {
    colorCheckup(colorType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorType]);

  return (
    <div className={`relative select-none h-s36 font-fw600 text-fs14 ${text} capitalize duration-300
      ${width}
      ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
      ${customStyle}
      ${colorCode}
      ${textColorCode}
      ${roundedFull ? "rounded-full" : 'rounded-br4'}
    `}>
      <button
        disabled={isDisabled}
        type={type}
        onClick={onClick}
        className={`flex items-center justify-center select-none h-s36 font-fw600 text-fs14 ${text} capitalize duration-300
      ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
      ${customStyle}
      ${colorCode}
      ${textColorCode}
      ${width}
      ${roundedFull ? "rounded-full" : 'rounded-br4'} `}
      >
        {icon}
        <div className="font-fw600 text-fs14">{btnLabel}</div>
        {iconRight}
      </button>
      {showActiveDot ?

        <span className="absolute rounded-full right-3 bg-cRed w-s12 h-s12 top-s12"></span>

        // <img
        //   onClick={activeDotActionFN}
        //   src={iCloseRed}
        //   alt=""
        //   className='absolute right-3 top-[9px] cursor-pointer w-s18'
        // /> 

        : ""}
    </div>
  );
};

export default CommonButton;