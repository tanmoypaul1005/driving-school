/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import CommonTitle from '../../Components/Title/CommonTitle';
import SchoolInstructorTableRow from './table/SchoolInstructorTableRow';
import { useEffect } from 'react';
import useSchoolInstructorStore, { getSchoolInstructorIndex } from '../../App/Stores/schoolInstructorStore';
import useLayoutStore from '../../App/Stores/LayoutStore';
import { PageTitle } from '../../Utility/UtilityFunctions';
import { useDebounce } from 'use-debounce';
import CommonTable2 from '../../Components/Table/CommonTable2';
import { useTranslation } from 'react-i18next';

const SchoolInstructor = () => {

    const { setInstructorPageUrl, instructorPageUrl, setSchool_instructor_take, school_instructor_take, schoolInstructorList, setSchoolInstructorSearchKey, schoolInstructorSearchKey } = useSchoolInstructorStore();

    const { setBarTitle } = useLayoutStore();

    const { t } = useTranslation();

    const schoolInstructorHeaders = [
        { index: 1, name: t("#") },
        { index: 2, name: t("Name") },
        { index: 3, name: t("Email") },
        { index: 4, name: t("Phone") },
        { index: 5, name: t("Status") }
    ];

    const [searchValue] = useDebounce(schoolInstructorSearchKey, 500);

    useEffect(() => {
        if(schoolInstructorSearchKey){
            getSchoolInstructorIndex("", schoolInstructorSearchKey);
        }else{
            getSchoolInstructorIndex("", "");
        }
    }, [searchValue])

    useEffect(() => {
        window.scrollTo(0, 0);
        PageTitle(t("MaWay | Instructor"));
        setBarTitle(t("MaWay | Instructor"));
        getSchoolInstructorIndex(instructorPageUrl, schoolInstructorSearchKey);
    }, [])

    return (
        <div className=''>
            <CommonTitle title={t("Instructor")} />
            <div className='overflow-hidden bg-cBrandColor2 rounded-br8'>
                <CommonTable2
                    headers={schoolInstructorHeaders}
                    tableTitle=""
                    paginationObject={schoolInstructorList}
                    totalResult={true}

                    showPageCountText={true}
                    showPagination={true}

                    paginationOnClick={async (url) => {
                        setInstructorPageUrl(url)
                        getSchoolInstructorIndex(url, schoolInstructorSearchKey)
                    }}

                    showTakeOption={true}
                    currentTakeAmount={school_instructor_take}
                    takeOptionOnChange={(e) => {
                        setSchool_instructor_take(e);
                        getSchoolInstructorIndex("", schoolInstructorSearchKey);
                    }}
                    showSearchBox={true}
                    withClearSearch={true}
                    searchValue={schoolInstructorSearchKey}
                    onSearchClear={() => { setSchoolInstructorSearchKey(""); setInstructorPageUrl("") }}
                    searchOnChange={(e) => { setSchoolInstructorSearchKey(e.target.value); setInstructorPageUrl("") }}

                    autoManageRow={true}
                    TableRowComponent={SchoolInstructorTableRow}
                />
            </div>
        </div>
    );
};

export default SchoolInstructor;