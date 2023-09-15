import React from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import useSchoolInstructorStore, { schoolInstructorRejectIndex } from '../../../App/Stores/schoolInstructorStore';
import { useNavigate, useParams } from 'react-router-dom';
import { Toastr } from '../../../App/Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';

const RejectionReasonModal = () => {

    const { showRejectionReasonModal, setShowRejectionReasonModal, setSchoolInstructorRejectionNote, schoolInstructorRejectionNote } = useSchoolInstructorStore();

    const { school_instructor_id } = useParams();

    const navigateTo = useNavigate();

    const { t } = useTranslation();

    const submit = async (e) => {
        e.preventDefault();
        if (schoolInstructorRejectionNote !== "") {
            const success = await schoolInstructorRejectIndex(school_instructor_id);
            if (success) {
                setShowRejectionReasonModal(false);
                navigateTo('/school-instructor');
            }
        }else{
            Toastr({ message: "Please enter rejection reason", type: "error" });
        }

    }
    return (
        <div>
            <CommonModal
                showModal={showRejectionReasonModal}
                setShowModal={setShowRejectionReasonModal}
                modalTitle={t("Write rejection reason")}
                mainContent={
                    <>
                        <form onSubmit={submit}>
                            <div className='my-s20'>
                                <CommonInput
                                   max_input={255}
                                    textarea={true}
                                    label={t('Write comment')}
                                    required={true}
                                    placeholder={t('Write comment')}
                                    value={schoolInstructorRejectionNote}
                                    onChange={(e) => {
                                        setSchoolInstructorRejectionNote(e.target.value)
                                    }}
                                />
                            </div>

                            <div className='flex justify-center items-center'>
                                <CommonButton
                                    type='submit'
                                    roundedFull={false}
                                    btnLabel={t('Submit')}
                                    colorType='danger'
                                />
                            </div>
                        </form>
                    </>
                }
            />
        </div>
    );
};

export default RejectionReasonModal;