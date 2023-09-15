/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useAuthStore, { register } from "../../App/Stores/authStore";
import { PageTitle } from "../../App/Utility/UtilityFunctions";
import CommonButton from "../../Components/Button/CommonButton";
import CommonInput from "../../Components/Input/CommonInput";
import { iMawayLogo2 } from '../../App/Utility/source';
import { Toastr, scrollToTop } from "../../Utility/UtilityFunctions";


export default function Register() {
    const { isLoggedIn, changeLoginFormValue, resetRegisterForm } =
        useAuthStore();

    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
            window.location.reload();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        PageTitle(t("Register"));
        resetRegisterForm();
        scrollToTop();
    }, []);

    return (
        <div className="h-screen w-full flex justify-between relative font-montserrat bg-cBGLiteGrey">
            <LeftSideLogo />

            <LoginForm
                changeLoginFormValue={changeLoginFormValue}
            />
        </div>
    );
}

function LoginForm() {

    const { t } = useTranslation();
    const navigateTo = useNavigate();
    const { register_form, changeRegisterFormValue } = useAuthStore();

    const changeCvrNumber = (e) => {
        if (e.target.value.length > 8) return;
        if (e.target.value === '-' || e.target.value === '--') return;
        const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-';
        if (str.includes(e.target.value[e.target.value.length - 1])) return;
        const regex = /^[0-9]+$/
        const found = e.target.value.match(regex)
        found && changeRegisterFormValue(e)
        register_form.cvr.length === 1 && changeRegisterFormValue(e)
    }

    const submit = (e) => {
        e.preventDefault();
        if (register_form.cvr.length !== 8) {
            Toastr({ message: 'Please enter a valid CVR', type: 'error' });
            return
        }

        register(navigateTo);
    }

    return (
        <div className="bg-white w-full relative h-screen min-h-[800px] flex flex-col justify-center items-center">

            <div className="flex justify-center mt-s80 md:hidden">
                <img src={iMawayLogo2} alt="app-logo" className="w-s150 h-s130 pb-s4" />
            </div>

            <div className="flex w-full justify-center pt-s15">
                <div className="w-full lg:px-s100 sm:px-s60 px-5">
                    <div className="w-full text-center pb-5 text-fs36 text-cTextBlack font-fw600">
                        {"Register"}
                    </div>
                    <form onSubmit={submit}>

                        <div className="mb-5">
                            <CommonInput
                                label={"CVR"}
                                placeholder={"Enter CVR"}
                                name={"cvr"}
                                required={true}
                                value={register_form.cvr}
                                onChange={changeCvrNumber}
                                max_input={8}
                                min_input={8}
                            />
                        </div>

                        <div className="mb-5">
                            <CommonInput
                                label={"name"}
                                placeholder={"Enter  name"}
                                name={"name"}
                                required={true}
                                value={register_form.name}
                                onChange={changeRegisterFormValue}
                            />
                        </div>

                        <div className="mb-5">
                            <CommonInput
                                type="email"
                                label={"email"}
                                placeholder={"Enter email address"}
                                name={"email"}
                                required={true}
                                value={register_form.email}
                                onChange={changeRegisterFormValue}
                            />
                        </div>

                        <div className="mb-5">
                            <CommonInput
                                type="password"
                                togglePasswordBtn={true}
                                label={"password"}
                                placeholder={"Enter password"}
                                name="password"
                                required={true}
                                value={register_form.password}
                                onChange={changeRegisterFormValue}
                            />
                        </div>

                        <div className="mb-5">
                            <CommonInput
                                type="password"
                                togglePasswordBtn={true}
                                label={"confirm password"}
                                placeholder={"Enter the same password again"}
                                name="password_confirmation"
                                required={true}
                                value={register_form.password_confirmation}
                                onChange={changeRegisterFormValue}
                            />
                        </div>

                        <div className="w-full flex justify-center pt-4">
                            <CommonButton colorType="primary" type="submit" width={"w-full"} btnLabel={"Register"} />
                        </div>
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
        <div className="bg-cLoginBgLeft w-full h-screen min-h-[800x] items-center justify-center md:flex md:flex-col hidden bg-cBGLiteGrey">
            <div className="py-0">
                <img src={iMawayLogo2} alt="app-logo" className="w-s150" />
            </div>

            <div className="p-2">
                <span className='flex justify-center text-fs36 font-fw700 text-cMainBlack'>Register</span>
                <span className='flex justify-center text-cMainBlack'>Register your account</span>
            </div>
        </div>
    );
}
