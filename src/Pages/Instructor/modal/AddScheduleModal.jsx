import React from 'react'
import useSchoolInstructorStore, { getInstructorSchedule, instructorScheduleAdd } from '../../../App/Stores/schoolInstructorStore'
import CommonModal from '../../../Components/Modal/CommonModal';
import { useTranslation } from 'react-i18next';
import CommonCheckBox from '../../../Components/Input/CommonCheckBox';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonTimePicker from '../../../Components/CommonTimePicker';
import CommonButton from '../../../Components/Button/CommonButton';
import { iWhiteCross } from '../../../App/Utility/source';
import { Toastr } from '../../../App/Utility/UtilityFunctions';

const AddScheduleModal = () => {

    const { schoolInstructorDetails, resetAddScheduleForm, currentDate, endDate, setEndDate, setScheduleTimeForm, scheduleTimeForm, showAddScheduleModal, setShowAddScheduleModal, addScheduleFormData, setAddScheduleFormData } = useSchoolInstructorStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showAddScheduleModal}
                setShowModal={setShowAddScheduleModal}
                modalSpace={true}
                modalTitle={t("Add Schedule")}
                widthClass='w-[750px]'
                mainContent={
                    <>
                        <div className="flex mt-s20">
                            <div className="font-fw600 text-fs14 text-cBlack mr-s20">{("Add Date & Time")}</div>
                            <CommonCheckBox checked={addScheduleFormData?.is_recurring}
                                onChange={() => {
                                    setAddScheduleFormData({
                                        ...addScheduleFormData,
                                        is_recurring: !addScheduleFormData?.is_recurring
                                    })
                                }}
                                paddingLeft="8px" paddingRight="1px" />
                            <div className="font-fw400 text-fs14 text-cBlack">{t("Recurring")}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-5 my-s20">
                            <CommonInput
                                withStar={false}
                                required={true}
                                value={addScheduleFormData?.start_date}
                                onChange={(e) => {
                                        const startDate = new Date(e.target.value);
                                        startDate.setDate(startDate.getDate() + 6);
                                        const endDate = startDate.toISOString().split('T')[0];
                                        setEndDate(endDate);
                                        setAddScheduleFormData({
                                            ...addScheduleFormData, 
                                            start_date: e.target.value,
                                            end_date: endDate,
                                        });
                                }}
                                type='date'
                                label={t("Start date")}
                                placeholder={t("Select date")}
                            />

                            {
                                addScheduleFormData?.is_recurring &&
                                <CommonInput
                                    withStar={false}
                                    required={true}
                                    startDate={endDate}
                                    value={addScheduleFormData?.end_date}
                                    onChange={(e) => {
                                        setAddScheduleFormData({ ...addScheduleFormData, end_date: e.target.value })
                                    }}
                                    allowPastDates={true}
                                    type='date'
                                    label={t("End date")}
                                    placeholder={t("Select date")}
                                />
                            }
                        </div>
                        {
                            addScheduleFormData?.is_recurring &&
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
                        }
                        <div className="grid grid-cols-2 gap-x-5 mt-s20">
                            <div>
                                <div className={`text-start text-cHighlighted important_text mb-s8 w-full `}>
                                    {t("Start time")}</div>
                                <CommonTimePicker
                                    required={true}
                                    showExtendedTimeUi={false}
                                    show_asterisk={false}
                                    label={t("Start time")}
                                    init_time={scheduleTimeForm?.start_time}
                                    onChange={(value) => {
                                        if(addScheduleFormData?.is_recurring){
                                            setScheduleTimeForm({ ...scheduleTimeForm,
                                                start_time: value,
                                             });
                                        }else{
                                            setScheduleTimeForm({ ...scheduleTimeForm,
                                                start_time: value,
                                                days:[new Date(addScheduleFormData?.start_date).toLocaleDateString('en-US', 
                                                {weekday: 'short'}).toLowerCase()]
                                             });
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
                                    init_time={scheduleTimeForm?.end_time}
                                    onChange={(value) => {
                                        setScheduleTimeForm({ ...scheduleTimeForm, end_time: value })
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
                                    if(scheduleTimeForm?.start_time === "00:00" && scheduleTimeForm?.end_time ==="00:00"){
                                        Toastr({ message: t("Invalid time!"), type: "warning" });
                                    }else{
                                        const isOverlapping = addScheduleFormData?.times?.some(
                                            ({ start_time, end_time }) =>
                                                (scheduleTimeForm?.start_time >= start_time && scheduleTimeForm?.start_time < end_time) ||
                                                (scheduleTimeForm?.end_time > start_time && scheduleTimeForm?.end_time <= end_time)
                                        );
                                        if (isOverlapping) {
                                            Toastr({ message: t("Currently there is an all ready schedule!"), type: "warning" });
                                        } else {
                                            setAddScheduleFormData({
                                                ...addScheduleFormData,
                                                times: [...addScheduleFormData.times, scheduleTimeForm]
                                            })
                                            setScheduleTimeForm({ ...scheduleTimeForm, end_time: "00:00", start_time: "00:00" })
                                        }
                                    }
                                }}
                            />
                        </div>


                        <>
                            <div className="font-fw600 text-fs14 text-cBlack mb-s12">{t("Add Schedule")}</div>
                            <div className="space-y-2">
                                {
                                    addScheduleFormData.times?.map((item, index) => (
                                        <div key={index} className="bg-[#F5F5F5] p-s12 rounded-br10 flex justify-between">
                                            <div className="flex items-center justify-center">
                                                {`${item?.start_time} - ${item?.end_time}`}
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setAddScheduleFormData({
                                                        ...addScheduleFormData,
                                                        times: addScheduleFormData.times.filter(i => i.start_time !== item?.start_time
                                                            && i.end_time !== item?.end_time)
                                                    })
                                                }}
                                                className="rounded-full cursor-pointer bg-cBittersweet w-[20px] 
                                                h-[20px] flex items-center justify-center">
                                                <img
                                                    className="w-[16px] h-[10px]"
                                                    src={iWhiteCross} alt=""
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
                                    await setAddScheduleFormData({ ...addScheduleFormData, instructor_id: schoolInstructorDetails?.instructor_id })
                                    console.log("addScheduleFormData",addScheduleFormData);
                                    const success = instructorScheduleAdd();
                                    if (success) {
                                        setShowAddScheduleModal(false);
                                        getInstructorSchedule(currentDate, schoolInstructorDetails?.instructor_id);
                                        resetAddScheduleForm();
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

export default AddScheduleModal

export const DayList = ({ day = "mon" }) => {
    const { setScheduleTimeForm, scheduleTimeForm } = useSchoolInstructorStore();
    const click = () => {
        if (scheduleTimeForm.days?.includes(day)) {
            setScheduleTimeForm({ ...scheduleTimeForm, days: scheduleTimeForm.days?.filter(i => i !== day) });
        } else {
            setScheduleTimeForm({ ...scheduleTimeForm, days: [...scheduleTimeForm.days, day] });
        }
    }
    return (
        <div onClick={() => { click() }} className="capitalize cursor-pointer bg-cInvoiceLesson rounded-[100px] flex px-s12 py-s8">
            <div className='ml-s12'></div>
            <CommonCheckBox checked={scheduleTimeForm.days?.includes(day)} onChange={() => { click() }} paddingLeft="8px" paddingRight="1px" />
            <div className="font-fw400 text-fs14 text-cBlack">{day}</div>
        </div>
    )
}
