/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAuthStore, { changePassword } from '../../App/Stores/authStore';
import { PageTitle } from '../../App/Utility/UtilityFunctions';
import CommonButton from '../../Components/Button/CommonButton';
import CommonInput from '../../Components/Input/CommonInput';
import { Toastr, scrollToTop, setAppRole } from '../../Utility/UtilityFunctions';
import { k_role } from '../../App/Utility/const';
import AxiosHeader from '../../App/Utility/AxiosHeader';
import { iMawayLogo2 } from '../../App/Utility/source';

export default function CreateNewPassword() {
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
    PageTitle(t("Set New Password"));
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
  const { forget_password_form, setForgetPasswordForm } = useAuthStore();
  const navigateTo = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    if (forget_password_form.new_password !== forget_password_form.confirm_password) {
      Toastr({ message: 'Passwords do not match!' });
      return;
    }
    const token = sessionStorage.getItem('forget_password_token');
    const email = sessionStorage.getItem('user_email');
    console.log('token', token, 'email', email);
    if (!token || !email) {
      Toastr({ message: 'Session Expired!' });
      navigateTo('/login');
      return;
    }
    changePassword(navigateTo, token, email, forget_password_form.new_password, forget_password_form.confirm_password);
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
            {t("Set New Password")}
          </div>
          <form
            onSubmit={submitForm}
          >


            <div className="mb-5">
              <CommonInput
                type="password"
                togglePasswordBtn={true}
                label={"password"}
                placeholder={"Enter password"}
                name="new_password"
                required={true}
                value={forget_password_form.new_password}
                onChange={setForgetPasswordForm}
              />
            </div>

            <div className="mb-5">
              <CommonInput
                type="password"
                togglePasswordBtn={true}
                label={"Confirm Password"}
                placeholder={"Enter confirm password"}
                name="confirm_password"
                required={true}
                value={forget_password_form.confirm_password}
                onChange={setForgetPasswordForm}
              />
            </div>



            <div className="w-full flex justify-center pt-4">
              <CommonButton isDisabled={(forget_password_form.new_password !== forget_password_form.confirm_password)} colorType="primary" type="submit" width={"w-full"} btnLabel={"Submit"} />
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
        <span className='flex justify-center text-fs36 font-fw700 text-cMainBlack'>Set New Password</span>
        <span className='flex justify-center text-cMainBlack'>Create a new password</span>
      </div>
    </div>
  );
}
