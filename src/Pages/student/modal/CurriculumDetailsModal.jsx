import React from 'react';
import useSchoolStudentStore from '../../../App/Stores/schoolStudentStore';
import CommonModal from '../../../Components/Modal/CommonModal';
import { MinToHour } from '../../../Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';

function CurriculumDetailsModal() {

    const { schoolStudentCurriculumDetails, showSchoolStudentCurriculumDetailsModal, setShowSchoolStudentCurriculumDetailsModal } = useSchoolStudentStore()

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showSchoolStudentCurriculumDetailsModal}
                setShowModal={setShowSchoolStudentCurriculumDetailsModal} 
            widthClass='w-[600px]'
            modalTitle={t("Lesson details")}
            mainContent={
                <>
                    <div className='bg-[#EDF1F8] p-s20 space-y-1 rounded-br8 mt-s20'>
                        <CommonList name={t("Status")}
                            value={
                                schoolStudentCurriculumDetails?.Lesson_info?.lesson_type === "classroom" ||
                                schoolStudentCurriculumDetails?.Lesson_info?.lesson_type  === "driving" ?
                                schoolStudentCurriculumDetails?.Lesson_info?.status === 'passed' ? 'Attended' : 
                                schoolStudentCurriculumDetails?.Lesson_info?.status === 'failed' ? 'Absent' : 
                                schoolStudentCurriculumDetails?.Lesson_info?.status:schoolStudentCurriculumDetails?.Lesson_info?.status
                            }
                        />
                        <CommonList name={t("Category")} value={schoolStudentCurriculumDetails?.Lesson_info?.category_name} />
                        <CommonList name={t("Lesson type")} value={schoolStudentCurriculumDetails?.Lesson_info?.lesson_type} />
                        <CommonList name={t("Lesson name")} value={schoolStudentCurriculumDetails?.Lesson_info?.lesson_name} />
                        {schoolStudentCurriculumDetails?.Lesson_info?.lesson_type === "external" || schoolStudentCurriculumDetails?.Lesson_info?.lesson_type === "driving" ?
                            <CommonList name={t("Duration")} value={MinToHour(schoolStudentCurriculumDetails?.Lesson_info?.duration)} /> : ''}
                        {
                            schoolStudentCurriculumDetails?.Lesson_info?.format_start_time ?
                                <CommonList name={t("Date & time")} value={schoolStudentCurriculumDetails?.Lesson_info?.format_date + ", " + schoolStudentCurriculumDetails?.Lesson_info?.format_start_time + " - " + schoolStudentCurriculumDetails?.Lesson_info?.format_end_time} />
                                : <CommonList name={t("Date & time")} value={schoolStudentCurriculumDetails?.Lesson_info?.format_date} />
                        }
                    </div>

                    <div className='my-s20'>
                        <div className='important_text text-cBlack'>{t("Description")}</div>
                        <div className='body_text text-cGray'>
                            {
                                schoolStudentCurriculumDetails?.Lesson_info?.description === 'null' ||
                                    schoolStudentCurriculumDetails?.Lesson_info?.description === null ? 'NA'
                                    : schoolStudentCurriculumDetails?.Lesson_info?.description
                            }
                        </div>
                    </div>

                    <div className='mt-s20'>
                        <div className='important_text text-cBlack'>{t("Requirement")}</div>
                        <div className='body_text text-cGray'>
                            {
                                schoolStudentCurriculumDetails?.Lesson_info?.requirements === 'null' ||
                                    schoolStudentCurriculumDetails?.Lesson_info?.requirements === null ? 'NA'
                                    : schoolStudentCurriculumDetails?.Lesson_info?.requirements
                            }
                        </div>
                    </div>

                    {schoolStudentCurriculumDetails?.Lesson_info?.status === "upcoming" &&
                        schoolStudentCurriculumDetails?.Lesson_info?.lesson_type === "classroom"
                        ? <div className='mt-s20'>
                            <div className='sub_title text-cBlack'>{t("Instructor profile")}</div>
                            <div className='body_text text-cGray'>
                                {
                                    schoolStudentCurriculumDetails?.additional_info?.instructor_name
                                }
                            </div>
                        </div> : ''}

                    {schoolStudentCurriculumDetails?.status === "completed" ||
                        schoolStudentCurriculumDetails?.status === "upcoming" ||
                        schoolStudentCurriculumDetails?.status === "rejected" ||
                        schoolStudentCurriculumDetails?.status === "started" ?
                        <div>

                            <div className='sub_title text-cBlack mt-s20 mb-s16'>
                                {t("Student list")} ({schoolStudentCurriculumDetails?.students?.length})
                            </div>

                            <div className='space-y-4'>{schoolStudentCurriculumDetails?.students?.length > 0 ?
                                schoolStudentCurriculumDetails?.students?.map((item, index) => (
                                    <div key={index} className='p-s8 ring-1 ring-cChipBorder rounded-br8'>
                                        <div className='flex'>
                                            <div className='sub_title text-cBlack capitalize'>
                                                {item?.student_name}
                                            </div>
                                            <div className='ml-s4 small_body_text text-cGray capitalize'>
                                                {item?.status}
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : <span>{t("No student available")}</span>
                            }</div>
                        </div> : ''}
                    {
                        schoolStudentCurriculumDetails?.Lesson_info?.lesson_type === "driving" ||
                            schoolStudentCurriculumDetails?.Lesson_info?.lesson_type === "external" &&
                            schoolStudentCurriculumDetails?.Lesson_info?.status !== "pending"
                            ? <div className='mt-s20'>
                                <div className='sub_title text-cBlack'>{t("Instructor profile")}</div>
                                <div className='body_text text-cGray'>
                                    {schoolStudentCurriculumDetails?.selected_instructor?.name}
                                </div>
                                <div className='my-s16'>
                                    <span className='important_text text-cBlack'>{t("Instructor comment")} :</span>
                                    <span className='body_text text-cGray ml-s3'>
                                        {schoolStudentCurriculumDetails?.notes?.instructor_note ? schoolStudentCurriculumDetails?.notes?.instructor_note : 'NA'}
                                    </span>
                                </div>

                                <div className='my-s16'>
                                    <span className='important_text text-cBlack'>{t("Student comment")} :</span>
                                    <span className='body_text text-cGray ml-s3'>
                                        {schoolStudentCurriculumDetails?.notes?.student_note ? schoolStudentCurriculumDetails?.notes?.student_note : 'NA'}
                                    </span>
                                </div>

                            </div> : ''}


                    {
                        schoolStudentCurriculumDetails?.Lesson_info?.lesson_type === "classroom" &&
                            schoolStudentCurriculumDetails?.Lesson_info?.status === "Completed"
                            ? <div className='mt-s20'>
                                <div className='important_text text-cBlack'>{t("Instructor profile")}</div>
                                <div className='body_text text-cGray'>
                                    {
                                        schoolStudentCurriculumDetails?.selected_instructor?.name
                                    }
                                </div>
                                <div className='my-s16'>
                                    <span className='important_text text-cBlack'>{t("Instructor comment")} :</span>
                                    <span className='body_text text-cGray ml-s3'>
                                        {schoolStudentCurriculumDetails?.notes?.instructor_note ? schoolStudentCurriculumDetails?.notes?.instructor_note : 'NA'}
                                    </span>
                                </div>

                            </div> : ''}
                </>
            }
            />
        </div>
    )
}

export default CurriculumDetailsModal;

const CommonList = ({ value, name }) => {

    return (
        <div className='flex justify-between'>
            <div className='body_text text-cGray capitalize'>{name ? name : 'NA'}</div>
            <div className='body_text text-cGray capitalize'>{value ? value : 'NA'}</div>
        </div>
    )
}