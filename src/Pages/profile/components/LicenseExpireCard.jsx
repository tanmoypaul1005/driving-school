import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CommonButtonOutlined from '../../../Components/Button/CommonButtonOutlined';
import CommonButton from '../../../Components/Button/CommonButton';

const LicenseExpireCard = ({ message = "", linkTo = "", title = "NA", duration = "NA", start_date = "NA", end_date = "NA", onClick }) => {

    const navigateTo = useNavigate();
    const { t } = useTranslation();

    let today = new Date();
    let end_dateFormatted = new Date(end_date);
    let startDateFormatted = new Date(start_date);

    return (
        <div className='p-s20 ring-2 ring-cBrand rounded-br8 max-w-[375px] min-w-[375px] relative'>
            <div className='text-fs16 font-fw600 text-[#F64242] mb-s12'>{message}</div>
            <div className='relative flex p-0'>
                <div className=''>
                    <div className='text-cBlack section_title font-fw600'>
                        {title}
                    </div>
                    <div className='text-cBlack sub_title'>{t("Package duration")}: {duration}</div>
                    <div className='text-cGray body_text'>{t("Start date")}: {start_date}</div>
                    <div className='text-cGray body_text'>{t("End date")}: {end_date}</div>
                    {/* <div className='text-cBlack sub_title'>
                        {t("Remaining")}: {(end_date === "null" || end_date === null || today > end_dateFormatted) ? "0 Days Remaining" : dateDiffCalendar(startDateFormatted > today ? start_date : new Date(), end_date) + ""}
                    </div> */}
                </div>

                <div
                    onClick={onClick}
                    className='absolute right-0 cursor-pointer text-cBrand text-fs14 font-fw400 top-1'>
                    {t("Details")}
                </div>
            </div>


            <div className='absolute bottom-5'>
                <div className='grid grid-cols-2 gap-x-40'>
                    <CommonButtonOutlined
                        onClick={() => { navigateTo(`${linkTo}`) }}
                        isFullRounded={false}
                        btnLabel={t('License overview')}
                        colorType='primary'
                    />

                    <CommonButton
                        onClick={() => { navigateTo(`${linkTo}`) }}
                        roundedFull={false}
                        btnLabel={t('Renew')}
                        width='w-[80px]'
                    />
                </div>
            </div>

        </div>
    );
};

export default LicenseExpireCard;