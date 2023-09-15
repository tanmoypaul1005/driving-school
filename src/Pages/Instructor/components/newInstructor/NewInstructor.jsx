import React from 'react'
import CommonTitle from '../../../../Components/Title/CommonTitle'
import BackLink from '../../../../Components/Pagination/BackLink'
import { useTranslation } from 'react-i18next';
import { iUserAvatar } from '../../../../App/Utility/source';
import Image from '../../../../Components/Image/Image';
import useSchoolInstructorStore, { getSchoolInstructorDetails } from '../../../../App/Stores/schoolInstructorStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import InstructorAdditionalInfo from '../InstructorAdditionalInfo';
import CommonButton from '../../../../Components/Button/CommonButton';

const NewInstructor = () => {

    const { setShowEditInstructorModal, setShowAddInstructorModal, setShowInstructorRequestDetailsModal, setShowInstructorRemoveModal, schoolInstructorDetails, setShowRequestDetailsModal } = useSchoolInstructorStore();

    const { t } = useTranslation();

    const { school_instructor_id } = useParams();

    const instructor_is_updated = localStorage.getItem("instructor_is_updated");

    useEffect(() => {
        if (school_instructor_id && parseInt(instructor_is_updated) !== 0) { getSchoolInstructorDetails(school_instructor_id) }
    }, [school_instructor_id, instructor_is_updated])


    return (
        <div>
            <CommonTitle title={t("Instructor profile")} >
                <BackLink linksArray={[
                    { label: t("Instructor"), linkTo: "/school-instructor" },
                    { label: t("Instructor profile"), linkTo: "" },
                ]} />
            </CommonTitle>

            <div className="relative w-full overflow-hidden bg-cBrandColor2 rounded-br8 px-s20 py-s20">
                <div className='flex justify-between'>
                    <div className="flex flex-col space-x-2 lg:flex-row ">
                        <div className='max-w-[88px] min-w-[88px] h-s88'>
                            <Image className='rounded-full w-s88 h-s88 '
                                src={schoolInstructorDetails?.instructor?.profile_photo}
                                dummyImage={iUserAvatar}
                            />
                        </div>

                        <div className="flex items-center justify-center ">
                            <div>
                                <div
                                    // style={{ width: `calc(100% - 65px)` }}
                                    className="w-full overflow-hidden break-all truncate sub_title mb-s2 text-cBlack">
                                    {schoolInstructorDetails?.instructor?.name === "null" ||
                                        schoolInstructorDetails?.instructor?.name === null ?
                                        "NA" : schoolInstructorDetails?.instructor?.name}
                                </div>
                                {
                                    schoolInstructorDetails?.status === "accepted" && parseInt(instructor_is_updated) !== 0 ?
                                        <div
                                            onClick={() => { setShowInstructorRequestDetailsModal(true) }}
                                            className="cursor-pointer sub_title text-cPrimary">
                                            See Details
                                        </div> : ""
                                }
                            </div>
                        </div>

                    </div>
                    {
                        schoolInstructorDetails?.status === "requested" && <div
                            onClick={() => { setShowRequestDetailsModal(true) }}
                            className='flex items-center justify-center text-center cursor-pointer sub_title text-cPrimary'>
                            See Request
                        </div>
                    }
                </div>
                <div className="absolute right-5 top-5">
                    {
                        parseInt(schoolInstructorDetails?.instructor?.is_own) === 1 &&
                        <CommonButton
                            width='w-[100px]'
                            onClick={() => { setShowEditInstructorModal(true) }}
                            roundedFull={false}
                            btnLabel={t('Update')}
                        />
                    }

                    {
                        parseInt(instructor_is_updated) === 0 ?
                            <CommonButton
                                width='w-[100px]'
                                onClick={() => { setShowAddInstructorModal(true) }}
                                roundedFull={false}
                                btnLabel={t('Create')}
                            /> : ""
                    }

                    <div className='flex justify-between space-x-5 '>
                        {/* {
                            schoolInstructorDetails?.status === "requested" &&
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
                            </div>
                        } */}
                        {
                            schoolInstructorDetails?.status === "accepted" &&
                                parseInt(instructor_is_updated) !== 0 &&
                                schoolInstructorDetails?.instructor?.is_own === 0 ?
                                <div onClick={() => { setShowInstructorRemoveModal(true) }}
                                    className='cursor-pointer rounded-br4 px-s30 py-s8 text-fs16 bg-cWhite hover:bg-cRed hover:text-cWhite ring-2 ring-cRed text-cRed'>
                                    {t("Remove")}
                                </div> : ""
                        }
                    </div>
                </div>
            </div>
            <div className="my-s20">
                <InstructorAdditionalInfo />
            </div>
        </div>
    )
}

export default NewInstructor;