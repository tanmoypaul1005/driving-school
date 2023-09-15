/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAuthStore, { forgetPassword } from '../../App/Stores/authStore';
import { PageTitle } from '../../App/Utility/UtilityFunctions';
import CommonButton from '../../Components/Button/CommonButton';
import CommonInput from '../../Components/Input/CommonInput';
import { scrollToTop, setAppRole } from '../../Utility/UtilityFunctions';
import { k_role } from '../../App/Utility/const';
import AxiosHeader from '../../App/Utility/AxiosHeader';
import { iMawayLogo2 } from '../../App/Utility/source';

export default function ForgotPassword() {
  const { login_form, isLoggedIn } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      window.location.reload();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    PageTitle(t("Forgot Password"));
    scrollToTop();
    setAppRole(k_role.school);
    AxiosHeader();

  }, []);

  return (
    <div className="h-screen w-full flex justify-between relative font-montserrat">
      <LeftSideLogo />

      <LoginForm
        login_form={login_form}
      />
    </div>
  );
}

function LoginForm(props) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");


  const navigateTo = useNavigate()

  const submit = (e) => {
    e.preventDefault();
    forgetPassword(email, navigateTo);
  }


  return (
    <div className="bg-cBGLiteGrey w-full relative h-screen min-h-[600px]  flex flex-col justify-center items-center">
      <div className="flex justify-center md:hidden">
        <img src={iMawayLogo2} alt="app-logo" className="w-s150 h-s130 pb-s4" />
      </div>


      {/* right side */}
      <div className="flex w-full justify-center py-5">
        <div className="w-full lg:px-s100 sm:px-s60 px-5">
          <div className="w-full text-center pb-5 text-fs32 text-cTextBlack font-fw600 text-cMainBlack">
            {"Forgot Password"}
          </div>
          <form
            onSubmit={submit}
          >
            <div className="mb-5">
              <CommonInput
                type="email"
                label={"Email"}
                placeholder={"Enter email"}
                name={"email"}
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>


            <div className="w-full flex justify-center pt-4">
              <CommonButton colorType="primary" type="submit" width={"w-full"} btnLabel={"Submit"} />
            </div>



          </form>

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
        <span className='flex justify-center text-fs36 font-fw700 text-cMainBlack'>Forget Password</span>
        <span className='flex justify-center text-cMainBlack'>Please enter your email</span>
      </div>
    </div>
  );
}
