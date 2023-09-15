/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ClassRoomTableRow from './table/ClassRoomTableRow';
import { useEffect } from 'react';
import useClassroomStore, { getSchoolClassroom } from '../../App/Stores/classroomStore';
import CommonButton from '../../Components/Button/CommonButton';
import { iAddItem } from '../../App/Utility/source';
import useLayoutStore from '../../App/Stores/LayoutStore';
import { PageTitle } from '../../Utility/UtilityFunctions';
import CommonTitle from '../../Components/Title/CommonTitle';
import CommonTable2 from '../../Components/Table/CommonTable2';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';

const Classroom = () => {

    const { setClassroomSearch, classroomSearch, setClassroom_take, classroom_take, classroomList, setShowAddClassroomModal } = useClassroomStore();

    const { t } = useTranslation();

    const classroomHeaders = [
        { index: 1, name: t("#") },
        { index: 2, name: t("Name") },
        { index: 3, name: t("Address") },
        { index: 4, name: t("Capacity") },
    ];

    const { setBarTitle } = useLayoutStore();

    useEffect(() => {
        window.scrollTo(0, 0);
        PageTitle(t("MaWay | Classroom"));
        setBarTitle(t("MaWay | Classroom"));
    }, [])

    const [searchValue] = useDebounce(classroomSearch, 500);

    useEffect(() => {
        if (searchValue === "") {
            getSchoolClassroom("");
        } else {
            getSchoolClassroom("", searchValue);
        }
    }, [searchValue])

    return (
        <div className=''>
            <CommonTitle title={t("Classroom")} />
            <div className='overflow-hidden bg-cBrandColor2 rounded-br8'>
                <CommonTable2
                    headers={classroomHeaders}
                    tableTitle=""

                    showPageCountText={true}
                    showPagination={true}

                    TableRowComponent={ClassRoomTableRow}
                    paginationOnClick={async (url) => {
                        if (searchValue === "") {
                            await getSchoolClassroom(url);
                        } else {
                            await getSchoolClassroom(url, searchValue);
                        }
                    }}

                    paginationObject={classroomList}
                    autoManageRow={true}

                    showTakeOption={true}
                    currentTakeAmount={classroom_take ? classroom_take : 10}
                    takeOptionOnChange={async (e) => {
                        await setClassroom_take(e);
                        getSchoolClassroom("")
                    }}

                    showSearchBox={true}
                    searchValue={classroomSearch}
                    withClearSearch={true}
                    onSearchClear={() => setClassroomSearch("")}
                    searchOnChange={(e) => setClassroomSearch(e.target.value)}

                    titleComponent={
                        <CommonButton
                            colorType="primary"
                            btnLabel={t("Classroom")}
                            roundedFull={false}
                            width="w-[145px]"
                            icon={<div className="mr-s5"><img className="w-s20 h-s15" src={iAddItem} alt="" /></div>}
                            onClick={() => { setShowAddClassroomModal(true) }}
                        />
                    }
                />
            </div>
        </div>
    );
};

export default Classroom;