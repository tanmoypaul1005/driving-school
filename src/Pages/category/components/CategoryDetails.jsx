/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CommonEmptyStatus from '../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import GreenSwitch from '../../../Components/Switch/GreenSwitch';
import useSchoolCategoryStore, { getSchoolCategoryDetails, schoolCategoryToggleIndex } from '../../../App/Stores/schoolCategoryStore';
import Image from '../../../Components/Image/Image';
import { iCategory, iEdiItIcon } from '../../../App/Utility/source';
import CommonTitle from '../../../Components/Title/CommonTitle'
import BackLink from '../../../Components/Pagination/BackLink';
import { useTranslation } from 'react-i18next';
import PackageOverview from './PackageOverview';
import LessonsOverview from './LessonsOverview';
import { PageTitle } from '../../../Utility/UtilityFunctions';
import useLayoutStore from '../../../App/Stores/LayoutStore';

function CategoryDetails() {

    const { setShowEditSchoolCategoryDetailsModal, schoolCategoryDetails, setShowSchoolCategoryListDeactivateModal } = useSchoolCategoryStore();

    const [enabled, setEnabled] = useState(false);

    const { t } = useTranslation();

    const { category_id } = useParams();

    const HandleDeactivate = async () => {
        if (enabled === true) {
            await setShowSchoolCategoryListDeactivateModal(true);
        } else {
            await schoolCategoryToggleIndex(category_id);
        }
    }

    useEffect(() => {
        fetchSchoolCategoryDetails()
    }, [category_id])

    const fetchSchoolCategoryDetails = async () => {
        getSchoolCategoryDetails(category_id)
    }

    const { setBarTitle } = useLayoutStore();

    useEffect(() => {
        setEnabled(schoolCategoryDetails?.is_active)
    }, [schoolCategoryDetails])

    useEffect(() => {
        window.scrollTo(0, 0);
        PageTitle(t("MaWay | Category"));
        setBarTitle(t("MaWay | Category"));
    }, [])


    return (
        <div>
            <CommonTitle title={t("Category details")} >
                <BackLink linksArray={[
                    { label: t("Category"), linkTo: "/school/category-list" },
                    { label: t("Category details"), linkTo: "" },
                ]} />
            </CommonTitle>

            <div className="overflow-hidden bg-cBrandColor2 rounded-br8 py-s20">

                <div className='px-s20'>
                    <div className='flex justify-between'>
                        <div className='flex'>

                            <div className='flex items-center justify-center rounded-full w-s90 h-s90 bg-cBackgroundAndCategory'>
                                <Image className='min-w-[56px] max-w-[56px] min-h-[50px] max-h-[50px]'
                                    src={schoolCategoryDetails?.icon}
                                    dummyImage={iCategory}
                                    isCategoryImage={true} />
                            </div>

                            <div className='flex items-center justify-center ml-s16'>
                                <div className='capitalize section_title text-cBlack'>
                                    {schoolCategoryDetails?.category_name}
                                </div>
                                {/* <div className='body_text text-cGray'>
                                    {t("Lesson")}: {
                                        schoolCategoryDetails?.lessons &&
                                            schoolCategoryDetails?.duration ?
                                            `${schoolCategoryDetails?.lessons},
                                            ${schoolCategoryDetails?.duration}` : 'NA'
                                    }
                                </div>

                                <div className='text-cBrand important_text'>
                                    {schoolCategoryDetails?.price === "null" ||
                                        schoolCategoryDetails?.price === null ?
                                        <CommonEmptyStatus size='text-fs16' textColor='text-cTextGray' fontWeight='font-fw400' leading="leading-5" /> :
                                        schoolCategoryDetails?.price === 0 ?
                                            <span>DKK {schoolCategoryDetails?.total_lesson_price?.toLocaleString("da-DK")}</span> :
                                            <span>DKK {schoolCategoryDetails?.price?.toLocaleString("da-DK")}</span>}
                                </div> */}
                            </div>
                        </div>

                        <div className='flex mt-s40'>
                            <div className={`${enabled ? 'text-cPassed' : 'text-cFailed'} body_text text-center`}>
                                {enabled ? <span>{t("Active")}</span> : <span>{t("Inactive")}</span>}
                            </div>
                            <div className='flex justify-center ml-s10'>
                                <GreenSwitch
                                    enabled={enabled}
                                    setEnabled={() => HandleDeactivate()}
                                />
                            </div>
                            <div
                                onClick={() => { setShowEditSchoolCategoryDetailsModal(true) }}
                                className='cursor-pointer ml-s20'>
                                <img
                                    className='cursor-pointer w-s25 h-s25 mr-s6'
                                    src={iEdiItIcon}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='px-s20'>
                    <div className='pt-s16'>
                        <span className='mr-s5 sub_title text-cBlack'>
                            {t("Description")}
                        </span>
                        <div className='mt-s4 body_text text-cGray'>
                            {schoolCategoryDetails?.description === "null" ||
                                schoolCategoryDetails?.description === null ?
                                "NA" : schoolCategoryDetails?.description}
                        </div>
                    </div>

                    <div className='pt-s16'>
                        <span className='sub_title mr-s5 text-cBlack'>{t("Requirement")}</span>
                        <div className='mt-s4 body_text text-cGray'>
                            {schoolCategoryDetails?.requirement === "null" ||
                                schoolCategoryDetails?.requirement === null ?
                                <CommonEmptyStatus
                                    size='text-fs14'
                                    textColor='text-cBlack'
                                    fontWeight='font-fw400'
                                    leading="leading-5"
                                /> : schoolCategoryDetails?.requirement}
                        </div>
                    </div>
                </div>
            </div>

            <PackageOverview />
            <LessonsOverview />

        </div>
    )
}

export default CategoryDetails;