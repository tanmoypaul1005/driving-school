/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NewInstructor from './NewInstructor';
import { iCalendarLeftArrow, iCalendarRightArrow, iFilter, iFilterWhite, iScheduleWhite } from '../../../../App/Utility/source';
import { getFirstDateOfMonth } from '../../../../Utility/UtilityFunctions';
import CommonButton from '../../../../Components/Button/CommonButton';
import { Toastr } from '../../../../App/Utility/UtilityFunctions';
import CommonButtonOutlined from '../../../../Components/Button/CommonButtonOutlined';
import useSchoolInstructorStore, { getCheckAvailability, getInstructorSchedule, getSchoolInstructorDetails } from '../../../../App/Stores/schoolInstructorStore';
import { useParams } from 'react-router-dom';
import ScheduleSelectedTable from './ScheduleSelectedTable';

const CustomToolbar = ({ label, onNavigate }) => {

    const goToBack = async () => {
        await onNavigate('PREV');
    };

    const goToNext = async () => {
        await onNavigate('NEXT');
    };

    // const goToToday = () => {
    //     onNavigate('TODAY');
    // };

    return (
        <div className="flex space-x-3 custom-toolbar mb-s7">
            <button className="toolbar-button" onClick={goToBack}>
                <img src={iCalendarLeftArrow} alt="" />
            </button>
            <div className="calendar-title section_title text-cDarkGrayish mt-s4">{label}</div>
            <button className="toolbar-button" onClick={goToNext}>
                <img src={iCalendarRightArrow} alt="" />
            </button>
            {/* <button className="toolbar-button" onClick={goToToday}>
                    Today
                </button> */}
        </div>
    );
};

const ScheduleCalender = ({ CalendarButton = <></> }) => {

    const {
        currentDate,setSelectedCalenderDate,selectedCalenderDate, calenderTableData,
        setCalenderTableData, setCalendarSelected, calendarSelected,
        setSelectedDate,calenderList,setShowScheduleListModal,setShowAddScheduleModal,
        setShowScheduleFilterModal,schoolInstructorDetails,resetAddScheduleForm } = useSchoolInstructorStore();

    const { t } = useTranslation();

    const { school_instructor_id } = useParams();

    const instructor_is_updated = localStorage.getItem("instructor_is_updated");

    useEffect(() => {
        if (school_instructor_id && parseInt(instructor_is_updated) !== 0)
         { getSchoolInstructorDetails(school_instructor_id) }
    }, [school_instructor_id, instructor_is_updated])

    const minDate = moment(new Date(selectedCalenderDate)).startOf('month').toDate(); // Minimum date: start of the current month
    const maxDate = moment(new Date(selectedCalenderDate)).endOf('month').toDate(); // Maximum date: end of the current month

    const eventStyleGetter = (event) => {
        let backgroundColor = '';
        let color = '';
        let width = '';
        let marginLeft = "";
        let marginBottom = "";
        let outlineStyle = "";
        let textTransform = "";
        let marginTop = "";
        let fontSize = "";
        let fontweight = "400"

        // Set different colors based on package name
        if (event.title === 'upcoming') {
            backgroundColor = '#E1F1FF';
            color = '#2257AA';
            width = "73px";
            marginLeft = "8px";
            marginBottom = "0px";
            marginTop = "5px";
            outlineStyle = "none";
            textTransform = "capitalize";
            fontSize = "12px";
            fontweight = "400";
        } else if (event.title === 'pending') {
            backgroundColor = "#FFF2E3";
            color = '#FF961B';
            width = "60px";
            marginLeft = "8px";
            marginBottom = "0px";
            marginTop = "5px";
            outlineStyle = "none";
            textTransform = "capitalize";
            fontSize = "12px";
            fontweight = "400";
        } else if (event.title === 'history') {
            backgroundColor = "#E8E8E8";
            color = '#585757';
            width = "52px";
            marginLeft = "8px";
            marginTop = "5px";
            marginBottom = "0px";
            outlineStyle = "none";
            textTransform = "capitalize";
            fontSize = "12px";
            fontweight = "400";
        }  else if (event.title === 'available') {
            backgroundColor = "#2257AA";
            color = '#FFFFFF';
            width = "70px";
            marginLeft = "8px";
            marginTop = "5px";
            marginBottom = "0px";
            outlineStyle = "none";
            textTransform = "capitalize";
            fontSize = "12px";
            fontweight = "400";
        }
        else if (event.title === 'started') {
            backgroundColor = '#FF2DBB51';
            color = '#585757';
            width = "58px";
            marginLeft = "8px";
            marginTop = "5px";
            marginBottom = "0px";
            outlineStyle = "none";
            textTransform = "capitalize";
            fontSize = "12px";
            fontweight = "400";
        }
        return {
            style: { fontweight, fontSize, marginTop, backgroundColor, color, width, marginLeft, marginBottom, outlineStyle, textTransform },
        };
    };

    const list = Object.entries(calenderList)?.map((item, index) => (
        item[1]?.map((item2, index2) => (
            {
                title:item2?.status === 'requested' ? "pending":
                    item2?.status === 'completed' ||
                    item2?.status === 'cancelled' ||
                    item2?.status === 'accepted' ||
                    item2?.status === 'created' ?
                    (item2?.status === 'completed' && 'history') ||
                    (item2?.status === 'cancelled' && 'history') ||
                    (item2?.status === 'accepted' && 'upcoming') ||
                    (item2?.status === 'created' && 'pending') 
                    :
                    item2?.status,
                start: new Date(item[0]),
                end: new Date(item[0]),
                lesson_name: item2?.lesson_title,
                start_time: item2?.start_time,
                end_time: item2?.end_time,
                category_icon: item2?.category_icon,
                status: item2?.status,
                type: item2?.type,
                id: item2?.id,
                index: index
            }
        ))
    ))

    let flattenedArray = list?.reduce((result, currentArray) => {
        return result.concat(currentArray);
    }, []);

    //console.log("flattenedArray",flattenedArray);

    useEffect(() => {
        setCalenderTableData(flattenedArray)
    }, [calenderList])

    moment.updateLocale('en', {
        week: {
            dow: 1, // Set the first day of the week to Monday (0 = Sunday, 1 = Monday, etc.)
        },
    });

    const localizer = momentLocalizer(moment);

    useEffect(() => {
        fetchCalenderData();
        setSelectedCalenderDate(new Date())
    }, [])

    useEffect(() => {
        if(parseInt(instructor_is_updated) !== 0 && schoolInstructorDetails?.instructor_id){
        if (currentDate !== '') {
            getInstructorSchedule(currentDate,schoolInstructorDetails?.instructor_id);
        } else {
            getInstructorSchedule(getFirstDateOfMonth(new Date()),schoolInstructorDetails?.instructor_id);
        }
    }
    }, [instructor_is_updated,schoolInstructorDetails?.instructor_id])

    const fetchCalenderData = async () => {
        if(parseInt(instructor_is_updated) !== 0 && schoolInstructorDetails?.instructor_id){
        if (currentDate !== '') {
            await setSelectedCalenderDate(currentDate)
            await getInstructorSchedule(currentDate,schoolInstructorDetails?.instructor_id);
            console.log("");
        } else {
            await setSelectedCalenderDate(new Date())
            await getInstructorSchedule(getFirstDateOfMonth(new Date()),schoolInstructorDetails?.instructor_id);
            console.log("");
        }
    }
    }

    const handleNavigate = async (date) => {
        if((parseInt(instructor_is_updated) !== 0) && schoolInstructorDetails?.instructor_id){
        await setSelectedCalenderDate(date);
        await getInstructorSchedule(getFirstDateOfMonth(date),schoolInstructorDetails?.instructor_id);
        console.log("");
        }
    };

    const getUniqueEvents = (events) => {
        const uniqueEvents = [];
        const eventMap = {};

        events.forEach((event) => {
            const { title, start } = event;
            const eventKey = `${title}-${moment(start).format('YYYY-MM-DD')}`;

            if (!eventMap[eventKey]) {
                eventMap[eventKey] = true;
                uniqueEvents.push(event);
            }
        });
        return uniqueEvents;
    };

    const uniqueEvents = getUniqueEvents(flattenedArray);

    const DateCellContent = ({ label, date }) => {
        const weekNumber = moment(date).week();
        const today = moment().startOf('day');
        const isToday = today.isSame(date, 'day');
        return (
            <div style={{ fontFamily: 'Poppins' }} className="flex justify-between">
                <div className={`leading-6 text-left text-fs20 font-fw600 pl-s10 pt-s10 ${isToday ? 'text-cGray59' : 'text-cGray59'}`}>
                    {label}
                </div>
                {/* <div className={`flex flex-col text-left text-fs10 font-fw400 pl-s10  pt-s10 ${isToday ? 'text-cGray59' : 'text-cGray59'}`}>
                    <div>{t("Week")}</div>
                    <div className="text-center">
                        {weekNumber}
                    </div>
                </div> */}
            </div>
        );
    }

    const getDayStyle = (date) => {

        const { selectedDate } = useSchoolInstructorStore.getState();
        const selectedDateMoment = moment(selectedDate).startOf('day');
        const dateMoment = moment(date).startOf('day');
        if (!selectedDateMoment.isSame(dateMoment)) {
            return {
                className: 'selected-day', // Apply the custom CSS class
            };
        }
        return {
            style: {
                border: '1px dashed #2257AA', // Change the border color as needed
            },
        };
    };

    const FullMonthWeekNumbers = ({ date }) => {
        const startOfMonth = moment(date).startOf('month');
        const endOfMonth = moment(date).endOf('month');

        const weeks = [];
        let currentWeek = moment(startOfMonth).startOf('week');

        while (currentWeek.isSameOrBefore(endOfMonth, 'day')) {
            weeks.push(currentWeek.week());
            currentWeek.add(1, 'week');
        }

        return (
            <div className="">
                {weeks.map((weekNumber, index) => (
                    <div className="space-x-9" key={weekNumber}
                        style={{ paddingBottom: weeks?.length === index + 1 ? '0px' : '120px', marginRight: '5px', fontSize: '12px', fontWeight: 400, color: '#969696' }}>
                        {weekNumber}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
        <NewInstructor/>

            <div className="relative bg-cBrandColor2 rounded-br8 p-s20" style={{ height: '100%' }}>
              <div className="absolute flex space-x-5 right-5 top-5 pb-s4">
              {
                parseInt(schoolInstructorDetails?.instructor?.is_own) === 1 &&<CommonButton
                         colorType={parseInt(instructor_is_updated) !== 0 
                        && schoolInstructorDetails?.instructor_id?"primary" :"disabled"}
                        btnLabel={t("Check Availability")}
                        roundedFull={false}
                        width="w-[175px]"
                        icon={<div className="mr-s5">
                            <img className="w-s20 h-s15" src={iScheduleWhite} alt="" /></div>}
                        onClick={async() => {
                            await getCheckAvailability(currentDate,schoolInstructorDetails?.instructor_id)
                            await setShowScheduleListModal(true);
                            console.log("");
                        }}
                    />
                }

                {
                     parseInt(schoolInstructorDetails?.instructor?.is_own) === 1 && <CommonButton
                        colorType={parseInt(instructor_is_updated) !== 0 
                        && schoolInstructorDetails?.instructor_id?"primary" :"disabled"}
                        btnLabel={t("Add Schedule")}
                        roundedFull={false}
                        width="w-[155px]"
                        icon={<div className="mr-s5">
                            <img className="w-s20 h-s15" src={iScheduleWhite} alt="" /></div>}
                        onClick={async() => {
                            await resetAddScheduleForm();
                            setShowAddScheduleModal(true) 
                        }}
                    />
                }

                    {/* <CommonButtonOutlined
                        // isFilterDot={isFilterDot} 
                        width="w-[120px]"
                        isFullRounded={false}
                        btnLabel={t('Filter')}
                        onClick={() => { setShowScheduleFilterModal(true) }}
                        colorType="primary"
                        iconLeft={iFilterWhite}
                        iconLeftHover={iFilter} /> */}
                </div>
                <div className="flex space-x-1">
                    <div className="mt-[160px]">
                        <FullMonthWeekNumbers date={new Date(selectedCalenderDate)} />
                    </div>
                    <div className="calendar">
                        <Calendar
                            formats={{ weekNumber: (date) => moment(date).format('w') }}
                            dayPropGetter={getDayStyle}
                            onNavigate={handleNavigate}
                            localizer={localizer}
                            events={uniqueEvents}
                            showMultiDayTimes={false}
                            startAccessor="start"
                            endAccessor="end"
                            eventPropGetter={eventStyleGetter}
                            style={{ height: '100%' }}
                            views={['month']} // Show only month view
                            showAllEvents
                            components={{
                                toolbar: props => <CustomToolbar CalendarButton={CalendarButton}  {...props} />,
                                month: { dateHeader: DateCellContent },
                            }}
                            selectable={true}
                            onSelectSlot={async (slotInfo) => {
                                if (slotInfo?.start < minDate || slotInfo?.start >= maxDate) {
                                    await Toastr({ message: t("Invalid date selection"), type: "warning" });
                                    return;
                                } else {
                                    await setSelectedDate(slotInfo?.start);
                                    await setCalendarSelected(true);
                                    await setCalenderTableData(flattenedArray)
                                    window.scrollTo({
                                        top: document.documentElement.scrollHeight,
                                        behavior: 'smooth', // Use 'smooth' for smooth scrolling, or 'auto' for instant scrolling
                                    });
                                }
                            }}

                            onSelectEvent={async (slotInfo) => {
                                await setSelectedDate(slotInfo?.start);
                                await setCalendarSelected(true);
                                await setCalenderTableData(flattenedArray)
                                window.scrollTo({
                                    top: document.documentElement.scrollHeight,
                                    behavior: 'smooth', // Use 'smooth' for smooth scrolling, or 'auto' for instant scrolling
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
            {
                calendarSelected &&
                <>
                    <div className="pt-s20"></div>
                    <ScheduleSelectedTable allData={calenderTableData} />
                </>
            }
        </ >
    );
};



export default ScheduleCalender;




