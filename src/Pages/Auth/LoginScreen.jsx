import React from "react";
import useAuthStore, { handleUserLogin } from "../../App/Stores/authStore";
import CommonInput from "../../Components/Input/CommonInput";

export default function LoginScreen() {
  const { login_form, changeLoginFormValue } = useAuthStore();
  return (
    <div className="h-screen w-full flex justify-between relative">
      <LeftSideLogo></LeftSideLogo>

      <LoginForm
        login_form={login_form}
        changeLoginFormValue={changeLoginFormValue}
      ></LoginForm>
    </div>
  );
}

function LoginForm(props) {
  return (
    <div className="bg-white w-full">
      <div className="pl-[50%] pt-[10%]">
        {/* <img src={LoginLogoTexture} alt="texture" /> */}
      </div>
      <div className="flex justify-center pt-[10%]">
        <div className="w-[65%]">
          <div className="w-full text-center pb-[8%] text-fs36 text-cTextBlack font-fw600">
            Login
          </div>
          <form
            onSubmit={(e) => {
              handleUserLogin(e);
            }}
          >
            <div className="mb-5">
              <CommonInput
                type="email"
                label={"email"}
                placeholder="Enter email address"
                name={"email"}
                value={props.login_form.email}
                onChange={props.changeLoginFormValue}
              />
            </div>

            <div className="mb-5">
              <CommonInput
                type="password"
                togglePasswordBtn={true}
                label="password"
                placeholder={"Enter password"}
                name="password"
                value={props.login_form.password}
                onChange={props.changeLoginFormValue}
              />
            </div>

            <button className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function LeftSideLogo() {
  return (
    <div className="bg-cLoginBgLeft w-full flex flex-col items-center justify-center">
      <div>
        {/* <img src={BrandLogoColored} alt="brand-logo" /> */}
      </div>
      <div className="pt-s60">
        {/* <img src={LoginLogoImage} alt="login-logo" /> */}
      </div>
    </div>
  );
}
