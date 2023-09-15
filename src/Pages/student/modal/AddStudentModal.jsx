/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import useSchoolStudentStore, { categoryIndex, inviteStudent, packageIndex } from '../../../App/Stores/schoolStudentStore'
import CommonModal from '../../../Components/Modal/CommonModal';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import SelectInput from '../../../Components/Input/SelectInput';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const AddStudentModal = () => {

    const { resetStudentAddForm, packageList, setStudentAddForm, showAddStudentModal, setShowAddStudentModal, categoryList, studentAddForm } = useSchoolStudentStore();

    const { t } = useTranslation();

    const location = useLocation();

    useEffect(() => {
        if (location?.pathname === '/school-student') {
            categoryIndex();
        }
    }, [])

    const categoryActiveList = categoryList?.filter(item => item.is_active === "true" || item.is_active === true)

    const packageActiveList = packageList?.filter(i=>i?.is_active === 1 && i?.in_stock > 0)

    const packageSelect = packageActiveList?.length > 0 ?
    packageActiveList?.map((item, index) => (
            {
                title: item?.title,
                value: item?.id,
                selected: false,
                index: index
            }
        )) : []

    const submitData = (e) => {
        e.preventDefault();
        const success = inviteStudent();
        if (success) {
            resetStudentAddForm();
            setShowAddStudentModal(false)
        }
    }

    return (
        <>
            <CommonModal
                showModal={showAddStudentModal}
                setShowModal={setShowAddStudentModal}
                modalTitle={t("Add Student")}
                mainContent={
                    <>
                        <form onSubmit={submitData}>
                            <div className="space-y-5">
                                <CommonInput
                                    value={studentAddForm?.name}
                                    type="text"
                                    required
                                    withStar={false}
                                    label={t('Name')}
                                    placeholder={t('Write name')}
                                    onChange={(e) => {
                                        setStudentAddForm({ ...studentAddForm, name: e.target.value })
                                    }}
                                />
                                <CommonInput
                                    value={studentAddForm?.email}
                                    required
                                    withStar={false}
                                    label={t('Email')}
                                    type='email'
                                    placeholder={t('Write email')}
                                    onChange={(e) => {
                                        setStudentAddForm({ ...studentAddForm, email: e.target.value })
                                    }}
                                />

                                <SelectInput
                                    dataArray={categoryActiveList?.map((item, index) => (
                                        {
                                            title: item?.category_name,
                                            value: item?.id,
                                            selected: false,
                                            index: index
                                        }))}
                                    required
                                    withStar={false}
                                    label={t('Category')}
                                    placeholder={'Select category'}
                                    selectOptionOnChange={(e) => {
                                        setStudentAddForm({ ...studentAddForm, category_id: e, package_id: "", price: 0 });
                                        packageIndex(e);
                                    }}
                                />

                                <SelectInput
                                    emptyText={studentAddForm?.category_id && !packageSelect?.length > 0 ?
                                        t("There are no packages in this category") : t("Select package")}
                                    disabled={!studentAddForm?.category_id}
                                    dataArray={packageSelect}
                                    required
                                    withStar={false}
                                    label={'Package'}
                                    placeholder={'Select package'}
                                    selectOptionOnChange={(e) => {
                                        const findPackage = packageList?.find(item => parseInt(item?.id) === parseInt(e))
                                        setStudentAddForm({
                                            ...studentAddForm, package_id: e,
                                            price: findPackage?.price,
                                            lessons: findPackage?.lessons?.map((item, index) => (
                                                item?.lesson_id
                                            ))
                                        })
                                    }}
                                />

                                <CommonInput
                                    max_input={(studentAddForm?.lessons.length * 999999).toString().length}
                                    unnecessaryCharacters={true}
                                    value={studentAddForm?.price}
                                    required
                                    withStar={false}
                                    min_number={0}
                                    max_number={packageList?.find(item => parseInt(item?.id) === parseInt(studentAddForm?.package_id))?.price}
                                    label={'price'}
                                    type='number'
                                    placeholder={'Write price'}
                                    onChange={(e) => {
                                        setStudentAddForm({ ...studentAddForm, price: e.target.value })
                                    }}
                                />
                                <div className="flex justify-center">
                                    <CommonButton
                                        width='w-[120px]'
                                        type='submit'
                                        btnLabel={t('Add')}
                                        roundedFull={false}
                                    />
                                </div>
                            </div>
                        </form>
                    </>
                }
            />
        </>
    )
}

export default AddStudentModal