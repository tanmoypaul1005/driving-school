/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import useLayoutStore from '../../App/Stores/LayoutStore';
import { PageTitle } from '../../Utility/UtilityFunctions';
import CommonTitle from '../../Components/Title/CommonTitle';
import { useTranslation } from 'react-i18next';
import CommonChipItem from '../../Components/CommonChipItem';
import { iCalendarViewIconBlack, iCalendarViewIconWhite, iListViewIconBlack, iListViewIconWhite } from '../../App/Utility/source';
import { useLocation, useNavigate } from 'react-router-dom';
import useClassStore, { getSchoolClass } from '../../App/Stores/classStore';

function Classes(props) {

    const { t } = useTranslation();

    const { setCalenderTableData,classSearchValue,schoolPageUrl,setSelectedCalenderDate, setSelectedDate, classStatus, setClassStatus, setSchoolPageUrl, setCalendarSelected, setClassSearchValue } = useClassStore();

    const { setBarTitle } = useLayoutStore();

    const location = useLocation();

    const navigateTo = useNavigate();

    const chipItemClick = async (status) => {
        await setSchoolPageUrl("");
        await setClassStatus(status);
        await setClassSearchValue("");
        // await setCalendarSelected(false);
        // await setCalenderTableData([]);
        console.log("");
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        PageTitle(t("MaWay | Classes"));
        setBarTitle(t("MaWay | Classes"));
        fetchClass();
    }, [])

    const fetchClass = async () => {
        if (classSearchValue) {
            await getSchoolClass(schoolPageUrl);
        } else {
            await getSchoolClass("", classSearchValue);
        }
    }

    return (
        <>
            {/* selectedInvoiceChip === 'all' */}
            <CommonTitle title={t("Classes")} />
            <div className="flex justify-between pb-5">
                <div className="flex items-center space-x-5">
                    <CommonChipItem onClick={() => { chipItemClick('all') }} selected={classStatus === 'all'} title1={t('all')} />
                    <CommonChipItem onClick={() => { chipItemClick('pending'); }} selected={classStatus === 'pending'} title1={t('Pending')} />
                    <CommonChipItem onClick={() => { chipItemClick('upcoming'); }} selected={classStatus === 'upcoming'} title1={t('Upcoming')} />
                    <CommonChipItem onClick={() => { chipItemClick('history'); }} selected={classStatus === 'history'} title1={t('History')} />
                </div>

                {/* <div className="flex space-x-2">
                    <img
                        onClick={() => { setSchoolPageUrl(""); setClassStatus('all'); navigateTo('/classes/list') }}
                        className={`cursor-pointer p-s8 rounded-br4 ${location.pathname === "/classes/list" ? 'bg-cPrimary' : 'bg-cWhite'}`}
                        src={location.pathname === "/classes/list" ? iListViewIconWhite : iListViewIconBlack} alt="" />
                    <img
                        onClick={() => { setCalendarSelected(false); setClassStatus('all'); navigateTo('/classes/calendar') }}
                        className={`cursor-pointer p-s8 rounded-br4 ${location.pathname === "/classes/calendar" ? 'bg-cPrimary' : 'bg-cWhite'}`}
                        src={location.pathname === "/classes/calendar" ? iCalendarViewIconWhite : iCalendarViewIconBlack} alt="" />
                </div> */}

                <div className="flex space-x-2">
                    {location.pathname === "/classes/calendar" && <img
                        onClick={() => { setClassSearchValue(""); setSchoolPageUrl(""); setClassStatus('all'); navigateTo('/classes/list') }}
                        className={`cursor-pointer p-s8 rounded-br4 ${location.pathname === "/classes/list" ? 'bg-cPrimary' : 'bg-cWhite'}`}
                        src={location.pathname === "/classes/list" ? iListViewIconWhite : iListViewIconBlack} alt=""
                    />}
                    {location.pathname === "/classes/list" && <img
                        onClick={() => {
                            setSelectedDate(new Date());
                            setSelectedCalenderDate(new Date());
                            setCalendarSelected(false);
                            setClassStatus('all');
                            setClassSearchValue("");
                            navigateTo('/classes/calendar')
                        }}
                        className={`cursor-pointer p-s8 rounded-br4 ${location.pathname === "/classes/calendar" ? 'bg-cPrimary' : 'bg-cWhite'}`}
                        src={location.pathname === "/classes/calendar" ? iCalendarViewIconWhite : iCalendarViewIconBlack} alt=""
                    />}
                </div>
            </div>
            {props.children}
        </>
    )
}

export default Classes;

