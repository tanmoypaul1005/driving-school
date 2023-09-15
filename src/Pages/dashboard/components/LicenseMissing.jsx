import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const LicenseMissing = ({ link = "" }) => {

    const navigateTo = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="flex justify-between w-full p-s20 ring-2 ring-cBrand rounded-br8">
            <div className=''>
                <div className='important_text text-cRed'>{t("Missing payment")}</div>
                <div className=' important_text text-cRed'>({t("Please pay again or contact admin")})</div>
            </div>


                <div
                    onClick={() => { navigateTo(`${link}`) }}
                    className='flex items-center justify-center cursor-pointer button_text text-cBrand'>
                    {t("Check status")}
                </div>
        </div>
    );
};

export default LicenseMissing;