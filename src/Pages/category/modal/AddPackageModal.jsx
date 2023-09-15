import React from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import useSchoolCategoryStore, { addSchoolCategoryPackage } from '../../../App/Stores/schoolCategoryStore';
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
import CommonCheckBox from '../../../Components/Input/CommonCheckBox';

const AddPackageModal = () => {

    const { showAddPackageModal, setShowAddPackageModal, addPackageForm, setAddPackageForm, schoolCategoryLessonList } = useSchoolCategoryStore();

    const { t } = useTranslation();

    const [price, setPrice] = useState(0);

    const { category_id } = useParams();

    useEffect(() => {
        setPrice(addPackageForm?.price)
    }, [addPackageForm?.price]);

    const submitData = async (e) => {
        e.preventDefault();
        setAddPackageForm({ ...addPackageForm, school_category_id: category_id });
        if (!addPackageForm.lessons?.length > 0) return Toastr({ message: t("Please select at least one lesson"), type: "warning" });

        if (price <= addPackageForm.price) {
            setAddPackageForm({ ...addPackageForm, price: price, school_category_id: category_id });
            const success = await addSchoolCategoryPackage();
            if (success) {
                setAddPackageForm({
                    school_category_id: "",
                    title: "",
                    stock: "",
                    description: "",
                    price: 0,
                    duration: 0,
                    lessons: []
                })
                setShowAddPackageModal(false);
            }
        } else {
            Toastr({ message: t("Price can not be higher than the total price"), type: "warning" });
        }
    }

    return (
        <div>
            <CommonModal
                modalSpace={true}
                showModal={showAddPackageModal}
                setShowModal={setShowAddPackageModal}
                modalTitle={t("Add Package")}
                mainContent={
                    <form onSubmit={submitData}>
                        <div className='space-y-4 mt-s20'>
                            <CommonInput
                                type='text'
                                max_input={55}
                                value={addPackageForm?.title}
                                label={t("Title")}
                                placeholder={t("Title")}
                                required={true}
                                onChange={(e) => {
                                    setAddPackageForm({ ...addPackageForm, title: e.target.value })
                                }}
                            />

                            <CommonInput
                                type='number'
                                max_input={2}
                                min_number={1}
                                unnecessaryCharacters={true}
                                value={addPackageForm?.stock}
                                label={t("Capacity")}
                                placeholder={t("Capacity")}
                                required={true}
                                onChange={(e) => {
                                    setAddPackageForm({ ...addPackageForm, stock: e.target.value })
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
                                        init_time={MinToHour(addPackageForm?.duration)}
                                        showExtendedTimeUi={false}
                                        show_asterisk={false}
                                    />
                                </div>

                                <CommonInput
                                    disabled={addPackageForm?.lessons?.length > 0 ? false : true}
                                    min_number={'0'}
                                    unnecessaryCharacters={true}
                                    type={'number'}
                                    max_input={8}
                                    min_input={0}
                                    value={price}
                                    label={t("Price")}
                                    placeholder={t("Price")}
                                    required={true}
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                />
                            </div>

                            <CommonInput
                                textarea={true}
                                max_input={255}
                                value={addPackageForm?.description}
                                label={t("Description")}
                                placeholder={t("Description")}
                                onChange={(e) => {
                                    setAddPackageForm({ ...addPackageForm, description: e.target.value })
                                }}
                            />

                            <div>
                                <div className="text-fs14 font-fw600 text-cMainBlack pb-s5">Lesson List</div>
                                <div className={`space-y-2 overflow-y-auto ${schoolCategoryLessonList?.length > 4 ? 'h-[295px]' : 'h-full'} `}>
                                    {schoolCategoryLessonList?.length > 0 ?
                                        schoolCategoryLessonList?.map((item, index) => (
                                            <CommonList
                                                title={item?.lesson_name}
                                                total_price={item?.price}
                                                lessons_id={item?.id}
                                                key={index}
                                                lesson_type={item?.lesson_type}
                                                duration={item?.duration_time}
                                                discount_price={price}
                                                date={item?.duration_title}
                                            />
                                        )) : <div className='flex items-center justify-center'>{t("No Lesson")}</div>}
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <CommonButton
                                    roundedFull={false}
                                    btnLabel={t('Add')}
                                    type="submit"
                                />
                            </div>
                        </div>
                    </form>
                }
            />
        </div>
    );
};

export default AddPackageModal;


export const CommonList = ({ date, title, total_price, lessons_id, lesson_type, duration, discount_price }) => {

    const { addPackageForm, setAddPackageForm } = useSchoolCategoryStore();

    const discountPercentage = ((addPackageForm?.price - discount_price) / addPackageForm?.price) * 100;

    const discount = (total_price * discountPercentage) / 100;

    const CheckStatus = async () => {
        if (addPackageForm?.lessons?.includes(lessons_id)) {
            const filter_data = await addPackageForm?.lessons?.filter((item) => item !== lessons_id)
            await setAddPackageForm({
                ...addPackageForm,
                lessons: filter_data,
                price: parseInt(addPackageForm?.price) - parseInt(total_price),
                duration: addPackageForm?.duration - parseInt(duration)
            })
        } else {
            await setAddPackageForm({
                ...addPackageForm,
                lessons: [...addPackageForm?.lessons, lessons_id],
                price: addPackageForm?.price + parseInt(total_price),
                duration: addPackageForm?.duration + parseInt(duration)
            })
        }
    }

    return (
        <div onClick={CheckStatus} className='flex justify-between cursor-pointer bg-cInvoiceLesson rounded-br8 pl-s8 py-s8'>
            <div className='flex space-x-3 '>
                <div className='min-w-[50px] max-w-[50px] h-s50 bg-cWhite rounded-full flex justify-center items-center'>
                    <img className='w-s30 h-s30 grow-0'
                        src={(lesson_type === 'driving' && iDrivingCard) ||
                            (lesson_type === 'external' && iExternalCard) ||
                            (lesson_type === 'classroom' && iSchoolClassroomLesson)}
                        alt="" />
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
                    {/* DKK {price?.toLocaleString("da-DK") ?? '0'} */}
                    DKK {
                        addPackageForm?.lessons?.includes(lessons_id) && discount_price < addPackageForm.price ?
                            Math.round(total_price - discount)?.toLocaleString("da-DK")
                            : total_price?.toLocaleString("da-DK") ?? '0'}
                </div>
                <CommonCheckBox
                    value={lessons_id}
                    checked={addPackageForm?.lessons?.includes(lessons_id)}
                    onChange={async (e) => { await CheckStatus(); console.log(""); }}
                />
            </div>
        </div>
    )
}