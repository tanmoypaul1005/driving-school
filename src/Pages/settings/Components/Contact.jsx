import React from 'react'
import Settings from '../Settings';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import useSettingsStore, { sendSchoolContactUs } from '../../../App/Stores/SettingsStore';
import { useTranslation } from 'react-i18next';

function Contact() {

    const { schoolContactUsForm, setSchoolContactUsForm } = useSettingsStore();

    const { t } = useTranslation();

    const senMessage = (e) => {
        e.preventDefault();
        const success = sendSchoolContactUs();
        if (success) {
            setSchoolContactUsForm({ subject: "", message: "" })
        }
    }

    return (
        <Settings>
            <div className="flex justify-between">
                <div>
                    <h1 className="section_title text-cBlack mb-s8">{t("Contact us")} </h1>
                </div>
            </div>

            <div className="bg-white p-s20 md:p-5 shadow rounded-br8">
                <form onSubmit={senMessage}>
                    <div className='space-y-4'>
                        <CommonInput
                            max_input={55}
                            withStar={false}
                            label={t("Title")}
                            required={true}
                            type='text'
                            value={schoolContactUsForm.subject}
                            placeholder={t("Title")}
                            onChange={(e) => { setSchoolContactUsForm({ ...schoolContactUsForm, subject: e.target.value }) }}
                        />
                        <CommonInput
                            withStar={false}
                            max_input={255}
                            required={true}
                            label={t("Write message")}
                            type='text'
                            value={schoolContactUsForm.message}
                            placeholder={t("Write message")}
                            textarea="true"
                            onChange={(e) => { setSchoolContactUsForm({ ...schoolContactUsForm, message: e.target.value }) }}
                        />
                        <div className='flex justify-center items-center'>
                            <CommonButton
                                isDisabled={schoolContactUsForm.message === "" && schoolContactUsForm.message === ""}
                                type='submit'
                                btnLabel={t('Send Message')}
                                roundedFull={false}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </Settings>
    )
}

export default Contact
