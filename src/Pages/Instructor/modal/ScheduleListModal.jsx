import React from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import useSchoolInstructorStore, { instructorScheduleDetails } from '../../../App/Stores/schoolInstructorStore';
import { useTranslation } from 'react-i18next';
import { iArrow_right_black, iBlueReloader,iBlueCalender } from '../../../App/Utility/source';

const ScheduleListModal = () => {

    const { schoolInstructorDetails, showScheduleListModal, setShowScheduleListModal, checkSchedule, setShowEditScheduleModal } = useSchoolInstructorStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showScheduleListModal}
                setShowModal={setShowScheduleListModal}
                modalSpace={true}
                modalTitle={t("Schedule List")}
                mainContent={
                    <>
                        <div className='space-y-2 cursor-pointer mt-s20'>
                            {
                                checkSchedule?.length > 0 ?
                                    checkSchedule?.map((item, index) => (
                                        <CommonList
                                            start_date={item?.start_date ? item?.start_date : "NA"}
                                            end_date={item?.is_recurring=== 1 ?
                                                item?.end_date ? item?.end_date : "NA":""}
                                            available_times={item?.available_times[0]}
                                            onClick={async () => {
                                                await instructorScheduleDetails(item?.id, schoolInstructorDetails?.instructor_id)
                                                await setShowEditScheduleModal(true);
                                                console.log("")
                                            }}
                                            index={index}
                                            is_recurring={item?.is_recurring}
                                        />
                                    )) : <div className="text-center">{t("No schedule Found")}</div>
                            }
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default ScheduleListModal;

export const CommonList = ({ start_date, end_date, available_times,onClick ,is_recurring}) => {
    return (
        <div onClick={onClick} className="flex justify-between bg-cInvoiceLesson px-s10 py-s6 rounded-br10">
            <div className="flex space-x-2">
                <div className="flex items-center justify-center ">
                    <div className='rounded-full flex  justify-center items-center bg-[#F0F6FF]'>
                    <img className="p-s12" src={is_recurring=== 1? iBlueReloader:iBlueCalender} alt="" /></div>
                    </div>
                <div className="">
                    <div className={`items-center text-fs14 font-fw600 text-cBlack
                    ${
                        (available_times?.mon === 0) && (available_times?.tue === 0) &&
                        (available_times?.wed === 0) && (available_times?.thu === 0) &&
                        (available_times?.fri === 0) && (available_times?.sat === 0) &&
                        (available_times?.sun === 0) ? "mt-s13":""}
                    `}>
                        {start_date} {is_recurring=== 1? "to":""} {end_date}
                    </div>
                    <div className="flex space-x-2 mt-s5">
                        {available_times?.mon === 1 && <DayList title={'mon'} />}
                        {available_times?.tue === 1 && <DayList title={'tue'} />}
                        {available_times?.wed === 1 && <DayList title={'wed'} />}
                        {available_times?.thu === 1 && <DayList title={'thu'} />}
                        {available_times?.fri === 1 && <DayList title={'fri'} />}
                        {available_times?.sat === 1 && <DayList title={'sat'} />}
                        {available_times?.sun === 1 && <DayList title={'sun'} />}
                    </div>
                </div>
            </div>
            <img src={iArrow_right_black} alt='' />
        </div>
    )
}

export const DayList = ({ title }) => {
    return (
        <div className="bg-[#F0F6FF] rounded-[100px] px-s8 py-s2 capitalize">
            {title}
        </div>
    )
}