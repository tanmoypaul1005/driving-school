import axios from "axios";
import { t } from "i18next";
import create from "zustand";
import { changeInvoiceStatusUrl, getInvoiceDetailsUrl, getInvoiceIndexUrl, getSystemGenInvoiceDetailsUrl, getSystemGenInvoiceIndexUrl, schoolInvoiceIndexUrl, secondaryInvoiceDetailsUrl, shareInvoiceDetailsUrl } from "../Utility/Url";
import { Toastr, removeEmpty } from "../Utility/UtilityFunctions";
import useUtilityStore from "./UtilityStore";

const useInvoiceStore = create((set) => ({

    invoiceStatusData: [
        {
            userType: "School",
            statusType: "Requested",
            headerLeft: false,
            headerRight: true,
            leftLineActive: true,
            rightLineActive: true,
            isActive: true,
        },
        {
            userType: "Admin",
            statusType: "Created",
            headerLeft: false,
            headerRight: true,
            leftLineActive: true,
            rightLineActive: true,
            isActive: true,
        },
        {
            userType: "Instructor",
            statusType: "Paid",
            headerLeft: false,
            headerRight: false,
            leftLineActive: true,
            rightLineActive: false,
            isActive: true,
        }
    ],

    invoiceSearchKey: "",
    setInvoiceSearchKey: (value) => set({ invoiceSearchKey: value }),

    studentInvoiceSearchKey: "",
    setStudentInvoiceSearchKey: (value) => set({ studentInvoiceSearchKey: value }),

    instructorInvoiceSearchKey: "",
    setInstructorInvoiceSearchKey: (value) => set({ instructorInvoiceSearchKey: value }),

    invoiceFilterInsSel: "",
    setInvoiceFilterInsSel: (value) => set({ invoiceFilterInsSel: value }),

    schoolUID: -1,
    setSchoolUID: (value) => set({ schoolUID: value }),

    instructorUID: -1,
    setInstructorUID: (value) => set({ instructorUID: value }),

    studentUID: -1,
    setStudentUID: (value) => set({ studentUID: value }),

    instructorID: -1,
    setInstructorID: (value) => set({ instructorID: value }),

    studentID: -1,
    setStudentID: (value) => set({ studentID: value }),

    schoolID: -1,
    setSchoolID: (value) => set({ schoolID: value }),

    instructorInvoiceHistoryMode: false,
    setInstructorInvoiceHistoryMode: (value) => set({ instructorInvoiceHistoryMode: value }),

    studentInvoiceHistoryMode: false,
    setStudentInvoiceHistoryMode: (value) => set({ studentInvoiceHistoryMode: value }),

    schoolInvoiceHistoryMode: false,
    setSchoolInvoiceHistoryMode: (value) => set({ schoolInvoiceHistoryMode: value }),

    schoolInvoiceTake: 10,
    setSchoolInvoiceTake: (value) => set({ schoolInvoiceTake: value }),

    inVoiceTake: 10,
    setInVoiceTake: (value) => set({ inVoiceTake: value }),

    filterData: {
        search: "",
        status: [],
        user: "",
        start_date: "",
        end_date: "",

    },
    setFilterData: (value) => set({ filterData: value }),
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
        id: -1,
        user_id: -1,
        role: "",
        type: "",
        email: "",
    },
    setInvoiceShareForm: (value) => set({ invoiceShareForm: value }),
    resetInvoiceShareForm: () => set({
        invoiceShareForm: {
            id: -1,
            user_id: -1,
            role: "",
            type: "",
            email: "",
        }
    }),


    filterSchoolInvoiceData: {
        status: [],
        user_id: -1,
        student_id: -1,
        instructor_id: -1,
        start_date: "",
        end_date: "",
    },
    setFilterSchoolInvoiceData: (value) => set({ filterSchoolInvoiceData: value }),
    resetFilterSchoolInvoiceData: () => set({
        filterSchoolInvoiceData: {
            status: [],
            user_id: -1,
            student_id: -1,
            instructor_id: -1,
            start_date: "",
            end_date: "",
        },
        invoiceFilterInsSel: ""
    }),


    filterInstructorInvoiceData: {
        status: [],
        user_id: -1,
        student_id: -1,
        instructor_id: -1,
        start_date: "",
        end_date: "",
    },
    setFilterInstructorInvoiceData: (value) => set({ filterInstructorInvoiceData: value }),
    resetFilterInstructorInvoiceData: () => set({
        filterInstructorInvoiceData: {
            status: [],
            user_id: -1,
            student_id: -1,
            instructor_id: -1,
            start_date: "",
            end_date: "",
        },
        invoiceFilterInsSel: ""
    }),


    filterStudentInvoiceData: {
        status: [],
        user_id: -1,
        school_id: -1,
        start_date: "",
        end_date: "",
    },
    setFilterStudentInvoiceData: (value) => set({ filterStudentInvoiceData: value }),
    resetFilterStudentInvoiceData: () => set({
        filterStudentInvoiceData: {
            status: [],
            user_id: -1,
            school_id: -1,
            start_date: "",
            end_date: "",
        },
        invoiceFilterInsSel: ""
    }),

    invoicePageUrl: "",
    setInvoicePageUrl: (value) => set({ invoicePageUrl: value }),

    invoiceType: 0,
    setInvoiceType: (value) => set({ invoiceType: value }),

    instructorInvoiceType: 'school_instructor',
    setInstructorInvoiceType: (value) => set({ instructorInvoiceType: value }),

    schoolInvoiceType: 'school_instructor',
    setSchoolInvoiceType: (value) => set({ schoolInvoiceType: value }),

    invoiceUserType: 'all',
    setInvoiceUserType: (value) => set({ invoiceUserType: value }),

    invoiceShareID: 0,
    setInvoiceShareID: (value) => set({ invoiceShareID: value }),

    invoiceActionDates: {},
    setInvoiceActionDates: (value) => set({ invoiceActionDates: value }),

    instructorInvoiceFilterActive: false,
    setInstructorInvoiceFilterActive: (value) => set({ instructorInvoiceFilterActive: value }),

    studentInvoiceFilterActive: false,
    setStudentInvoiceFilterActive: (value) => set({ studentInvoiceFilterActive: value }),

    schoolInvoiceFilterActive: false,
    setSchoolInvoiceFilterActive: (value) => set({ schoolInvoiceFilterActive: value }),

    invoiceFilterActive: false,
    setInvoiceFilterActive: (value) => set({ invoiceFilterActive: value }),

    //y        Main invoice          
    invoiceIndexData: {},
    setInvoiceIndexData: (value) => set({ invoiceIndexData: value }),

    // b            school              
    invoiceIndexDataSchool: {},
    setInvoiceIndexDataSchool: (value) => set({ invoiceIndexDataSchool: value }),

    // e            instructor          
    invoiceIndexDataInstructor: {},
    setInvoiceIndexDataInstructor: (value) => set({ invoiceIndexDataInstructor: value }),

    // l            student             
    invoiceIndexDataStudent: {},
    setInvoiceIndexDataStudent: (value) => set({ invoiceIndexDataStudent: value }),

    secondaryInvoiceDetailsData: {},
    setSecondaryInvoiceDetailsData: (value) => set({ secondaryInvoiceDetailsData: value }),

    invoiceDetailsData: {},
    setInvoiceDetailsData: (value) => set({ invoiceDetailsData: value }),

    showDeleteModal: false,
    setShowDeleteModal: (value) => set({ showDeleteModal: value }),

    showEditModal: false,
    setShowEditModal: (value) => set({ showEditModal: value }),

    showInvoiceShareModal: false,
    setShowInvoiceShareModal: (value) => set({ showInvoiceShareModal: value }),

    showInstructorInvoiceFilterModal: false,
    setShowInstructorInvoiceFilterModal: (value) => set({ showInstructorInvoiceFilterModal: value }),

    showStudentInvoiceFilterModal: false,
    setShowStudentInvoiceFilterModal: (value) => set({ showStudentInvoiceFilterModal: value }),

    showSchoolInvoiceFilterModal: false,
    setShowSchoolInvoiceFilterModal: (value) => set({ showSchoolInvoiceFilterModal: value }),

    showInvoiceFilterModal: false,
    setShowInvoiceFilterModal: (value) => set({ showInvoiceFilterModal: value }),

}));

export default useInvoiceStore;

//g: spread all necessary store variables       
const { setLoading } = useUtilityStore.getState();

// get invoice index        
export const getInvoiceIndex = async (type, paginationUrl = "", data) => {
    const { inVoiceTake, setInvoiceIndexData, setInvoiceFilterActive, setInvoiceType, invoiceUserType } = useInvoiceStore.getState();
    try {
        let filterForm = { ...data };

        filterForm = removeEmpty(filterForm);

        // console.log("RECEIVED filterForm", filterForm)
        // if (filterForm?.search === "") delete filterForm.search;
        // if (filterForm?.status?.length === 0) delete filterForm.status;
        // if (filterForm?.user === "") delete filterForm.user;
        // if (filterForm?.start_date === "") delete filterForm.start_date;
        // if (filterForm?.end_date === "") delete filterForm.end_date;

        setLoading(true);

        console.log('### getInvoiceIndex: paginationUrl = ', paginationUrl);

        let body = {};

        if (type === "all") body = { take: inVoiceTake, status: ["requested", "created", "paid1", "paid2", "missing1", "missing2", "accepted", "rejected", "cancelled", "expired"] };
        if (type === "admin") body = { take: inVoiceTake, status: ["requested", "created", "paid1", "paid2", "missing1", "missing2"] };
        if (type === "history") body = { take: inVoiceTake, status: ["accepted", "rejected", "cancelled", "expired"] };

        console.log("body::::: ", body);
        let res = {};
        if (Object.keys(filterForm).length > 0) {
            setInvoiceFilterActive(true);
            setInvoiceType(-1);
            console.log("FILTERING INVOICE ... ", paginationUrl, filterForm);
            res = await axios.get(paginationUrl === "" ? getInvoiceIndexUrl : paginationUrl, { params: { ...filterForm, take: inVoiceTake } });
        } else {
            setInvoiceFilterActive(false);
            invoiceUserType === 'all' && setInvoiceType(0)
            invoiceUserType === 'admin' && setInvoiceType(1);
            invoiceUserType === 'history' && setInvoiceType(2);
            console.log("GET ALL INVOICE ..", paginationUrl);

            if (type === "system_generated") {
                res = {};
                res = await axios.get(paginationUrl === "" ? getSystemGenInvoiceIndexUrl : paginationUrl, { params: body });
                console.log('getSystemGenInvoiceIndex type: ', type);
            } else {
                res = {};
                res = await axios.get(paginationUrl === "" ? getInvoiceIndexUrl : paginationUrl, { params: body });
                console.log('normal getInvoiceIndex type: ', type);
            }
        }

        console.log('getInvoiceIndex: ', res.data.data);

        if (res.data.success) {
            setInvoiceIndexData(res.data.data);
            setLoading(false);
            return true
        }
        else Toastr({ message: res.data.message, type: "error" });
        setLoading(false);
        return false
    } catch (e) {
        Toastr({ message: t("An error occurred!"), type: "error" });
        console.log('getInvoiceIndex: ', e);
        setLoading(false);
        return false
    }
}


// b    get school invoice index        
export const getSchoolInvoiceIndex = async (school_id = 0, type = "", paginationUrl = "", search = "", filterData) => {
    const { setInvoiceIndexDataSchool, setSchoolInvoiceFilterActive, schoolUID } = useInvoiceStore.getState();
    const { setLoadingSearch } = useUtilityStore.getState();

    try {
        console.log("SCHOOL INVOICE BEFORE API CALL::::", " school_id:", school_id, " type:", type, " paginationUrl:", paginationUrl, " search:", search, " filterData:", filterData);
        // return
        let targetTake = parseInt(localStorage.getItem("schoolInvoiceTake")) ?? 10;

        let filterForm = { ...filterData };
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

        body = { status: p_status };

        // b            optimize final object

        school_id = parseInt(school_id);

        if (search) body = { ...body, take: targetTake, school_id: school_id, type: type, search: search };
        else body = { ...body, take: targetTake, school_id: school_id, type: type };
        // if (type === "school_admin" || type === "history") 

        body = { ...body, user_id: parseInt(schoolUID) }

        if (Object.keys(filterForm).length > 0) {
            setSchoolInvoiceFilterActive(true);
            body = { ...body, ...filterForm }

            console.log("FILTERING INVOICE ... ", body);
            res = await axios.get(paginationUrl === "" ? schoolInvoiceIndexUrl : paginationUrl, { params: body });
        } else {
            setSchoolInvoiceFilterActive(false);

            console.log("GET ALL INVOICE ..", body);
            res = await axios.get(paginationUrl === "" ? schoolInvoiceIndexUrl : paginationUrl, { params: body });
        }

        console.log('getSchoolInvoiceIndex: ', res.data.data);

        if (res.data.success) {
            setInvoiceIndexDataSchool(res.data.data);
            setLoading(false)
            setLoadingSearch(false);
            return true
        }
        else Toastr({ message: res.data.message, type: "error" });
        setLoading(false);
        setLoadingSearch(false);
        return false
    } catch (e) {
        Toastr({ message: t("An error occurred!"), type: "error" });
        console.log('getSchoolInvoiceIndex: ', e);
        setLoading(false);
        setLoadingSearch(false);
        return false
    }
}


// e     get instructor invoice index       
export const getInstructorInvoiceIndex = async (instructor_id = 0, type = "", paginationUrl = "", search = "", filterData, ins_user_id) => {
    const { setInvoiceIndexDataInstructor, setInstructorInvoiceFilterActive, instructorUID } = useInvoiceStore.getState();
    const { setLoadingSearch } = useUtilityStore.getState();

    try {
        console.log("SCHOOL INVOICE BEFORE API CALL::::", " instructor_id:", instructor_id, " type:", type, " paginationUrl:", paginationUrl, " search:", search, " filterData:", filterData);
        let targetTake = parseInt(localStorage.getItem("instructorInvoiceTake")) ?? 10;

        let filterForm = { ...filterData };
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

        body = { status: p_status };

        // b            optimize final object

        instructor_id = parseInt(instructor_id);

        if (search) body = { ...body, take: targetTake, instructor_id: instructor_id, type: type, search: search };
        else body = { ...body, take: targetTake, instructor_id: instructor_id, type: type };

        // if (type === "instructor_admin" || type === "history") 
        // else delete body.user_id;


        if (Object.keys(filterForm).length > 0) {
            setInstructorInvoiceFilterActive(true);
            // delete body.status;
            body = { ...body, ...filterForm }

            console.log("FILTERING INVOICE ... ", body);
            res = await axios.get(paginationUrl === "" ? schoolInvoiceIndexUrl : paginationUrl, { params: body });
        } else {
            setInstructorInvoiceFilterActive(false);

            body = { ...body, user_id: parseInt(instructorUID) };
            console.log("GET ALL INVOICE ..", body, " U_ID:", instructorUID);
            res = await axios.get(paginationUrl === "" ? schoolInvoiceIndexUrl : paginationUrl, { params: body });
        }

        console.log('getInstructorInvoiceIndex: ', res.data);

        if (res.data.success) {
            setInvoiceIndexDataInstructor(res.data.data);
            setLoading(false);
            setLoadingSearch(false);
            return true
        }
        else Toastr({ message: res.data.message, type: "error" });
        setLoading(false);
        setLoadingSearch(false);
        return false
    } catch (e) {
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        setLoadingSearch(false);
        console.log('getInstructorInvoiceIndex: ', e);
        return false
    }
}


// l         get student invoice index      
export const getStudentInvoiceIndex = async (student_id = 0, type = "", paginationUrl = "", search = "", filterData) => {
    const { setInvoiceIndexDataStudent, setStudentInvoiceFilterActive } = useInvoiceStore.getState();
    const { setLoadingSearch } = useUtilityStore.getState();

    try {
        console.log("SCHOOL INVOICE BEFORE API CALL::::", " student_id:", student_id, " type:", type, " paginationUrl:", paginationUrl, " search:", search, " filterData:", filterData);

        let targetTake = localStorage.getItem("instructorInvoiceTake") ?? 10;

        let filterForm = { ...filterData };
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

        body = { status: p_status };

        // b            optimize final object       
        student_id = parseInt(student_id);

        if (search) body = { ...body, take: parseInt(targetTake), student_id: student_id, type: type, search: search };
        else body = { ...body, take: parseInt(targetTake), student_id: student_id, type: type };

        if (Object.keys(filterForm).length > 0) {
            setStudentInvoiceFilterActive(true);
            // delete body.status;      
            body = { ...body, ...filterForm }

            console.log("FILTERING INVOICE ... ", body);
            res = await axios.get(paginationUrl === "" ? schoolInvoiceIndexUrl : paginationUrl, { params: body });
        } else {
            setStudentInvoiceFilterActive(false);

            console.log("GET ALL INVOICE ..", body);
            res = await axios.get(paginationUrl === "" ? schoolInvoiceIndexUrl : paginationUrl, { params: body });
        }

        console.log('getStudentInvoiceIndex: ', res.data);

        if (res.data.success) {
            setInvoiceIndexDataStudent(res.data.data);
            setLoading(false);
            setLoadingSearch(false);
            return true
        }
        else Toastr({ message: res.data.message, type: "error" });

        setLoading(false);
        setLoadingSearch(false);
        return false
    } catch (e) {
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        setLoadingSearch(false);
        console.log('getStudentInvoiceIndex: ', e);
        return false
    }
}


//g send mail invoice details       
export const shareInvoiceDetails = async (shareForm) => {
    try {
        setLoading(true);

        const res = await axios.post(shareInvoiceDetailsUrl, shareForm);
        console.log('shareInvoiceDetails: ', res.data);

        if (res.data.success) {
            setLoading(false);
            Toastr({ message: ("Invoice Shared Successfully !"), type: "success" });
            return true;
        } else {
            Toastr({ message: res.data.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (e) {
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        console.log('shareInvoiceDetails: ', e);
    }
}


// get invoice details      
export const getInvoiceDetails = async (invoiceID = 0, invoice_type = "") => {
    const { setInvoiceDetailsData } = useInvoiceStore.getState();
    try {
        setLoading(true);

        let res = {};

        if (invoice_type === "system_generated") res = await axios.get(getSystemGenInvoiceDetailsUrl, { params: { id: invoiceID } });
        else res = await axios.get(getInvoiceDetailsUrl, { params: { id: invoiceID } });
        console.log('getInvoiceDetails: ', res.data);

        if (res.data.success) setInvoiceDetailsData(res.data.data);
        else Toastr({ message: res.data.message, type: "error" });

        setLoading(false);
    } catch (e) {
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        console.log('getInvoiceDetails: ', e);
    }
}


// r secondary invoice details      
export const getSecondaryInvoiceDetails = async (invoiceID = 0, type = "") => {
    const { setSecondaryInvoiceDetailsData } = useInvoiceStore.getState();
    try {
        setLoading(true);

        let body = {
            id: parseInt(invoiceID),
            type: type,
        }
        console.log("getSecondaryInvoiceDetails BODY:: ", body);
        const res = await axios.get(secondaryInvoiceDetailsUrl, { params: body });
        console.log('getSecondaryInvoiceDetails: ', res.data.data);

        if (res.data.success) setSecondaryInvoiceDetailsData(res.data.data);
        else Toastr({ message: res.data.message, type: "error" });

        setLoading(false);
    } catch (e) {
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        console.log('getSecondaryInvoiceDetails: ', e);
    }
}


// change invoice action / status       
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
            await getInvoiceDetails(invoiceID);
            Toastr({ message: "Invoice action applied: " + status + " .", type: "success" });
        } else Toastr({ message: res.data.message, type: "error" });

        setLoading(false);
    } catch (e) {
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        console.log('changeInvoiceStatus: ', e);
    }
}


// search invoice list      
export const searchInvoiceList = async (searchKey = "", url = "") => {
    const { inVoiceTake, invoiceSearchKey, setInvoiceIndexData, resetInvoiceFilterData, setInvoiceFilterActive, setInvoiceType } = useInvoiceStore.getState();
    const { setLoadingSearch } = useUtilityStore.getState();
    try {
        let body = {};

        console.log(body);
        // return
        setLoadingSearch(true);

        const res = await axios.get(url === "" ? getInvoiceIndexUrl : url, { params: { search: invoiceSearchKey, take: inVoiceTake } });
        console.log('searchInvoiceList: ', res.data);

        if (res.data.success) {
            setInvoiceType(-1);
            resetInvoiceFilterData();
            setInvoiceFilterActive(false);
            setInvoiceIndexData(res.data.data);
        }
        else Toastr({ message: res.data.message, type: "error" });

        setLoadingSearch(false);
    } catch (e) {
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoadingSearch(false);
        console.log('searchInvoiceList: ', e);
    }
}

