/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import useSchoolCategoryStore, { editSchoolCategoryPackage } from '../../../App/Stores/schoolCategoryStore';
import { useTranslation } from 'react-i18next';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonTimePicker from '../../../Components/CommonTimePicker';
import CommonButton from '../../../Components/Button/CommonButton';
import { iDrivingCard, iExternalCard, iSchoolClassroomLesson } from '../../../App/Utility/source';
import { MinToHour } from '../../../Utility/UtilityFunctions';
import { useState } from 'react';
import { useEffect } from 'react';
import { Toastr } from '../../../App/Utility/UtilityFunctions';
import { useParams } from 'react-router-dom';
import DeletePackageModal from './DeletePackageModal';
import CommonCheckBox from '../../../Components/Input/CommonCheckBox';

const EditPackageModal = () => {

    const { resetEditPackageForm, setShowDeletePackageModal, packageDetails, showEditPackageModal, setShowEditPackageModal, editPackageForm, setEditPackageForm, schoolCategoryLessonList } = useSchoolCategoryStore();

    const { t } = useTranslation();

    const [price, setPrice] = useState(0);

    const { category_id } = useParams();

    const selected_lesson = editPackageForm?.lessons?.map((item, index) => (
        schoolCategoryLessonList?.find(i => i?.id === item)
    ))

    const selected_price = selected_lesson?.map((item, index) => (
        item?.price
    ))

    let total_price = selected_price?.reduce(function (a, b) { return a + b; }, 0);

    const submitData = async (e) => {
        e.preventDefault();
        await setEditPackageForm({ ...editPackageForm, price: price, school_category_id: category_id });
        if (!editPackageForm.lessons?.length > 0) return Toastr({ message: t("Please select at least one lesson"), type: "warning" });
        const success = await editSchoolCategoryPackage();
        if (success) {
            resetEditPackageForm();
            setShowEditPackageModal(false);
        }
    }

    useEffect(() => {
        setPrice(editPackageForm?.price)
    }, [editPackageForm?.price]);

    const lesson = packageDetails?.lessons?.map((item, index) => (
        item?.lesson_id
    ))

    useEffect(() => {
        setEditPackageForm({
            id: packageDetails?.id,
            school_category_id: packageDetails?.school_category_id,
            title: packageDetails?.title ?? "",
            stock: packageDetails?.stock ?? 0,
            description: packageDetails?.description ?? "",
            price: packageDetails?.price ?? 0,
            duration: packageDetails?.duration ?? "00:00",
            lessons: lesson
        });
        setPrice(packageDetails?.price)
    }, [packageDetails, showEditPackageModal === true]);


    return (
        <div>
            <CommonModal
                modalSpace={true}
                showModal={showEditPackageModal}
                setShowModal={setShowEditPackageModal}
                modalTitle={t("Edit Package")}
                mainContent={
                    <form onSubmit={submitData}>
                        <div className='space-y-4 mt-s20'>
                            <CommonInput
                                max_input={55}
                                value={editPackageForm?.title}
                                label={t("Title")}
                                placeholder={t("Title")}
                                required={true}
                                onChange={(e) => {
                                    setEditPackageForm({ ...editPackageForm, title: e.target.value })
                                }}
                            />

                            <CommonInput
                                type='number'
                                max_input={2}
                                min_number={1}
                                unnecessaryCharacters={true}
                                value={editPackageForm?.stock}
                                label={t("Capacity")}
                                placeholder={t("Capacity")}
                                required={true}
                                onChange={(e) => {
                                    setEditPackageForm({ ...editPackageForm, stock: e.target.value })
                                }}
                            />

                            <div className='grid grid-cols-2 gap-x-5'>

                                <div>
                                    <div className={`text-start text-cHighlighted important_text mb-s8 w-full `}>{t("Duration")}</div>
                                    <CommonTimePicker
                                        disable={true}
                                        withStar={false}
                                        required={true}
                                        label={t("Duration")}
                                        init_time={MinToHour(editPackageForm?.duration)}
                                        showExtendedTimeUi={false}
                                        show_asterisk={false}
                                    />
                                </div>

                                <CommonInput
                                    disabled={editPackageForm?.lessons?.length > 0 ? false : true}
                                    min_number={'0'}
                                    max_input={8}
                                    min_input={0}
                                    unnecessaryCharacters={true}
                                    max_number={total_price}
                                    type={'number'}
                                    value={price}
                                    label={t("Price")}
                                    placeholder={t("Price")}
                                    required={true}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                    }}
                                />
                            </div>

                            <CommonInput
                                textarea={true}
                                max_input={255}
                                value={editPackageForm?.description}
                                label={t("Description")}
                                placeholder={t("Description")}
                                onChange={(e) => {
                                    setEditPackageForm({ ...editPackageForm, description: e.target.value })
                                }}
                            />

                            <div>
                                <div className="text-fs14 font-fw600 text-cMainBlack pb-s5">Lesson List</div>
                                <div className={`space-y-2 overflow-y-auto ${schoolCategoryLessonList?.length > 4 ? 'h-[295px]' : 'h-full'} `}>
                                    {schoolCategoryLessonList?.length > 0 ?
                                        schoolCategoryLessonList?.map((item, index) => (
                                            <>

                                                <CommonList
                                                    title={item?.lesson_name}
                                                    price={
                                                        item?.price
                                                    }
                                                    main_price={price}
                                                    lessons_id={item?.id}
                                                    key={index}
                                                    lesson_type={item?.lesson_type}
                                                    duration={item?.duration_time}
                                                    discount_price={price}
                                                    date={item?.duration_title}
                                                />
                                            </>
                                        )) : <div className='flex items-center justify-center'>{t("No Lesson")}</div>}
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <CommonButton
                                    onClick={() => setShowDeletePackageModal(true)}
                                    roundedFull={false}
                                    btnLabel='Delete'
                                    colorType='danger'
                                />
                                <CommonButton
                                    roundedFull={false}
                                    btnLabel={t('Update')}
                                    type="submit"
                                />
                            </div>
                        </div>
                    </form>
                }
            />
            <DeletePackageModal id={packageDetails?.id} />
        </div>
    );
};

export default EditPackageModal;


export const CommonList = ({ price_selected, date, title, price, lessons_id, lesson_type, duration, discount_price, main_price }) => {

    const { editPackageForm, setEditPackageForm, schoolCategoryLessonList } = useSchoolCategoryStore();

    const selected_lesson = editPackageForm?.lessons?.map((item, index) => (
        schoolCategoryLessonList?.find(i => i?.id === item)
    ))

    const selected_price = selected_lesson?.map((item, index) => (
        item?.price
    ))

    let total_price = selected_price?.reduce(function (a, b) { return a + b; }, 0);

    const discount_percentage = ((total_price - main_price) / total_price) * 100

    const discount = (price * discount_percentage) / 100;

    const CheckStatus = async () => {

        if (editPackageForm?.lessons?.includes(lessons_id)) {
            const filter_data = await editPackageForm?.lessons?.filter((item) => item !== lessons_id)
            await setEditPackageForm({
                ...editPackageForm,
                lessons: filter_data,
                price: parseInt(total_price) - parseInt(price),
                duration: editPackageForm?.duration - parseInt(duration)
            })
        } else {
            await setEditPackageForm({
                ...editPackageForm,
                lessons: [...editPackageForm?.lessons, lessons_id],
                price: total_price + parseInt(price),
                duration: editPackageForm?.duration + parseInt(duration)
            })
        }
    }

    return (
        <div onClick={async () => { await CheckStatus() }} className='flex justify-between cursor-pointer bg-cInvoiceLesson rounded-br8 pl-s8 py-s8'>
            <div className='flex space-x-3 '>
                <div className='min-w-[50px] max-w-[50px] h-s50 bg-cWhite rounded-full flex justify-center items-center'>
                    <img className='w-s30 h-s30 grow-0'
                        src={(lesson_type === 'driving' && iDrivingCard) ||
                            (lesson_type === 'external' && iExternalCard) ||
                            (lesson_type === 'classroom' && iSchoolClassroomLesson)}
                        alt=""
                    />
                </div>
                <div className='flex items-center justify-center'>
                    <div>
                        <div className='text-[#202020] text-fs14 font-fw600 capitalize mb-s4 truncate min-w-[250px] max-w-[250px]'>{title ?? 'NA'}</div>
                        <div className='text-[#202020] body_text'>
                            {date ?? 'NA'}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex'>
                <div className='text-[#202020] flex justify-center items-center text-fs12 font-fw400 mr-s20'>
                    {/* DKK {
                        price_selected && editPackageForm?.lessons?.includes(lessons_id)
                        && discount_price < editPackageForm.price ? Math.round(price - discount)?.toLocaleString("da-DK") :
                            editPackageForm?.lessons?.includes(lessons_id)
                                && total_price > discount_price  ?
                                Math.round(price - discount)?.toLocaleString("da-DK") :
                                price?.toLocaleString("da-DK") ?? '0'
                    } */}

                    DKK {
                        editPackageForm?.lessons?.includes(lessons_id)
                            && total_price > discount_price ?
                            Math.round(price - discount)?.toLocaleString("da-DK") :
                            price?.toLocaleString("da-DK") ?? '0'
                    }
                </div>
                <CommonCheckBox
                    value={lessons_id}
                    checked={editPackageForm?.lessons?.includes(lessons_id)}
                    onChange={async () => {
                        await CheckStatus();
                        console.log("");
                    }}
                />
            </div>
        </div>
    )
}