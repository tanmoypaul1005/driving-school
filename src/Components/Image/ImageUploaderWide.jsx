import React, { useRef, useState } from "react";
import { iImageUpload, iProfile } from "../../App/Utility/source";
import { iImageUploder, iImageIogo } from "../../App/Utility/source";
import { Toastr } from "../../App/Utility/UtilityFunctions";
import { render } from "@testing-library/react";

export default function ProfileImageUploader({
  setImage,
  FileData,
  imageUploader,
  imageName = "",
  iImage = iImageIogo,

  valueBase64 = "",
  finalBase64 = () => { },

  onChange = () => { },
  rounded = false,
  bannerImage = false,
  categoryImg = false
}) {
  const [previewHoverState, setPreviewHoverState] = useState(false);

  const [tempImage, setTempImage] = useState(valueBase64);

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
    <div className="relative">
      <input
        onChange={onChangeFile.bind(this)}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
      />
      {tempImage ? (
        <div className="relative">
          <div
            className={`h-[300px] w-full"}
            ${rounded ? "rounded-full" : "rounded-br10"}  bg-cBackgroundAndCategory overflow-hidden select-none relative`}
          >
            <div className="rounded-br10">
              {categoryImg &&
                <img
                  className={`h-[300px] w-full cursor-pointer
                bg-cBackgroundAndCategory overflow-hidden select-none relative`}
                  src={tempImage ? tempImage : iProfile}
                  alt="profile-pic"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = iImageIogo;
                  }}
                />}

              {/*b      show after selected an image */}
              {!categoryImg &&
                <div className="relative">
                  <div className="w-full h-full relative  brightness-75">
                    <div className="h-full w-full backdrop-blur-lg absolute top-0 left-0"></div>
                    <img
                      onMouseEnter={() => setPreviewHoverState(true)}
                      onMouseLeave={() => setPreviewHoverState(false)}
                      onClick={onButtonClick}
                      className={`h-[600px] w-[100%] rounded-br10 cursor-pointer bg-cBackgroundAndCategory overflow-hidden select-none object-cover`}
                      src={tempImage ? tempImage : iProfile}
                      alt="profile-pic=!categoryImg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = iImageIogo;
                      }}
                    />
                  </div>
                  <img
                    onMouseEnter={() => setPreviewHoverState(true)}
                    onMouseLeave={() => setPreviewHoverState(false)}
                    onClick={onButtonClick}
                    className={`absolute left-1/2 -translate-x-1/2 top-0
                    cursor-pointer h-[300px] w-auto
                    bg-cBackgroundAndCategory overflow-hidden select-none object-contain
                  `}
                    src={tempImage ? tempImage : iProfile}
                    alt="profile-pic=TOP"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = iImageIogo;
                    }}
                  />
                  {previewHoverState ? <div
                    onClick={onButtonClick}
                    onMouseEnter={() => setPreviewHoverState(true)}
                    onMouseLeave={() => setPreviewHoverState(false)}
                    className="
                    flex flex-col items-center justify-center
                      bg-gray-500 opacity-80 w-full h-[300px]
                      absolute z-50 top-0 left-1/2 -translate-x-1/2  cursor-pointer 
                    ">
                    <div className="text-cTintBlue text-base">Click to select a different image</div>
                  </div> : ""}
                </div>

              }
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={onButtonClick}
          className="
                    flex flex-col items-center justify-center cursor-pointer
                    w-full h-[300px] border-2 rounded-br10 bg-cTintBlue border-dashed border-cBrandColor
                  "
        >
          <img src={iImageUpload} alt="" />
          <div className="pt-2 font-semibold">Upload Screenshot*</div>
          <div className="pt-1 text-xs text-cLesson">Click to upload. One image at a time</div>
        </div>
      )}
    </div>
  );
}
