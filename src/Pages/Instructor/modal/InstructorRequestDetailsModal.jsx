import React from 'react'
import CommonModal from '../../../Components/Modal/CommonModal'
import useSchoolInstructorStore, { getSchoolInstructorDetails } from '../../../App/Stores/schoolInstructorStore'
import { iUserAvatar } from '../../../App/Utility/source'
import Image from '../../../Components/Image/Image'
import CommonEmptyStatus from '../../../Components/CommonEmptyStatus/CommonEmptyStatus'
import InstructorCard from '../../../Components/Card/InstructorCard'
import Carousel from 'react-grid-carousel'
import { useParams } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'

function InstructorRequestDetailsModal() {

    const { showInstructorRequestDetailsModal, setShowInstructorRequestDetailsModal, schoolInstructorDetails } = useSchoolInstructorStore();

    const { school_instructor_id } = useParams();

    const { t } = useTranslation();

    useLayoutEffect(() => {
        if (school_instructor_id && showInstructorRequestDetailsModal === true) { getSchoolInstructorDetails(school_instructor_id) }
    }, [school_instructor_id,showInstructorRequestDetailsModal])


    return (
        <div>
            <CommonModal
                showModal={showInstructorRequestDetailsModal}
                setShowModal={setShowInstructorRequestDetailsModal}
                modalTitle={t("Instructor details")}
                mainContent={
                    <>
                        <div className="flex flex-col lg:flex-row mt-s20">
                            <div className='max-w-[88px] min-w-[88px] h-s88 mb-s18'>
                                <Image className='rounded-full w-s86 h-s86 '
                                    src={schoolInstructorDetails?.instructor?.profile_photo}
                                    dummyImage={iUserAvatar}
                                />
                            </div>

                            <div className="ml-s15">

                                <div className="break-all section_title text-cBlack mb-s2">
                                    {schoolInstructorDetails?.instructor?.name === "null" || schoolInstructorDetails?.instructor?.name === null ?
                                        <CommonEmptyStatus
                                            size='text-fs24'
                                            fontWeight='font-fw600'
                                            textColor='text-cHighlighted'
                                        /> : schoolInstructorDetails?.instructor?.name}

                                </div>

                                <CommonList title={t("Email")} value={schoolInstructorDetails?.instructor?.email} />
                                <CommonList title={t("Phone")} value={schoolInstructorDetails?.instructor?.phone_number} />
                                <CommonList title={t("Applied")} value={schoolInstructorDetails?.created_at} />
                            </div>
                        </div>


                     <div>
                            <span className='sub_title text-cBlack'>
                                {t("Expertise area")}
                            </span>

                            <div className='grid grid-cols-3 gap-x-12 mt-s16 gap-y-5'>
                                {
                                    schoolInstructorDetails?.instructor?.expertise?.length > 0 ?
                                        schoolInstructorDetails?.instructor?.expertise?.map((item, index) => (
                                            <Carousel.Item>
                                                <InstructorCard
                                                    title={item?.category_name}
                                                    classRoomSelect={item?.classroom === 1 ? true : false}
                                                    drivingSelect={item?.driving === 1 ? true : false}
                                                    externalSelect={item?.external === 1 ? true : false}
                                                    data={item}
                                                    index={index}
                                                    key={index}
                                                />
                                            </Carousel.Item>
                                        )) : ''
                                }
                            </div>
                        </div> 

                        <div className="mt-s20">
                            <span className='sub_title text-cBlack'>
                                {t("Apply for")}
                            </span>

                            <div className='grid grid-cols-3 gap-y-5 gap-x-12 mt-s14'>
                                {
                                    schoolInstructorDetails?.application_categories?.length > 0 ?
                                        schoolInstructorDetails?.application_categories?.map((item, index) => (
                                            <Carousel.Item>
                                                <InstructorCard
                                                    title={item?.category_name}
                                                    classRoomSelect={item?.classroom === 1 ? true : false}
                                                    drivingSelect={item?.driving === 1 ? true : false}
                                                    externalSelect={item?.external === 1 ? true : false}
                                                    data={item}
                                                    index={index}
                                                    key={index}
                                                />
                                            </Carousel.Item>
                                        )) : ''
                                }
                            </div>
                        </div>

                        <div className='my-s20'>
                            <div className='sub_title text-cBlack'>{t("About")}</div>
                            <div className='break-all body_text text-cGray'>
                                {schoolInstructorDetails?.instructor?.about === 'null' ||
                                    schoolInstructorDetails?.instructor?.about === null ? 'NA' :
                                    schoolInstructorDetails?.instructor?.about}
                            </div>
                        </div>

                        <div className=''>
                            <div className='flex items-center justify-between '>
                                <div className='sub_title text-cBlack'>{t("Instructor note")}</div>
                                <div className='small_body_text text-cGray'>{schoolInstructorDetails?.updated_at}</div>
                            </div>
                            <div className='break-all body_text text-cGray'>
                                {schoolInstructorDetails?.apply_note === "null" ||
                                    schoolInstructorDetails?.apply_note === null ? 'NA' :
                                    schoolInstructorDetails?.apply_note}
                            </div>
                        </div>
                    </>
                }
            />
        </div>
    )
}

export default InstructorRequestDetailsModal

export const CommonList = ({ title = "Title", value }) => {
    return (<div className="break-all small_body_text-cGray">
        {title}: {value === "null" || value === null ? 'NA' : value}
    </div>)
}
