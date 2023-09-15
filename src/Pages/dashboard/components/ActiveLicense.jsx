import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ActiveLicense = ({ title, duration, start_date, end_date, linkTo, onClick, status = "" }) => {

    const { t } = useTranslation();

    const navigateTo = useNavigate();
    return (
        <div className='relative flex items-center justify-between p-s20 ring-2 ring-cBrand rounded-br8'>

            <div>
                <div className='break-all text-cHighlightedTexts text-fs20 font-fw600 pr-s55'>
                    {title}
                </div>
                <div className='text-cHighlightedTexts text-fs14 font-fw600'>{t("License duration")}: {duration}</div>
                <div className='text-cBlack text-fs14 font-fw400'>{t("Start date")}: {start_date}</div>
                <div className='text-cBlack text-fs14 font-fw400'>{t("End date")}: {end_date}</div>
                <div
                    onClick={onClick}
                    className='cursor-pointer text-cBrand text-fs14 font-fw400'>
                    {t("See Details")}
                </div>
            </div>

            <div
                onClick={async () => { navigateTo(`${linkTo}`); }}
                className='absolute cursor-pointer top-5 right-5 button_text text-cBrand'>
                {t("License overview")}
            </div>
        </div>
    );
};

export default ActiveLicense;