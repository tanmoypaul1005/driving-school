import React from 'react'
import CommonModal from '../../../Components/Modal/CommonModal'
import CommonButtonOutlined from '../../../Components/Button/CommonButtonOutlined';
import useSchoolInstructorStore, { instructorPendingAction } from '../../../App/Stores/schoolInstructorStore';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../App/Utility/UtilityFunctions';
import CommonButton from '../../../Components/Button/CommonButton';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonTimePicker from '../../../Components/CommonTimePicker';

function LessonDetailsModal() {

    const {
        schoolInstructorsLessonDetails,
        showLessonDetailsModal,
        setShowLessonDetailsModal,
        schoolInstructorDetails,
        setPendingExternalAction,
        pendingExternalAction,
        resetPendingExternalAction
    } = useSchoolInstructorStore();

    const { t } = useTranslation();


    return (
        <div>
            <CommonModal
                showModal={showLessonDetailsModal}
                setShowModal={setShowLessonDetailsModal}
                modalTitle={t("Lesson details")}
                mainContent={
                    <>
                        {
                            schoolInstructorsLessonDetails?.lesson_type === 'classroom' && <Classroom />
                        }

                        {
                            schoolInstructorsLessonDetails?.lesson_type === 'driving' && <Driving />
                        }

                        {
                            schoolInstructorsLessonDetails?.lesson_type === 'external' && 
                            <External />
                        }

                        {
                        schoolInstructorsLessonDetails?.status !== 'upcoming' &&
                        schoolInstructorsLessonDetails?.status !== 'accepted' &&
                        // schoolInstructorsLessonDetails?.status !== 'requested' &&
                        parseInt(schoolInstructorDetails?.instructor?.is_own) === 1 ?
                            <div className='mt-s20'>
                                <form onSubmit={async (e) => {e.preventDefault();}}>
                                    <div className="space-y-5">
                                        {schoolInstructorsLessonDetails?.lesson_type === "external" && <CommonInput
                                            withStar={false}
                                            required={true}
                                            value={pendingExternalAction?.date}
                                            onChange={(e) => {
                                                setPendingExternalAction({ ...pendingExternalAction, date: e.target.value })
                                            }}
                                            type='date'
                                            label={t("Start date")}
                                            placeholder={t("Select date")}
                                        />}

                                        {schoolInstructorsLessonDetails?.lesson_type === "external" &&
                                            <div className="grid grid-cols-2 gap-x-5 ">
                                                <div>
                                                    <div className={`text-start text-cHighlighted important_text mb-s8 w-full `}>{t("Start time")}</div>
                                                    <CommonTimePicker
                                                        required={true}
                                                        showExtendedTimeUi={false}
                                                        show_asterisk={false}
                                                        label={t("Start time")}
                                                        init_time={pendingExternalAction?.start_time}
                                                        onChange={(value) => {
                                                            setPendingExternalAction({ ...pendingExternalAction, start_time: value })
                                                        }}
                                                    />
                                                </div>

                                                <div>
                                                    <div className={`text-start text-cHighlighted important_text mb-s8 w-full `}>{t("End time")}</div>
                                                    <CommonTimePicker
                                                        required={true}
                                                        showExtendedTimeUi={false}
                                                        show_asterisk={false}
                                                        label={t("End time")}
                                                        init_time={pendingExternalAction?.end_time}
                                                        onChange={(value) => {
                                                            setPendingExternalAction({
                                                                ...pendingExternalAction,
                                                                end_time: value
                                                            })
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        }
                                        <CommonInput
                                            type="text"
                                            max_input={'255'}
                                            label={t("Note")}
                                            placeholder={t("Note")}
                                            textarea={true}
                                            value={pendingExternalAction?.accept_note}
                                            onChange={(e) => {
                                                setPendingExternalAction({
                                                    ...pendingExternalAction,
                                                    accept_note: e.target.value
                                                })
                                            }}
                                        />

                                    </div>
                                </form>
                                <div className='flex justify-between mt-s20'>
                                    <CommonButtonOutlined
                                        width='w-[100px]'
                                        isFullRounded={false}
                                        onClick={async () => {
                                            await setPendingExternalAction({
                                                ...pendingExternalAction,
                                                id: schoolInstructorsLessonDetails?.id,
                                                instructor_id:schoolInstructorDetails?.instructor_id,
                                                flag:"rejected"
                                            })

                                            const success = await instructorPendingAction(schoolInstructorsLessonDetails?.lesson_type);
                                            if (success) {
                                                resetPendingExternalAction();
                                                setShowLessonDetailsModal(false);
                                            }
                                        }}
                                        colorType='danger'
                                        btnLabel={t('Decline')}
                                    />

                                    <CommonButton
                                        type='submit'
                                        width='w-[100px]'
                                        roundedFull={false}
                                        onClick={async () => {
                                            await setPendingExternalAction({
                                                ...pendingExternalAction,
                                                id: schoolInstructorsLessonDetails?.id,
                                                instructor_id:schoolInstructorDetails?.instructor_id,
                                                flag:"accepted"
                                            })

                                            const success = await instructorPendingAction(schoolInstructorsLessonDetails?.lesson_type);
                                            if (success) {
                                                resetPendingExternalAction();
                                                setShowLessonDetailsModal(false);
                                            }
                                        }}
                                        btnLabel={t('Accept')}
                                    />

                                </div>
                            </div>:""
                        }
                    </>
                }
            />

        </div>
    )
}

export default LessonDetailsModal

const CommonList = ({ value, name }) => {

    return (
        <div className='flex justify-between'>
            <div className='capitalize body_text text-cGray'>{name ? name : 'NA'}</div>
            <div className='capitalize body_text text-cGray'>{value ? value : 'NA'}</div>
        </div>
    )
}

const Classroom = () => {

    const { schoolInstructorsLessonDetails } = useSchoolInstructorStore();

    const { t } = useTranslation();

    return (
        <>
            <div className='space-y-1 bg-cBackgroundAndCategory p-s20 rounded-br8 mt-s20'>
                <CommonList name={t("Status")} value={schoolInstructorsLessonDetails?.status} />
                <CommonList name={t("Category")} value={schoolInstructorsLessonDetails?.category_name} />
                <CommonList name={t("Lesson type")} value={schoolInstructorsLessonDetails?.lesson_type} />
                <CommonList name={t("Lesson name")} value={schoolInstructorsLessonDetails?.lesson_name} />
                <CommonList name={t("Classroom name")} value={schoolInstructorsLessonDetails?.classroom_name} />
                <CommonList name={t("Date & time")} value={`${formatDate(schoolInstructorsLessonDetails?.date_raw)}, 
                            ${schoolInstructorsLessonDetails?.start_time} - ${schoolInstructorsLessonDetails?.end_time}`} />
                {schoolInstructorsLessonDetails?.status !== "cancelled" && <CommonList name={t("Student")} value={schoolInstructorsLessonDetails?.students?.length} />}
            </div>

            <div className='mt-s20'>
                <div className='sub_title text-cBlack'>{t("Description")}</div>
                <div className='font-fw400 text-fs14 text-[#7A7A7A] mt-s4'>
                    {
                        schoolInstructorsLessonDetails?.lesson_description === 'null' ||
                            schoolInstructorsLessonDetails?.lesson_description === null ? 'NA'
                            : schoolInstructorsLessonDetails?.lesson_description}
                </div>
            </div>

            <div className='mt-s16'>
                <div className='sub_title text-cBlack'>{t("Requirement")}</div>
                <div className='font-fw400 text-fs14 text-cLesson mt-s4'>
                    {
                        schoolInstructorsLessonDetails?.lesson_requirements === 'null' ||
                            schoolInstructorsLessonDetails?.lesson_requirements === null ? 'NA'
                            : schoolInstructorsLessonDetails?.lesson_requirements
                    }
                </div>
            </div>

            {
              schoolInstructorsLessonDetails?.status === "completed" ||
                schoolInstructorsLessonDetails?.status === "upcoming" ?
            <div>
                {schoolInstructorsLessonDetails?.students?.length > 0 &&
                <div className='sub_title text-cBlack mb-s8 mt-s16'>
                    {t("Student list")} ({schoolInstructorsLessonDetails?.students?.length})
                </div>}

                <div className='space-y-4'>{schoolInstructorsLessonDetails?.students?.length > 0 ?
                    schoolInstructorsLessonDetails?.students?.map((item, index) => (
                        <div key={index} className='p-s8 ring-1 ring-cChipBorder rounded-br10'>
                            <div className='flex'>
                                <div className='capitalize sub_title text-cBlack'>
                                    {item?.student_name}
                                </div>
                                <div className='capitalize ml-s4 small_body_text text-cGray'>
                                    {item?.status}
                                </div>
                            </div>
                            <div >
                                <span className='text-fs14 font-fw500 text-cBlack'>
                                    {t("Instructor Comment")}:</span>
                                <span className='ml-s4 text-cBodyText'>{
                                    item?.comment === 'null' || item?.comment === null ? 'NA' : item?.comment
                                }</span>
                            </div>
                        </div>
                    ))
                    : <div className='sub_title text-cBlack '>{t("No student available")}</div>
                }</div>
            </div> : ''}

            {/* {schoolInstructorsLessonDetails?.status === "cancelled" &&
                <div className=''>
                    <span className='important_text text-cBlack max-w-[153px] min-w-[153px]'>{t("Cancellation reason")}:</span>
                    <span className='body_text text-cGray pl-s2'>
                        {schoolInstructorsLessonDetails?.cancel_note ?
                            schoolInstructorsLessonDetails?.cancel_note : 'NA'}
                    </span>
                </div>} */}
        </>
    )
}

const Driving = () => {

    const { schoolInstructorsLessonDetails } = useSchoolInstructorStore();
    const { t } = useTranslation();

    return (
        <>
            <div className='space-y-1 bg-cBackgroundAndCategory p-s20 rounded-br8 mt-s20'>
                <CommonList name={t("Status")} value={schoolInstructorsLessonDetails?.status ?
                    schoolInstructorsLessonDetails?.status === 'passed' ? 'Attended' :
                        schoolInstructorsLessonDetails?.status === 'failed' ? 'Absent' : schoolInstructorsLessonDetails?.status : 'NA'} />
                <CommonList name={t("Category")} value={schoolInstructorsLessonDetails?.category_name ?? 'NA'} />
                <CommonList name={t("Lesson type")} value={schoolInstructorsLessonDetails?.lesson_type ?? 'NA'} />
                <CommonList name={t("Lesson name")} value={schoolInstructorsLessonDetails?.lesson_name ?? 'NA'} />
                <CommonList name={t("Date & time")} value={`${formatDate(schoolInstructorsLessonDetails?.date_raw)}, 
                            ${schoolInstructorsLessonDetails?.start_time} - ${schoolInstructorsLessonDetails?.end_time}`} />

            </div>

            <div className='mt-s20'>
                <div className='sub_title text-cBlack'>{t("Description")}</div>
                <div className='font-fw400 text-fs14 text-cLesson mt-s4'>
                    {
                        schoolInstructorsLessonDetails?.lesson_description === 'null' ||
                            schoolInstructorsLessonDetails?.lesson_description === null ? 'NA'
                            : schoolInstructorsLessonDetails?.lesson_description}
                </div>
            </div>

            <div className='my-s16'>
                <div className='sub_title text-cBlack'>{t("Requirement")}</div>
                <div className='font-fw400 text-fs14 text-cLesson mt-s4'>
                    {
                        schoolInstructorsLessonDetails?.lesson_requirements === 'null' ||
                            schoolInstructorsLessonDetails?.lesson_requirements === null ? 'NA'
                            : schoolInstructorsLessonDetails?.lesson_requirements
                    }
                </div>
            </div>

            <div className='mb-s12'>
                <div className='sub_title text-cBlack'>{t("Student profile")}</div>
                <div className='body_text text-cGray'>
                    {
                        schoolInstructorsLessonDetails?.student_name === 'null' ||
                            schoolInstructorsLessonDetails?.student_name === null ? 'NA' :
                            schoolInstructorsLessonDetails?.student_name
                    }
                </div>
            </div>


            {
                schoolInstructorsLessonDetails?.status === "passed" || schoolInstructorsLessonDetails?.status === "failed" ||
                    schoolInstructorsLessonDetails?.status === "upcoming"
                    ?
                    <>
                        {
                            <div className='my-s12'>
                                <span className='important_text text-cBlack'> {t("Instructor comment")}:</span>
                                <span className='body_text text-cGray pl-s2'>
                                    {
                                        schoolInstructorsLessonDetails?.accept_note === 'null' ||
                                            schoolInstructorsLessonDetails?.accept_note === null ? 'NA' :
                                            schoolInstructorsLessonDetails?.accept_note
                                    }
                                </span>
                            </div>
                        }
                    </> : ''

            }

            <div className=' mb-s12'>
                <span className='important_text text-cBlack'>{t("Student comment")}: </span>
                <span className='body_text text-cGray pl-s2'>
                    {
                        schoolInstructorsLessonDetails?.student_note ? schoolInstructorsLessonDetails?.student_note === 'null' ||
                            schoolInstructorsLessonDetails?.student_note === null ? 'NA' :
                            schoolInstructorsLessonDetails?.student_note : 'NA'
                    }
                </span>
            </div>


            {
                schoolInstructorsLessonDetails?.status === "cancelled" &&
                <div className='flex'>
                    <div className='important_text text-cBlack max-w-[153px] min-w-[153px]'>
                        {t("Cancellation reason")}:</div>
                    <div className='body_text text-cGray pl-s2'>
                        {schoolInstructorsLessonDetails?.cancel_note ?
                            schoolInstructorsLessonDetails?.cancel_note : 'NA'}
                    </div>
                </div>
            }


            {
                schoolInstructorsLessonDetails?.status === "rejected" &&
                <div className=''>
                    <span className='important_text text-cBlack'>{t("Rejected reason")}:</span>
                    <span className='body_text text-cGray pl-s2'>
                        {schoolInstructorsLessonDetails?.rejected_note ?
                            schoolInstructorsLessonDetails?.rejected_note : 'NA'}
                    </span>
                </div>
            }
        </>
    )
}

const External = () => {

    const { schoolInstructorsLessonDetails, setShowCancelNoteModal } = useSchoolInstructorStore();
    const { t } = useTranslation();

    return (
        <>
            <div className='space-y-1 bg-cBackgroundAndCategory p-s20 rounded-br8 mt-s20'>
                <CommonList name={t("Status")} value={schoolInstructorsLessonDetails?.status ?
                    schoolInstructorsLessonDetails?.status === 'passed' ? 'Attended' :
                        schoolInstructorsLessonDetails?.status === 'failed' ? 'Absent' : schoolInstructorsLessonDetails?.status : 'NA'} />
                <CommonList name={t("Category")} value={schoolInstructorsLessonDetails?.category_name ?? 'NA'} />
                <CommonList name={t("Lesson type")} value={schoolInstructorsLessonDetails?.lesson_type ?? 'NA'} />
                <CommonList name={t("Lesson name")} value={schoolInstructorsLessonDetails?.lesson_name ?? 'NA'} />
                <CommonList name={t("Date & time")} value={`${formatDate(schoolInstructorsLessonDetails?.date_raw)}, 
                            ${schoolInstructorsLessonDetails?.start_time} - ${schoolInstructorsLessonDetails?.end_time}`} />
            </div>

            <div className='mt-s20'>
                <div className='sub_title text-cBlack'>{t("Description")}</div>
                <div className='font-fw400 text-fs14 text-cLesson mt-s4'>
                    {
                        schoolInstructorsLessonDetails?.lesson_description === 'null' ||
                            schoolInstructorsLessonDetails?.lesson_description === null ? 'NA'
                            : schoolInstructorsLessonDetails?.lesson_description}
                </div>
            </div>

            <div className='my-s16'>
                <div className='sub_title text-cBlack'>{t("Requirement")}</div>
                <div className='font-fw400 text-fs14 text-cLesson mt-s4'>
                    {
                        schoolInstructorsLessonDetails?.lesson_requirements === 'null' ||
                            schoolInstructorsLessonDetails?.lesson_requirements === null ? 'NA'
                            : schoolInstructorsLessonDetails?.lesson_requirements
                    }
                </div>
            </div>

            <div className='mb-s12'>
                <div className="flex">
                    <div className='sub_title text-cBlack'>
                        {t("Student profile")}
                    </div>
                    {(schoolInstructorsLessonDetails?.status === "passed" || schoolInstructorsLessonDetails?.status === "failed") &&
                        <div className='capitalize ml-s4 small_body_text text-cGray'>{schoolInstructorsLessonDetails?.status}</div>
                    }
                </div>
                <div className='body_text text-cGray'>
                    {
                        schoolInstructorsLessonDetails?.student_name === 'null' ||
                            schoolInstructorsLessonDetails?.student_name === null ? 'NA' :
                            schoolInstructorsLessonDetails?.student_name
                    }
                </div>

            </div>

            {
                (schoolInstructorsLessonDetails?.status === "passed" || schoolInstructorsLessonDetails?.status === "failed") ||
                    schoolInstructorsLessonDetails?.status === "upcoming"
                    ?
                    <>
                        {
                            <div className='flex my-s12'>
                                <div className='important_text text-cBlack'> {t("Instructor comment")}:</div>
                                <div className='body_text text-cGray pl-s2'>
                                    {
                                        schoolInstructorsLessonDetails?.accept_note === 'null' ||
                                            schoolInstructorsLessonDetails?.accept_note === null ? 'NA' :
                                            schoolInstructorsLessonDetails?.accept_note
                                    }
                                </div>
                            </div>
                        }
                    </> : ''
            }


            <div className='mb-s12'>
                <span className='important_text text-cBlack'>{t("Student comment")}: </span>
                <span className='body_text text-cGray pl-s2'>
                    {
                        schoolInstructorsLessonDetails?.student_note ? schoolInstructorsLessonDetails?.student_note === 'null' ||
                            schoolInstructorsLessonDetails?.student_note === null ? 'NA' :
                            schoolInstructorsLessonDetails?.student_note : 'NA'
                    }
                </span>
            </div>


            {schoolInstructorsLessonDetails?.status === "cancelled" &&
                <div className=''>
                    <span className='important_text text-cBlack max-w-[153px] min-w-[153px]'>{t("Cancellation reason")}:</span>
                    <span className='body_text text-cGray pl-s2'>
                        {schoolInstructorsLessonDetails?.cancel_note ?
                            schoolInstructorsLessonDetails?.cancel_note : 'NA'}
                    </span>
                </div>}


            {schoolInstructorsLessonDetails?.status === "rejected" &&
                <div className=''>
                    <span className='important_text text-cBlack'>{t("Rejected reason")}:</span>
                    <span className='body_text text-cGray pl-s2'>
                        {schoolInstructorsLessonDetails?.rejected_note ?
                            schoolInstructorsLessonDetails?.rejected_note : 'NA'}
                    </span>
                </div>}

            {
                schoolInstructorsLessonDetails?.status === "upcoming" &&
                <div className='flex justify-center mt-s20'>
                    <CommonButtonOutlined
                        onClick={() => { setShowCancelNoteModal(true) }}
                        colorType='danger'
                        btnLabel={t('Cancel')}
                    />
                </div>
            }
        </>
    )
}



{/* <CommonModal
                showModal={showLessonDetailsModal}
                setShowModal={setShowLessonDetailsModal}
                modalTitle={t("Lesson details")}
                mainContent={
                    <>
                        <div className='space-y-1 bg-cBackgroundAndCategory p-s20 rounded-br8 mt-s20'>
                            <CommonList name={t("Status")} value={schoolInstructorsLessonDetails?.status} />
                            <CommonList name={t("Category")} value={schoolInstructorsLessonDetails?.category_name} />
                            <CommonList name={t("Lesson type")} value={schoolInstructorsLessonDetails?.lesson_type} />
                            <CommonList name={t("Lesson name")} value={schoolInstructorsLessonDetails?.lesson_name} />
                            {schoolInstructorsLessonDetails?.lesson_type === 'driving' ||
                                schoolInstructorsLessonDetails?.lesson_type === 'external' ? "" :
                                <CommonList
                                    name={t("Classroom name")}
                                    value={schoolInstructorsLessonDetails?.classroom_name}
                                />
                            }
                            {
                                schoolInstructorsLessonDetails?.lesson_type !== 'driving' ||
                                    schoolInstructorsLessonDetails?.lesson_type !== 'external' ? "" :
                                    <CommonList
                                        name={t("Student")}
                                        value={schoolInstructorsLessonDetails?.students?.length}
                                    />
                            }
                        </div>

                        <div className='mt-s20'>
                            <div className='sub_title text-cBlack'>{t("Description")}</div>
                            <div className='font-fw400 text-fs14 text-[#7A7A7A] mt-s4'>
                                {
                                    schoolInstructorsLessonDetails?.lesson_description === 'null' ||
                                        schoolInstructorsLessonDetails?.lesson_description === null ? 'NA'
                                        : schoolInstructorsLessonDetails?.lesson_description}
                            </div>
                        </div>

                        <div className='my-s16'>
                            <div className='sub_title text-cBlack'>{t("Requirement")}</div>
                            <div className='font-fw400 text-fs14 text-[#7A7A7A] mt-s4'>
                                {
                                    schoolInstructorsLessonDetails?.lesson_requirements === 'null' ||
                                        schoolInstructorsLessonDetails?.lesson_requirements === null ? 'NA'
                                        : schoolInstructorsLessonDetails?.lesson_requirements
                                }
                            </div>
                        </div>

                        {
                            schoolInstructorsLessonDetails?.lesson_type === 'driving' ||
                                schoolInstructorsLessonDetails?.lesson_type === 'external' ?
                                <div className='mb-s12'>
                                    <div className='sub_title text-cBlack'>{t("Student profile")}</div>
                                    <div className='body_text text-cGray'>
                                        {schoolInstructorsLessonDetails?.student_name === 'null' ||
                                            schoolInstructorsLessonDetails?.student_name === null ? 'NA' :
                                            schoolInstructorsLessonDetails?.student_name
                                        }
                                    </div>
                                </div>
                                : ''
                        }



                        {
                            schoolInstructorsLessonDetails?.status === "completed" ||
                                schoolInstructorsLessonDetails?.status === "upcoming" ||
                                schoolInstructorsLessonDetails?.status === "rejected" ||
                                schoolInstructorsLessonDetails?.status === "started" ?
                                <div>

                                    {schoolInstructorsLessonDetails?.students?.length > 0 && <div className='sub_title text-cBlack mb-s8'>
                                        {t("Student list")} ({schoolInstructorsLessonDetails?.students?.length})
                                    </div>}

                                    <div className='space-y-4'>{schoolInstructorsLessonDetails?.students?.length > 0 ?
                                        schoolInstructorsLessonDetails?.students?.map((item, index) => (
                                            <div key={index} className='p-s8 ring-1 ring-cChipBorder rounded-br10'>
                                                <div className='flex'>
                                                    <div className='capitalize sub_title text-cBlack'>
                                                        {item?.student_name}
                                                    </div>
                                                    <div className='capitalize ml-s4 small_body_text text-cGray'>
                                                        {item?.status}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        : <div className='sub_title text-cBlack '>{t("No student available")}</div>
                                    }</div>
                                </div> : ''}

                        {schoolInstructorsLessonDetails?.lesson_type === "classroom" &&
                            schoolInstructorsLessonDetails?.status === "completed" ? "" :
                            <>
                                {
                                    schoolInstructorsLessonDetails?.status !== "cancelled" &&
                                    <div className='flex my-s12'>
                                        <div className='important_text text-cBlack'> {t("Instructor comment")}:</div>
                                        <div className='body_text text-cGray pl-s2'>
                                            {
                                                schoolInstructorsLessonDetails?.accept_note === 'null' ||
                                                    schoolInstructorsLessonDetails?.accept_note === null ? 'NA' :
                                                    schoolInstructorsLessonDetails?.accept_note
                                            }
                                        </div>
                                    </div>
                                }

                                <div className='flex mb-s12'>
                                    <div className='important_text text-cBlack'>{t("Student comment")}: </div>
                                    <div className='body_text text-cGray pl-s2'>
                                        {
                                            schoolInstructorsLessonDetails?.student_note ? schoolInstructorsLessonDetails?.student_note === 'null' ||
                                                schoolInstructorsLessonDetails?.student_note === null ? 'NA' :
                                                schoolInstructorsLessonDetails?.student_note : 'NA'
                                        }
                                    </div>
                                </div>
                            </>}

                        {schoolInstructorsLessonDetails?.status === "cancelled" &&
                            <div className='flex'><div className='important_text text-cBlack max-w-[153px] min-w-[153px]'>{t("Cancellation reason")}:</div>
                                <div className='body_text text-cGray pl-s2'>
                                    {schoolInstructorsLessonDetails?.cancel_note ?
                                        schoolInstructorsLessonDetails?.cancel_note : 'NA'}
                                </div>
                            </div>}


                        {schoolInstructorsLessonDetails?.status === "rejected" &&
                            <div className='flex'>
                                <div className='important_text text-cBlack'>{t("Rejected reason")}:</div>
                                <div className='body_text text-cGray pl-s2'>
                                    {schoolInstructorsLessonDetails?.rejected_note ?
                                        schoolInstructorsLessonDetails?.rejected_note : 'NA'}
                                </div>
                            </div>}

                        {schoolInstructorsLessonDetails?.status === "upcoming" &&
                            <div className='flex justify-center mt-s20'>
                                <CommonButtonOutlined
                                    onClick={() => { setShowCancelNoteModal(true) }}
                                    colorType='danger'
                                    btnLabel={t('Cancel')}
                                />
                            </div>
                        }
                    </>
                }
            /> */}