/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAuthStore, { handleUserLogin } from '../../App/Stores/authStore';
import { PageTitle } from '../../App/Utility/UtilityFunctions';
import CommonButton from '../../Components/Button/CommonButton';
import CommonInput from '../../Components/Input/CommonInput';
import { scrollToTop, setAppRole } from '../../Utility/UtilityFunctions';
import { k_role } from '../../App/Utility/const';
import AxiosHeader from '../../App/Utility/AxiosHeader';
import { iAPP_LOGO} from '../../App/Utility/source';

export default function Login() {
  const { login_form, isLoggedIn, changeLoginForm, resetLoginForm } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      window.location.reload();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    PageTitle(t("Login"));
    resetLoginForm();
    scrollToTop();
    setAppRole(k_role.school);
    AxiosHeader();
  }, []);

  return (
    <div className="relative flex justify-between w-full h-screen font-montserrat">
      <LeftSideLogo />

      <LoginForm
        login_form={login_form}
        changeLoginFormValue={changeLoginForm}
      />
    </div>
  );
}

function LoginForm(props) {
  const { t } = useTranslation();
  const navigateTo = useNavigate();

  const afterLoginFunc = async (data) =>{
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("is_verified", data?.user?.is_verified);
      localStorage.setItem("maway_token", data.token);
       navigateTo("/");
      // window.location.reload();
  }

  const submitForm = (e) => {
    e.preventDefault();
    handleUserLogin(navigateTo).then(logInRes=>{
      afterLoginFunc(logInRes)
    });
  }

  return (
    <div className="bg-cBGLiteGrey w-full relative h-screen min-h-[600px]  flex flex-col justify-center items-center">
      {/* <div className="flex justify-center md:hidden">
        <img src={iMawayLogo2} alt="app-logo" className="w-s150 h-s130 pb-s4" />
      </div> */}


      {/* right side */}
      <div className="flex justify-center w-full py-5">
        <div className="w-full px-5 lg:px-s100 sm:px-s60">
          <div className="w-full pb-5 text-center text-fs32 text-cTextBlack font-fw600 text-cMainBlack">
            {t("Login")}
          </div>
          <form
            onSubmit={submitForm}
          >
            <div className="mb-5">
              <CommonInput
                type="email"
                label={t("email")}
                placeholder={t("Enter email address")}
                name={"email"}
                required={true}
                value={props.login_form.email}
                onChange={props.changeLoginFormValue}
              />
            </div>

            <div className="mb-5">
              <CommonInput
                type="password"
                togglePasswordBtn={true}
                label={t("password")}
                placeholder={t("Enter password")}
                name="password"
                required={true}
                value={props.login_form.password}
                onChange={props.changeLoginFormValue}
              />
            </div>

            <div onClick={() => navigateTo('/forgot-password')} className='flex flex-row justify-end pt-1 mb-2 text-fs14 font-fw400 text-cTextGray hover:text-cBrandColor cp'>
              <div>Forgot Password?</div>
            </div>

            <div className="flex justify-center w-full pt-4">
              <CommonButton colorType="primary" type="submit" width={"w-full"} btnLabel={t("Login")} />
            </div>

            <div onClick={() => navigateTo('/register')} className='flex flex-row justify-center text-fs14 font-fw400 text-cTextGray mt-9 cp'>
              <div>Don't have an account? <span className='text-fs14 font-fw500 text-cBrandColor'>Register</span> </div>
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
        <img src={iAPP_LOGO} alt="app-logo" className="w-s150" />
      </div>

      <div className="p-2">
        <span className='flex justify-center text-fs36 font-fw700 text-cMainBlack'>Login</span>
        <span className='flex justify-center text-cMainBlack'>Please login to continue</span>
      </div>
    </div>
  );
}
