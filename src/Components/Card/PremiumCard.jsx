import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useLicenseStore, { toggleLicense } from '../../App/Stores/LicenseStore';
import { iTikMark, iVector } from '../../App/Utility/source';
import GreenSwitch from '../Switch/GreenSwitch';
import Clamp from "react-multiline-clamp";
import { htmlToPlainText } from '../../Utility/UtilityFunctions';
import { roughLicenseDurationFormatter } from '../../App/Utility/UtilityFunctions';

const PremiumCard = ({ editOption, data, onClick = () => console.log(data), linked = true, showControls = true, selected = false }) => {
  const { setShowDeactivateLicense, setLicenseDeactivateID, setLicenseUpdateData } = useLicenseStore();

  const [enabled, setEnabled] = useState(false);

  const HandleDeactivate = async () => {
    // console.log("ID:::", data?.id);
    setLicenseDeactivateID(data?.id);
    if (enabled === true) {
      setShowDeactivateLicense(true);
    } else {
      // enable through api

      let activateSuccess = await toggleLicense();
      if (activateSuccess) setEnabled(true);

    }
  }

  useEffect(() => {
    setEnabled(data?.is_active);
  }, [data]);

  return (
    // todo: cursor normal temporarily
    <Link to={linked ? `/license/details/${data?.id}` : window.location.pathname} onClick={onClick} className="min-w-[300px] w-full h-full cursor-pointer relative">
      <div
        className={`
      min-w-[300px] w-full h-full p-s16 rounded-br10
      ${selected ? "bg-white text-cBrandColor ring-2 ring-cBrand" : "bg-cBrandColor text-cBrandColor2"}
      `}>

        {selected ? <div className="absolute top-5 right-5">
          <img src={iTikMark} alt="" className='h-s30' />
        </div> : ""}

        <div className='flex-col md:flex md:flex-row justify-between '>
          <div>
            <Clamp withTooltip lines={1}>
              <div className="pr-s5 capitalize font-fw600  mb-s5 text-fs20 sm:text-fs20 md:text-fs16 lg:text-fs20">{data?.title}</div>
            </Clamp>
            <div className="text-base capitalize  mb-s10">({data?.type})</div>
          </div>

          {editOption ?

            showControls ?
              <div className='flex'>
                <div className='mt-s1'>
                  <GreenSwitch enabled={enabled} setEnabled={() => HandleDeactivate()} />
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setLicenseUpdateData(data);
                    onClick();
                  }}
                  className='z-30 mr-s3 rounded-full cursor-pointer ml-s25  w-s25 h-s25'
                >
                  <img className="m-s7 w-w12 h-s12" src={iVector} alt="edit icon" />
                </div>
              </div> : ""

            : <span className='text-fs14  font-fw400'>Expired</span>
          }
        </div>

        <div className=" text-fs32 font-fw600">DKK {data?.price}</div>

        {/* <span className=" text-fs14 font-fw400">(Including MOMS: DKK -- --)</span>
        <div className="my-s20">
          <div className=" text-fs14 font-fw400">Start Date: -- -- --</div>
          <div className=" text-fs14 font-fw400">End Date: -- -- --</div>
        </div> */}

        <div>
          <div className=" text-fs14 mb-s10 font-fw600">Duration: {roughLicenseDurationFormatter(data?.duration)}</div>
          <Clamp withTooltip lines={2}>
            <div
              className={`
                text-fs14 font-fw400 max-h-[100px] overflow-y-auto
                ${selected ? "text-cBrand" : "text-white force-white-text"}
            `}>
              {htmlToPlainText(data?.details)}
            </div>
            {/* <div dangerouslySetInnerHTML={{ __html: data?.details }} className="text-white force-white-text text-fs14 font-fw400 max-h-[100px] overflow-y-auto" /> */}
          </Clamp>
        </div>
      </div>
    </Link>
  );
};

export default PremiumCard;