import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { changePassword } from "../../../App/Stores/SettingsStore";
import { Toastr } from "../../../Utility/UtilityFunctions";
import Settings from "../Settings";
import CommonInput from "../../../Components/Input/CommonInput";
import CommonButton from "../../../Components/Button/CommonButton";


const SchoolChangePassword = () => {

    const { t } = useTranslation();

    const [cpForm, setCpForm] = useState({
        old_password: "",
        password: "",
        password_confirmation: ""
    });

    const handleCpChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCpForm({ ...cpForm, [name]: value });
    };


    const formSubmit = async (e) => {
        e.preventDefault();

        if (cpForm?.old_password && cpForm?.password && cpForm?.password_confirmation) {
            if (cpForm?.password === cpForm?.password_confirmation) {
                let addSuccess = await changePassword(cpForm)
                if (addSuccess) {
                    await setCpForm({ old_password: "", password: "", password_confirmation: "" });
                }
            }
        } else {
            return Toastr({ message: t("Your Password don't match"), type: "warning" });
        }
    };

    return (
        <Settings>
            <div>
                <h1 className="section_title text-cBlack mb-s8">{t("Change password")}</h1>
            </div>
            <div className="bg-white shadow p-s20 md:p-5 rounded-br8">
                <form onSubmit={formSubmit}>
                    <div className="space-y-4">
                        <CommonInput
                            withStar={false}
                            label={t("Current password")}
                            name="old_password"
                            placeholder={t("Type current password")}
                            value={cpForm?.old_password}
                            onChange={handleCpChange}
                            type="password"
                            togglePasswordBtn={true}
                            required={true}
                        />

                        <CommonInput
                            withStar={false}
                            label={t("New password")}
                            name="password"
                            placeholder={t("Type new password")}
                            value={cpForm?.password}
                            onChange={handleCpChange}
                            type="password"
                            togglePasswordBtn={true}
                            required={true}
                        />

                        <CommonInput
                            withStar={false}
                            label={t("Confirm new password")}
                            name="password_confirmation"
                            placeholder={t("ReType new password")}
                            value={cpForm?.password_confirmation}
                            onChange={handleCpChange}
                            type="password"
                            togglePasswordBtn={true}
                            required={true}
                        />

                        <div className="flex flex-row justify-center pt-s20">
                            <CommonButton
                                roundedFull={false}
                                type="submit"
                                btnLabel={t("Change password")}
                                isDisabled={
                                    cpForm?.old_password &&
                                        cpForm?.password &&
                                        cpForm?.password_confirmation &&
                                        cpForm?.password === cpForm?.password_confirmation
                                        ? false
                                        : true
                                }
                                width="w-40"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </Settings>
    );
};

export default SchoolChangePassword;
