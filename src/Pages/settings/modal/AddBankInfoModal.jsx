import React from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import useSettingsStore, { addSchoolBankInfo } from '../../../App/Stores/SettingsStore';
import CommonButton from '../../../Components/Button/CommonButton';
import CommonInput from '../../../Components/Input/CommonInput';
import useProfileStore from '../../../App/Stores/profileStore';

import { useTranslation } from 'react-i18next';

const AddBankInfoModal = () => {

    const { showAddBankInfoModal, setShowAddBankInfoModal, addBankInfoForm, setAddBankInfoForm } = useSettingsStore();

    const { schoolDashboardDetails } = useProfileStore();

    const { t } = useTranslation();

    const submitData = (e) => {
        e.preventDefault();
        const success = addSchoolBankInfo()
        if (success) {
            setAddBankInfoForm({
                bank_name: "",
                account_name: "",
                account_number: "",
                reg_no: ""
            })
            setShowAddBankInfoModal(false)
        }
    }

    return (
        <div>
            <CommonModal
                showModal={showAddBankInfoModal}
                setShowModal={setShowAddBankInfoModal}
                modalTitle={t("Add Bank information")}
                mainContent={
                    <div className='mt-s20'>
                        <form onSubmit={submitData}>
                            <div className='space-y-4'>
                                <CommonInput
                                    label={t("School cvr number")}
                                    type='text'
                                    value={schoolDashboardDetails?.school?.cvr}
                                    placeholder="cvr"
                                    disabled={true}
                                    notEditable={true}
                                />

                                <CommonInput
                                    required={true}
                                    label={t("Bank name")}
                                    max_input={55}
                                    type='text'
                                    value={addBankInfoForm?.bank_name}
                                    placeholder={t("Bank name")}
                                    onChange={(e) => { setAddBankInfoForm({ ...addBankInfoForm, bank_name: e.target.value }) }}
                                />
                                <CommonInput
                                    required={true}
                                    label={t("Write account holder hame")}
                                    type='text'
                                    max_input={55}
                                    value={addBankInfoForm?.account_name}
                                    placeholder={t("Write account holder hame")}
                                    onChange={(e) => { setAddBankInfoForm({ ...addBankInfoForm, account_name: e.target.value }) }}
                                />

                                <div className='grid gap-x-5 grid-col-1 md:grid-cols-2'>
                                    <CommonInput
                                        unnecessaryCharacters={true}
                                        max_input={4}
                                        required={true}
                                        label={t("Registration no")}
                                        type='number'
                                        value={addBankInfoForm?.reg_no}
                                        placeholder={t("Registration no")}
                                        onChange={(e) => { setAddBankInfoForm({ ...addBankInfoForm, reg_no: e.target.value }) }}
                                    />

                                    <CommonInput
                                        unnecessaryCharacters={true}
                                        required={true}
                                        max_input={'10'}
                                        label={t("Account no")}
                                        type='text'
                                        placeholder={t("Account no")}
                                        value={addBankInfoForm?.account_number}
                                        onChange={(e) => { setAddBankInfoForm({ ...addBankInfoForm, account_number: e.target.value }) }}
                                    />
                                </div>


                                <div className='flex flex-col sm:flex-row sm:justify-center'>
                                    <CommonButton roundedFull={false} width="w-[120px]" type='submit' btnLabel={t('Update')} />
                                </div>

                            </div>
                        </form>
                    </div>
                }
            />
        </div>
    );
};

export default AddBankInfoModal;