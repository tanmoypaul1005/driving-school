/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import CommonTable2 from '../../../../Components/Table/CommonTable2';
import useSchoolInstructorStore, { getInstructorsPendingLessons } from '../../../../App/Stores/schoolInstructorStore';
import NewInstructor from './NewInstructor';
import PendingRequestsTableRow from '../../table/PendingRequestsTableRow';

function PendingRequests() {

    const { pendingLessons,schoolInstructorDetails,pending_requests_take,setPending_requests_take,pending_requests_search,setPending_requests_search } = useSchoolInstructorStore();

    const { t } = useTranslation();

    const pendingRequestsHeaders = [
        { index: 1, name: t("#") },
        { index: 2, name: t("Student name") },
        { index: 3, name: t("Lesson name") },
        { index: 4, name: t("Category") },
        { index: 5, name: t("Date & time") },
    ];

     const [searchValue] = useDebounce(pending_requests_search, 500);

    useEffect(() => {
        getInstructorsPendingLessons(schoolInstructorDetails?.instructor?.id,"","")
    }, [schoolInstructorDetails?.instructor?.id]);

    useEffect(() => {
        fetchPendingRequests();
    }, [searchValue]);

    const fetchPendingRequests = async () => {
        if(pending_requests_search){
            await getInstructorsPendingLessons(schoolInstructorDetails?.instructor?.id,"",pending_requests_search)
        }
        await getInstructorsPendingLessons(schoolInstructorDetails?.instructor?.id,"","")
    }

    return (
        <div>
            <NewInstructor />
            <div className='overflow-hidden bg-cBrandColor2 rounded-br10 mt-s24'>
                <CommonTable2
                    scroll={false}
                    headers={pendingRequestsHeaders}
                    tableTitle=""
                    paginationObject={pendingLessons}
                    totalResult={true}
                    showPageCountText={true}
                    showPagination={true}

                    paginationOnClick={async (url) => {
                        getInstructorsPendingLessons(schoolInstructorDetails?.instructor?.id,url,pending_requests_search)
                    }}

                    showSearchBox={true}
                    withClearSearch={true}
                    searchValue={pending_requests_search}
                    onSearchClear={() => setPending_requests_search("")}
                    searchOnChange={(e) => setPending_requests_search(e.target.value)}

                    showTakeOption={true}
                    currentTakeAmount={pending_requests_take}
                    takeOptionOnChange={(e) => {
                        setPending_requests_take(e);
                        getInstructorsPendingLessons(schoolInstructorDetails?.instructor?.id,"",pending_requests_search)
                    }}

                    autoManageRow={true}
                    TableRowComponent={PendingRequestsTableRow}
                />
            </div>

        </div>
    )
}

export default PendingRequests
