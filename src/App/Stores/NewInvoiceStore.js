import axios from "axios";
import {t} from "i18next";
import create from "zustand";
import {
    balanceInvoiceUrl,
    changeInvoiceStatusUrl,
    changeSystemInvoiceStatusUrl,
    commonInvoiceContactAdminUrl,
    commonInvoiceReminderUrl,
    getInvoiceIndexUrl,
    invoicePayoutUrl,
    newInstructorInvoiceStatusRejectUrl,
    newInstructorInvoiceStatusUpdateUrl,
    newInvoiceDetailsStatusUpdateUrl,
    newInvoiceDetailsUrl,
    newInvoiceIndexUrl,
    newSchoolAdminCancelUrl,
    newSchoolAdminPaymentUrl,
    newSystemInvoiceStatusUpdateUrl,
    schoolInvoiceIndexUrl,
    secondaryInvoiceDetailsUrl,
    shareInvoiceDetailsUrl
} from "../Utility/Url";
import {
    removeEmpty,
    Toastr
} from "../Utility/UtilityFunctions";
import useUtilityStore from "./UtilityStore";
import {
    getInvoiceDetails
} from "./InvoiceStore";

const useNewInvoiceStore = create((set) => ({

    selectedInvoiceChip: "all",
    setSelectedInvoiceChip: (value) => set({selectedInvoiceChip: value}),

    invoiceSearchKey: "",
    setInvoiceSearchKey: (value) => set({invoiceSearchKey: value}),

    payOutList: [],
    setPayOutList: (value) => set({payOutList: value}),

    invoicePriceChangeFactor: 100,
    setInvoicePriceChangeFactor: (value) => set({invoicePriceChangeFactor: value}),

    invoiceDetailsTotalPriceLocal: null,
    setInvoiceDetailsTotalPriceLocal: (value) => set({invoiceDetailsTotalPriceLocal: value}),

    studentInvoiceSearchKey: "",
    setStudentInvoiceSearchKey: (value) => set({studentInvoiceSearchKey: value}),

    instructorInvoiceSearchKey: "",
    setInstructorInvoiceSearchKey: (value) => set({instructorInvoiceSearchKey: value}),

    invoiceFilterInsSel: "",
    setInvoiceFilterInsSel: (value) => set({invoiceFilterInsSel: value}),

    schoolUID: -1,
    setSchoolUID: (value) => set({schoolUID: value}),

    instructorUID: -1,
    setInstructorUID: (value) => set({
        instructorUID: value
    }),

    studentUID: -1,
    setStudentUID: (value) => set({
        studentUID: value
    }),

    instructorID: -1,
    setInstructorID: (value) => set({
        instructorID: value
    }),

    studentID: -1,
    setStudentID: (value) => set({
        studentID: value
    }),

    schoolID: -1,
    setSchoolID: (value) => set({
        schoolID: value
    }),

    invoiceDetailsLessonModalData: {
        title: "",
        type: "",
        dataArray: [],
    },
    setInvoiceDetailsLessonModalData: (value) => set({
        invoiceDetailsLessonModalData: value
    }),

    showInvoiceDetailsLessonList: false,
    setShowInvoiceDetailsLessonList: (value) => set({
        showInvoiceDetailsLessonList: value
    }),

    instructorInvoiceHistoryMode: false,
    setInstructorInvoiceHistoryMode: (value) => set({
        instructorInvoiceHistoryMode: value
    }),

    studentInvoiceHistoryMode: false,
    setStudentInvoiceHistoryMode: (value) => set({
        studentInvoiceHistoryMode: value
    }),

    schoolInvoiceHistoryMode: false,
    setSchoolInvoiceHistoryMode: (value) => set({
        schoolInvoiceHistoryMode: value
    }),

    showAdminToSchoolPayModal: false,
    setShowAdminToSchoolPayModal: (value) => set({
        showAdminToSchoolPayModal: value
    }),

    showAdminToSchoolAcceptModal: false,
    setShowAdminToSchoolAcceptModal: (value) => set({
        showAdminToSchoolAcceptModal: value
    }),

    invoiceBalanceDetailsData: [],
    setInvoiceBalanceDetailsData: (value) => set({
        invoiceBalanceDetailsData: value
    }),

    schoolInvoiceTake: 10,
    setSchoolInvoiceTake: (value) => set({
        schoolInvoiceTake: value
    }),

    invoiceTake: 10,
    setInvoiceTake: (value) => set({
        invoiceTake: value
    }),

    invoicePaginationUrl: "",
    setInvoicePaginationUrl: (value) => set({
        invoicePaginationUrl: value
    }),

    invoice_update_price: 0,
    setInvoice_update_price: (value) => set({invoice_update_price: value}),

    filterData: {
        search: "",
        status: [],
        user: "",
        start_date: "",
        end_date: "",

    },
    setFilterData: (value) => set({
        filterData: value
    }),
    resetInvoiceFilterData: () => set({
        filterData: {
            search: "",
            status: [],
            user: "",
            start_date: "",
            end_date: "",

        }
    }),

    invoiceShareForm: {
        id: 0,
        user_id: 0,
        role: "",
        type: "",
        email: "",
    },
    setInvoiceShareForm: (value) => set({
        invoiceShareForm: value
    }),
    resetInvoiceShareForm: () => set({
        invoiceShareForm: {
            id: 0,
            user_id: 0,
            role: "",
            type: "",
            email: "",
        }
    }),


    filterSchoolInvoiceData: {
        status: [],
        user_id: 0,
        student_id: 0,
        instructor_id: 0,
        start_date: "",
        end_date: "",
    },
    setFilterSchoolInvoiceData: (value) => set({
        filterSchoolInvoiceData: value
    }),
    resetFilterSchoolInvoiceData: () => set({
        filterSchoolInvoiceData: {
            status: [],
            user_id: 0,
            student_id: 0,
            instructor_id: 0,
            start_date: "",
            end_date: "",
        },
        invoiceFilterInsSel: ""
    }),


    filterInstructorInvoiceData: {
        status: [],
        user_id: 0,
        student_id: 0,
        instructor_id: 0,
        start_date: "",
        end_date: "",
    },
    setFilterInstructorInvoiceData: (value) => set({
        filterInstructorInvoiceData: value
    }),
    resetFilterInstructorInvoiceData: () => set({
        filterInstructorInvoiceData: {
            status: [],
            user_id: 0,
            student_id: 0,
            instructor_id: 0,
            start_date: "",
            end_date: "",
        },
        invoiceFilterInsSel: ""
    }),


    filterStudentInvoiceData: {
        status: [],
        user_id: 0,
        school_id: 0,
        start_date: "",
        end_date: "",
    },
    setFilterStudentInvoiceData: (value) => set({
        filterStudentInvoiceData: value
    }),
    resetFilterStudentInvoiceData: () => set({
        filterStudentInvoiceData: {
            status: [],
            user_id: 0,
            school_id: 0,
            start_date: "",
            end_date: "",
        },
        invoiceFilterInsSel: ""
    }),

    invoicePageUrl: "",
    setInvoicePageUrl: (value) => set({
        invoicePageUrl: value
    }),

    invoiceType: 0,
    setInvoiceType: (value) => set({
        invoiceType: value
    }),

    activeFilter: false,
    setActiveFilter: (value) => set({
        activeFilter: value
    }),

    instructorInvoiceType: 'school_instructor',
    setInstructorInvoiceType: (value) => set({
        instructorInvoiceType: value
    }),

    schoolInvoiceType: 'school_instructor',
    setSchoolInvoiceType: (value) => set({
        schoolInvoiceType: value
    }),

    invoiceUserType: 'all',
    setInvoiceUserType: (value) => set({
        invoiceUserType: value
    }),

    invoiceShareID: 0,
    setInvoiceShareID: (value) => set({
        invoiceShareID: value
    }),

    invoiceActionDates: {},
    setInvoiceActionDates: (value) => set({
        invoiceActionDates: value
    }),

    payOutForm: {
        school_id: "",
        transaction_ids: [],
        comment: "",
        price: 0
    },
    setPayOutForm: (value) => set({
        payOutForm: value
    }),
    resetPayOutForm: () => set({
        payOutForm: {
            school_id: "",
            transaction_ids: [],
            comment: "",
            price: 0
        },
    }),

    instructorInvoiceFilterActive: false,
    setInstructorInvoiceFilterActive: (value) => set({
        instructorInvoiceFilterActive: value
    }),

    studentInvoiceFilterActive: false,
    setStudentInvoiceFilterActive: (value) => set({
        studentInvoiceFilterActive: value
    }),

    schoolInvoiceFilterActive: false,
    setSchoolInvoiceFilterActive: (value) => set({
        schoolInvoiceFilterActive: value
    }),

    showPayoutModal: false,
    setShowPayoutModal: (value) => set({
        showPayoutModal: value
    }),

    invoiceFilterActive: false,
    setInvoiceFilterActive: (value) => set({
        invoiceFilterActive: value
    }),

    showInvoiceUpdateModal: false,
    setShowInvoiceUpdateModal: (value) => set({
        showInvoiceUpdateModal: value
    }),

    showInvoiceAcceptModal: false,
    setShowInvoiceAcceptModal: (value) => set({
        showInvoiceAcceptModal: value
    }),

    showAdminInvoiceCancelModal: false,
    setShowAdminInvoiceCancelModal: (value) => set({
        showAdminInvoiceCancelModal: value
    }),

    showInvoiceRejectModal: false,
    setShowInvoiceRejectModal: (value) => set({
        showInvoiceRejectModal: value
    }),

    showInstructorInvoiceRejectModal: false,
    setShowInstructorInvoiceRejectModal: (value) => set({
        showInstructorInvoiceRejectModal: value
    }),

    showInstructorInvoicePaymentModal: false,
    setShowInstructorInvoicePaymentModal: (value) => set({
        showInstructorInvoicePaymentModal: value
    }),

    showAdminInvoicePaymentModal: false,
    setShowAdminInvoicePaymentModal: (value) => set({
        showAdminInvoicePaymentModal: value
    }),

    showInvoicePaymentDetailsModal: false,
    setShowInvoicePaymentDetailsModal: (value) => set({
        showInvoicePaymentDetailsModal: value
    }),

    showInvoiceLessonModal: false,
    setShowInvoiceLessonModal: (value) => set({
        showInvoiceLessonModal: value
    }),

    //y        Main invoice          
    invoiceIndexData: {},
    setInvoiceIndexData: (value) => set({
        invoiceIndexData: value
    }),

    // b            school              
    invoiceIndexDataSchool: {},
    setInvoiceIndexDataSchool: (value) => set({
        invoiceIndexDataSchool: value
    }),

    // e            instructor          
    invoiceIndexDataInstructor: {},
    setInvoiceIndexDataInstructor: (value) => set({
        invoiceIndexDataInstructor: value
    }),

    // l            student             
    invoiceIndexDataStudent: {},
    setInvoiceIndexDataStudent: (value) => set({
        invoiceIndexDataStudent: value
    }),

    secondaryInvoiceDetailsData: {},
    setSecondaryInvoiceDetailsData: (value) => set({
        secondaryInvoiceDetailsData: value
    }),

    invoiceDetailsData: {},
    setInvoiceDetailsData: (value) => set({
        invoiceDetailsData: value
    }),

    showDeleteModal: false,
    setShowDeleteModal: (value) => set({
        showDeleteModal: value
    }),

    showEditModal: false,
    setShowEditModal: (value) => set({
        showEditModal: value
    }),

    showInvoiceShareModal: false,
    setShowInvoiceShareModal: (value) => set({
        showInvoiceShareModal: value
    }),

    showInstructorInvoiceFilterModal: false,
    setShowInstructorInvoiceFilterModal: (value) => set({
        showInstructorInvoiceFilterModal: value
    }),

    showStudentInvoiceFilterModal: false,
    setShowStudentInvoiceFilterModal: (value) => set({
        showStudentInvoiceFilterModal: value
    }),

    showSchoolInvoiceFilterModal: false,
    setShowSchoolInvoiceFilterModal: (value) => set({
        showSchoolInvoiceFilterModal: value
    }),

    showInvoiceFilterModal: false,
    setShowInvoiceFilterModal: (value) => set({
        showInvoiceFilterModal: value
    }),

}));

export default useNewInvoiceStore;

//g: spread all necessary store variables       
const {
    setLoading
} = useUtilityStore.getState(); //v /           for normal api call loading     
const {
} = useUtilityStore.getState(); //g /           for search loading      

//g          get invoice index (old)       
export const getInvoiceIndex = async (type, paginationUrl = "", data) => {
    const {
        inVoiceTake,
        setInvoiceIndexData,
        setInvoiceFilterActive,
        setInvoiceType,
        invoiceUserType
    } = useNewInvoiceStore.getState();
    try {
        let filterForm = {
            ...data
        };
        console.log("RECEIVED filterForm", filterForm)
        if (filterForm?.search === "") delete filterForm.search;
        if (filterForm?.status?.length === 0) delete filterForm.status;
        if (filterForm?.user === "") delete filterForm.user;
        if (filterForm?.start_date === "") delete filterForm.start_date;
        if (filterForm?.end_date === "") delete filterForm.end_date;

        setLoading(true);


        let body = {};

        if (type === "all") body = {
            take: inVoiceTake,
            status: ["requested", "created", "paid1", "paid2", "missing1", "missing2", "accepted", "rejected", "cancelled", "expired"]
        };
        if (type === "admin") body = {
            take: inVoiceTake,
            status: ["requested", "created", "paid1", "paid2", "missing1", "missing2"]
        };
        if (type === "history") body = {
            take: inVoiceTake,
            status: ["accepted", "rejected", "cancelled", "expired"]
        };

        console.log("body::::: ", body);

        let res = {};
        if (Object.keys(filterForm).length > 0) {
            setInvoiceFilterActive(true);
            setInvoiceType(-1);
            console.log("FILTERING INVOICE ... ", paginationUrl, filterForm);
            res = await axios.get(paginationUrl === "" ? getInvoiceIndexUrl : paginationUrl, {
                params: {
                    ...filterForm,
                    take: inVoiceTake
                }
            });
        } else {
            setInvoiceFilterActive(false);
            invoiceUserType === 'all' && setInvoiceType(0)
            invoiceUserType === 'admin' && setInvoiceType(1);
            invoiceUserType === 'history' && setInvoiceType(2);
            console.log("GET ALL INVOICE ..", paginationUrl);
            res = await axios.get(paginationUrl === "" ? getInvoiceIndexUrl : paginationUrl, {
                params: body
            });
        }

        console.log('getInvoiceIndex: ', res.data.data);

        if (res.data.success) {
            setInvoiceIndexData(res.data.data);
            setLoading(false);
            return true
        } else Toastr({
            message: res.data.message,
            type: "error"
        });
        setLoading(false);
        return false
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        console.log('getInvoiceIndex: ', e);
        setLoading(false);
        return false
    }
}


// r    NEW school invoice index        
export const getNewSchoolInvoiceIndex = async (type = "all", take = 10, paginationUrl = "", search = "", filterData = {}) => {

    const {
        setInvoiceIndexDataSchool
    } = useNewInvoiceStore.getState();
    const {
        setLoadingSearch
    } = useUtilityStore.getState();

    try {
        if (search) setLoadingSearch(true);
        else setLoading(true);

        // console.log("SCHOOL_WEB INVOICE BEFORE API CALL::::   type:", type, " paginationUrl:", paginationUrl, " search:", search, " filterData:", filterData);

        let body = {};

        console.log("RECEIVED filterForm", filterData);

        // body = {
        //     ...filterData,
        //     type: type,
        //     take: take,
        //     search: search,
        //     status: filterData?.status,
        // };

        if (type === "all") body = {
            ...filterData,
            take: take,
            type: type,
            search: search,
            status: filterData?.status?.length > 0 ? filterData?.status : ["requested", "created", "paid1", "paid2", "missing1", "missing2","generated"]
        };
        if (type === "school_student") body = {
            ...filterData,
            take: take,
            type: type,
            search: search,
            status: filterData?.status?.length > 0 ? filterData?.status : ["requested", "created"]
        };
        if (type === "school_instructor") body = {
            ...filterData,
            take: take,
            type: type,
            search: search,
            status: filterData?.status?.length > 0 ? filterData?.status : ["requested", "created", "paid1", "paid2", "missing1", "missing2"]
        };
        if (type === "school_admin") body = {
            ...filterData,
            take: take,
            type: type,
            search: search,
            status: filterData?.status?.length > 0 ? filterData?.status : ["requested", "created", "paid1", "paid2", "missing1", "missing2"]
        };
        if (type === "system_generated") body = {
            ...filterData,
            take: take,
            type: type,
            search: search,
            status: filterData?.status?.length > 0 ? filterData?.status : ["generated", "paid"],
        };


        body = removeEmpty(body);
        console.log("FINAL INVOICE BODY:::", body);

        let res = {};
        if (type === "balance")
            res = await axios.get(paginationUrl === "" ? balanceInvoiceUrl : paginationUrl, {
                params: {
                    take: take,
                    search: search
                }
            });
        else
            res = await axios.get(paginationUrl === "" ? newInvoiceIndexUrl : paginationUrl, {
                params: body
            });

        console.log('getSchoolInvoiceIndex: ', res.data);

        if (res.data.success) {
            // setInvoiceIndexDataSchool(res.data.data?.instructor?.history);
            setInvoiceIndexDataSchool(res.data.data);
            setLoading(false)
            setLoadingSearch(false);
            return true
        } else Toastr({message: res.data.message, type: "error"});
        setLoading(false);
        setLoadingSearch(false);
        return false
    } catch (e) {
        Toastr({message: t("An error occurred!"),type: "error"});
        console.log('getSchoolInvoiceIndex: ', e);
        setLoading(false);
        setLoadingSearch(false);
        return false
    }
}


// e     get instructor invoice index       
export const getInstructorInvoiceIndex = async (instructor_id = 0, type = "", paginationUrl = "", search = "", filterData, ins_user_id) => {
    const {
        setInvoiceIndexDataInstructor,
        setInstructorInvoiceFilterActive,
        instructorUID
    } = useNewInvoiceStore.getState();
    const {
        setLoadingSearch
    } = useUtilityStore.getState();

    try {
        console.log("SCHOOL INVOICE BEFORE API CALL::::", " instructor_id:", instructor_id, " type:", type, " paginationUrl:", paginationUrl, " search:", search, " filterData:", filterData);
        let targetTake = parseInt(localStorage.getItem("instructorInvoiceTake")) ?? 10;

        let filterForm = {
            ...filterData
        };
        console.log("RECEIVED filterForm", filterForm)

        // b        clean filter object 
        if (filterForm?.status?.length === 0) delete filterForm.status;
        if (filterForm?.user_id === -1) delete filterForm.user_id;
        if (filterForm?.student_id === -1) delete filterForm.student_id;
        if (filterForm?.instructor_id === -1) delete filterForm.instructor_id;
        if (filterForm?.start_date === "") delete filterForm.start_date;
        if (filterForm?.end_date === "") delete filterForm.end_date;

        if (search) setLoadingSearch(true);
        else setLoading(true);

        let body = {};
        let res = {};
        let p_status = [];

        if (type === "history") p_status = ["accepted", "rejected", "cancelled", "expired"];
        else p_status = ["requested", "created", "paid1", "paid2", "missing1", "missing2"];

        body = {
            status: p_status
        };

        // b            optimize final object

        instructor_id = parseInt(instructor_id);

        if (search) body = {
            ...body,
            take: targetTake,
            instructor_id: instructor_id,
            type: type,
            search: search
        };
        else body = {
            ...body,
            take: targetTake,
            instructor_id: instructor_id,
            type: type
        };

        // if (type === "instructor_admin" || type === "history") 
        // else delete body.user_id;


        if (Object.keys(filterForm).length > 0) {
            setInstructorInvoiceFilterActive(true);
            // delete body.status;
            body = {
                ...body,
                ...filterForm
            }

            console.log("FILTERING INVOICE ... ", body);
            res = await axios.get(paginationUrl === "" ? schoolInvoiceIndexUrl : paginationUrl, {
                params: body
            });
        } else {
            setInstructorInvoiceFilterActive(false);

            body = {
                ...body,
                user_id: parseInt(instructorUID)
            };
            console.log("GET ALL INVOICE ..", body, " U_ID:", instructorUID);
            res = await axios.get(paginationUrl === "" ? schoolInvoiceIndexUrl : paginationUrl, {
                params: body
            });
        }

        console.log('getInstructorInvoiceIndex: ', res.data);

        if (res.data.success) {
            setInvoiceIndexDataInstructor(res.data.data);
            setLoading(false);
            setLoadingSearch(false);
            return true
        } else Toastr({
            message: res.data.message,
            type: "error"
        });
        setLoading(false);
        setLoadingSearch(false);
        return false
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        setLoadingSearch(false);
        console.log('getInstructorInvoiceIndex: ', e);
        return false
    }
}


// l         get student invoice index      
export const getStudentInvoiceIndex = async (student_id = 0, type = "", paginationUrl = "", search = "", filterData) => {
    const {
        setInvoiceIndexDataStudent,
        setStudentInvoiceFilterActive
    } = useNewInvoiceStore.getState();
    const {
        setLoadingSearch
    } = useUtilityStore.getState();

    try {
        console.log("SCHOOL INVOICE BEFORE API CALL::::", " student_id:", student_id, " type:", type, " paginationUrl:", paginationUrl, " search:", search, " filterData:", filterData);

        let targetTake = localStorage.getItem("instructorInvoiceTake") ?? 10;

        let filterForm = {
            ...filterData
        };
        console.log("RECEIVED filterForm", filterForm)

        // b        clean filter object     
        if (filterForm?.status?.length === 0) delete filterForm.status;
        if (filterForm?.user_id === -1) delete filterForm.user_id;
        if (filterForm?.student_id === -1) delete filterForm.student_id;
        if (filterForm?.school_id === -1) delete filterForm.school_id;
        if (filterForm?.start_date === "") delete filterForm.start_date;
        if (filterForm?.end_date === "") delete filterForm.end_date;

        if (search) setLoadingSearch(true);
        else setLoading(true);

        let body = {};
        let res = {};
        let p_status = [];

        if (type === "history") p_status = ["accepted", "rejected", "cancelled", "expired"];
        else p_status = ["requested", "created", "paid1", "paid2", "missing1", "missing2"];

        body = {
            status: p_status
        };

        // b            optimize final object       
        student_id = parseInt(student_id);

        if (search) body = {
            ...body,
            take: parseInt(targetTake),
            student_id: student_id,
            type: type,
            search: search
        };
        else body = {
            ...body,
            take: parseInt(targetTake),
            student_id: student_id,
            type: type
        };

        if (Object.keys(filterForm).length > 0) {
            setStudentInvoiceFilterActive(true);
            // delete body.status;      
            body = {
                ...body,
                ...filterForm
            }

            console.log("FILTERING INVOICE ... ", body);
            res = await axios.get(paginationUrl === "" ? schoolInvoiceIndexUrl : paginationUrl, {
                params: body
            });
        } else {
            setStudentInvoiceFilterActive(false);

            console.log("GET ALL INVOICE ..", body);
            res = await axios.get(paginationUrl === "" ? schoolInvoiceIndexUrl : paginationUrl, {
                params: body
            });
        }

        console.log('getStudentInvoiceIndex: ', res.data);

        if (res.data.success) {
            setInvoiceIndexDataStudent(res.data.data);
            setLoading(false);
            setLoadingSearch(false);
            return true
        } else Toastr({
            message: res.data.message,
            type: "error"
        });

        setLoading(false);
        setLoadingSearch(false);
        return false
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        setLoadingSearch(false);
        console.log('getStudentInvoiceIndex: ', e);
        return false
    }
}


//g send mail invoice details       
export const shareInvoiceDetails = async (shareForm) => {
    try {

        console.log('NEW invoiceShareForm: ', shareForm);
        if (shareForm?.type === "license_invoice") shareForm = {
            ...shareForm,
            type: "admin_invoice"
        };
        // return
        setLoading(true);
        const res = await axios.post(shareInvoiceDetailsUrl, shareForm);
        console.log('shareInvoiceDetails: ', res.data);

        if (res.data.success) {
            setLoading(false);
            Toastr({
                message: ("Invoice Shared Successfully !"),
                type: "success"
            });
            return true;
        } else {
            Toastr({
                message: res.data.message,
                type: "error"
            });
            setLoading(false);
            return false;
        }
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        console.log('shareInvoiceDetails: ', e);
    }
}


//b          get invoice details      
export const getNewInvoiceDetails = async (invoiceID = 0, type = "") => {
    const {
        setInvoiceDetailsData
    } = useNewInvoiceStore.getState();
    try {
        setLoading(true);

        const res = await axios.get(newInvoiceDetailsUrl, {
            params: {
                id: invoiceID,
                type: type
            }
        });
        console.log('getNewInvoiceDetails: ', res.data);

        if (res.data.success) setInvoiceDetailsData(res.data.data);
        else Toastr({
            message: res.data.message,
            type: "error"
        });

        setLoading(false);
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        console.log('getNewInvoiceDetails: ', e);
    }
}



//p          update student invoice status      
export const updateNewInvoiceStatus = async (invoiceID = 0, type = "", status = "", comment, newPrice = 0) => {

    try {

        let body = {
            id: parseInt(invoiceID),
            status: status,
            reply: comment,
            new_price: parseInt(newPrice),
        };

        body = removeEmpty(body);

        console.log('updateNewInvoiceStatus BODY:::', body);
        // return
        setLoading(true);
        const res = await axios.post(newInvoiceDetailsStatusUpdateUrl, body);
        console.log('updateNewInvoiceStatus: ', res.data);

        if (res.data.success) {
            await getNewInvoiceDetails(invoiceID, type);
            setLoading(false);
            return true;
        } else {
            Toastr({
                message: res.data.message,
                type: "error"
            });
            console.log('updateNewInvoiceStatus error: ', res.data.message);
            setLoading(false);
            return false;
        }
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        console.log('updateNewInvoiceStatus: ', e);
        return false;
    }
}



// l            update instructor invoice status      
export const updateInstructorInvoiceStatus = async (invoice_id = 0, invoice_type = "", comment = "", attachment = "") => {
    try {

        let body = {
            id: parseInt(invoice_id),
            payment_type: "manual",
            payment_details: comment,
            attachment: attachment,
        }
        console.log("updateInstructorInvoiceStatus BODY:: ", body);
        // return
        setLoading(true);
        const res = await axios.post(newInstructorInvoiceStatusUpdateUrl, body);
        console.log('updateInstructorInvoiceStatus: ', res.data.data);

        if (res.data.success) {
            await getNewInvoiceDetails(invoice_id, invoice_type);
            setLoading(false);
            return true;
        } else {
            Toastr({
                message: res.data.message,
                type: "error"
            });
            console.log('updateInstructorInvoiceStatus error: ', res.data.message);
            setLoading(false);
            return false;
        }
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        console.log('updateInstructorInvoiceStatus: ', e);
    }
}



// b            remind_admin invoice      
export const commonRemindAdmin = async (invoice_id = 0, invoice_type = "") => {
    try {

        let body = {
            id: parseInt(invoice_id),
            invoice_id: parseInt(invoice_id),
            flag: "contact_admin",
        }
        console.log("commonRemindAdmin BODY:: ", body);
        // return
        setLoading(true);
        const res = await axios.post(commonInvoiceContactAdminUrl, body);
        console.log('commonRemindAdmin: ', res.data);

        if (res.data.success) {
            Toastr({
                message: res.data.message,
                type: "success"
            });
            await getNewInvoiceDetails(invoice_id, invoice_type);
            setLoading(false);
            return true;
        } else {
            Toastr({
                message: res.data.message,
                type: "error"
            });
            console.log('commonRemindAdmin error: ', res.data.message);
            setLoading(false);
            return false;
        }
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        console.log('commonRemindAdmin: ', e);
    }
}



// r            reject instructor invoice status      
export const updateInstructorInvoiceReject = async (invoice_id = 0, invoice_type = "", comment = "") => {

    try {
        setLoading(true);

        let body = {
            id: invoice_id,
            note: comment,
        }
        console.log("updateInstructorInvoiceReject BODY:: ", body);
        const res = await axios.post(newInstructorInvoiceStatusRejectUrl, body);
        console.log('updateInstructorInvoiceReject: ', res.data.data);

        if (res.data.success) {
            await getNewInvoiceDetails(invoice_id, invoice_type);
            setLoading(false);
            return true;
        } else {
            Toastr({
                message: res.data.message,
                type: "error"
            });
            console.log('updateInstructorInvoiceReject error: ', res.data.message);
            setLoading(false);
            return false;
        }
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        console.log('updateInstructorInvoiceReject: ', e);
    }
}



// e            payment school-admin invoice      
export const paySchoolAdminInvoice = async (invoice_id = 0, invoice_type = "", comment = "", attachment = "") => {

    try {
        setLoading(true);

        let body = {
            id: parseInt(invoice_id),
            payment_type: "manual",
            payment_details: comment,
            attachment: attachment,
        }
        console.log("paySchoolAdminInvoice BODY:: ", body);
        const res = await axios.post(newSchoolAdminPaymentUrl, body);
        console.log('paySchoolAdminInvoice: ', res.data.data);

        if (res.data.success) {
            await getNewInvoiceDetails(invoice_id, invoice_type);
            setLoading(false);
            return true;
        } else {
            Toastr({
                message: res.data.message,
                type: "error"
            });
            console.log('paySchoolAdminInvoice error: ', res.data.message);
            setLoading(false);
            return false;
        }
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        console.log('paySchoolAdminInvoice: ', e);
    }
}





// e            [ MAWAY-ADMIN ] payment admin-to-school invoice      
export const payAdminSchoolInvoice = async (invoice_id = 0, invoice_type = "", comment = "") => {

    try {
        setLoading(true);

        let body = {
            id: parseInt(invoice_id),
            status: "paid",
            admin_comment: comment,
        }
        console.log("payAdminSchoolInvoice BODY:: ", body);
        const res = await axios.post(changeSystemInvoiceStatusUrl, body);
        console.log('payAdminSchoolInvoice: ', res.data.data);

        if (res.data.success) {
            await getInvoiceDetails(invoice_id, invoice_type);
            setLoading(false);
            return true;
        } else {
            Toastr({
                message: res.data.message,
                type: "error"
            });
            console.log('payAdminSchoolInvoice error: ', res.data.message);
            setLoading(false);
            return false;
        }
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        console.log('payAdminSchoolInvoice: ', e);
    }
}






// e            [ MAWAY-SCHOOL_WEB ] payment admin-to-school invoice      
export const acceptPaymentAdminSchoolInvoice = async (invoice_id = 0, invoice_type = "", comment = "") => {

    try {
        setLoading(true);

        let body = {
            id: parseInt(invoice_id),
            status: "accepted",
            school_comment: comment,
        }
        console.log("acceptPaymentAdminSchoolInvoice BODY:: ", body);
        const res = await axios.post(newSystemInvoiceStatusUpdateUrl, body);
        console.log('acceptPaymentAdminSchoolInvoice: ', res.data.data);

        if (res.data.success) {
            await getNewInvoiceDetails(invoice_id, invoice_type);
            setLoading(false);
            return true;
        } else {
            Toastr({
                message: res.data.message,
                type: "error"
            });
            console.log('acceptPaymentAdminSchoolInvoice error: ', res.data.message);
            setLoading(false);
            return false;
        }
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        console.log('acceptPaymentAdminSchoolInvoice: ', e);
    }
}



// r            cancel school-admin invoice      
export const cancelSchoolAdminInvoice = async (invoice_id = 0, invoice_type = "", comment = "") => {

    try {
        setLoading(true);

        let body = {
            id: invoice_id,
            note: comment,
        }
        console.log("cancelSchoolAdminInvoice BODY:: ", body);
        const res = await axios.post(newSchoolAdminCancelUrl, body);
        console.log('cancelSchoolAdminInvoice: ', res.data.data);

        if (res.data.success) {
            await getNewInvoiceDetails(invoice_id, invoice_type);
            setLoading(false);
            return true;
        } else {
            Toastr({
                message: res.data.message,
                type: "error"
            });
            console.log('cancelSchoolAdminInvoice error: ', res.data.message);
            setLoading(false);
            return false;
        }
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        console.log('cancelSchoolAdminInvoice: ', e);
    }
}

// r                secondary invoice details      
export const getSecondaryInvoiceDetails = async (invoiceID = 0, type = "") => {
    const {
        setSecondaryInvoiceDetailsData
    } = useNewInvoiceStore.getState();
    try {
        setLoading(true);

        let body = {
            id: parseInt(invoiceID),
            type: type,
        }
        console.log("getSecondaryInvoiceDetails BODY:: ", body);
        const res = await axios.get(secondaryInvoiceDetailsUrl, {
            params: body
        });
        console.log('getSecondaryInvoiceDetails: ', res.data.data);

        if (res.data.success) setSecondaryInvoiceDetailsData(res.data.data);
        else Toastr({
            message: res.data.message,
            type: "error"
        });

        setLoading(false);
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        console.log('getSecondaryInvoiceDetails: ', e);
    }
}


//l          change invoice action / status       
export const changeInvoiceStatus = async (invoiceID = 0, status = "", reply = "", startDate, endDate) => {
    try {
        let body = {};
        if (status === "accepted") {
            body = {
                id: invoiceID,
                status: status,
                reply: reply,
                start_date: startDate,
                end_date: endDate,
            }
        } else {
            body = {
                id: invoiceID,
                status: status,
                reply: reply
            };
        }

        console.log(body);
        // return
        setLoading(true);

        const res = await axios.post(changeInvoiceStatusUrl, body);
        console.log('changeInvoiceStatus: ', res.data);

        if (res.data.success) {
            await getNewInvoiceDetails(invoiceID);
            Toastr({
                message: "Invoice action applied: " + status + " .",
                type: "success"
            });
        } else Toastr({
            message: res.data.message,
            type: "error"
        });

        setLoading(false);
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        console.log('changeInvoiceStatus: ', e);
    }
}


//y                  search invoice list      
export const searchInvoiceList = async (searchKey = "", url = "") => {
    const {
        inVoiceTake,
        invoiceSearchKey,
        setInvoiceIndexData,
        resetInvoiceFilterData,
        setInvoiceFilterActive,
        setInvoiceType
    } = useNewInvoiceStore.getState();
    const {
        setLoadingSearch
    } = useUtilityStore.getState();
    try {
        // let body = {};

        // console.log(body);
        // return
        setLoadingSearch(true);

        const res = await axios.get(url === "" ? getInvoiceIndexUrl : url, {
            params: {
                search: invoiceSearchKey,
                take: inVoiceTake
            }
        });
        console.log('searchInvoiceList: ', res.data);

        if (res.data.success) {
            setInvoiceType(-1);
            resetInvoiceFilterData();
            setInvoiceFilterActive(false);
            setInvoiceIndexData(res.data.data);
        } else Toastr({
            message: res.data.message,
            type: "error"
        });

        setLoadingSearch(false);
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoadingSearch(false);
        console.log('searchInvoiceList: ', e);
    }
}



//p          common invoice reminder      
export const commonInvoiceReminder = async (invoice_id = 0, invoice_type = "", flag = "") => {

    try {
        let body = {
            invoice_id: invoice_id,
            flag: flag,
        };

        console.log("commonInvoiceReminder BODY:::::::", body);
        // return
        setLoading(true);

        const res = await axios.post(commonInvoiceReminderUrl, body);
        console.log('commonInvoiceReminder: ', res.data);

        if (res.data.success) {
            getNewInvoiceDetails(invoice_id, invoice_type);
            Toastr({
                message: t("Reminder Success!"),
                type: "success"
            });
        } else Toastr({
            message: res.data.message,
            type: "error"
        });

        setLoading(false);
    } catch (e) {
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        console.log('commonInvoiceReminder: ', e);
    }
}


//p          common invoice reminder      
export const addPayoutIndex = async () => {
const {payOutForm}=useNewInvoiceStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(invoicePayoutUrl, payOutForm);
        console.log('addPayoutIndex: ', res.data);

        if (res.data.success) {
            Toastr({message: res?.data?.message,type: "success"});
            setLoading(false);
            return true;
        } else {
            Toastr({message: res.data.message,type: "error"});
            setLoading(false);
            return false;
        }
    } catch (e) {
        Toastr({message: t("An error occurred!"),type: "error"});
        console.log('addPayoutIndex: ', e);
        setLoading(false);
        return false;
    }
}


// r    NEW school invoice index
export const getPayoutIndex = async () => {
    const {setPayOutList} = useNewInvoiceStore.getState();
    try {
        setLoading(true);
        const res = await axios.get( balanceInvoiceUrl, {params:{type:"balance",take:100} });
        console.log('PayoutIndex : ', res.data);

        if (res.data.success) {
            setPayOutList(res.data.data);
            setLoading(false);
            return true
        } else Toastr({message: res.data.message,type: "error"});
        setLoading(false);
        return false
    } catch (e) {
        Toastr({message: t("An error occurred!"),type: "error"});
        console.log('PayoutIndex : ', e);
        setLoading(false);
        return false
    }
}
