import React, { useEffect, useState } from "react";

const CommonButtonOutlined = ({
  btnLabel = "Trek",
  colorType = "basic",
  isDisabled = false,
  isFilterDot = false,
  isFullRounded = true,
  CustomStyles,

  iconRight = "",
  iconRightHover = "",

  iconLeft = "",
  iconLeftHover = "",


  onClick,
  width,
}) => {
  // colorType="basic", "danger", "primary", "success", "warning"
  const [colorCode, setColorCode] = useState("ring-cPlaceholder");
  const [textColorCode, setTextColorCode] = useState("text-white");
  const [hoverColorCode, setHoverColorCode] = useState("text-cPlaceholder");
  const [hoverNow, setHoverNow] = useState(false);

  useEffect(() => {
    switch (colorType) {
      case "basic":
        setColorCode("ring-cPlaceholder");
        setHoverColorCode("hover:bg-cPlaceholder");
        setTextColorCode("text-cPlaceholder");
        break;
      case "danger":
        setColorCode("ring-cRed");
        setHoverColorCode("hover:bg-cRed");
        setTextColorCode("text-cRed");
        break;

      case "primary":
        setColorCode("ring-cBrand");
        setHoverColorCode("hover:bg-cBrand");
        setTextColorCode("text-cBrand");
        break;
      case "success":
        setColorCode("ring-cSuccess");
        setHoverColorCode("hover:bg-cSuccess");
        setTextColorCode("text-cSuccess");
        break;
      case "warning":
        setColorCode("ring-cPending");
        setHoverColorCode("hover:bg-cPending");
        setTextColorCode("text-cPending");
        break;
      default:
        setColorCode("ring-cPlaceholder");
        setHoverColorCode("hover:bg-cPlaceholder");
        setTextColorCode("text-cPlaceholder");
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorType]);
  return (
    <div
      onMouseEnter={() => { setHoverNow(true); }}
      onMouseLeave={() => { setHoverNow(false); }}
      onClick={onClick}
      className={`font-fw600 text-fs14 flex items-center justify-center select-none ring-2 hover:text-white duration-300  h-s36 capitalize w-[140px] relative
        ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${isFullRounded ? "rounded-full" : "rounded-br4"}
        ${CustomStyles}
        ${colorCode}
        ${textColorCode}
        ${hoverColorCode}
        ${width} 
        `}
    >
      {iconLeftHover ?
        hoverNow ?
          <img src={iconLeft} className="w-s14 h-s14 mr-s10" alt="" />
          : <img src={iconLeftHover} className="w-s14 h-s14 mr-s10" alt="" /> : ""}

      {btnLabel}

      {iconRightHover ?
        hoverNow ?
          <img src={iconRightHover} className="w-s14 h-s14 ml-s15" alt="" />
          : <img src={iconRight} className="w-s14 h-s14 ml-s15" alt="" /> : ""}
      {
        isFilterDot ? <div className="w-s10 h-s10 rounded-full bg-cRed absolute top-[12px] right-[12px]"></div> : ""
      }

    </div>
  );
};

export default CommonButtonOutlined;
