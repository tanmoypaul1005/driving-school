/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import CommonTitle from '../../Components/Title/CommonTitle';
import StudentTableRow from './table/StudentTableRow';
import { PageTitle } from '../../App/Utility/UtilityFunctions';
import CommonTable2 from '../../Components/Table/CommonTable2';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import useLayoutStore from '../../App/Stores/LayoutStore';
import CommonChipItem from '../../Components/CommonChipItem';
import BackLink from '../../Components/Pagination/BackLink';
import CommonButton from '../../Components/Button/CommonButton';
import { iAddItem } from '../../App/Utility/source';
import useSchoolStudentStore, { getSchoolStudentIndex } from '../../App/Stores/schoolStudentStore';

const Student = () => {

    const {
        schoolStudentList,
        setSchoolStudentPageUrl,
        schoolStudentPageUrl,
        SchoolStudentIndexTakeAmount,
        setSchoolStudentIndexTakeAmount,
        setSchoolStudentSearch,
        schoolStudentSearch,
        studentStatus,
        setShowAddStudentModal,
        resetStudentAddForm
    } = useSchoolStudentStore();

    const { t } = useTranslation();

    const classHeaders = [
        { index: 1, name: "#" },
        { index: 2, name: t("Name") },
        { index: 3, name: t("Category") },
        { index: 4, name: t("Amount") },
        { index: 5, name: t("Remaining") },
        { index: 6, name: t("Status") },
    ];

    const [searchValue] = useDebounce(schoolStudentSearch, 500);

    const { setBarTitle } = useLayoutStore();

    useEffect(() => {
        window.scrollTo(0, 0);
        PageTitle(t("Student"));
        setBarTitle(t("Student"));
        fetchStudent();
    }, []);

    const fetchStudent = async () => {
        if (!schoolStudentSearch) {
            await getSchoolStudentIndex(schoolStudentPageUrl, SchoolStudentIndexTakeAmount, "",studentStatus);
        } else {
            await getSchoolStudentIndex(schoolStudentPageUrl, SchoolStudentIndexTakeAmount, searchValue,studentStatus);
        }
    }

    useEffect(() => {
        if (!schoolStudentSearch) {
            getSchoolStudentIndex(schoolStudentPageUrl, SchoolStudentIndexTakeAmount, "",studentStatus);
        } else {
            getSchoolStudentIndex(schoolStudentPageUrl, SchoolStudentIndexTakeAmount, searchValue,studentStatus);
        }
    }, [searchValue,studentStatus]);

    return (
        <div>
            <CommonTitle title={t("Student")}>
                {studentStatus !== "" && <BackLink linksArray={[
                    { label: t("Dashboard"), linkTo: "/" },
                    { label: t("Student"), linkTo: "" }
                ]} />}
            </CommonTitle>
            {studentStatus !== "" && <div className="mb-s20 w-[150px] flex items-center space-x-5">
                <CommonChipItem onClick={() => { }} selected={true}
                    title1={
                        (studentStatus === "pending" && 'Pending') ||
                        (studentStatus === "active" && 'Active Student') ||
                        (studentStatus === "new_request" && 'Request')
                    }
                />
            </div>}
            <CommonTable2
                headers={classHeaders}
                tableTitle=""

                showPageCountText={true}
                showPagination={true}

                TableRowComponent={StudentTableRow}
                paginationOnClick={async (url) => {
                    await setSchoolStudentPageUrl(url);
                    if (searchValue === "") {
                        getSchoolStudentIndex(url, SchoolStudentIndexTakeAmount,"",studentStatus);
                    } else {
                        getSchoolStudentIndex(url, SchoolStudentIndexTakeAmount, searchValue,studentStatus);
                    }
                }}

                paginationObject={schoolStudentList}
                autoManageRow={true}

                showTakeOption={true}
                currentTakeAmount={SchoolStudentIndexTakeAmount}
                takeOptionOnChange={(takeAmount) => {
                    getSchoolStudentIndex("", takeAmount,searchValue,);
                    setSchoolStudentIndexTakeAmount(takeAmount);
                }}

                showSearchBox={true}
                searchValue={schoolStudentSearch}
                withClearSearch={true}
                onSearchClear={() => setSchoolStudentSearch("")}
                searchOnChange={(e) => setSchoolStudentSearch(e.target.value)}

                titleComponent={
                    <CommonButton
                        roundedFull={false}
                        btnLabel={t('Add student')}
                        icon={<img src={iAddItem} alt='icon' className='h-[16px] mr-s5' />}
                        onClick={() => {
                            resetStudentAddForm();
                            setShowAddStudentModal(true);
                        }}
                    />
                }

            />
        </div>
    );
};

export default Student;