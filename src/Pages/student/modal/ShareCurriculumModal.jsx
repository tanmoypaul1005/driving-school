import React from 'react'
import CommonModal from '../../../Components/Modal/CommonModal';
import useSchoolStudentStore, { ShareCurriculum } from '../../../App/Stores/schoolStudentStore';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import { useTranslation } from 'react-i18next';
import { checkValidEmail } from '../../../Utility/UtilityFunctions';
import { useParams } from 'react-router-dom';

const ShareCurriculumModal = () => {

    const {shareCurriculumForm,setShareCurriculumForm,setShowShareCurriculumModal,showShareCurriculumModal}=useSchoolStudentStore();

    const { t } = useTranslation();

    const { school_student_id } = useParams();

    return (
        <div>
            <CommonModal
                showModal={showShareCurriculumModal}
                setShowModal={setShowShareCurriculumModal}
                modalTitle={t("Share curriculum")}
                widthClass='w-[45vw]'
                mainContent={
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="py-5">
                            <CommonInput
                                withStar={false}
                                label={t("Email")}
                                required={true}
                                type="email"
                                placeholder={t("Enter a valid email")}
                                value={shareCurriculumForm?.email ?? ""}
                                onChange={(e) => setShareCurriculumForm({ ...shareCurriculumForm, email: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-center">
                            <CommonButton
                                roundedFull={false}
                                width='w-[120px]'
                                btnLabel={t('share')}
                                type='submit'
                                onClick={async () => {
                                    setShareCurriculumForm({...shareCurriculumForm,'id': school_student_id});
                                    if (checkValidEmail(shareCurriculumForm?.email)) {
                                        console.log("SHARE INVOICE: ", shareCurriculumForm);
                                        let sendSuccess = await ShareCurriculum();
                                        if (sendSuccess) {
                                            // Toastr({ message: ("Invoice Shared Successfully !"), type: "success" });
                                            setShowShareCurriculumModal(false);
                                            setShareCurriculumForm({ ...shareCurriculumForm, email: "" })
                                        }
                                    }
                                }}
                            />
                        </div>
                    </form>
                }
            />
        </div>
    )
}

export default ShareCurriculumModal