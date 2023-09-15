import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonTable2 from '../../../Components/Table/CommonTable2';
import BookingLessonsTableRow from '../table/BookingLessonsTableRow';
import useDashboardStore, { getDashboard } from '../../../App/Stores/dashboardStore';

const BookingLessons = () => {

    const { t } = useTranslation();

    const { setPendingBookingLessonsUrl, setPending_booking_search, dashboardDetails, pending_booking_take, setPending_booking_take, pending_booking_search } = useDashboardStore();

    const LessonsHeaders = [
        { index: 1, name: t("#") },
        { index: 2, name: t("Lesson Title") },
        { index: 3, name: t("Type") },
        { index: 5, name: t("Date") }
    ];

    return (
        <div>
            <div className="sub_title text-cBlack mb-s12">{t("Pending Booking Lessons")}</div>
            <CommonTable2
                headers={LessonsHeaders}
                tableTitle=""
                paginationObject={dashboardDetails?.pending_bookings}
                totalResult={true}

                showPageCountText={true}
                showPagination={true}

                paginationOnClick={async (url) => {
                    setPendingBookingLessonsUrl(url)
                    getDashboard(url, pending_booking_search)
                }}

                showTakeOption={true}
                currentTakeAmount={pending_booking_take}
                takeOptionOnChange={async (e) => {
                    await setPending_booking_take(e);
                    getDashboard("", pending_booking_search)
                }}
                showSearchBox={true}
                withClearSearch={true}
                searchValue={pending_booking_search}
                onSearchClear={() => setPending_booking_search("")}
                searchOnChange={(e) => setPending_booking_search(e.target.value)}

                autoManageRow={true}
                TableRowComponent={BookingLessonsTableRow}
            />
        </div>
    );
};

export default BookingLessons;