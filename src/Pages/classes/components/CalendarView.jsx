/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { iAddItem, iCalendarLeftArrow, iCalendarRightArrow } from '../../../App/Utility/source';
import useClassStore, { getClassCalenderIndex } from '../../../App/Stores/classStore';
import CalendarViewModal from '../modal/CalendarViewModal';
import Classes from '../Classes';
import { useEffect } from 'react';
import CommonButton from '../../../Components/Button/CommonButton';
import { useTranslation } from 'react-i18next';
import CalendarSelectedItem from './CalendarSelectedItem';
import { Toastr } from '../../../App/Utility/UtilityFunctions';
import { getFirstDateOfMonth } from '../../../Utility/UtilityFunctions';

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

const CalendarView = ({ CalendarButton = <></> }) => {

    const { currentDate, setSelectedCalenderDate, selectedCalenderDate, calenderTableData, setCalenderTableData, resetClassAddForm, setCalendarSelected, calendarSelected, classStatus, setSelectedDate, calenderList, setShowAddClassModal } = useClassStore();

    const { t } = useTranslation();

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
        } else if (event.title === 'started') {
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
                title: item2?.status_show === 'completed' ||
                    item2?.status_show === 'cancelled' ||
                    item2?.status_show === 'accepted' ||
                    item2?.status_show === 'created' ?
                    (item2?.status_show === 'completed' && 'history') ||
                    (item2?.status_show === 'cancelled' && 'history') ||
                    (item2?.status_show === 'accepted' && 'upcoming') ||
                    (item2?.status_show === 'created' && 'pending') :
                    item2?.status_show,
                start: new Date(item[0]),
                end: new Date(item[0]),
                lesson_name: item2?.lesson_name,
                start_time: item2?.start_time,
                end_time: item2?.end_time,
                category_icon: item2?.category_icon,
                status_show: item2?.status_show,
                type: item2?.type,
                class_date: item2?.class_date,
                id: item2?.id,
                index: index
            }
        ))
    ))

    let flattenedArray = list?.reduce((result, currentArray) => {
        return result.concat(currentArray);
    }, []);

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
        if (currentDate !== '') {
            getClassCalenderIndex(currentDate);
        } else {
            getClassCalenderIndex(getFirstDateOfMonth(new Date()));
        }
    }, [classStatus])

    const fetchCalenderData = async () => {
        if (currentDate !== '') {
            setSelectedCalenderDate(currentDate)
            getClassCalenderIndex(currentDate);
        } else {
            setSelectedCalenderDate(new Date())
            getClassCalenderIndex(getFirstDateOfMonth(new Date()));
        }
    }

    const handleNavigate = async (date) => {
        await setSelectedCalenderDate(date);
        await getClassCalenderIndex(getFirstDateOfMonth(date));
        console.log("");
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

        const { selectedDate } = useClassStore.getState();
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
        <Classes>
            <div className="relative bg-cBrandColor2 rounded-br8 p-s20" style={{ height: '100%' }}>
                <div className="absolute right-5 top-5 pb-s4">
                    <CommonButton
                        colorType="primary"
                        btnLabel={t("Create class")}
                        roundedFull={false}
                        width="w-[155px]"
                        icon={<div className="mr-s5"><img className="w-s20 h-s15" src={iAddItem} alt="" /></div>}
                        onClick={() => {
                            setShowAddClassModal(true);
                            resetClassAddForm();
                        }}
                    />
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
                <CalendarViewModal allData={flattenedArray} />
            </div>
            {
                calendarSelected &&
                <>
                    <div className="pt-s20"></div>
                    <CalendarSelectedItem allData={calenderTableData} />
                </>
            }
        </Classes >
    );
};

export default CalendarView;


