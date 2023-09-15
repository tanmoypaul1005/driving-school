/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import useLayoutStore from '../../App/Stores/LayoutStore'
import useNewInvoiceStore, { getNewSchoolInvoiceIndex } from '../../App/Stores/NewInvoiceStore'
import { PageTitle } from '../../App/Utility/UtilityFunctions'
import CommonTable2 from '../../Components/Table/CommonTable2'
import InvoiceTableRowBalance from '../../Components/Table/Invoice/InvoiceTableRowBalance'
import NewInvoiceTableRow from '../../Components/Table/Invoice/NewInvoiceTableRow'
import CommonTitle from '../../Components/Title/CommonTitle'
import NewSchoolInvoiceFilter from './modal/NewSchoolInvoiceFilter'
import { useTranslation } from 'react-i18next'
import CommonChipItem from '../../Components/CommonChipItem'

const NewInvoice = () => {
  const { setBarTitle } = useLayoutStore();
  const {
    selectedInvoiceChip,
    setSelectedInvoiceChip,
    invoiceSearchKey,
    filterSchoolInvoiceData,
    invoiceIndexDataSchool,
    setInvoiceSearchKey,
    setShowSchoolInvoiceFilterModal,
    invoiceTake,
    setInvoiceTake,
    invoicePaginationUrl,
    setInvoicePaginationUrl,
    resetFilterSchoolInvoiceData,
    activeFilter,
    setActiveFilter,
  } = useNewInvoiceStore();

  const { t } = useTranslation();

  const InvoiceTableHeader = [
    { index: 0, name: "#" },
    { index: 1, name: t("Name") },
    { index: 2, name: t("Order ID") },
    { index: 3, name: t("User Type") },
    { index: 4, name: t("Date & time") },
    { index: 5, name: t("Amount") },
    { index: 6, name: t("Status") },
  ];

  const InvoiceTableHeaderBalance = [
    { index: 0, name: "#" },
    { index: 1, name: t("Student name") },
    { index: 2, name: t("Date & time") },
    { index: 4, name: t("Paid amount") },
  ];

  const [searchValue] = useDebounce(invoiceSearchKey, 500);

  useEffect(() => {
    PageTitle(t("Orders"));
    setBarTitle("Orders");
    fetchInvoiceSchool();
  }, []);

  useEffect(() => {
    // console.log('searchValue', searchValue);
    if (searchValue) getNewSchoolInvoiceIndex(selectedInvoiceChip, invoiceTake, "", searchValue, filterSchoolInvoiceData);
    else getNewSchoolInvoiceIndex(selectedInvoiceChip, invoiceTake, invoicePaginationUrl, "", filterSchoolInvoiceData);
  }, [searchValue]);


  const fetchInvoiceSchool = async (type = selectedInvoiceChip, paginationUrl = invoicePaginationUrl) => {
    if (invoiceSearchKey) {
      await getNewSchoolInvoiceIndex(type, invoiceTake, paginationUrl, invoiceSearchKey, filterSchoolInvoiceData);
    } else {
      await getNewSchoolInvoiceIndex(type, invoiceTake, paginationUrl, invoiceSearchKey, filterSchoolInvoiceData);
    }
  }

  const resetFilter = async (type = "all") => {
    await setSelectedInvoiceChip(type)
    await resetFilterSchoolInvoiceData();
    await setActiveFilter(false)
    await setInvoiceSearchKey("");
    await setInvoicePaginationUrl("");
    getNewSchoolInvoiceIndex(type, invoiceTake, "", "", {});
  }

  return (
    <div
      onClick={() => {
        // console.log('invoiceIndexDataSchool: ', invoiceIndexDataSchool);
        // console.log('searchValue: ', searchValue);
      }}
      className=''>

      <NewSchoolInvoiceFilter />

      <CommonTitle title={"Orders"}></CommonTitle>

      {/*v        invoice chips area */}
      <div className="flex items-center pb-5 space-x-5">
        <CommonChipItem onClick={() => { resetFilter("all"); }} selected={selectedInvoiceChip === 'all'} title1={'all'} />
        <CommonChipItem onClick={() => { resetFilter("school_student"); }} selected={selectedInvoiceChip === 'school_student'} title1={t('student')} title2={t('school')} />
        <CommonChipItem onClick={() => { resetFilter("school_instructor"); }} selected={selectedInvoiceChip === 'school_instructor'} title1={t('instructor')} title2={t('school')} />
        <CommonChipItem onClick={() => { resetFilter("school_admin"); }} selected={selectedInvoiceChip === 'school_admin'} title1={t('school')} title2={t('admin')} />
        {/* <CommonChipItem onClick={() => { resetFilter("system_generated"); }} selected={selectedInvoiceChip === 'system_generated'} title1={t('admin')} title2={t('school')} /> */}
        <CommonChipItem onClick={() => { resetFilter("balance"); }} selected={selectedInvoiceChip === 'balance'} title1={t('balance')} />
      </div>

      {/* b       invoice table */}
      <div>
        <CommonTable2
          // topRightComponent={<TakeItem />}
          headers={selectedInvoiceChip === 'balance' ? InvoiceTableHeaderBalance : InvoiceTableHeader}
          showPagination={true}

          showSearchBox={true}
          searchValue={invoiceSearchKey}
          withClearSearch={true}
          onSearchClear={() => { setInvoiceSearchKey("") }}
          searchOnChange={(e) => {
            // console.log("SEARCH", e.target.value);
            setInvoiceSearchKey(e.target.value);
          }}

          showTopRightFilter={selectedInvoiceChip === 'balance' ? false : true}
          topRightFilterComponentOnClick={() => { setShowSchoolInvoiceFilterModal(true) }}
          isFilterDot={activeFilter}
          showTakeOption={true}
          topRightFilterComponentText={t("Filter")}
          // titleComponent={
          //   <>
          //     {selectedInvoiceChip === 'balance' && invoiceIndexDataSchool?.data?.length > 0 ?
          //       <CommonButton
          //         onClick={async() => {
          //           await getPayoutIndex()
          //           setShowPayoutModal(true)
          //         }} width='w-[100px]' 
          //         roundedFull={false} 
          //         btnLabel={t('Payout')} /> : ''}
          //   </>
          // }

          // autoManageRow={true}
          // TableRowComponent={InvoiceTableRow}

          items={
            invoiceIndexDataSchool?.data?.length > 0 ?
              invoiceIndexDataSchool?.data?.map((item, index) =>
                selectedInvoiceChip === 'balance' ? <InvoiceTableRowBalance data={item} key={index} index={index + 1} />
                  : <NewInvoiceTableRow data={item} key={index} index={index + 1} />
              )
              : <tr className='w-full'>
                <th colSpan={8} className="py-s10">
                  {t("No Data Found !")}
                </th>
              </tr>
          }

          showPageCountText={true}
          currentTakeAmount={invoiceTake}
          takeOptionOnChange={async (e) => {
            setInvoicePaginationUrl("");
            // console.log('page count update: ', e);
            await setInvoiceTake(e);
            getNewSchoolInvoiceIndex(selectedInvoiceChip, e, "", invoiceSearchKey, filterSchoolInvoiceData);
          }}

          paginationObject={invoiceIndexDataSchool}
          paginationOnClick={async (url) => {
            setInvoicePaginationUrl(url);
            getNewSchoolInvoiceIndex(selectedInvoiceChip, invoiceTake, url, invoiceSearchKey, filterSchoolInvoiceData);
          }}

        />
      </div>

    </div>
  )
}

export default NewInvoice