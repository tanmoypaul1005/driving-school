import React from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import useClassStore, { cancelSchoolClass } from '../../../App/Stores/classStore';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CancelClassNoteModal = () => {

    const { showCancelNoteModal, setShowCancelNoteModal, schoolDetails, setShowClassDetailsModal } = useClassStore();

    const { t } = useTranslation();

    const [cancel_note, setCancel_note] = useState("");

    const submitData = (e) => {
        e.preventDefault();
        const success = cancelSchoolClass({ id: schoolDetails?.id, cancel_note: cancel_note });
        if (success) {
            setShowClassDetailsModal(false);
            setTimeout(() => {
                setShowCancelNoteModal(false)
            }, 200);
        }
    }

    return (
        <div>
            <CommonModal
                showModal={showCancelNoteModal}
                setShowModal={setShowCancelNoteModal}
                modalTitle={t("Write cancel note")}
                mainContent={
                    <>
                        <form onSubmit={submitData}>
                            <div className='my-s20'>
                                <CommonInput
                                    max_input={255}
                                    value={cancel_note}
                                    onChange={(e) => setCancel_note(e.target.value)}
                                    textarea={true}
                                    label={t('Write comment')}
                                    required={true}
                                    placeholder={t('Write comment')} />
                            </div>

                            <div className='flex items-center justify-center'>
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

export default CancelClassNoteModal;