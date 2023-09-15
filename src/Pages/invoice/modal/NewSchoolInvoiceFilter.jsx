import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import useNewInvoiceStore, { getNewSchoolInvoiceIndex } from '../../../App/Stores/NewInvoiceStore';
import CommonButton from '../../../Components/Button/CommonButton';
import CommonInput from '../../../Components/Input/CommonInput';
import SelectInput from '../../../Components/Input/SelectInput';
import CommonModal from '../../../Components/Modal/CommonModal';
import { Toastr } from '../../../Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';
import useSchoolStudentStore from '../../../App/Stores/schoolStudentStore';
import useSchoolInstructorStore from '../../../App/Stores/schoolInstructorStore';


const NewSchoolInvoiceFilter = () => {
    const {
        showSchoolInvoiceFilterModal,
        setShowSchoolInvoiceFilterModal,
        filterSchoolInvoiceData,
        setFilterSchoolInvoiceData,
        resetFilterSchoolInvoiceData,
        invoiceTake,
        selectedInvoiceChip,
        invoiceSearchKey,
        setActiveFilter
    } = useNewInvoiceStore();

    const { t } = useTranslation();


    const { instructorIndex, instructorSearchKey } = useSchoolInstructorStore();
    const { studentSearch,  studentListAll } = useSchoolStudentStore();

    const [invoiceFilterStudentLabel, setInvoiceFilterStudentLabel] = useState("");

    const [studentDataArray, setStudentDataArray] = useState([]);
    const [instructorDataArray, setInstructorDataArray] = useState([]);

    const [searchValueIns] = useDebounce(instructorSearchKey, 500);
    const [searchValueST] = useDebounce(studentSearch, 500);


    useEffect(() => {
        SmartSearchInstructor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValueIns]);

    const SmartSearchInstructor = async () => {
        // e    instructor search       
        if (searchValueIns) {
            // await searchInstructorList("", 500);
        } else {
            // await getInstructorIndex();
        }
    }

    useEffect(() => {
        SmartSearchStudent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValueST]);

    const SmartSearchStudent = async () => {
        // l    student search      
        if (searchValueST) {
            console.log('SEARCH STUDENT');
            // await searchStudentList();
        } else {
            console.log('GET ALL STUDENT');
            // await getStudentList();
        }
    }

    useEffect(() => {
        let t_array = []
        if (instructorIndex?.data?.length) {
            instructorIndex?.data?.map((item) => t_array.push({ label: item?.name, value: item?.id }));
            setInstructorDataArray(t_array);
        }
    }, [instructorIndex?.data]);

    useEffect(() => {
        let t_array = []
        if (studentListAll?.data?.length) {
            studentListAll?.data?.map((item) => t_array.push({ label: item?.name, value: item?.id }));
            setStudentDataArray(t_array);
        }
    }, [studentListAll?.data])


    let dataArray = []
    if (selectedInvoiceChip === "all") {
        dataArray = [
            {
                title: "Generated",
                value: "generated",
                selected: filterSchoolInvoiceData?.status[0] === "generated" ? true : false
            },
            {
                title: "Requested",
                value: "requested",
                selected: filterSchoolInvoiceData?.status[0] === "requested" ? true : false
            },
            {
                title: "Created",
                value: "created",
                selected: filterSchoolInvoiceData?.status[0] === "created" ? true : false
            },
            {
                title: "Paid",
                value: "paid",
                selected: filterSchoolInvoiceData?.status[0] === "paid1" || filterSchoolInvoiceData?.status[0] === "paid2" ? true : false
            },
            {
                title: "Missing",
                value: "missing",
                selected: filterSchoolInvoiceData?.status[0] === "missing1" || filterSchoolInvoiceData?.status[0] === "missing2" ? true : false
            },
            {
                title: "Accepted",
                value: "accepted",
                selected: filterSchoolInvoiceData?.status[0] === "accepted" ? true : false
            },
            {
                title: "Rejected",
                value: "rejected",
                selected: filterSchoolInvoiceData?.status[0] === "rejected" ? true : false
            },
            {
                title: "Cancelled",
                value: "cancelled",
                selected: filterSchoolInvoiceData?.status[0] === "cancelled" ? true : false
            },]
    }

    if (selectedInvoiceChip === "school_student") {
        dataArray = [
            {
                title: "Requested",
                value: "requested",
                selected: filterSchoolInvoiceData?.status[0] === "requested" ? true : false
            },
            {
                title: "Created",
                value: "created",
                selected: filterSchoolInvoiceData?.status[0] === "created" ? true : false
            },
            {
                title: "Accepted",
                value: "accepted",
                selected: filterSchoolInvoiceData?.status[0] === "accepted" ? true : false
            },
            {
                title: "Rejected",
                value: "rejected",
                selected: filterSchoolInvoiceData?.status[0] === "rejected" ? true : false
            },
            {
                title: "Cancelled",
                value: "cancelled",
                selected: filterSchoolInvoiceData?.status[0] === "cancelled" ? true : false
            },

            {
                title: "Completed",
                value: "completed",
                selected: filterSchoolInvoiceData?.status[0] === "completed" ? true : false
            },
        ]
    }

    if (selectedInvoiceChip === "school_instructor") {
        dataArray = [
            {
                title: "Created",
                value: "created",
                selected: filterSchoolInvoiceData?.status[0] === "created" ? true : false
            },
            {
                title: "Paid",
                value: "paid",
                selected: filterSchoolInvoiceData?.status[0] === "paid1" || filterSchoolInvoiceData?.status[0] === "paid2" ? true : false
            },
            {
                title: "Missing",
                value: "missing",
                selected: filterSchoolInvoiceData?.status[0] === "missing1" || filterSchoolInvoiceData?.status[0] === "missing2" ? true : false
            },
            {
                title: "Accepted",
                value: "accepted",
                selected: filterSchoolInvoiceData?.status[0] === "accepted" ? true : false
            },

            {
                title: "Rejected",
                value: "rejected",
                selected: filterSchoolInvoiceData?.status[0] === "rejected" ? true : false
            },
            {
                title: "Cancelled",
                value: "cancelled",
                selected: filterSchoolInvoiceData?.status[0] === "cancelled" ? true : false
            },
        ]
    }

    if (selectedInvoiceChip === "school_admin") {
        dataArray = [
            {
                title: "Requested",
                value: "requested",
                selected: filterSchoolInvoiceData?.status[0] === "requested" ? true : false
            },
            {
                title: "Created",
                value: "created",
                selected: filterSchoolInvoiceData?.status[0] === "created" ? true : false
            },

            {
                title: "Paid",
                value: "paid",
                selected: filterSchoolInvoiceData?.status[0] === "paid1" || filterSchoolInvoiceData?.status[0] === "paid2" ? true : false
            },
            {
                title: "Missing",
                value: "missing",
                selected: filterSchoolInvoiceData?.status[0] === "missing1" || filterSchoolInvoiceData?.status[0] === "missing1" ? true : false
            },

            {
                title: "Accepted",
                value: "accepted",
                selected: filterSchoolInvoiceData?.status[0] === "accepted" ? true : false
            },
            {
                title: "Rejected",
                value: "rejected",
                selected: filterSchoolInvoiceData?.status[0] === "rejected" ? true : false
            },
            {
                title: "Cancelled",
                value: "cancelled",
                selected: filterSchoolInvoiceData?.status[0] === "cancelled" ? true : false
            },
            {
                title: "Expire",
                value: "expire",
                selected: filterSchoolInvoiceData?.status[0] === "expire" ? true : false
            },
        ]
    }

    if (selectedInvoiceChip === "system_generated") {
        dataArray = [
            {
                title: "Generated",
                value: "generated",
                selected: filterSchoolInvoiceData?.status[0] === "generated" ? true : false
            },
            {
                title: "Paid",
                value: "paid_value",
                selected: filterSchoolInvoiceData?.status[0] === "paid" ? true : false
            },

            {
                title: "Accepted",
                value: "accepted",
                selected: filterSchoolInvoiceData?.status[0] === "accepted" ? true : false
            },
        ]
    }

    return (
        <div>
            <CommonModal
                showModal={showSchoolInvoiceFilterModal}
                setShowModal={setShowSchoolInvoiceFilterModal}
                modalTitle={t("Filter Orders")}
                mainContent={
                    <>
                        <form onSubmit={(e) => e.preventDefault()}>

                            {/* g:          payment status */}
                            <div className="my-s16">
                                <SelectInput
                                    label={t("Payment status")}
                                    placeholder={"Choose payment status"}
                                    selectOptionOnChange={(e) => {
                                        if (e === "paid") setFilterSchoolInvoiceData({ ...filterSchoolInvoiceData, status: ["paid1", "paid2"] });
                                        else if (e === "paid_value") setFilterSchoolInvoiceData({ ...filterSchoolInvoiceData, status: ["paid"] });
                                        else if (e === "missing") setFilterSchoolInvoiceData({ ...filterSchoolInvoiceData, status: ["missing1", "missing2"] });
                                        else if (e === '') setFilterSchoolInvoiceData({ ...filterSchoolInvoiceData, status: [] });
                                        else setFilterSchoolInvoiceData({ ...filterSchoolInvoiceData, status: [e] });
                                    }}
                                    dataArray={dataArray}
                                />
                            </div>

                            {/* y           instructor based filter */}
                            {/* {localStorage.getItem("schoolInvoiceType") === "school_instructor" ?
                                <div className="my-s16">
                                    <AsyncSingleCombobox
                                        label="filter by instructor"
                                        placeholder={invoiceFilterInsSel === "" ? 'select or search an instructor' : invoiceFilterInsSel}
                                        onSearchItem={(value) => setInstructorSearchKey(value)}
                                        optionArray={instructorDataArray}
                                        selectedValue={{ label: invoiceFilterInsSel, id: filterSchoolInvoiceData?.instructor_id }}
                                        onChangeLabel={(label) => {
                                            setInvoiceFilterInsSel(label);
                                            console.log("SELECTED INS-LABEL: ", label);
                                        }}
                                        onChange={(value) => {
                                            console.log("SELECTED INS-ID: ", value);
                                            setFilterSchoolInvoiceData({ ...filterSchoolInvoiceData, instructor_id: value });
                                        }}
                                    />
                                </div> : ""} */}

                            {/* y           student based filter */}
                            {/* {localStorage.getItem("schoolInvoiceType") === "school_student" ?
                                <div className="my-s16">
                                    <AsyncSingleCombobox
                                        label="filter by student"
                                        placeholder='Select or search a student'
                                        onSearchItem={(value) => setStudentSearch(value)}
                                        optionArray={studentDataArray}
                                        selectedValue={{ label: invoiceFilterStudentLabel, id: filterSchoolInvoiceData?.student_id }}
                                        onChangeLabel={(label) => {
                                            setInvoiceFilterStudentLabel(label);
                                            console.log("SELECTED STD-LABEL: ", label);
                                        }}
                                        onChange={(value) => {
                                            console.log("SELECTED ST-ID: ", value);
                                            setFilterSchoolInvoiceData({ ...filterSchoolInvoiceData, student_id: value });
                                        }}
                                    />
                                </div> : ""} */}

                            {/*b         start date and date */}
                            <div className='flex justify-between items-center w-full'>
                                <div className='p-0 rounded-full'>
                                    <CommonInput
                                        type='date'
                                        value={filterSchoolInvoiceData?.start_date}
                                        startDate={"1901-01-01"}
                                        label={t("Start date")}
                                        allowPastDates={true}
                                        onChange={(e) => {
                                            // console.log((e.target.value));
                                            const startDate = new Date(e.target.value);
                                            const endDate = new Date(filterSchoolInvoiceData?.end_date);

                                            // console.log("startDate::::", startDate, "; endDate::::", endDate);

                                            if (startDate > endDate) {
                                                setFilterSchoolInvoiceData({ ...filterSchoolInvoiceData, end_date: "", start_date: e.target.value });
                                            } else {
                                                setFilterSchoolInvoiceData({ ...filterSchoolInvoiceData, start_date: e.target.value });
                                            }
                                            // setFilterSchoolInvoiceData({ ...filterSchoolInvoiceData, start_date: e.target.value });
                                        }}
                                    />
                                </div>

                                <div className='flex items-center'>
                                    <div className='pr-0'>
                                        <CommonInput
                                            // required={filterSchoolInvoiceData?.start_date ? true : false}
                                            type='date'
                                            label={t("End date")}
                                            value={filterSchoolInvoiceData?.end_date}
                                            // disabled={!filterSchoolInvoiceData?.start_date}
                                            startDate={filterSchoolInvoiceData?.start_date ? filterSchoolInvoiceData?.start_date : "1901-01-01"}
                                            onChange={(e) => {
                                                // console.log(e.target.value);
                                                setFilterSchoolInvoiceData({ ...filterSchoolInvoiceData, end_date: (e.target.value) });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/*r         action buttons  */}
                            <div className='flex justify-between mt-s20'>
                                <CommonButton onClick={() => {
                                    setInvoiceFilterStudentLabel("");
                                    resetFilterSchoolInvoiceData();
                                }}
                                    fullRounded={true}
                                    btnLabel={t('Clear')}
                                    colorType="FilterClearButton" text="fs16" />
                                <CommonButton
                                    onClick={async () => {
                                        console.log(filterSchoolInvoiceData);
                                        // return
                                        // if (filterSchoolInvoiceData?.start_date) {
                                        //     if (!filterSchoolInvoiceData?.end_date) {
                                        //         return;
                                        //     }
                                        // }

                                        localStorage.setItem("schoolInvoicePaginationURL", "");

                                        let filterSuccess = await getNewSchoolInvoiceIndex(selectedInvoiceChip, invoiceTake, "", invoiceSearchKey, filterSchoolInvoiceData);
                                        if (filterSuccess) {
                                            setActiveFilter(filterSchoolInvoiceData?.status?.length === 0 && filterSchoolInvoiceData?.start_date === "" && filterSchoolInvoiceData?.end_date === "" ? false : true)
                                            Toastr({ message: t("Your filter successfully Apply"), type: "success" });
                                            setShowSchoolInvoiceFilterModal(false);
                                        }
                                    }}
                                    type="submit"
                                    btnLabel={t("Apply")}
                                    colorType="primary"
                                    roundedFull={false}
                                    width="w-[130px]"
                                />
                            </div>

                        </form>

                    </>
                }

            />
        </div>
    );
};

export default NewSchoolInvoiceFilter






// [
//     {
//         title: "accepted",
//         value: localStorage.getItem("schoolInvoiceType") === "history" ? "accepted" : "",
//         selected: filterSchoolInvoiceData?.status[0] === "accepted" ? true : false
//     },
//     {
//         title: "requested",
//         value: localStorage.getItem("schoolInvoiceType") !== "history" ? "requested" : "",
//         selected: filterSchoolInvoiceData?.status[0] === "requested" ? true : false
//     },
//     {
//         title: "cancelled",
//         value: localStorage.getItem("schoolInvoiceType") === "history" ? "cancelled" : "",
//         selected: filterSchoolInvoiceData?.status[0] === "cancelled" ? true : false
//     },
//     {
//         title: "created",
//         value: localStorage.getItem("schoolInvoiceType") !== "history" ? "created" : "",
//         selected: filterSchoolInvoiceData?.status[0] === "created" ? true : false
//     },
//     {
//         title: "paid",
//         value: localStorage.getItem("schoolInvoiceType") !== "history" ? "paid" : "",
//         selected: filterSchoolInvoiceData?.status[0] === "paid1" ? true : false
//     },
//     {
//         title: "missing payment",
//         value: localStorage.getItem("schoolInvoiceType") !== "history" ? "missing" : "",
//         selected: filterSchoolInvoiceData?.status[0] === "missing1" ? true : false
//     },

//     {
//         title: "rejected",
//         value: localStorage.getItem("schoolInvoiceType") === "history" ? "rejected" : "",
//         selected: filterSchoolInvoiceData?.status[0] === "rejected" ? true : false
//     },
//     {
//         title: "expired",
//         value: localStorage.getItem("schoolInvoiceType") === "history" ? "expired" : "",
//         selected: filterSchoolInvoiceData?.status[0] === "expired" ? true : false
//     }
// ]