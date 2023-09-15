/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useProfileStore, { getSchoolDeleteMessage, schoolProfileEdit } from '../../../App/Stores/profileStore';
import CommonModal from '../../../Components/Modal/CommonModal';
import ProfileImageUploader from '../../../Components/Image/ProfileImageUploader';
import { BaseUrlSrc } from '../../../App/Utility/Url';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';

const EditProfile = () => {

    const { setShowDeleteAccountModal, setEditForm, showEditProfileModal, setShowEditProfileModal, editFormData, schoolDashboardDetails, setEditFormData } = useProfileStore();

    const { t } = useTranslation();

    const submitProfileData = async (e) => {
        e.preventDefault();
        console.log("editFormData", editFormData)
        const success = await schoolProfileEdit();
        if (success) {
            setShowEditProfileModal(false)
        }
    }

    useEffect(() => {
        setEditFormData({
            ...editFormData,
            school_name: schoolDashboardDetails?.school?.name,
            school_contact_mail: schoolDashboardDetails?.school?.contact_mail,
            phone_number: schoolDashboardDetails?.school?.phone_number,
            cvr: schoolDashboardDetails?.school?.cvr,
            city: schoolDashboardDetails?.school?.city,
            zip: schoolDashboardDetails?.school?.zip,
            address: schoolDashboardDetails?.school?.address,
            website: schoolDashboardDetails?.school?.website,
            l_description: schoolDashboardDetails?.school?.l_description,
            cover: schoolDashboardDetails?.school?.cover,
            contact_mail: schoolDashboardDetails?.school?.contact_mail,
        })
    }, [schoolDashboardDetails])

    return (
        <>
            <CommonModal
                showModal={showEditProfileModal}
                setShowModal={setShowEditProfileModal}
                modalSpace={true}
                modalTitle={t("Edit school profile")}
                mainContent={
                    <>
                        <div className='flex justify-center mt-s20 mb-s8'>
                            <ProfileImageUploader
                                iImage={BaseUrlSrc + editFormData?.cover}
                                imageName="image"
                                imageUploader={setEditForm}
                                categoryImg={false} />
                        </div>   

                        <form onSubmit={submitProfileData}>
                            <div className='space-y-4'>

                                <CommonInput
                                    required={true}
                                    max_input={50}
                                    type="text"
                                    value={editFormData?.school_name}
                                    onChange={(e) => { setEditFormData({ ...editFormData, school_name: e.target.value }) }}
                                    label={t("Name" )}
                                    placeholder={t("Name")}
                                />



                                <CommonInput
                                    type="email"
                                    value={schoolDashboardDetails?.school?.user_email}
                                    label={t("Email")}
                                    placeholder={t("Email")}
                                    disabled={true}
                                    notEditable={true}
                                />


                                <div className="flex justify-between">
                                    <div className='w-s170 md:w-s270'>
                                        <CommonInput
                                            value={editFormData?.cvr}
                                            type="number"
                                            unnecessaryCharacters = {true}
                                            label='CVR'
                                            placeholder={"CVR"}
                                            disabled={true}
                                            notEditable={true}
                                        // disableIcon={iCvr}
                                        />
                                    </div>

                                    <div className='w-s170 md:w-s280'>
                                        <CommonInput
                                            unnecessaryCharacters={true}
                                            type="number"
                                            value={editFormData?.phone_number}
                                            max_input={'15'}
                                            onChange={(e) => { setEditFormData({ ...editFormData, phone_number: e.target.value }) }}
                                            label={t("Phone number")}
                                            placeholder={t("Phone number")}
                                        />
                                    </div>
                                </div>


                                <div className="flex justify-between">
                                    <div className='w-s170 md:w-s270'>
                                        <CommonInput
                                            value={editFormData?.city}
                                            type="text"
                                            label={t("City")}
                                            max_input={20}
                                            placeholder={t("City")}
                                            onChange={(e) => { setEditFormData({ ...editFormData, city: e.target.value }) }}
                                        />
                                    </div>

                                    <div className='w-s170 md:w-s280'>
                                        <CommonInput
                                            type="number"
                                            unnecessaryCharacters = {true}
                                            value={editFormData?.zip}
                                            max_input={6}
                                            onChange={(e) => { setEditFormData({ ...editFormData, zip: e.target.value }) }}
                                            label={t("Zip code")}
                                            placeholder={t("Zip code")}
                                        />
                                    </div>
                                </div>

                                <CommonInput
                                    type="text"
                                    value={editFormData?.address}
                                    max_input={'50'}
                                    label={t("Address")}
                                    onChange={(e) => { setEditFormData({ ...editFormData, address: e.target.value }) }}
                                    placeholder={t("Address")}
                                />


                                <CommonInput
                                    type="text"
                                    value={editFormData?.website}
                                    label={t("Website")}
                                    max_input={25}
                                    onChange={(e) => { setEditFormData({ ...editFormData, website: e.target.value }) }}
                                    placeholder={t("Website")} />



                                <CommonInput
                                    type="email"
                                    onChange={(e) => { setEditFormData({ ...editFormData, contact_mail: e.target.value }) }}
                                    value={editFormData?.contact_mail}
                                    label={t("Contact mail")}
                                    max_input={55}
                                    placeholder={t("Contact mail")}
                                />

                                <CommonInput
                                    value={editFormData?.l_description}
                                    onChange={(e) => { setEditFormData({ ...editFormData, l_description: e.target.value }) }}
                                    type="text"
                                    label={t("Description")}
                                    textarea="true"
                                    rows="5"
                                    max_input={255}
                                    placeholder={t("Description")}/>

                                <div className='flex justify-between '>
                                    <CommonButton onClick={() => { getSchoolDeleteMessage();setShowDeleteAccountModal(true); }} type="button" btnLabel={t("Delete school")} colorType="warning" roundedFull={false} />
                                    <CommonButton type="submit" btnLabel={t("Save changes")} colorType="primary" roundedFull={false} />
                                </div>
                            </div>
                        </form>
                    </>
                }
            />
        </>
    );
};

export default EditProfile;