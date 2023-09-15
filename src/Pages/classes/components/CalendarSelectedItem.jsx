import React from 'react'
import CommonTable2 from '../../../Components/Table/CommonTable2'
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../App/Utility/UtilityFunctions';
import useClassStore from '../../../App/Stores/classStore';
import ClassTableRow from '../table/ClassTableRow';

const CalendarSelectedItem = ({ allData }) => {

    const { t } = useTranslation();

    const { selectedDate,classStatus } = useClassStore();

    const classHeaders = [
        { index: 1, name: "#" },
        { index: 2, name: t("Name") },
        { index: 3, name: t("Start Date") },
        { index: 4, name: t("Time Range") },
        { index: 5, name: t("Type") },
        { index: 6, name: t("Status") },
    ];

    const classList = allData?.filter(i => classStatus === "all"?
        formatDate(i?.start) === formatDate(selectedDate)
       :formatDate(i?.start) === formatDate(selectedDate)&& i?.title === classStatus);

    return (
        <div>
            <div className="bg-cBrandColor2 rounded-br8">
            <div className="sub_title text-cBlack pt-s20 px-s20">{formatDate(selectedDate)}</div>
                <CommonTable2
                    headers={classHeaders}
                    shoSearchBox={false}
                    pagination={false}
                    showPageCountText={true}
                    showPagination={false}

                    // showTakeOption={true}
                    // currentTakeAmount={classTakeItem ? classTakeItem : 10}
                    // takeOptionOnChange={async (e) => {
                    //     setSchoolPageUrl("")
                    //     await setClassTakeItem(e);
                    //     await getSchoolClass("");
                    // }}

                    // showSearchBox={true}
                    // searchValue={classSearchValue}
                    // withClearSearch={true}
                    // onSearchClear={() => setClassSearchValue("")}
                    // searchOnChange={(e) => setClassSearchValue(e.target.value)}



                    items={
                        <>
                            {classList?.length > 0 ?
                                classList?.map((item, index) => (
                                    <ClassTableRow data={item} key={index} index={index + 1} />
                                )) :
                                <tr className='w-full'>
                                    <th colSpan={6} className="py-s10">
                                        {t("No Data Found !")}
                                    </th>
                                </tr>
                            }
                        </>
                    }
                />
            </div>
        </div>
    )
}

export default CalendarSelectedItem