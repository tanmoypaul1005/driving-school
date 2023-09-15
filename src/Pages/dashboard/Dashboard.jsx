/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import DashboardCard from './components/DashboardCard';
import BookingLessons from './components/BookingLessons';
import Earnings from './components/Earnings';
import { useTranslation } from 'react-i18next';
import CommonTitle from '../../Components/Title/CommonTitle';
import { useEffect } from 'react';
import { PageTitle } from '../../Utility/UtilityFunctions';
import useLayoutStore from '../../App/Stores/LayoutStore';
import useDashboardStore, { getDashboard } from '../../App/Stores/dashboardStore';
import { useDebounce } from 'use-debounce';
import DashboardLicense from './components/DashboardLicense';
import StudentStatics from './components/StudentStatics';

const Dashboard = () => {

    const { t } = useTranslation();

    const { dashboardDetails, pending_booking_search } = useDashboardStore();

    const { setBarTitle } = useLayoutStore();

    const [searchValue] = useDebounce(pending_booking_search, 500);

    useEffect(() => {
        // window.scrollTo(0, 0);
        PageTitle(t("Dashboard"));
        setBarTitle(t("Dashboard"));
    }, [])

    useEffect(() => {
        fetchStudentDashboard();
    }, [searchValue])

    const fetchStudentDashboard = async () => {
        if (pending_booking_search === "") {
            getDashboard("", "");
        } else {
            getDashboard("", pending_booking_search);
        }
    }

    useEffect(() => {
        if (pending_booking_search === "") {
            getDashboard("", "");
        } else {
            getDashboard("", pending_booking_search);
        }
        console.log("school")
    }, [])


    return (
        <>
            <CommonTitle title={t("Dashboard")} />
            <DashboardLicense />
            <div className="mb-s20"></div>
            <div className='grid grid-cols-3 gap-5'>
                <div className="col-span-3 lg:col-span-2"><Earnings /></div>
                <div className='w-full col-span-3 bg-cBrandColor2 rounded-br8 lg:col-span-1 p-s20'>
                    {/* <DashboardPieChart /> */}
                    <StudentStatics />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 sm:space-y-2 md:grid-cols-3 md:space-y-2 lg:space-y-0 lg:grid-cols-6 my-s20 gap-x-5">
                <DashboardCard title={t('Unread Notification')}
                    value={dashboardDetails?.total?.unread_notification ?? 0} />
                <DashboardCard title={t('License will be expire')} value={dashboardDetails?.license_info?.expired_date ?? 'No License'} />
                <DashboardCard title={t('Request Order')} value={dashboardDetails?.total?.request_order ?? 0} />
                <DashboardCard title={t('Pending Order')} value={dashboardDetails?.total?.pending_order ?? 0} />
                <DashboardCard title={t('Payment Due')} value={dashboardDetails?.total?.payment_due ? `DKK ${dashboardDetails?.total?.payment_due?.toLocaleString("da-DK")}` : "DKK 0"} />
                <DashboardCard title={t('Pending Bookings')} value={dashboardDetails?.total?.pending_bookings ?? 0} />
            </div>
            <BookingLessons />
        </>
    );
};

export default Dashboard;