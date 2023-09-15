/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAuthStore, { resendOtp, submitOtp } from '../../App/Stores/authStore';
import { PageTitle } from '../../App/Utility/UtilityFunctions';
import CommonButton from '../../Components/Button/CommonButton';
import CommonInput from '../../Components/Input/CommonInput';
import { scrollToTop, setAppRole } from '../../Utility/UtilityFunctions';
import { k_role, k_submit_otp_type } from '../../App/Utility/const';
import AxiosHeader from '../../App/Utility/AxiosHeader';
import { iMawayLogo2 } from '../../App/Utility/source';

export default function OtpVerification() {
  const { login_form, isLoggedIn, } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      window.location.reload();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    PageTitle(t("Otp Verification"));
    scrollToTop();
    setAppRole(k_role.school);
    AxiosHeader();

  }, []);

  return (
    <div className="relative flex justify-between w-full h-screen font-montserrat">
      <LeftSideLogo />

      <LoginForm
        login_form={login_form}
      />
    </div>
  );
}

function LoginForm(props) {
  const { t } = useTranslation();
  const navigateTo = useNavigate();

  const [otp, setOtp] = useState("");

  useEffect(() => {
    // toggleVerify(false)
    startTimer()
    return () => clearInterval(interval)
  }, [])

  const [timeout, setTimeout] = useState(false)
  const [time, setTime] = useState('02:00')

  let interval = null;

  const startTimer = () => {
    let minutes = 2, seconds = 0
    setTimeout(false)

    interval = setInterval(() => {
      let new_seconds;
      if (seconds === 0) new_seconds = '00';
      else if (seconds < 10) new_seconds = '0' + seconds;
      else new_seconds = seconds;

      const new_time = `0${minutes}:${new_seconds}`
      setTime(new_time)

      if (seconds === 0 && minutes > 0) {
        minutes--
        seconds = 60
      } else if (seconds === 0 && minutes === 0) {
        clearInterval(interval)
        setTimeout(true)
      }
      seconds--
    }, 1000)
  }


  const submit = (e) => {
    e.preventDefault();
    if (k_submit_otp_type === k_submit_otp_type.auth_verify) {
      submitOtp(otp, navigateTo);
    } else {
      const email = sessionStorage.getItem('user_email');
      submitOtp(otp, navigateTo, email);
    }
  }

  return (
    <div className="bg-cBGLiteGrey w-full relative h-screen min-h-[600px]  flex flex-col justify-center items-center">
      <div className="flex justify-center md:hidden">
        <img src={iMawayLogo2} alt="app-logo" className="w-s150 h-s130 pb-s4" />
      </div>


      {/* right side */}
      <div className="flex justify-center w-full py-5">
        <div className="w-full px-5 lg:px-s100 sm:px-s60">
          <div className="w-full pb-5 text-center text-fs32 text-cTextBlack font-fw600 text-cMainBlack">
            {"OTP Verification"}
          </div>
          <form
            onSubmit={submit}
          >
            <div className="mb-5">
              <CommonInput
               unnecessaryCharacters = {true}
                type="number"
                label={"OTP"}
                placeholder={"Enter OTP"}
                name={"otp"}
                required={true}
                value={otp}
                min_input={4}
                max_input={4}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>


            <div className="flex justify-center w-full pt-4">
              <CommonButton colorType="primary" type="submit" width={"w-full"} btnLabel={"Submit"} />
            </div>

            {
              timeout ?
                <div className='flex justify-center'><div onClick={async () => {
                  const email = sessionStorage.getItem('user_email');
                  let success = await resendOtp(email, navigateTo);
                  success && startTimer();
                }} className="cursor-pointer text-fs14 font-fw500 text-cBrand mt-s20">Resend OTP</div></div>
                :
                <div className='flex justify-center'><div className='text-cMainBlack mt-s20'>
                  Resend OTP code in <span id="time" className='text-cBrand'>{time} </span>
                </div></div>
            }



          </form>

          <div onClick={() => navigateTo('/login')} className='flex flex-row justify-center text-fs14 font-fw400 text-cTextGray mt-9 cp'>
            <div>Already an account? <span className='text-fs14 font-fw500 text-cBrandColor'>Login</span> </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function LeftSideLogo() {
  return (
    <div className="bg-cLoginBgLeft w-full h-screen min-h-[650x] items-center justify-center md:flex md:flex-col hidden bg-cBGLiteGrey">
      <div className="py-1">
        <img src={iMawayLogo2} alt="app-logo" className="w-s150 " />
      </div>

      <div className="p-2">
        <span className='flex justify-center text-fs36 font-fw700 text-cMainBlack'>OTP Verification</span>
        <span className='flex justify-center text-cMainBlack'>Please enter your OTP</span>
      </div>
    </div>
  );
}
