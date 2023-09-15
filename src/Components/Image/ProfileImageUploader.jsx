import React, { useRef, useState } from "react";
import { iProfile, iUserAvatar } from "../../App/Utility/source";
import { iImageUploder, iImageIogo } from "./../../App/Utility/source";
import { Toastr } from "../../App/Utility/UtilityFunctions";
import { render } from "@testing-library/react";

export default function ProfileImageUploader({
  setImage,
  FileData,
  onChange = () => { },
  finalBase64 = () => { },
  iImage = iImageIogo,
  imageUploader,
  imageName = "",
  rounded = true,
  bannerImage = false,
  categoryImg = false
}) {
  const [tempImage, setTempImage] = useState(iImage);

  const inputFile = useRef(null);

  const onButtonClick = () => inputFile.current.click();

  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    var image = new Image();
    var reader = new FileReader();
    reader.onloadend = async function () {
      setTempImage(reader.result);
      finalBase64(reader.result);
      (await FileData) && FileData("icon", reader.result);
      (await imageUploader) && imageUploader(imageName, reader.result);
      (await setImage) && setImage(reader.result);
      // console.log("reader.result: ", reader.result);
    };
    reader.onload = (event) => {
      //setTempImage(reader.result);
      image.src = event.target.result;
    };

    if (bannerImage) {
      if (!/^image\/(png|jpe?g|gif)$/.test(file.type))
        return Toastr({ message: "Unsupported file type", type: "error" });
    }
    reader.readAsDataURL(file);
    onChange(file);
  };
  return (
    <>
      {tempImage ? (
        <div className="relative">
          <div
            className={`${rounded ? "h-[144px]" : "h-[144px]"}  ${rounded ? "w-[144px]" : "w-[400px]"}
            ${rounded ? "rounded-full" : "rounded-br10"}  bg-cBackgroundAndCategory overflow-hidden select-none relative`}
          >
            <input
              onChange={onChangeFile.bind(this)}
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
            />

            <div className="rounded-full">
              
              {!categoryImg &&
                <img
                  className={`
                          ${rounded ? "h-[144px]" : "h-[144px]"}  ${rounded ? "w-[144px]" : "w-[400px]"}
                          ${rounded ? "rounded-full" : "rounded-br10"}
                          bg-cBackgroundAndCategory overflow-hidden select-none relative object-cover
                  `}
                  src={tempImage ? tempImage : iProfile}
                  alt="profile-pic"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = iUserAvatar;
                  }}
                />}
            </div>
          </div>
          <div
            onClick={onButtonClick}
            className="z-50 cursor-pointer w-[100px] h-[40px] absolute bottom-0 -right-6  "
          >
            <img
              src={iImageUploder}
              alt="upload a pic"
              className="w-[34px] mx-auto pt-1 z-20"
            />
          </div>
        </div>
      ) : (
        <div className="relative">
          <div
            className={`${rounded ? "h-[144px]" : "h-[144px]"}  ${rounded ? "w-[144px]" : "w-[400px]"
              } ${rounded ? "rounded-full" : "rounded-br10"
              } bg-cBackgroundAndCategory overflow-hidden 
          select-none relative`}
          >
            <input
              onChange={onChangeFile.bind(this)}
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
            />
            <img
              className={`h-[74px] w-[74px]  object-none  ${rounded ? "m-s35" : "my-s35 mx-s165"
                }`}
              src={tempImage ? tempImage : iImageIogo}
              alt="profile-pic"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = iUserAvatar;
              }}
            />
          </div>
          <div>
            <div
              onClick={onButtonClick}
              className="z-50 cursor-pointer w-[100px] h-[40px] absolute bottom-0 -right-6"
            >
              <img
                src={iImageUploder}
                alt="upload a pic"
                className="w-[34px] mx-auto pt-1 z-20"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
