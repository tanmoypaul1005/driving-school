import React from 'react'
import { useTranslation } from 'react-i18next';

function NoActiveCurriculum() {

    const { t } = useTranslation();

    return (
        <div>
            <div className='section_title text-cBlack mb-s8'>{t("Curriculum")}</div>

            <div className='rounded-br8 h-s200 flex justify-center items-center bg-cBrandColor2 text-[#787878] sub_title'>
                {t("No active curriculum yet!")}
            </div>
        </div>
    )
}

export default NoActiveCurriculum
