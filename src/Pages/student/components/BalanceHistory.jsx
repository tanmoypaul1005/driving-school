/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import useSchoolStudentStore, { schoolStudentBalanceHistoryIndex } from '../../../App/Stores/schoolStudentStore';
import BalanceHistoryTable from '../table/BalanceHistoryTable';
import CommonTitle from '../../../Components/Title/CommonTitle';
import { useParams } from 'react-router-dom';
import CommonTable2 from '../../../Components/Table/CommonTable2';
import BackLink from '../../../Components/Pagination/BackLink';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';

const BalanceHistory = () => {

    const {
        balanceHistoryList,
        schoolStudentBalancePageUrl,
        setSchoolStudentBalancePageUrl,
        schoolStudentBalanceTakeAmount,
        setSchoolStudentBalanceTakeAmount,
        balanceSearch,
        setBalanceSearch
    } = useSchoolStudentStore();

    const { school_student_id } = useParams();

    const { t } = useTranslation();

    const BalanceHistoryHeaders = [
        { index: 1, name: "#" },
        { index: 2, name: t("Title") },
        { index: 3, name: t("Amount") },
        { index: 4, name: t("Date & time") },
        { index: 5, name: t("Status") },
    ];

    const [searchValue] = useDebounce(balanceSearch, 500);

    useEffect(() => {
        if (school_student_id) {
            if (searchValue === "") {
                schoolStudentBalanceHistoryIndex(school_student_id, schoolStudentBalancePageUrl, schoolStudentBalanceTakeAmount);
            } else {
                schoolStudentBalanceHistoryIndex(school_student_id, schoolStudentBalancePageUrl, schoolStudentBalanceTakeAmount, searchValue);
            }
        }
    }, [school_student_id, searchValue])

    return (
        <>
            <CommonTitle title={t("Balance history")} >
                <BackLink linksArray={[
                    { label: t("Student"), linkTo: "/school-student" },
                    { label: t("Student profile"), linkTo: "/school-student/details/" + school_student_id },
                    { label: t("Balance history"), linkTo: "" },
                ]} />
            </CommonTitle>
            <div className='overflow-hidden bg-cBrandColor2 rounded-br8'>
                <CommonTable2
                    headers={BalanceHistoryHeaders}
                    paginationObject={balanceHistoryList}
                    paginationOnClick={async (url) => {
                        setSchoolStudentBalancePageUrl(url);
                        if (school_student_id) {
                            if (searchValue === "") {
                                schoolStudentBalanceHistoryIndex(school_student_id, url, schoolStudentBalanceTakeAmount);
                            } else {
                                schoolStudentBalanceHistoryIndex(school_student_id, url, schoolStudentBalanceTakeAmount, searchValue);
                            }
                        }
                    }}

                    autoManageRow={true}
                    TableRowComponent={BalanceHistoryTable}

                    showTakeOption={true}
                    currentTakeAmount={schoolStudentBalanceTakeAmount}
                    takeOptionOnChange={(takeAmount) => {
                        setSchoolStudentBalanceTakeAmount(takeAmount);
                        schoolStudentBalanceHistoryIndex(school_student_id, "", takeAmount);
                    }}

                    showSearchBox={true}
                    searchValue={balanceSearch}
                    withClearSearch={true}
                    onSearchClear={() => setBalanceSearch("")}
                    searchOnChange={(e) => setBalanceSearch(e.target.value)}

                    showPagination={true}
                    showPageCountText={true}
                />
            </div>
        </>
    );
};

export default BalanceHistory;