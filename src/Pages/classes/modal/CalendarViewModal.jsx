import React from 'react'
import CommonModal from '../../../Components/Modal/CommonModal'
import useClassStore from '../../../App/Stores/classStore'
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../App/Utility/UtilityFunctions';

const CalendarViewModal = ({ allData }) => {

    const { showCalendarViewModal, setShowCalendarViewModal, selectedDate } = useClassStore();

    const { t } = useTranslation();

    const upcoming = allData?.filter(i => formatDate(i?.start) === formatDate(selectedDate) && i?.title === 'upcoming');
    const pending = allData?.filter(i => formatDate(i?.start) === formatDate(selectedDate) && i?.title === 'pending');
    const history = allData?.filter(i => formatDate(i?.start) === formatDate(selectedDate) && i?.title === 'history');

    return (
        <div>
            <CommonModal
                showModal={showCalendarViewModal}
                setShowModal={setShowCalendarViewModal}
                modalTitle={formatDate(selectedDate)}
                mainContent={
                    <div className="space-y-4">
                        {upcoming.length > 0 && <div>
                            <div className="bg-[#E1F1FF] text-cPrimary rounded-br4 w-s94 px-s4 mb-s10 text-center">Upcoming</div>
                            {upcoming?.map((item, index) => (
                                <div key={index} className="space-y-1">{
                                    <div className='capitalize font-fw500 text-fs14 text-cBlack mb-s4'>
                                        {index + 1}. {item?.lesson_name}, {`${item?.start_time} - ${item?.end_time}`}
                                    </div>}
                                </div>
                            ))}
                        </div>}

                        {pending.length > 0 && <div>
                            <div className="bg-[#FFF2E3] text-[#FF961B] rounded-br4 w-s80 px-s4 mb-s10 text-center">Pending</div>
                            {pending?.map((item, index) => (
                                <div key={index} className="space-y-1">{
                                    <div className='capitalize font-fw500 text-fs14 text-cBlack'>
                                        {index + 1}. {item?.lesson_name}, {`${item?.start_time} - ${item?.end_time}`}
                                    </div>}
                                </div>
                            ))}
                        </div>}

                        {history.length > 0 && <div>
                            <div className="bg-[#E8E8E8] text-[#585757'] rounded-br4 w-s75 px-s4 mb-s10 text-center">History</div>
                            {history?.map((item, index) => (
                                <div key={index} className="space-y-0.5">{
                                    <div className='capitalize font-fw500 text-fs14 text-cBlack'>
                                        {index + 1}. {item?.lesson_name}, {`${item?.start_time} - ${item?.end_time}`}
                                    </div>}
                                </div>
                            ))}
                        </div>}
                    </div>
                }
            />
        </div>
    )
}

export default CalendarViewModal