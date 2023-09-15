/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import InstructorProfile from './InstructorProfile'
import { useEffect } from 'react';
import useSchoolInstructorStore, { schoolInstructorsExternalIndex } from '../../../App/Stores/schoolInstructorStore';
import InstructorExternalTableRow from '../table/InstructorExternalTableRow';
import CommonTable2 from '../../../Components/Table/CommonTable2';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';

function InstructorExternal() {

    const {
        setExternal_take,
        external_take,
        schoolInstructorDetails,
        schoolInstructorsExternalList,
        instructor_external_search,
        setInstructor_external_search
    } = useSchoolInstructorStore();

    const { t } = useTranslation();

    const schoolInstructorHeaders = [
        { index: 1, name: t("#") },
        { index: 2, name: t("Title") },
        { index: 3, name: t("Date & time") },
        { index: 4, name: t("Category") },
        { index: 5, name: t("Lesson status") },
        { index: 6, name: t("Payment status") }
    ];

    const [searchValue] = useDebounce(instructor_external_search, 500);

    useEffect(() => {
        setExternal_take(10)
        if (schoolInstructorDetails?.instructor?.id) {
            if (searchValue === "") {
                schoolInstructorsExternalIndex("", schoolInstructorDetails?.instructor?.id)
            } else {
                schoolInstructorsExternalIndex("", schoolInstructorDetails?.instructor?.id, searchValue)
            }
        }

    }, [schoolInstructorDetails?.instructor?.id, searchValue])

    return (
        <div>
            <InstructorProfile />

            <div className='overflow-hidden bg-cBrandColor2 rounded-br10 mt-s24'>
                <CommonTable2
                    scroll={false}
                    headers={schoolInstructorHeaders}
                    tableTitle=""
                    paginationObject={schoolInstructorsExternalList}
                    totalResult={true}
                    showPageCountText={true}
                    showPagination={true}

                    paginationOnClick={async (url) => {
                        if (searchValue === "") {
                            schoolInstructorsExternalIndex(url, schoolInstructorDetails?.instructor?.id)
                        } else {
                            schoolInstructorsExternalIndex(url, schoolInstructorDetails?.instructor?.id, searchValue)
                        }
                    }}

                    showTakeOption={true}
                    currentTakeAmount={external_take}
                    takeOptionOnChange={async (e) => {
                        await setExternal_take(e);
                        schoolInstructorsExternalIndex("", schoolInstructorDetails?.instructor?.id)
                    }}

                    showSearchBox={true}
                    withClearSearch={true}
                    searchValue={instructor_external_search}
                    onSearchClear={() => setInstructor_external_search("")}
                    searchOnChange={(e) => setInstructor_external_search(e.target.value)}

                    autoManageRow={true}
                    TableRowComponent={InstructorExternalTableRow}
                />
            </div>

        </div>
    )
}

export default InstructorExternal
