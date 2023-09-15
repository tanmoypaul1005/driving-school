/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import CommonButton from '../../../Components/Button/CommonButton';
import { useEffect } from 'react';
import { htmlToPlainText } from '../../../Utility/UtilityFunctions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosHeader from '../../../App/Utility/AxiosHeader';
import { useTranslation } from 'react-i18next';
import useProfileStore, { getSchoolDeleteMessage, schoolDeleteIndex } from '../../../App/Stores/profileStore';
import CommonModal from '../../../Components/Modal/CommonModal';
    
function DeleteAccountModal() {

    const { setShowEditProfileModal, showDeleteAccountModal, setShowDeleteAccountModal, deleteMessageText } = useProfileStore();
    useEffect(() => {
        if(showDeleteAccountModal === true){
        getSchoolDeleteMessage();
        }
    }, [])

    const { t } = useTranslation();

    const [agree, setAgree] = useState(false)
    const navigate = useNavigate();

    return (
        <div>
            <CommonModal
                showModal={showDeleteAccountModal}
                setShowModal={setShowDeleteAccountModal}
                modalSpace={true}
                modalTitle={t("Delete Account")}
                mainContent={
                    <>
                        <div className='body_text text-cMainBlack mt-s20'>
                            {deleteMessageText ?
                                htmlToPlainText(deleteMessageText?.content)
                                : 'NA'
                            }
                        </div>

                        <div className="flex flex-row items-center py-4">
                            <input
                                id="checkDelete"
                                className="mr-2 accent-red-500"
                                type="checkbox"
                                name=""
                                value={agree}
                                onChange={(e) => {
                                    setAgree(e.target.checked)
                                }}
                            />
                            <label
                                htmlFor="checkDelete"
                                className="cursor-pointer select-none body_text text-cMainBlack"
                            >
                                {t("I agree to delete this account with knowing my losses of deleting this account.")}
                            </label>
                        </div>

                        <div className='flex items-center justify-center'>
                            <CommonButton
                                isDisabled={!agree}
                                roundedFull={false}
                                colorType={'danger'}
                                btnLabel={t("Delete Account")}
                                onClick={async() => {
                                    if (agree) {
                                        const success = await schoolDeleteIndex();
                                        if (success) {
                                            setShowDeleteAccountModal(false)
                                            setTimeout(() => {
                                                setShowEditProfileModal(false)
                                            }, 300);
                                            navigate('/login');
                                            localStorage.setItem("user", "");
                                            localStorage.setItem("maway_token", "");
                                            AxiosHeader(null);
                                        }
                                    }
                                }}
                            />
                        </div>

                    </>
                }
            />
        </div>
    )
}

export default DeleteAccountModal
