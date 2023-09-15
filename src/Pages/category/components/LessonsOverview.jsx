import React from 'react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSchoolCategoryStore, { schoolCategoryLessonUpdateIndex } from '../../../App/Stores/schoolCategoryStore';
import SchoolDraggableList from '../table/SchoolDraggableList';
import { useParams } from 'react-router-dom';
import CommonButton from '../../../Components/Button/CommonButton';
import CommonButtonOutlined from '../../../Components/Button/CommonButtonOutlined';
import { iWhiteAddItem } from '../../../App/Utility/source';
import CommonTable2 from '../../../Components/Table/CommonTable2';
import CategoryLessonTableRow from '../table/CategoryLessonTableRow';

const LessonsOverview = () => {

    const { t } = useTranslation();

    const { lessonsAddFromData, setLessonsAddFromData, setShowAddCategoryListLessonModal, schoolCategoryDetails, schoolCategoryLessonList } = useSchoolCategoryStore();

    const [isDragMode, setIsDragMode] = useState(false);

    const { category_id } = useParams();

    const lang_code = localStorage.getItem("lang_code");

    const schoolCategoryHeaders = [
        { index: 1, name: t("#") },
        { index: 2, name: t("Name") },
        { index: 3, name: t("Duration") },
        { index: 5, name: t("Price") },
    ];

    return (
        <div>
            {!isDragMode ?
                <>
                    <div className="text-fs16 font-fw600 text-cMainBlack py-s20">{t("Lessons overview")}</div>

                    <div className="bg-cBrandColor2 rounded-br8">
                        <CommonTable2
                            headers={schoolCategoryHeaders}
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

                            titleComponent={
                                <>
                                    <div className='flex justify-between space-x-5'>
                                        {!isDragMode && schoolCategoryLessonList?.length > 1 ?
                                            <CommonButtonOutlined
                                                isFullRounded={false}
                                                colorType='primary'
                                                onClick={() => setIsDragMode(true)}
                                                width={lang_code === "en" ? "w-[160px]" : "w-[210px]"}
                                                btnLabel={t('Change orders')}
                                            /> : ""}

                                        <CommonButton
                                            icon={
                                                <div className="mr-s5">
                                                    <img
                                                        className="w-s20 h-s15"
                                                        src={iWhiteAddItem}
                                                        alt="" />
                                                </div>
                                            }
                                            roundedFull={false}
                                            colorType='primary'
                                            btnLabel={t("Add lesson")}
                                            onClick={() => {
                                                setLessonsAddFromData({ ...lessonsAddFromData, school_category_id: schoolCategoryDetails?.category_id })
                                                setShowAddCategoryListLessonModal(true);
                                            }}
                                        />
                                    </div>
                                </>
                            }

                            items={
                                <>
                                    {schoolCategoryLessonList?.length > 0 ?
                                        schoolCategoryLessonList?.map((item, index) => (
                                            <CategoryLessonTableRow data={item} key={index} index={index + 1} />
                                        )) :
                                        <tr className='w-full'>
                                            <th colSpan={5} className="py-s10">
                                                {t("No Data Found !")}
                                            </th>
                                        </tr>
                                    }
                                </>
                            }
                        /></div> </> : <div>
                    <div className="pb-5 font-semibold text-fs20 mt-s20">{t('Change lesson orders')}</div>
                    <div className="bg-cBrandColor2 rounded-br8 p-s20">
                        <SchoolDraggableList onSubmit={(res) => {
                            let updateSuccess = schoolCategoryLessonUpdateIndex(res, category_id);
                            if (updateSuccess) setIsDragMode(false);
                        }} />
                    </div>
                </div>}
        </div>
    )
}

export default LessonsOverview