import React from 'react';
import CommonTable2 from '../../../Components/Table/CommonTable2';
import { useTranslation } from 'react-i18next';
import CommonButton from '../../../Components/Button/CommonButton';
import { iWhiteAddItem } from '../../../App/Utility/source';
import PackageOverviewTable from '../table/PackageOverviewTable';
import useSchoolCategoryStore, { schoolCategoryPackageIndex } from '../../../App/Stores/schoolCategoryStore';
import AddPackageModal from '../modal/AddPackageModal';
import EditPackageModal from '../modal/EditPackageModal';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

const PackageOverview = () => {

    const { t } = useTranslation();

    const { resetAddPackageForm,package_overview_search, setPackage_overview_search, setShowAddPackageModal, categoryPackageList, package_overview_take, setPackage_overview_take } = useSchoolCategoryStore();

    const package_overview_headers = [
        { index: 1, name: t("#") },
        { index: 2, name: t("Title") },
        { index: 3, name: t("Lessons") },
        { index: 4, name: t("Duration") },
        { index: 5, name: t("Capacity") },
        { index: 6, name: t("Price") },
        { index: 7, name: t("Status") },
    ];

    const { category_id } = useParams();

    const [searchValue] = useDebounce(package_overview_search, 500);

    useEffect(() => {
        if (searchValue === "") {
            schoolCategoryPackageIndex(category_id, "", "")
        } else {
            schoolCategoryPackageIndex(category_id, "", searchValue)
        }
    }, [category_id, searchValue])

    return (
        <div>
            <div className='flex justify-between py-s20'>
                <div className='flex items-center justify-center text-fs16 font-fw600 text-cMainBlack'>{t("Package overview")}</div>
            </div>
            <CommonTable2
                titleComponent={
                    <>
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
                            btnLabel={t("Add Package")}
                            onClick={async() => {
                                await resetAddPackageForm();
                                setShowAddPackageModal(true)
                            }}
                        />
                    </>
                }
                scroll={false}
                headers={package_overview_headers}

                showSearchBox={true}
                searchValue={package_overview_search}
                withClearSearch={true}
                onSearchClear={() => setPackage_overview_search("")}
                searchOnChange={(e) => setPackage_overview_search(e.target.value)}

                showTakeOption={true}
                currentTakeAmount={package_overview_take ? package_overview_take : 10}
                takeOptionOnChange={async (e) => {
                    await setPackage_overview_take(e);
                    if (searchValue === "") {
                        schoolCategoryPackageIndex(category_id, "", "")
                    } else {
                        schoolCategoryPackageIndex(category_id, "", searchValue)
                    }
                }}

                pagination={true}
                showPageCountText={true}
                showPagination={true}

                paginationObject={categoryPackageList}
                paginationOnClick={async (url) => {

                    if (searchValue === "") {
                        schoolCategoryPackageIndex(category_id, url, "")
                    } else {
                        schoolCategoryPackageIndex(category_id, "", searchValue)
                    }
                }}

                autoManageRow={true}
                TableRowComponent={PackageOverviewTable}
            />

            <AddPackageModal />
            <EditPackageModal />
        </div>
    );
};

export default PackageOverview;