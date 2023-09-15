/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import useClassroomStore, { schoolClassroomEditIndex } from '../../../App/Stores/classroomStore';
import CommonModal from '../../../Components/Modal/CommonModal';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import { useEffect } from 'react';
import CommonButtonOutlined from '../../../Components/Button/CommonButtonOutlined';
import { useTranslation } from 'react-i18next';

const EditClassroomModal = () => {

    const { setShowDeleteClassroomModal, setClassroomDeleteId, classroomDetails, showEditClassroomModal, setShowEditClassroomModal, classroomEditForm, setClassroomEditForm } = useClassroomStore();

    const { t } = useTranslation();

    const SubmitClassRoomData = (e) => {
        e.preventDefault();
        const success = schoolClassroomEditIndex();
        if (success) {
            setShowEditClassroomModal(false)

            setClassroomEditForm({
                id: "",
                name: "",
                address: "",
                city: "",
                zip: "",
                capacity: ""
            })
        }
    }
    useEffect(() => {
        setClassroomEditForm({
            id: classroomDetails?.id,
            name: classroomDetails?.name,
            address: classroomDetails?.address,
            city: classroomDetails?.city,
            zip: classroomDetails?.zip,
            capacity: classroomDetails?.capacity
        })
    }, [classroomDetails])

    return (
        <div>
            <CommonModal
                showModal={showEditClassroomModal}
                setShowModal={setShowEditClassroomModal}
                modalTitle={t("Edit classroom")}
                mainContent={
                    <>
                        <form onSubmit={SubmitClassRoomData}>
                            <div className='space-y-4 mt-s20'>
                                <div className='grid grid-cols-2 gap-x-5'>
                                    <CommonInput
                                        withStar={false}
                                        type='text'
                                        max_input={55}
                                        required={true}
                                        onChange={(e) => {
                                            setClassroomEditForm({ ...classroomEditForm, name: e.target.value })
                                        }}
                                        value={classroomEditForm?.name}
                                        label={t('Classroom name')}
                                        placeholder={t('Classroom name')} />

                                    <CommonInput
                                        withStar={false}
                                        max_input={5}
                                        min_input={0}
                                        max_number={'99999'}
                                        type='number'
                                        unnecessaryCharacters = {true}
                                        required={true}
                                        onChange={(e) => {
                                            setClassroomEditForm({ ...classroomEditForm, capacity: e.target.value })
                                        }}
                                        value={classroomEditForm?.capacity}
                                        label={t('Capacity')}
                                        placeholder={t('Capacity')} />
                                </div>
                                <CommonInput
                                    withStar={false}
                                    type='text'
                                    required={true}
                                    max_input={50}
                                    onChange={(e) => {
                                        setClassroomEditForm({ ...classroomEditForm, address: e.target.value })
                                    }}
                                    value={classroomEditForm?.address}
                                    label={t('Address')}
                                    placeholder={t('Address')}
                                />

                                <div className='grid grid-cols-2 gap-x-5'>
                                    <CommonInput
                                        withStar={false}
                                        type='text'
                                        required={true}
                                        onChange={(e) => {
                                            setClassroomEditForm({ ...classroomEditForm, city: e.target.value })
                                        }}
                                        value={classroomEditForm?.city}
                                        label={t('City')}
                                        placeholder={t('City')}
                                        max_input={15}
                                    />
                                    <CommonInput
                                        withStar={false}
                                        max_input={6}
                                        min_input={4}
                                        type='number'
                                        unnecessaryCharacters = {true}
                                        required={true}
                                        onChange={(e) => {
                                            setClassroomEditForm({ ...classroomEditForm, zip: e.target.value })
                                        }}
                                        value={classroomEditForm?.zip}
                                        label={t('Zip code')}
                                        placeholder={t('Zip code')}
                                    />
                                </div>
                                <div className='flex justify-between'>
                                    <CommonButtonOutlined
                                        width={'w-[120px]'}
                                        isFullRounded={false}
                                        onClick={async () => {
                                            await setClassroomDeleteId(classroomDetails?.id);
                                            setShowDeleteClassroomModal(true)
                                        }} btnLabel={t('Delete')}
                                        colorType='danger' />

                                    <CommonButton
                                     width={'w-[120px]'}
                                        type='submit'
                                        btnLabel={t("update")}
                                        roundedFull={false}
                                    />
                                </div>
                            </div>
                        </form>
                    </>
                }
            />
        </div>
    );
};

export default EditClassroomModal;