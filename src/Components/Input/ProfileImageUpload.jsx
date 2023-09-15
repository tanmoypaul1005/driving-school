import React, { useState } from "react";
import { useRef } from "react";
import { getBase64 } from "../../App/Utility/UtilityFunctions";
import CommonButtonOutlined from "../Button/CommonButtonOutlined";

export default function ProfileImageUpload({ CustomStyles, onChangeFile }) {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isImageChanged, setIsImageChange] = useState(false);

  const handleClick = () => inputRef.current.click();

  const handleFileChange = (e) => {
    getBase64(e.target.files[0], (result) => {
      setImage(result);
      setIsImageChange(true);
      onChangeFile(result);
    });
  };

  return (
    <>
      <img
        src={isImageChanged ? image : ""}
        className={`${
          isImageChanged
            ? "w-s160 h-s160 object-cover rounded-full"
            : "w-s160 h-s160 object-cover rounded-full"
        } mx-auto`}
        alt="user-img"
      />
      <input
        className="hidden"
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />

      <CommonButtonOutlined
        btnLabel="Upload Image"
        colorType="primary"
        onClick={handleClick}
        type="button"
        CustomStyles={"mt-5 ml-2"}
      />
    </>
  );
}
