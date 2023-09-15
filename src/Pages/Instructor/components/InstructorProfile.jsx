import React from 'react'
import CommonTitle from '../../../Components/Title/CommonTitle'
import Image from '../../../Components/Image/Image'
import { htmlToPlainText } from '../../../Utility/UtilityFunctions'
import CommonEmptyStatus from '../../../Components/CommonEmptyStatus/CommonEmptyStatus'
import { iUserAvatar } from '../../../App/Utility/source'
import CommonButton from '../../../Components/Button/CommonButton'
import CommonButtonOutlined from '../../../Components/Button/CommonButtonOutlined'
import InstructorAdditionalInfo from './InstructorAdditionalInfo'
import useSchoolInstructorStore, { getSchoolInstructorDetails } from '../../../App/Stores/schoolInstructorStore'
import Carousel from 'react-grid-carousel'
import InstructorCard from '../../../Components/Card/InstructorCard'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Clamp from 'react-multiline-clamp';
import BackLink from '../../../Components/Pagination/BackLink'
import { useTranslation } from 'react-i18next'

function InstructorProfile() {

    const {
        setShowInstructorRequestDetailsModal,
        setShowInstructorRemoveModal,
        setShowAcceptNoteModal,
        setShowRejectionReasonModal,
        schoolInstructorDetails
    } = useSchoolInstructorStore();

    const { school_instructor_id } = useParams();

    const { t } = useTranslation();

    useEffect(() => {
        // if (school_instructor_id) { getSchoolInstructorDetails(school_instructor_id) }
    }, [school_instructor_id])

    return (
        <div className=''>
            <CommonTitle title={t("Instructor profile")} >
                <BackLink linksArray={[
                    { label: t("Instructor"), linkTo: "/school-instructor" },
                    { label: t("Instructor profile"), linkTo: "" },
                ]} />
            </CommonTitle>

            <div className="w-full overflow-hidden bg-cBrandColor2 rounded-br8 px-s20 py-s20">
                {window.location.search}
                <div className='flex flex-col md:flex-row'>
                    <div className="relative w-full bg-cBackgroundAndCategory rounded-br8 p-s20">
                        <div className="flex flex-col lg:flex-row">

                            <div className='max-w-[88px] min-w-[88px] h-s88 mb-s18'>
                                <Image className='rounded-full w-s88 h-s88 '
                                    src={schoolInstructorDetails?.instructor?.profile_photo}
                                    dummyImage={iUserAvatar}
                                />
                            </div>

                            <div className="w-full ml-s16">
                                <div style={{ width: `calc(100% - 65px)` }}
                                    className="w-full overflow-hidden break-all truncate section_title mb-s2 text-cBlack">
                                    {schoolInstructorDetails?.instructor?.name === "null" ||
                                        schoolInstructorDetails?.instructor?.name === null ?
                                        "NA" : schoolInstructorDetails?.instructor?.name}
                                </div>

                                <CommonList title={t('Email')} value={schoolInstructorDetails?.instructor?.email ?? 'NA'} />
                                <CommonList title={t('Phone')} value={schoolInstructorDetails?.instructor?.phone_number ?? 'NA'} />
                                <CommonList title={t('Address')} value={schoolInstructorDetails?.instructor?.address ?? 'NA'} />

                                <div className='mt-s20 mb-s60'>
                                    <div className="sub_title text-cBlack mb-s4">{t("About")}</div>

                                    <Clamp withTooltip lines={2}>
                                        <div className="break-all body_text text-cGray">
                                            {schoolInstructorDetails?.instructor?.about
                                                === "null" || schoolInstructorDetails?.instructor?.about
                                                === null ?
                                                <CommonEmptyStatus size='text-fs14' fontWeight='font-fw400' textColor='text-cTextGray' /> :
                                                htmlToPlainText(schoolInstructorDetails?.instructor?.about)}
                                        </div>
                                    </Clamp>
                                </div>
                            </div>
                        </div>

                        <div className='absolute flex justify-between space-x-5 bottom-5 right-5'>
                            {schoolInstructorDetails?.status === "requested" &&
                                <div className='flex space-x-5'>
                                    <CommonButtonOutlined
                                        isFullRounded={false}
                                        btnLabel={t('Reject')}
                                        colorType='danger'
                                        onClick={() => { setShowRejectionReasonModal(true) }}
                                    />
                                    <CommonButton
                                        onClick={() => { setShowAcceptNoteModal(true) }}
                                        roundedFull={false}
                                        btnLabel={t('Accepted')}
                                    />
                                </div>}
                            {schoolInstructorDetails?.status === "accepted" &&
                                <div className=''>
                                    <div
                                        onClick={() => { setShowInstructorRemoveModal(true) }}
                                        className='cursor-pointer rounded-br4 px-s30 py-s8 text-fs16 bg-cWhite hover:bg-cRed hover:text-cWhite ring-2 ring-cRed text-cRed'>
                                        {t("Remove")}
                                    </div>
                                </div>
                            }
                        </div>

                        <div className='absolute flex items-center justify-center top-6 right-5'>
                            <span
                                onClick={() => { setShowInstructorRequestDetailsModal(true) }}
                                className='cursor-pointer text-cBrand important_text'>{t("Details")}
                            </span>
                        </div>
                    </div>

                    {schoolInstructorDetails?.application_categories?.length > 0 ?
                        <div className='w-[400px]'>
                            <div className='section_title mb-s12 pl-s20 text-cBlack'>{t("Applied for")}</div>
                            <Carousel dotColorActive="#2257AA" cols={2}
                                rows={schoolInstructorDetails?.application_categories?.length > 2 ? 2 : 1} gap={20}
                                loop
                                hideArrow={schoolInstructorDetails?.application_categories?.length > 4 ? false : true}
                                mobileBreakpoint={670}
                            >
                                {
                                    schoolInstructorDetails?.application_categories?.length > 0 ?
                                        schoolInstructorDetails?.application_categories?.map((item, index) => (
                                            <Carousel.Item>
                                                <InstructorCard data={item} index={index} key={index} />
                                            </Carousel.Item>
                                        )) : ''
                                }
                            </Carousel>
                        </div> : ''}
                </div>

                <div className='mt-s21 rounded-br8'><InstructorAdditionalInfo /></div>
            </div>
        </div>
    )
}

export default InstructorProfile;

export const CommonList = ({ title = "Title", value }) => {
    return (<div className="break-all small_body_text-cGray">
        {title}: {value === "null" || value === null ? 'NA' : value}
    </div>)


}