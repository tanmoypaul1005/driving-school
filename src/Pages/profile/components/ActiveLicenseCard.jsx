import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ActiveLicenseCard = ({ title, duration, start_date, end_date, linkTo, onClick, status = "" }) => {

    const { t } = useTranslation();
    // let today = new Date();
    // let end_dateFormatted = new Date(end_date);
    // let startDateFormatted = new Date(start_date);

    const navigateTo = useNavigate();
    return (
        <div className='p-s20 ring-2 ring-cBrand rounded-br8 max-w-[350px] min-w-[350px] relative'>
            <div className='flex p-0 relative'>
                <div className=''>
                    <div className='text-cHighlightedTexts text-fs20 font-fw600 break-all pr-s55'>
                        {title}
                    </div>
                    <div className='text-cHighlightedTexts text-fs14 font-fw600'>{t("License duration")}: {duration}</div>
                    <div className='text-cBlack text-fs14 font-fw400'>{t("Start date")}: {start_date}</div>
                    <div className='text-cBlack text-fs14 font-fw400'>{t("End date")}: {end_date}</div>

                    {/* {status === "accepted" ? <div className='text-cBlack text-fs14 font-fw600'>
                        Remaining: {(end_date === "null" || end_date === null || today > end_dateFormatted) ? "0 Days Remaining" : dateDiffCalendar(startDateFormatted > today ? start_date : new Date(), end_date) + ""} 
                    </div> : <div className='text-cBlack text-fs14 font-fw600'>0 Days Remaining</div>} */}
                </div>

                <div
                    onClick={onClick}
                    className='cursor-pointer text-cBrand text-fs14 font-fw400 absolute top-1 right-0'>
                    {t("Details")}
                </div>
            </div>
            <div className='flex justify-center items-center absolute inset-x-0 bottom-5'>
                <div
                    onClick={() => { navigateTo(`${linkTo}`) }}
                    className='cursor-pointer button_text text-cBrand'>
                    {t("License overview")}
                </div>
            </div>
        </div>
    );
};

export default ActiveLicenseCard;