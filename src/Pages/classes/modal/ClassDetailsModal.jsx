import React from 'react'
import CommonModal from '../../../Components/Modal/CommonModal'
import useClassStore from '../../../App/Stores/classStore'
import CommonButton from '../../../Components/Button/CommonButton';
import { useTranslation } from 'react-i18next';

function ClassDetailsModal() {

    const { showClassDetailsModal, setShowClassDetailsModal, schoolDetails, setShowCancelNoteModal } = useClassStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showClassDetailsModal}
                setShowModal={setShowClassDetailsModal}
                modalTitle={t("Class Details")}
                mainContent={
                    <>
                        <div className='bg-cBackgroundAndCategory p-s20 space-y-1 rounded-br8 mt-s20'>
                            <CommonList name={t("Status")} value={schoolDetails?.status_show ?? 'NA'} />
                            <CommonList name={t("Category")} value={schoolDetails?.category_name ?? 'NA'} />
                            <CommonList name={t("Lesson type")} value={schoolDetails?.lesson_type ?? 'NA'} />
                            <CommonList name={t("Lesson name")} value={schoolDetails?.lesson_name ?? 'NA'} />
                            {schoolDetails?.lesson_type === "driving" ?
                                <CommonList name={t("Class capacity")} value={schoolDetails?.class_capacity ?? 'NA'} /> :
                                <CommonList name={t("Classroom name")} value={schoolDetails?.classroom_name ?? 'NA'} />}
                            <CommonList name={t("Date & time")}
                                value={schoolDetails?.class_date && schoolDetails?.start_time ?
                                    `${schoolDetails?.class_date}, ${schoolDetails?.start_time}` : 'NA'}
                            />
                            <CommonList name={t("Student")} value={schoolDetails?.students?.length} />
                        </div>

                        <div className='mt-s20'>
                            <div className='sub_title text-cBlack'>{t("Instructor profile")}</div>
                            <div className='body_text text-cGray'>
                                {schoolDetails?.instructor_name}
                            </div>
                        </div>

                        {schoolDetails?.status_show === "completed" ||
                            schoolDetails?.status_show === "upcoming" ||
                            schoolDetails?.status_show === "started" ?
                            <div>

                                <div className={`sub_title text-cBlack mt-s10`}>
                                    {t("Student list")} ({schoolDetails?.students?.length})
                                </div>

                                <div className='space-y-3'>
                                    {schoolDetails?.students?.length > 0 ?
                                        schoolDetails?.students?.map((item, index) => (
                                            <div key={index} className='p-s12 ring-1 ring-cChipBorder rounded-br8 mt-s4'>
                                                <div className='flex'>
                                                    <div className='sub_title text-cBlack capitalize'>
                                                        {item?.student_name}
                                                    </div>
                                                    <div className='ml-s4 small_body_text text-cGray capitalize'>
                                                        {item?.status}
                                                    </div>
                                                </div>
                                                <span className='important_text text-cBlack'>{t("Instructor comment")}: </span>
                                                <span className='body_text text-cGray'>{item?.comment}</span>
                                            </div>
                                        ))
                                        : <div>{t('No student available')}</div>
                                    }</div>
                            </div> : ''}

                        {schoolDetails?.status_show === "cancelled" && <div className='mt-s12'>
                            <div className='important_text text-cBlack'>{t("Cancellation reason")}</div>
                            <div className='body_text text-cGray'>{schoolDetails?.cancel_note}</div>
                        </div>}

                        {schoolDetails?.status_show === "upcoming" &&
                            <div className='mt-s20 flex justify-center'>
                                <CommonButton
                                    width="w-[100px]"
                                    roundedFull={false}
                                    onClick={() => { setShowCancelNoteModal(true) }}
                                    colorType='danger'
                                    btnLabel={t('Cancel')}
                                />
                            </div>
                        }
                    </>
                }
            />
        </div>
    )
}

export default ClassDetailsModal

const CommonList = ({ value, name }) => {

    return (
        <div className='flex justify-between'>
            <div className='body_text text-cGray capitalize'>{name ? name : 'NA'}</div>
            <div className='body_text text-cGray capitalize'>{value ? value : 'NA'}</div>
        </div>
    )
}