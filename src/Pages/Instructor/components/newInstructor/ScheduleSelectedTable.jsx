import React from 'react'
import CommonTable2 from '../../../../Components/Table/CommonTable2'
import { useTranslation } from 'react-i18next';
import { iGrayCross } from '../../../../App/Utility/source';
import ScheduleSelectedTableRow from '../../table/ScheduleSelectedTableRow';
import useSchoolInstructorStore from '../../../../App/Stores/schoolInstructorStore';
import { formatDate } from '../../../../App/Utility/UtilityFunctions';

const ScheduleSelectedTable = ({ allData }) => {

    const { t } = useTranslation();

    const  {selectedDate,classStatus}=useSchoolInstructorStore();

    const scheduleHeaders = [
        { index: 1, name: "#" },
        { index: 2, name: t("Name") },
        { index: 3, name: t("Start Date") },
        { index: 4, name: t("Time Range") },
        { index: 5, name: t("Type") },
    ];

    const classList = allData?.filter(i => classStatus === "all"?
    formatDate(i?.start) === formatDate(selectedDate)
   :formatDate(i?.start) === formatDate(selectedDate)&& i?.title === classStatus);

    return (
        <div>
            {/* <div className="sub_title text-cBlack pb-s20">{t("Filter Result")}</div>
            <div className='flex space-x-2 mb-s20'>
                <FilterChip title="Driving" />
                <FilterChip title="Driving" />
                <FilterChip title="Driving" />
                <FilterChip title="Driving" />
            </div> */}
            <div className="bg-cBrandColor2 rounded-br8">
                <CommonTable2
                    headers={scheduleHeaders}
                    shoSearchBox={false}
                    pagination={false}
                    showPageCountText={true}
                    showPagination={false}

                    items={
                        <>
                            {classList.length > 0 ?
                                classList?.map((item, index) => (
                                    <ScheduleSelectedTableRow data={item} key={index} index={index + 1} />
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

export default ScheduleSelectedTable;

export const FilterChip = ({ title = "" }) => {
    return (
        <div className="flex items-center justify-center space-x-2 text-center rounded-full bg-cWhite py-s10 px-s12 text-fs16 font-fw500 text-cHighlighted">
            <div>{title}</div>
            <img src={iGrayCross} alt="" className="cursor-pointer w-s16 h-s16" />
        </div>
    )
}