/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import CommonModal from '../../../Components/Modal/CommonModal'
import useClassStore, { addSchoolClass, getSchoolClassAddInfo } from '../../../App/Stores/classStore'
import CommonInput from '../../../Components/Input/CommonInput'
import SelectInput from '../../../Components/Input/SelectInput';
import CommonTimePicker from '../../../Components/CommonTimePicker';
import CommonButton from '../../../Components/Button/CommonButton';
import { useEffect } from 'react';
import moment from 'moment/moment';
import { MinToHour, timeToMinutes } from '../../../Utility/UtilityFunctions';
import { Toastr } from '../../../App/Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

function AddClassModal() {

    const { resetClassAddForm, showAddClassModal, setShowAddClassModal, schoolClassAddInfo, classAddForm, setClassAddForm } = useClassStore();

    const { t } = useTranslation();

    let location = useLocation();

    useEffect(() => {
        fetchClassInfoData();
    }, [showAddClassModal === true])

    const fetchClassInfoData = async () => {
        if (location.pathname === '/classes/list' || location.pathname === '/classes/calendar') {
            await getSchoolClassAddInfo();
        }
    }

    const category = schoolClassAddInfo?.category?.map((item, index) => (
        { title: item?.name, value: item?.id, selected: false }
    ))

    const classroom = schoolClassAddInfo?.classrooms?.map((item, index) => (
        { title: item?.name, value: item?.id, selected: false }
    ))

    const lessons = schoolClassAddInfo?.category?.filter(item => parseInt(item?.id) === parseInt(classAddForm?.school_category_id));

    let lessonsObj = {};
    for (let i = 0; i < lessons?.length; i++) {
        Object.assign(lessonsObj, lessons[i]);
    }
    const lessonsArray = lessonsObj?.lessons?.map((item, index) => (
        { title: item?.name, value: item?.id, selected: false }
    ));

    const duration = lessonsObj?.lessons?.filter(item => parseInt(item?.id) === parseInt(classAddForm?.lesson_id));

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (classAddForm.start_time === "00:00") return Toastr({ message: t("Time is required"), type: "warning" });

        if (moment(now).format('L') === moment(classAddForm?.date).format('L')
            && parseFloat(`${currentHour}.${currentMinute}`) > parseFloat(`${classAddForm?.start_time.replace(':', '.')}`)) {
            Toastr({ message: t("Invalid time"), type: "warning" });
        }
        else {
            const success = await addSchoolClass();
            if (success) {
                setShowAddClassModal(false);
                resetClassAddForm();
            }
        }
    }

    return (
        <div>
            <CommonModal
                showModal={showAddClassModal}
                setShowModal={setShowAddClassModal}
                modalTitle={t("Add class")}
                mainContent={
                    <div div className='mt-s20'>
                        <form onSubmit={handleSubmit}>
                            <div className='space-y-4'>
                                <SelectInput
                                    withStar={false}
                                    required={true}
                                    label={t("Choose category")}
                                    placeholder={t("Choose category")}
                                    value={classAddForm?.school_category_id}
                                    selectOptionOnChange={(e) => {
                                        setClassAddForm({
                                            ...classAddForm,
                                            school_category_id: e,
                                            lesson_id: "",
                                            classroom_id: "",
                                            date: "",
                                            start_time: "00:00",
                                            end_time: "00:00",
                                            instructor_type: "2",
                                            capacity: "",
                                            type: ""
                                        })
                                    }}
                                    dataArray={category}
                                />

                                <SelectInput
                                    withStar={false}
                                    required={true}
                                    value={classAddForm?.lesson_id}
                                    disabled={classAddForm?.school_category_id === "" ? true : false}
                                    dataArray={lessonsArray}
                                    selectOptionOnChange={(e) => {
                                        setClassAddForm({
                                            ...classAddForm,
                                            lesson_id: e,
                                            classroom_id: "",
                                            date: "",
                                            start_time: "00:00",
                                            end_time: "00:00",
                                            instructor_type: "2",
                                            capacity: "",
                                            type: ""
                                        })
                                    }}
                                    label={t("Choose lesson")}
                                    placeholder={t("Choose lesson")}
                                />

                                {
                                    classAddForm?.lesson_id &&
                                        lessonsObj?.lessons?.find(i => parseInt(i.id) ===
                                            parseInt(classAddForm?.lesson_id))?.type === "driving" ?
                                        <CommonInput
                                            disabled={classAddForm?.school_category_id === "" ? true : false}
                                            withStar={false}
                                            min_number={1}
                                            unnecessaryCharacters={true}
                                            max_input={2}
                                            type='number'
                                            required={true}
                                            onChange={(e) => {
                                                setClassAddForm({
                                                    ...classAddForm,
                                                    classroom_id: "",
                                                    date: "",
                                                    start_time: "00:00",
                                                    end_time: "00:00",
                                                    instructor_type: "2",
                                                    capacity: e.target.value,
                                                    type: lessonsObj?.lessons?.find(i => parseInt(i.id) ===
                                                        parseInt(classAddForm?.lesson_id))?.type
                                                })
                                            }}
                                            value={classAddForm?.capacity}
                                            label={t('Write capacity')}
                                            placeholder={t('Write capacity')}
                                        />
                                        : <SelectInput
                                            disabled={classAddForm?.school_category_id === "" ? true : false}
                                            withStar={false}
                                            required={true}
                                            dataArray={classroom}
                                            value={classAddForm?.classroom_id}
                                            selectOptionOnChange={(e) => {
                                                setClassAddForm({
                                                    ...classAddForm,
                                                    classroom_id: e,
                                                    date: "",
                                                    start_time: "00:00",
                                                    end_time: "00:00",
                                                    instructor_type: "2",
                                                    type: lessonsObj?.lessons?.find(i => parseInt(i.id) ===
                                                        parseInt(classAddForm?.lesson_id))?.type
                                                })
                                            }}
                                            label={t("Choose classroom")}
                                            placeholder={t("Choose classroom")}
                                        />
                                }

                                <CommonInput
                                    disabled={classAddForm?.school_category_id === "" ? true : false}
                                    withStar={false}
                                    required={true}
                                    value={classAddForm?.date}
                                    onChange={(e) => {
                                        setClassAddForm({
                                            ...classAddForm,
                                            start_time: "00:00",
                                            end_time: "00:00",
                                            date: e.target.value,
                                            instructor_type: "2"
                                        });
                                    }}
                                    type='date'
                                    label={t("Select date")}
                                    placeholder={t("Select date")}
                                />

                                <div className='grid grid-cols-2 gap-x-5'>
                                    <div>
                                        <div className={`text-start text-cHighlighted important_text mb-s8 w-full `}>{t("Start time")}</div>
                                        <CommonTimePicker
                                            disable={classAddForm?.school_category_id === "" ? true : false}
                                            withStar={false}
                                            required={true}
                                            label={t("Start time")}
                                            init_time={classAddForm?.start_time}
                                            showExtendedTimeUi={false}
                                            show_asterisk={false}
                                            onChange={(value) => {
                                                setClassAddForm({
                                                    ...classAddForm,
                                                    start_time: value,
                                                    end_time: value && duration?.length > 0 ? MinToHour(timeToMinutes(value) + duration[0]?.duration) : '00:00',
                                                    instructor_type: "2"
                                                });
                                            }}
                                        />
                                    </div>
                                    <CommonInput
                                        withStar={false}
                                        label={t('End time')}
                                        disabled={true}
                                        required={true}
                                        value={classAddForm?.end_time}
                                    />
                                </div>

                                <div className='flex items-center justify-center'>
                                    <CommonButton
                                        width="w-[120px]"
                                        roundedFull={false}
                                        type="submit"
                                        btnLabel={t('Add')}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                }
            />
        </div>
    )
}

export default AddClassModal
