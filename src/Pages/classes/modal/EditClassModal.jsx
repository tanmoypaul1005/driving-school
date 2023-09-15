/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import CommonModal from '../../../Components/Modal/CommonModal'
import useClassStore, { editSchoolClass, getSchoolClassAddInfo } from '../../../App/Stores/classStore'
import CommonInput from '../../../Components/Input/CommonInput'
import SelectInput from '../../../Components/Input/SelectInput';
import CommonTimePicker from '../../../Components/CommonTimePicker';
import CommonButton from '../../../Components/Button/CommonButton';
import { useEffect } from 'react';
import { MinToHour, timeToMinutes } from '../../../Utility/UtilityFunctions';
import CommonButtonOutlined from '../../../Components/Button/CommonButtonOutlined';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import moment from 'moment/moment';
import { Toastr } from '../../../App/Utility/UtilityFunctions';
import useDashboardStore, { getDashboard } from '../../../App/Stores/dashboardStore';


function EditClassModal() {

    const { setShowDeleteClassModal, setSchoolDeleteId, schoolDetails, showEditClassModal, setShowEditClassModal, schoolClassAddInfo, classEditForm, setClassEditForm } = useClassStore();

    const { pendingBookingLessonsUpdate,pendingBookingLessonsUrl} = useDashboardStore();

    const { t } = useTranslation();

    const category = schoolClassAddInfo?.category?.map((item, index) => (
        { title: item?.name, value: item?.id, selected: false }
    ))

    const classroom = schoolClassAddInfo?.classrooms?.map((item, index) => (
        { title: item?.name, value: item?.id, selected: false }
    ))

    const lessons = schoolClassAddInfo?.category?.filter(item => parseInt(item?.id) === parseInt(classEditForm?.school_category_id));

    let lessonsObj = {};
    for (let i = 0; i < lessons?.length; i++) {
        Object.assign(lessonsObj, lessons[i]);
    }
    const lessonsArray = lessonsObj?.lessons?.map((item, index) => (
        { title: item?.name, value: item?.id, selected: false }
    ))

    const duration = lessonsObj?.lessons?.filter(item => parseInt(item?.id) === parseInt(classEditForm?.lesson_id));

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (classEditForm.start_time === "00:00") return Toastr({ message: t("Time is required"), type: "warning" });
        if (moment(now).format('L') === moment(classEditForm?.date).format('L')
            && parseFloat(`${currentHour}.${currentMinute}`) > parseFloat(`${classEditForm?.start_time.replace(':', '.')}`)) {
            Toastr({ message: t("Invalid time"), type: "warning" });
        } else {
            const success = editSchoolClass();
            if (success) {
                pendingBookingLessonsUpdate && getDashboard(pendingBookingLessonsUrl);
                setShowEditClassModal(false);
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [showEditClassModal === true,schoolDetails])

    let location = useLocation();

    const fetchData = async () => {
        if (location.pathname === '/classes/list' || location.pathname === '/classes/calendar' || location.pathname === '/') {
            await getSchoolClassAddInfo();
        }
    }

    useEffect(() => {
        setClassEditForm({
            id: schoolDetails?.id,
            school_category_id: schoolDetails?.school_category_id,
            lesson_id: schoolDetails?.lesson_id,
            classroom_id: schoolDetails?.classroom_id,
            date: schoolDetails?.date_raw,
            start_time: schoolDetails?.start_time,
            end_time: schoolDetails?.end_time,
            instructor_type: "2",
            capacity: schoolDetails?.class_capacity,
            type: schoolDetails?.type
        })
    }, [schoolDetails, showEditClassModal === true])

    return (
        <div>
            <CommonModal
                showModal={showEditClassModal}
                setShowModal={setShowEditClassModal}
                modalTitle={pendingBookingLessonsUpdate ?t("Pending Booking Lessons") :t("Edit Class Details")}
                mainContent={
                    <div className="mt-s20">
                        <form onSubmit={handleSubmit}>
                            <div className='space-y-4'>
                                <SelectInput
                                    withStar={false}
                                    required={true}
                                    label={t("Choose category")}
                                    placeholder={t("Choose category")}
                                    value={classEditForm?.school_category_id}
                                    selectOptionOnChange={(e) => {

                                        setClassEditForm({
                                            ...classEditForm,
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
                                    value={classEditForm?.lesson_id}
                                    disabled={classEditForm?.school_category_id === "" ? true : false}
                                    dataArray={lessonsArray}
                                    selectOptionOnChange={(e) => {
                                        setClassEditForm({
                                            ...classEditForm,
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

                                {classEditForm?.lesson_id &&
                                    lessonsObj?.lessons?.find(i => parseInt(i.id) ===
                                        parseInt(classEditForm?.lesson_id)).type === "driving" ?
                                    <CommonInput
                                        disabled={classEditForm?.school_category_id === "" ? true : false}
                                        withStar={false}
                                        min_number={1}
                                        unnecessaryCharacters={true}
                                        max_input={2}
                                        type='number'
                                        required={true}
                                        onChange={(e) => {
                                            setClassEditForm({
                                                ...classEditForm,
                                                classroom_id: "",
                                                date: "",
                                                start_time: "00:00",
                                                end_time: "00:00",
                                                instructor_type: "2",
                                                capacity: e.target.value,
                                                type: lessonsObj?.lessons?.find(i => parseInt(i.id) ===
                                                    parseInt(classEditForm?.lesson_id))?.type
                                            })
                                        }}
                                        value={classEditForm?.capacity}
                                        label={t('Write capacity')}
                                        placeholder={t('Write capacity')}
                                    />
                                    : <SelectInput
                                        disabled={classEditForm?.school_category_id === "" ? true : false}
                                        withStar={false}
                                        required={true}
                                        dataArray={classroom}
                                        value={classEditForm?.classroom_id}
                                        selectOptionOnChange={(e) => {
                                            setClassEditForm({
                                                ...classEditForm,
                                                classroom_id: e,
                                                date: "",
                                                start_time: "00:00",
                                                end_time: "00:00",
                                                instructor_type: "2",
                                                type: lessonsObj?.lessons?.find(i => parseInt(i.id) ===
                                                    parseInt(classEditForm?.lesson_id))?.type
                                            })
                                        }}
                                        label={t("Choose classroom")}
                                        placeholder={t("Choose classroom")}
                                    />
                                }
                                <CommonInput
                                    disabled={classEditForm?.school_category_id === "" ? true : false}
                                    withStar={false}
                                    required={true}
                                    value={classEditForm?.date}
                                    allowPastDates={true}
                                    onChange={(e) => {
                                        setClassEditForm({
                                            ...classEditForm,
                                            date: e.target.value,
                                            start_time: "00:00",
                                            end_time: "00:00",
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
                                            disable={classEditForm?.school_category_id === "" ? true : false}
                                            withStar={false}
                                            required={true}
                                            showExtendedTimeUi={false}
                                            show_asterisk={false}
                                            label={t("Start time")}
                                            init_time={classEditForm?.start_time}
                                            onChange={(value) => {
                                                setClassEditForm({
                                                    ...classEditForm,
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
                                        value={classEditForm?.end_time}
                                    />
                                </div>


                                {schoolDetails?.status !== "completed" && <div className='mb-s20'></div>}
                                {schoolDetails?.status !== "completed" && <div className='flex items-center justify-between'>
                                    <CommonButtonOutlined
                                        width={'w-[120px]'}
                                        isFullRounded={false}
                                        onClick={() => {
                                            setSchoolDeleteId(schoolDetails?.id);
                                            setShowDeleteClassModal(true);
                                        }}
                                        colorType='danger'
                                        type="submit"
                                        btnLabel={t('Delete')}
                                    />
                                    <CommonButton width={'w-[120px]'} roundedFull={false} type="submit" btnLabel={t('Update')} />
                                </div>}
                            </div>
                        </form>
                    </div>
                }
            />
        </div>
    )
}

export default EditClassModal
