import React from 'react';
import { Toastr } from '../../../App/Utility/UtilityFunctions';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonSearchBox from '../../../Components/Input/CommonSearchBox';
import useInvoiceStore, { getInvoiceIndex } from '../../../App/Stores/InvoiceStore';
import CommonButton from '../../../Components/Button/CommonButton';
import SelectInput from '../../../Components/Input/SelectInput';
import CommonModal from '../../../Components/Modal/CommonModal';

const InvoiceFilterModal = () => {

    const {
        setInvoiceUserType,
        showInvoiceFilterModal,
        setShowInvoiceFilterModal,
        filterData,
        setFilterData,
        setInvoiceType,
        setInvoiceSearchKey,
        invoiceUserType,
    } = useInvoiceStore()

    const ResetFilterData = () => {
        setInvoiceType(0);
        setFilterData({
            search: "",
            status: [],
            user: "",
            start_date: "",
            end_date: "",
        })
    }

    return (
        <div>
            <CommonModal
                showModal={showInvoiceFilterModal}
                setShowModal={setShowInvoiceFilterModal}
                modalTitle="Filter Orders"
                mainContent={
                    <>
                        <form onSubmit={(e) => e.preventDefault()}>

                            <div className="my-5">
                                <CommonSearchBox
                                    fullWidth={true}

                                    value={filterData?.search}
                                    onChange={(e) => setFilterData({ ...filterData, search: e.target.value })}
                                    withClearSearch={true}
                                    onSearchClear={() => setFilterData({ ...filterData, search: "" })}
                                />
                            </div>

                            {/* g:          payment status */}
                            <div className="mb-s20">
                                <SelectInput
                                    label="Payment Status"
                                    placeholder="Choose Payment Status"
                                    selectOptionOnChange={(e) => {
                                        if (e === "paid") setFilterData({ ...filterData, status: ["paid1", "paid2"] });
                                        else if (e === "missing") setFilterData({ ...filterData, status: ["missing1", "missing2"] });
                                        else if (e === '') setFilterData({ ...filterData, status: [] });
                                        else setFilterData({ ...filterData, status: [e] });
                                    }}
                                    dataArray={[
                                        {
                                            title: "accepted",
                                            value: "accepted",
                                            selected: filterData?.status[0] === "accepted" ? true : false
                                        },
                                        {
                                            title: "requested",
                                            value: "requested",
                                            selected: filterData?.status[0] === "requested" ? true : false
                                        },
                                        {
                                            title: "cancelled",
                                            value: "cancelled",
                                            selected: filterData?.status[0] === "cancelled" ? true : false
                                        },
                                        {
                                            title: "created",
                                            value: "created",
                                            selected: filterData?.status[0] === "created" ? true : false
                                        },
                                        {
                                            title: "paid",
                                            value: "paid",
                                            selected: filterData?.status[0] === "paid1" ? true : false
                                        },
                                        {
                                            title: "missing payment",
                                            value: "missing",
                                            selected: filterData?.status[0] === "missing1" ? true : false
                                        },

                                        {
                                            title: "rejected",
                                            value: "rejected",
                                            selected: filterData?.status[0] === "rejected" ? true : false
                                        },
                                        {
                                            title: "expired",
                                            value: "expired",
                                            selected: filterData?.status[0] === "expired" ? true : false
                                        }
                                    ]}
                                />
                            </div>

                            <div className="my-s20">
                                <SelectInput
                                    label="User Type"
                                    placeholder="Choose User Type"
                                    selectOptionOnChange={(e) => setFilterData({ ...filterData, user: e })}
                                    dataArray={[
                                        {
                                            title: "school",
                                            value: "school",
                                            selected: filterData?.user === "school" ? true : false
                                        },
                                        {
                                            title: "instructor",
                                            value: "instructor",
                                            selected: filterData?.user === "instructor" ? true : false
                                        },
                                    ]}
                                />
                            </div>

                            <div className='flex justify-between items-center w-full'>
                                <div className='p-0 rounded-full'>
                                    <CommonInput
                                        type='date'
                                        value={filterData.start_date}
                                        startDate={"1901-01-01"}
                                        label="start date"
                                        allowPastDates={true}
                                        onChange={(e) => {
                                            // console.log((e.target.value));
                                            const startDate = new Date(e.target.value);
                                            const endDate = new Date(filterData.end_date);

                                            // console.log("startDate::::", startDate, "; endDate::::", endDate);

                                            if (startDate > endDate) {
                                                setFilterData({ ...filterData, end_date: "", start_date: e.target.value });
                                            } else {
                                                setFilterData({ ...filterData, start_date: e.target.value });
                                            }
                                            // setFilterData({ ...filterData, start_date: e.target.value });
                                        }}
                                    />
                                </div>

                                <div className='flex items-center'>
                                    <div className='pr-0'>
                                        <CommonInput
                                            // required={filterData.start_date ? true : false}
                                            type='date'
                                            label="end date"
                                            value={filterData.end_date}
                                            // disabled={!filterData.start_date}
                                            startDate={filterData.start_date ? filterData.start_date : "1901-01-01"}
                                            onChange={(e) => {
                                                // console.log(e.target.value);
                                                setFilterData({ ...filterData, end_date: (e.target.value) });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between mt-s20'>
                                <CommonButton onClick={() => {
                                    ResetFilterData(); setInvoiceUserType("all")
                                }}
                                    fullRounded={true}
                                    btnLabel='Clear'
                                    colorType="FilterClearButton" text="fs16" />
                                <CommonButton
                                    onClick={async () => {
                                        console.log(filterData);
                                        let filterSuccess = await getInvoiceIndex(invoiceUserType, "", filterData);
                                        if (filterSuccess) {
                                            Toastr({ message: "Your filter successfully Apply", type: "success" });
                                            setShowInvoiceFilterModal(false);
                                            setInvoiceSearchKey("");
                                        }
                                    }}
                                    type="submit"
                                    btnLabel="Apply"
                                    colorType="primary"
                                    roundedFull="true"
                                />
                            </div>

                        </form>

                    </>
                }

            />
        </div>
    );
};

export default InvoiceFilterModal;