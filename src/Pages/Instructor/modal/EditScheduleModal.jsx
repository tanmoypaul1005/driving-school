/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import useSchoolInstructorStore, { getInstructorSchedule, instructorScheduleEdit } from '../../../App/Stores/schoolInstructorStore'
import CommonModal from '../../../Components/Modal/CommonModal';
import { useTranslation } from 'react-i18next';
import CommonCheckBox from '../../../Components/Input/CommonCheckBox';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonTimePicker from '../../../Components/CommonTimePicker';
import CommonButton from '../../../Components/Button/CommonButton';
import { iWhiteCross } from '../../../App/Utility/source';
import { Toastr } from '../../../App/Utility/UtilityFunctions';
import { useEffect } from 'react';
import { dateFormatRowTo } from '../../../Utility/UtilityFunctions';

const EditScheduleModal = () => {

    const {
        scheduleDetails, schoolInstructorDetails, currentDate,
        setScheduleTimeEditForm, scheduleTimeEditForm,
        showEditScheduleModal, setShowEditScheduleModal,
        editScheduleFormData, setEditScheduleFormData } = useSchoolInstructorStore();

    const { t } = useTranslation();

    //console.log("scheduleDetails", scheduleDetails)

    useEffect(() => {
        fetchData()
    }, [scheduleDetails])

    const fetchData = async () => {
        const v = await scheduleDetails?.available_times?.map((item, index) => (
            {
                id: item?.id,
                start_time: item.start_timef,
                end_time: item?.end_timef,
                days: [item?.fri === 1 && "fri", item?.sat === 1 && "sat", item?.sun === 1 && "sun",
                item?.mon === 1 && "mon", item?.thu === 1 && "thu", item?.tue === 1 && "tue", item?.wed === 1
                && "wed"
                ].filter(Boolean)
            }
        ))

        await setScheduleTimeEditForm({ days: v?.length > 0 ? v[0]?.days : [] })

        setEditScheduleFormData({
            id: scheduleDetails?.id,
            is_recurring: scheduleDetails?.is_recurring === 1 ? true : false,
            times: v,
            deletable_ids: [],
            instructor_id: scheduleDetails?.instructor_id,
        })
    }

    return (
        <div>
            <CommonModal
                showModal={showEditScheduleModal}
                setShowModal={setShowEditScheduleModal}
                modalSpace={true}
                modalTitle={t("Edit Schedule")}
                widthClass='w-[750px]'
                mainContent={
                    <>
                        <div className="flex mt-s20">
                            <div className="font-fw600 text-fs14 text-cBlack mr-s20">{t("Add Date & Time")}</div>
                            <CommonCheckBox checked={editScheduleFormData?.is_recurring}
                                onChange={() => {
                                    setEditScheduleFormData({
                                        ...editScheduleFormData,
                                        is_recurring: !editScheduleFormData?.is_recurring
                                    })
                                }}
                                paddingLeft="8px" paddingRight="1px" />
                            <div className="font-fw400 text-fs14 text-cBlack">{t("Recurring")}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-5 my-s20">
                            <CommonInput
                                withStar={false}
                                required={true}
                                disabled={true}
                                value={dateFormatRowTo(scheduleDetails?.start_date_raw)}
                                type='date'
                                label={t("Start date")}
                                placeholder={t("Select date")}
                            />

                            {
                             editScheduleFormData?.is_recurring &&
                                <CommonInput
                                    withStar={false}
                                    required={true}
                                    disabled={true}
                                    value={dateFormatRowTo(scheduleDetails?.end_date_raw)}
                                    allowPastDates={true}
                                    type='date'
                                    label={t("End date")}
                                    placeholder={t("Select date")}
                                />
                            }
                        </div>
                        <div className="bg-cSelectedBar p-s12 rounded-br10">
                            <div className="font-fw600 text-fs14 text-cBlack mb-s12">{t("Selected day")}</div>
                            <div className="flex items-center justify-between">
                                <DayList day={"mon"} />
                                <DayList day={"tue"} />
                                <DayList day={"wed"} />
                                <DayList day={"thu"} />
                                <DayList day={"fri"} />
                                <DayList day={"sat"} />
                                <DayList day={"sun"} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-5 mt-s20">
                            <div>
                                <div className={`text-start text-cHighlighted important_text mb-s8 w-full `}>{t("Start time")}</div>
                                <CommonTimePicker
                                    required={true}
                                    showExtendedTimeUi={false}
                                    show_asterisk={false}
                                    label={t("Start time")}
                                    init_time={scheduleTimeEditForm?.start_time}
                                    onChange={(value) => {
                                        if(editScheduleFormData?.is_recurring){
                                            setScheduleTimeEditForm({ ...scheduleTimeEditForm,
                                                start_time: value,
                                            })
                                        }else{
                                            setScheduleTimeEditForm({ ...scheduleTimeEditForm,
                                                start_time: value,
                                                days:[new Date(scheduleDetails?.start_date_raw).toLocaleDateString('en-US', 
                                                {weekday: 'short'}).toLowerCase()]
                                            })
                                        }
                                    }}
                                />
                            </div>

                            <div>
                                <div className={`text-start text-cHighlighted important_text mb-s8 w-full `}>{t("End time")}</div>
                                <CommonTimePicker
                                    required={true}
                                    showExtendedTimeUi={false}
                                    show_asterisk={false}
                                    label={t("End time")}
                                    init_time={scheduleTimeEditForm?.end_time}
                                    onChange={(value) => {
                                        setScheduleTimeEditForm({ ...scheduleTimeEditForm, end_time: value })
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-center my-s20">
                            <CommonButton
                                colorType='secondary'
                                roundedFull={false}
                                btnLabel={t("Add Time")}
                                onClick={async () => {
                                    if(scheduleTimeEditForm?.start_time === "00:00" &&
                                       scheduleTimeEditForm?.end_time ==="00:00"){
                                        Toastr({ message: t("Invalid time!"), type: "warning" });
                                    }else{
                                        const isOverlapping = editScheduleFormData?.times?.some(
                                            ({ start_time, end_time }) =>
                                                (scheduleTimeEditForm?.start_time >= start_time &&
                                                    scheduleTimeEditForm?.start_time < end_time) ||
                                                (scheduleTimeEditForm?.end_time > start_time && scheduleTimeEditForm?.end_time <= end_time)
                                        );
                                        if (isOverlapping) {
                                            Toastr({ message: t("Currently there is an all ready schedule!"), type: "warning" });
                                        } else {
                                            setEditScheduleFormData({
                                                ...editScheduleFormData,
                                                times: [...editScheduleFormData.times, scheduleTimeEditForm]
                                            })
                                            setScheduleTimeEditForm({ ...scheduleTimeEditForm, end_time: "00:00", start_time: "00:00" })
                                        }
                                    }
                                }}
                            />
                        </div>


                        <>
                            <div className="font-fw600 text-fs14 text-cBlack mb-s12">{t("Add Schedule")}</div>
                            <div className="space-y-2">
                                {
                                    editScheduleFormData.times?.map((item, index) => (
                                        <div key={index} className="bg-[#F5F5F5] p-s12 rounded-br10 flex justify-between">
                                            <div className="flex items-center justify-center">
                                                {`${item?.start_time} - ${item?.end_time}`}
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setEditScheduleFormData({
                                                        ...editScheduleFormData,
                                                        times:
                                                            editScheduleFormData.times.filter(i =>
                                                                i.start_time !== item?.start_time
                                                                && i.end_time !== item?.end_time),
                                                        deletable_ids:
                                                            [...editScheduleFormData?.deletable_ids, item?.id]
                                                    })
                                                }}
                                                className="rounded-full cursor-pointer bg-cBittersweet w-[20px] 
                                                h-[20px] flex items-center justify-center">
                                                <img
                                                    className="w-[16px] h-[10px]"
                                                    src={iWhiteCross} 
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>

                        <div className="flex justify-center mt-s20">
                            <CommonButton
                                onClick={async () => {
                                    const success = await instructorScheduleEdit();
                                    if (success) {
                                        setShowEditScheduleModal(false);
                                        getInstructorSchedule(currentDate, schoolInstructorDetails?.instructor_id)
                                    }
                                }}
                                roundedFull={false} btnLabel={t("Save")} />
                        </div>
                    </>
                }
            />
        </div>
    )
}

export default EditScheduleModal

export const DayList = ({ day = "mon" }) => {
    const { scheduleTimeEditForm } = useSchoolInstructorStore();
    return (
        <div className="capitalize bg-cInvoiceLesson rounded-[100px] flex px-s12 py-s8">
            <div className='ml-s12'></div>
            <CommonCheckBox checked={scheduleTimeEditForm.days?.includes(day)} paddingLeft="8px" paddingRight="1px" />
            <div className="font-fw400 text-fs14 text-cBlack">{day}</div>
        </div>
    )
}