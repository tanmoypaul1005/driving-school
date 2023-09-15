import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MissingCard = ({ link = "" }) => {

    const navigateTo = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="p-s20 ring-2 ring-cBrand rounded-br8 max-w-[360px] min-w-[360px] h-[300px] grid grid-rows-1 relative">
            <div className='place-self-center text-center'>
                <div className='important_text text-cRed place-self-center text-center'>{t("Missing payment")}</div>
                <div className='important_text text-cRed place-self-center text-center'>({t("Please pay again or contact admin")})</div>
            </div>
            <div className='flex justify-center items-center absolute inset-x-0 bottom-5'>
                <div
                    onClick={() => { navigateTo(`${link}`) }}
                    className='cursor-pointer button_text text-cBrand'>
                    {t("Check status")}
                </div>
            </div>
        </div>
    );
};

export default MissingCard;