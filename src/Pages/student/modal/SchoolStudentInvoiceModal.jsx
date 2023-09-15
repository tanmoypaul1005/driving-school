/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import useSchoolStudentStore, { getSchoolStudentAdmissionInvoice, getSchoolStudentShow, schoolStudentInvoiceStatusChange } from '../../../App/Stores/schoolStudentStore';
import { iDrivingCard, iExternalCard, iPiceEdit, iSchoolClassroomLesson } from '../../../App/Utility/source';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButtonOutlined from '../../../Components/Button/CommonButtonOutlined';
import CommonButton from '../../../Components/Button/CommonButton';
import CommonModal from '../../../Components/Modal/CommonModal';
import { useTranslation } from 'react-i18next';

const SchoolStudentInvoiceModal = () => {

    const { setNewReqForm, newReqForm, newPricePercentage, schoolStudentNewReqDetails, schoolStudentDetails, setSchoolStudentInvoiceModal, schoolStudentInvoiceModal, setShowUpdatePriceModal } = useSchoolStudentStore();

    const { school_student_id } = useParams();

    const { t } = useTranslation();

    useEffect(() => {
        if (schoolStudentDetails?.admission_id) {
            getSchoolStudentAdmissionInvoice(schoolStudentDetails?.admission_id)
        }
    }, [schoolStudentDetails?.admission_id, newPricePercentage])


    return (
        <div>
            <CommonModal
                showModal={schoolStudentInvoiceModal}
                setShowModal={setSchoolStudentInvoiceModal}
                modalTitle={t("Order details")}
                mainContent={
                    <div className='mt-s20'>
                        {schoolStudentNewReqDetails?.is_package ? <div className='sub_title text-cBlack mb-s8'>
                            {t("Package purchase of category")} {schoolStudentNewReqDetails?.category_name}</div> : <div className='sub_title text-cBlack mb-s8'>Lesson purchase of category {schoolStudentNewReqDetails?.category_name}</div>}
                        {
                            schoolStudentNewReqDetails?.lessons?.length > 0 ?
                                <div className='space-y-2'>
                                    {schoolStudentNewReqDetails?.lessons.map((item, index) => (
                                        <div key={index} className='flex justify-between bg-cInvoiceLesson px-s10 py-s5 rounded-br8'>
                                            <div className='flex'>
                                                <div className='flex justify-center items-center bg-cWhite rounded-full max-w-[50px] min-w-[50px] h-[50px]'>
                                                    <img
                                                        className='flex items-center justify-center'
                                                        src={
                                                            (item?.type === 'driving' && iDrivingCard) ||
                                                            (item?.type === 'external' && iExternalCard) ||
                                                            (item?.type === 'classroom' && iSchoolClassroomLesson)
                                                        }
                                                        alt=""
                                                    />
                                                </div>

                                                <div className='flex items-center justify-center ml-s12'>
                                                    <div>
                                                        <div className='text-[#202020] text-fs14 font-fw600 capitalize'>{item?.name}</div>
                                                        <div className='text-[#202020] body_text'>
                                                            {item?.duration}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='text-[#202020] flex justify-center items-center small_body_text'>
                                                DKK {newPricePercentage === null ? item?.price?.toLocaleString("da-DK") :
                                                    Math.round(item?.price - (newPricePercentage / 100) * item?.price)?.toLocaleString("da-DK")
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                : ''}


                        <div className='pt-s16'>
                            <div className='flex justify-between'>
                                <div className='small_body_text text-cGray'>MOMS</div>
                                <div className='small_body_text text-cGray'>
                                    DKK {newPricePercentage === null ?
                                        schoolStudentNewReqDetails?.moms :
                                        Math.round(schoolStudentNewReqDetails?.moms - (newPricePercentage / 100) * schoolStudentNewReqDetails?.moms)}</div>
                            </div>
                        </div>

                        <div>
                            <div className='flex justify-between mt-s4'>
                                <div className='text-cBrandColor important_text'>{t("Total")}</div>
                                <div className='flex text-cBrandColor important_text'>
                                    <span className='text-center w-[90px]'>DKK {newPricePercentage === null ?
                                        schoolStudentNewReqDetails?.price :
                                        parseInt(newReqForm.new_price) + parseInt(Math.round(schoolStudentNewReqDetails?.moms - (newPricePercentage / 100) * schoolStudentNewReqDetails?.moms))
                                    }</span>
                                    <img
                                        className='cursor-pointer'
                                        onClick={() => { setShowUpdatePriceModal(true) }}
                                        alt="" src={iPiceEdit}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className='sub_title text-cBlack mt-s16'>{t("Comment")}</div>

                        <div className='important_text text-cBlack my-s4'>{t("Student comment")}:</div>
                        <div className="flex items-start justify-between">
                            <div className='body_text text-cGray'>
                                {
                                    schoolStudentNewReqDetails?.student_note === 'null' ||
                                        schoolStudentNewReqDetails?.student_note === null ? 'NA' :
                                        schoolStudentNewReqDetails?.student_note
                                }
                            </div>
                            <div className='min-w-[220px] text-sm text-cLesson text-right'>
                                {schoolStudentNewReqDetails?.action_dates?.requested}
                            </div>
                        </div>

                        <div className='important_text text-cBlack pt-s16 mb-s4'>{t("School comment")}:</div>
                        <CommonInput
                            max_input={255}
                            textarea={true}
                            value={newReqForm?.comment}
                            onChange={(e) => {
                                setNewReqForm({ ...newReqForm, comment: e.target.value })
                            }}
                        />

                        <div className='flex justify-between pt-s20'>
                            <CommonButtonOutlined
                                isFullRounded={false}
                                btnLabel={t('Reject')}
                                colorType='danger'
                                onClick={async () => {
                                    const success = await schoolStudentInvoiceStatusChange({
                                        id: schoolStudentDetails?.admission_id,
                                        status: "rejected",
                                        reply: newReqForm.comment
                                    });
                                    if (success) {
                                        setSchoolStudentInvoiceModal(false);
                                        await getSchoolStudentShow(school_student_id);
                                        setNewReqForm({
                                            id: "",
                                            status: "created",
                                            comment: "",
                                            new_price: ""
                                        })
                                    }
                                }}
                            />

                            <CommonButton
                                roundedFull={false}
                                btnLabel={t('Accept')}
                                onClick={async () => {
                                    let body = {}
                                    if (newPricePercentage === null) {
                                        body = {
                                            id: schoolStudentDetails?.admission_id,
                                            status: "created",
                                            reply: newReqForm.comment,
                                            // "new_price": newReqForm.new_price
                                        }
                                    } else {
                                        body = {
                                            "id": schoolStudentDetails?.admission_id,
                                            "status": "created",
                                            "reply": newReqForm.comment,
                                            "new_price": newReqForm.new_price
                                        }
                                    }

                                    const success = await schoolStudentInvoiceStatusChange(body);
                                    if (success) {
                                        setSchoolStudentInvoiceModal(false);
                                        await getSchoolStudentShow(school_student_id)
                                        setNewReqForm({
                                            id: "",
                                            status: "created",
                                            comment: "",
                                            new_price: ""
                                        })
                                    }
                                }}
                            />
                        </div>

                    </div>
                }
            />

        </div>
    );
};

export default SchoolStudentInvoiceModal;