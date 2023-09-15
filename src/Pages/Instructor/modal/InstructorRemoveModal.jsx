import React from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import useSchoolInstructorStore, { schoolInstructorsRemove } from '../../../App/Stores/schoolInstructorStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const InstructorRemoveModal = () => {

    const { showInstructorRemoveModal, setShowInstructorRemoveModal } = useSchoolInstructorStore();

    const { school_instructor_id } = useParams();

    const navigateTo = useNavigate();

    const { t } = useTranslation();

    const submit = async (e) => {
        e.preventDefault();
        const success = await schoolInstructorsRemove(school_instructor_id);
        if (success) {
            setShowInstructorRemoveModal(false);
            navigateTo('/school-instructor');
        }
    }

    return (
        <div>
            <CommonModal
                showModal={showInstructorRemoveModal}
                setShowModal={setShowInstructorRemoveModal}
                modalTitle={t("Write remove reason")}
                mainContent={
                    <>
                        <form onSubmit={submit}>
                            <div className='my-s20'>
                                <CommonInput
                                    withStar={false}
                                    max_input={255}
                                    textarea={true}
                                    label={t('Write comment')}
                                    required={true}
                                    placeholder={t('Write comment')}
                                />
                            </div>

                            <div className='flex justify-center items-center'>
                                <CommonButton
                                    roundedFull={false}
                                    type='submit'
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

export default InstructorRemoveModal;