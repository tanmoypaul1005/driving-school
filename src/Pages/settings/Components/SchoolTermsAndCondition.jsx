import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useSettingsStore, { editSchoolPolicy, getSchoolPolicy } from "../../../App/Stores/SettingsStore";
import Settings from "../Settings";
import { ISaveIcon, iSettingsEditIcon } from "../../../App/Utility/source";
import RichTextEditor from "../../../Components/TextEditor/RichTextEditor";

const SchoolTermsAndCondition = () => {

    const { schoolTermsAndConditionData } = useSettingsStore()

    const { t } = useTranslation();

    const [richText, setRichText] = useState();
    const [editRichText, setEditRichText] = useState();
    const [editNow, setEditNow] = useState("");

    useEffect(() => {
        fetchGeneralSettings();
    }, [])

    useEffect(() => {
        setRichText(schoolTermsAndConditionData?.policy)
        setEditRichText(schoolTermsAndConditionData?.policy)
    }, [schoolTermsAndConditionData])

    const fetchGeneralSettings = async () => {
        await getSchoolPolicy()
    }

    return (
        <div>
            <Settings>
                <div className="bg-white shadow p-s20 md:p-5 rounded-br4">
                    {editNow === "howto" ? (
                        <div>
                            <div className="flex items-center justify-between mb-s8">
                                <div>
                                    <h1 className="section_title text-cBlack">{t("School Terms And Condition")}</h1>
                                </div>
                                <div className="flex gap-3">
                                    <div>
                                        <img
                                            src={ISaveIcon}
                                            alt=""
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                const success = editSchoolPolicy({ "policy": editRichText })
                                                if (success) {
                                                    setEditNow("");
                                                }
                                            }}
                                            className="object-cover cursor-pointer w-s20 h-s20 ml-s5 mr-s10"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <RichTextEditor
                                    placeholder={t("School Terms and condition")}
                                    value={editRichText}
                                    height="500px"
                                    onChange={(e) => setEditRichText(e)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center justify-between mb-s8">
                                <div>
                                    <h1 className="section_title text-cBlack">{t("School Terms And Condition")}</h1>
                                </div>
                                <div className="flex gap-3">
                                        <img
                                            src={iSettingsEditIcon}
                                            alt=""
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setEditNow("howto");
                                            }}
                                            className="object-cover cursor-pointer w-s20 h-s20 ml-s5 mr-s10"
                                        />
                                </div>
                            </div>

                            <div onKeyDown={(e) => { e.preventDefault() }}
                                onMouseDown={(e) => { e.preventDefault() }}
                                className="h-[500px] relative overflow-hidden rounded-br4 border-2 border-cBgColor">
                                <div className="absolute -top-[62px] h-full -left-[3px] -right-[3px]">
                                    <RichTextEditor
                                        placeholder={t("School Terms and condition")}
                                        textarea="true"
                                        value={richText}
                                        onChange={() => { }}
                                        height="500px"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Settings>
        </div>
    );
};
export default SchoolTermsAndCondition;
