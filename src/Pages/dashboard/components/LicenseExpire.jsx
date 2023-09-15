import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CommonButtonOutlined from '../../../Components/Button/CommonButtonOutlined';
import CommonButton from '../../../Components/Button/CommonButton';

const LicenseExpire = ({ message = "", linkTo = "", title = "NA", duration = "NA", start_date = "NA", end_date = "NA", onClick }) => {

    const navigateTo = useNavigate();
    const { t } = useTranslation();

    return (
        <div className='relative flex items-center justify-between w-full p-s20 ring-2 ring-cBrand rounded-br8'>
            <div>
                <div className='text-fs16 font-fw600 text-cFailed mb-s12'>{message}</div>
                <div className='relative flex p-0'>
                    <div className=''>
                        <div className='text-cBlack section_title font-fw600'>
                            {title}
                        </div>
                        <div className='text-cBlack sub_title'>{t("Package duration")}: {duration}</div>
                        <div className='text-cGray body_text'>{t("Start date")}: {start_date}</div>
                        <div className='text-cGray body_text'>{t("End date")}: {end_date}</div>
                        <div onClick={onClick} className='cursor-pointer text-cBrand text-fs14'>
                            {t("See Details")}
                        </div>
                    </div>
                </div>
            </div>


            <div className='absolute flex space-x-5 top-5 right-5'>
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
    );
};

export default LicenseExpire;