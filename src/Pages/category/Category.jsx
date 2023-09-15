/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { PageTitle } from '../../Utility/UtilityFunctions';
import useLayoutStore from '../../App/Stores/LayoutStore';
import useSchoolCategoryStore, { schoolCategoryIndex, searchSchoolCategoryList } from '../../App/Stores/schoolCategoryStore';
import useUtilityStore from '../../App/Stores/UtilityStore';
import CommonTitle from '../../Components/Title/CommonTitle';
import CommonTable2 from '../../Components/Table/CommonTable2';
import { useTranslation } from 'react-i18next';
import CategoryTableRow from './table/CategoryTableRow';

const Category = () => {

  const { setCategory_take, category_take, setSchoolCategorySearchKey, schoolCategorySearchKey, schoolCategoryListAll, setSchoolCategoryPageUrl, schoolCategoryPageUrl } = useSchoolCategoryStore();

  const { setLoadingSearch } = useUtilityStore.getState();

  const { t } = useTranslation();

  const categoryHeaders = [
    { index: 1, name: t("#") },
    { index: 2, name: t("Title") },
    // { index: 3, name: t("Package lessons") },
    // { index: 4, name: t("Package hours") },
    // { index: 5, name: t("Price") },
    { index: 3, name: t("Status") }
  ];

  const { setBarTitle } = useLayoutStore();

  useEffect(() => {
    PageTitle(t("MaWay | Category"));
    setBarTitle(t("MaWay | Category"));
  }, [setBarTitle]);


  useEffect(() => {
    if (schoolCategorySearchKey) {
      setLoadingSearch(true);
      setTimeout(() => {
        searchSchoolCategoryList(schoolCategorySearchKey);
        setLoadingSearch(false);
      }, 350);
    } else {
      schoolCategoryIndex(schoolCategoryPageUrl)
    }
  }, [schoolCategorySearchKey]);

  return (
    <div className=''>
      <CommonTitle title={t("Category")} />
      <div className='overflow-hidden bg-cBrandColor2 rounded-br8'>
        <CommonTable2
          headers={categoryHeaders}
          tableTitle=""
          paginationObject={schoolCategoryListAll}
          totalResult={true}
          // showPagination={true}
          showPageCountText={true}

          paginationOnClick={async (url) => {
            await setSchoolCategoryPageUrl(url);
            schoolCategoryIndex(url);
          }}

          showSearchBox={true}
          withClearSearch={true}
          searchValue={schoolCategorySearchKey}
          onSearchClear={() => setSchoolCategorySearchKey("")}
          searchOnChange={(e) => setSchoolCategorySearchKey(e.target.value)}

          // showTakeOption={true}
          // currentTakeAmount={category_take ? category_take : 10}
          // takeOptionOnChange={async (e) => {
          //   await setSchoolCategorySearchKey("")
          //   await setCategory_take(e);
          //   await schoolCategoryIndex("");
          //   console.log("");
          // }}
          autoManageRow={true}
          TableRowComponent={CategoryTableRow}

        />
      </div>
    </div>
  );
};
export default Category;

