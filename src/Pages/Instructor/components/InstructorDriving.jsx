/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import InstructorProfile from './InstructorProfile'
import { useEffect } from 'react';
import useSchoolInstructorStore, { schoolInstructorsDrivingIndex } from '../../../App/Stores/schoolInstructorStore';
import InstructorDrivingTableRow from '../table/InstructorDrivingTableRow';
import CommonTable2 from '../../../Components/Table/CommonTable2';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';

function InstructorDriving() {

    const {
        setDriving_take,
        driving_take,
        schoolInstructorDetails,
        schoolInstructorsDrivingList,
        setInstructor_driving_search,
        instructor_driving_search
    } = useSchoolInstructorStore()

    const { t } = useTranslation();

    const schoolInstructorHeaders = [
        { index: 1, name: t("#") },
        { index: 2, name: t("Title") },
        { index: 3, name: t("Date & time") },
        { index: 4, name: t("Category") },
        { index: 5, name: t("Lesson status") },
        { index: 6, name: t("Payment status") }
    ];

    const [searchValue] = useDebounce(instructor_driving_search, 500);

    useEffect(() => {
        setDriving_take(10)
        if (schoolInstructorDetails?.instructor?.id) {
            if (searchValue === "") {
                schoolInstructorsDrivingIndex("", schoolInstructorDetails?.instructor?.id)
            } else {
                schoolInstructorsDrivingIndex("", schoolInstructorDetails?.instructor?.id, searchValue)
            }
        }
    }, [schoolInstructorDetails?.instructor?.id, searchValue])


    return (
        <div>
            <InstructorProfile/>
            <div className='overflow-hidden bg-cBrandColor2 rounded-br10 mt-s24'>
                <CommonTable2
                    scroll={false}
                    headers={schoolInstructorHeaders}
                    tableTitle=""
                    paginationObject={schoolInstructorsDrivingList}
                    totalResult={true}
                    showPageCountText={true}
                    showPagination={true}

                    paginationOnClick={async (url) => {
                        if (searchValue === "") {
                            schoolInstructorsDrivingIndex(url, schoolInstructorDetails?.instructor?.id)
                        } else {
                            schoolInstructorsDrivingIndex(url, schoolInstructorDetails?.instructor?.id, searchValue)
                        }
                    }}

                    showTakeOption={true}
                    currentTakeAmount={driving_take}
                    takeOptionOnChange={async (e) => {
                        await setDriving_take(e);
                        schoolInstructorsDrivingIndex("", schoolInstructorDetails?.instructor?.id)
                    }}

                    showSearchBox={true}
                    withClearSearch={true}
                    searchValue={instructor_driving_search}
                    onSearchClear={() => setInstructor_driving_search("")}
                    searchOnChange={(e) => setInstructor_driving_search(e.target.value)}

                    autoManageRow={true}
                    TableRowComponent={InstructorDrivingTableRow}
                />
            </div>

        </div>
    )
}

export default InstructorDriving
