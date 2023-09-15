/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { iAddItem } from '../../../App/Utility/source';
import CommonButton from '../../../Components/Button/CommonButton';
import useClassStore, { getSchoolClass } from '../../../App/Stores/classStore';
import useLayoutStore from '../../../App/Stores/LayoutStore';
import { PageTitle } from '../../../Utility/UtilityFunctions';
import useUtilityStore from '../../../App/Stores/UtilityStore';
import CommonTable2 from '../../../Components/Table/CommonTable2';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import ClassTableRow from '../table/ClassTableRow';
import Classes from '../Classes';

function ClassListView() {

    const { t } = useTranslation();

    const classHeaders = [
        { index: 1, name: "#" },
        { index: 2, name: t("Name") },
        { index: 3, name: t("Start Date") },
        { index: 4, name: t("Time Range") },
        { index: 5, name: t("Type") },
        { index: 6, name: t("Status") },
    ];

    const { classStatus, resetClassAddForm, setClassSearchValue, classSearchValue, setClassTakeItem, classTakeItem, setShowAddClassModal, classList, setSchoolPageUrl, schoolPageUrl } = useClassStore();

    const { setBarTitle } = useLayoutStore();

    useEffect(() => {
        window.scrollTo(0, 0);
        PageTitle(t("MaWay | Classes"));
        setBarTitle(t("MaWay | Classes"));
    }, [])

    const [searchValue] = useDebounce(classSearchValue, 500);

    useEffect(() => {
        if (searchValue === "") {
            getSchoolClass(schoolPageUrl);
        } else {
            getSchoolClass("", searchValue);
        }
    }, [searchValue, classStatus])

    return (
        <Classes>
            <div className='overflow-hidden bg-cBrandColor2 rounded-br8'>
                <CommonTable2
                    topRightComponent={<TakeItem />}
                    headers={classHeaders}
                    tableTitle=""

                    showPageCountText={true}
                    showPagination={true}
                    paginationObject={classList}
                    paginationOnClick={async (url) => {

                        await setSchoolPageUrl(url)

                        if (classSearchValue === "") {
                            getSchoolClass(url);
                        } else {
                            getSchoolClass(url, classSearchValue);
                        }
                    }}

                    showTakeOption={true}
                    currentTakeAmount={classTakeItem ? classTakeItem : 10}
                    takeOptionOnChange={async (e) => {
                        setSchoolPageUrl("")
                        await setClassTakeItem(e);
                        await getSchoolClass("");
                    }}

                    showSearchBox={true}
                    searchValue={classSearchValue}
                    withClearSearch={true}
                    onSearchClear={() => setClassSearchValue("")}
                    searchOnChange={(e) => setClassSearchValue(e.target.value)}

                    autoManageRow={true}
                    TableRowComponent={ClassTableRow}

                    titleComponent={
                        <div>
                            <CommonButton
                                colorType="primary"
                                btnLabel={t("Create class")}
                                roundedFull={false}
                                width="w-[155px]"
                                icon={<div className="mr-s5">
                                    <img className="w-s20 h-s15" src={iAddItem} alt="" /></div>}
                                onClick={() => {
                                    setShowAddClassModal(true);
                                    resetClassAddForm();
                                }}
                            />
                        </div>
                    }
                />
            </div>
        </Classes>
    )
}

export default ClassListView;


const TakeItem = () => {
    const { setLoading } = useUtilityStore();
    const { setClassTakeItem, classTakeItem, setSchoolPageUrl } = useClassStore();
    return (
        <div className=''>
            <span className='pr-s10'>Show</span>
            <select id="cars"
                value={classTakeItem ? classTakeItem : 10}
                onChange={async (e) => {
                    setLoading(true);
                    setSchoolPageUrl("")
                    await setClassTakeItem(e.target.value);
                    await getSchoolClass();
                    setLoading(false);
                }} className='pl-5 font-semibold border-2 h-s30 rounded-br5 select-style space-y-s5 border-cChipBorder'>
                <option
                    className='py-s10 text-cHighlightedTexts'
                    selected={classTakeItem === 10}
                    value={10}
                >10</option>

                <option
                    className='py-s10 text-cHighlightedTexts'
                    selected={classTakeItem === 25}
                    value={25}
                >25</option>
                <option
                    className='py-s10 text-cHighlightedTexts'
                    selected={classTakeItem === 50}
                    value={50}
                >50</option>
                <option
                    className='py-s10 text-cMainBlack'
                    selected={classTakeItem === 100}
                    value={100}
                >100</option>
            </select>   <span className='pl-s10'>Entries</span>

        </div>
    )
}
