import axios from "axios";
import create from "zustand";
import useUtilityStore from "./UtilityStore";
import { t } from "i18next";
import { Toastr } from "../Utility/UtilityFunctions";
import {
    schoolCategoryListUrl,
    schoolCategoryPackageUrl,
    schoolStudentAdmissionInvoiceUrl,
    schoolStudentBalanceHistoryShowUrl,
    schoolStudentBalanceHistoryUrl,
    schoolStudentBalancePayUrl,
    schoolStudentBalanceRefundUrl,
    schoolStudentCurriculumShowUrl,
    schoolStudentCurriculumUrl,
    schoolStudentIndexUrl,
    schoolStudentInviteStudentUrl,
    schoolStudentInvoiceShowUrl,
    schoolStudentInvoiceStatusChangeUrl,
    schoolStudentInvoiceUrl,
    schoolStudentShowUrl,
    shareCurriculumUrl
} from "../Utility/Url";

const { setLoading, setLoadingSearch } = useUtilityStore.getState();

const useSchoolStudentStore = create((set) => ({

    schoolStudentList: [],
    setSchoolStudentList: (value) => set({ schoolStudentList: value }),

    schoolStudentInvoiceList: [],
    setSchoolStudentInvoiceList: (value) => set({ schoolStudentInvoiceList: value }),

    balanceHistoryList: [],
    setBalanceHistoryList: (value) => set({ balanceHistoryList: value }),

    schoolStudentCurriculumList: [],
    setSchoolStudentCurriculumList: (value) => set({ schoolStudentCurriculumList: value }),

    schoolStudentCurriculumDetails: {},
    setSchoolStudentCurriculumDetails: (value) => set({ schoolStudentCurriculumDetails: value }),

    schoolStudentInvoiceDetails: {},
    setSchoolStudentInvoiceDetails: (value) => set({ schoolStudentInvoiceDetails: value }),

    schoolStudentDetails: {},
    setSchoolStudentDetails: (value) => set({ schoolStudentDetails: value }),

    studentStatus: "",
    setStudentStatus: (value) => set({ studentStatus: value }),

    schoolStudentInvoiceSearch: "",
    setSchoolStudentInvoiceSearch: (value) => set({ schoolStudentInvoiceSearch: value }),

    schoolStudentBalancePageUrl: "",
    setSchoolStudentBalancePageUrl: (value) => set({ schoolStudentBalancePageUrl: value }),

    SchoolStudentIndexTakeAmount: 10,
    setSchoolStudentIndexTakeAmount: (value) => set({ SchoolStudentIndexTakeAmount: value }),

    schoolStudentBalanceTakeAmount: 10,
    setSchoolStudentBalanceTakeAmount: (value) => set({ schoolStudentBalanceTakeAmount: value }),

    studentInvoiceTakeAmount: 10,
    setStudentInvoiceTakeAmount: (value) => set({ studentInvoiceTakeAmount: value }),

    schoolStudentPageUrl: "",
    setSchoolStudentPageUrl: (value) => set({ schoolStudentPageUrl: value }),

    schoolStudentSearch: "",
    setSchoolStudentSearch: (value) => set({ schoolStudentSearch: value }),

    transactionDetails: {},
    setTransactionDetails: (value) => set({ transactionDetails: value }),

    studentSearch: "",
    setStudentSearch: (value) => set({ studentSearch: value }),

    pricePayForm: {
        student_id: "",
        amount: "",
        type: "pay",
        comment: ""
    },
    setPricePayForm: (value) => set({ pricePayForm: value }),

    refundForm: {
        student_id: "",
        amount: "",
        type: "refund",
        comment: ""
    },
    setRefundForm: (value) => set({ refundForm: value }),

    schoolStudentNewReqDetails: {},
    setSchoolStudentNewReqDetails: (value) => set({ schoolStudentNewReqDetails: value }),

    newReqForm: {
        id: "",
        status: "created",
        comment: "",
        new_price: ""
    },
    setNewReqForm: (value) => set({ newReqForm: value }),

    newPricePercentage: null,
    setNewPricePercentage: (value) => set({ newPricePercentage: value }),

    balanceSearch: "",
    setBalanceSearch: (value) => set({ balanceSearch: value }),

    categoryList: [],
    setCategoryList: (value) => set({ categoryList: value }),

    packageList: [],
    setPackageList: (value) => set({ packageList: value }),

    studentAddForm: {
        name: "",
        email: "",
        category_id: "",
        package_id: "",
        price: "",
        lessons: []
    },
    setStudentAddForm: (value) => set({ studentAddForm: value }),

    resetStudentAddForm: () => set({
        studentAddForm: {
            name: "",
            email: "",
            category_id: "",
            package_id: "",
            price: "",
            lessons: []
        }
    }),

    shareCurriculumForm: {
        id: "",
        email: "",
        type: "student_curriculum",
    },
    setShareCurriculumForm: (value) => set({ shareCurriculumForm: value }),

    //All Modal

    schoolStudentInvoiceModal: false,
    setSchoolStudentInvoiceModal: (value) => set({ schoolStudentInvoiceModal: value }),

    showShareCurriculumModal: false,
    setShowShareCurriculumModal: (value) => set({ showShareCurriculumModal: value }),

    showStudentAttachmentsModal: false,
    setShowStudentAttachmentsModal: (value) => set({ showStudentAttachmentsModal: value }),

    showUpdatePriceModal: false,
    setShowUpdatePriceModal: (value) => set({ showUpdatePriceModal: value }),

    showPayModal: false,
    setShowPayModal: (value) => set({ showPayModal: value }),

    showTransactionDetailsModal: false,
    setShowTransactionDetailsModal: (value) => set({ showTransactionDetailsModal: value }),

    showRefundModal: false,
    setShowRefundModal: (value) => set({ showRefundModal: value }),

    showAddStudentModal: false,
    setShowAddStudentModal: (value) => set({ showAddStudentModal: value }),

    showSchoolStudentCurriculumDetailsModal: false,
    setShowSchoolStudentCurriculumDetailsModal: (value) => set({ showSchoolStudentCurriculumDetailsModal: value }),

}));

export default useSchoolStudentStore;

//Get School Student
export const getSchoolStudentIndex = async (url = "", takeAmount = 10, search = "") => {

    const { setSchoolStudentList, studentStatus } = useSchoolStudentStore.getState();
    if (search === "") setLoading(true); else setLoadingSearch(true);
    let body = {};
    if (search === "" && studentStatus === "") {
        body = { take: takeAmount, is_web: true }
    } else if (search !== "" && studentStatus !== "") {
        body = { take: takeAmount, is_web: true, search: search, status: studentStatus }
    } else if (search === "" && studentStatus !== "") {
        body = { take: takeAmount, is_web: true, status: studentStatus }
    } else if (search !== "" && studentStatus === "") {
        body = { take: takeAmount, is_web: true, search: search }
    }
    try {
        const res = await axios.get(url === "" ? schoolStudentIndexUrl : url, { params: body });
        console.log("getSchoolStudentIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            await setSchoolStudentList(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") setLoading(false); else setLoadingSearch(false);
    } catch (error) {
        console.log("getSchoolStudentIndex: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") setLoading(false); else setLoadingSearch(false);
        return false;
    }
};

//Get School Student Show
export const getSchoolStudentShow = async (id) => {

    const { setSchoolStudentDetails } = useSchoolStudentStore.getState();

    try {
        setLoading(true);
        const res = await axios.get(schoolStudentShowUrl, { params: { id: id } });
        console.log("getSchoolStudentShow res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolStudentDetails(res?.data?.data);
            // invoice list
            schoolStudentInvoiceIndex("", id)
            //Curriculum List
            schoolStudentCurriculumIndex("", id)
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getSchoolStudentShow: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//Get Student Invoice
export const schoolStudentInvoiceIndex = async (url = "", id, search = "") => {
    const { setSchoolStudentInvoiceList, studentInvoiceTakeAmount } = useSchoolStudentStore.getState();
    try {
        if (search !== "") { setLoadingSearch(true) } else { setLoading(true) }
        let body = {}
        if (search === "") {
            body = {
                student_id: id,
                type: "school_student",
                take: studentInvoiceTakeAmount
            }
        } else {
            body = {
                student_id: id,
                type: "school_student",
                take: studentInvoiceTakeAmount,
                search: search
            }
        }

        const res = await axios.get(url === "" ? schoolStudentInvoiceUrl : url, { params: body });
        console.log("schoolStudentInvoiceIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolStudentInvoiceList(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search !== "") { setLoadingSearch(false) } else { setLoading(false) }
    } catch (error) {
        console.log("schoolStudentInvoiceIndex: ", error);
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        if (search !== "") { setLoadingSearch(false) } else { setLoading(false) }
        return false;
    }
};

//Get Student Curriculum
export const schoolStudentCurriculumIndex = async (url = "", id) => {
    const { setSchoolStudentCurriculumList } = useSchoolStudentStore.getState();
    try {
        // setLoading(true);
        const res = await axios.get(url === "" ? schoolStudentCurriculumUrl : url, { params: { id: id, take: 1000 } });
        console.log("schoolStudentCurriculumUrlIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            await setSchoolStudentCurriculumList(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        // setLoading(false);
    } catch (error) {
        console.log("schoolStudentCurriculumUrlIndex: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        // setLoading(false);
        return false;
    }
};

//Get Student Curriculum
export const getSchoolStudentCurriculumDetails = async (id) => {
    const {
        setSchoolStudentCurriculumDetails
    } = useSchoolStudentStore.getState();
    try {
        setLoading(true);
        const res = await axios.get(schoolStudentCurriculumShowUrl, {
            params: {
                id: id
            }
        });
        console.log("getSchoolStudentCurriculumDetails res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolStudentCurriculumDetails(res?.data?.data);
        } else {
            Toastr({
                message: res?.data?.message,
                type: "error"
            });
        }
        setLoading(false);
    } catch (error) {
        console.log("getSchoolStudentCurriculumDetails: ", error);
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        return false;
    }
};

//Get Student Curriculum
export const schoolStudentInvoiceDetails = async (id) => {
    const {
        setSchoolStudentInvoiceDetails
    } = useSchoolStudentStore.getState();
    try {
        setLoading(true);
        const res = await axios.get(schoolStudentInvoiceShowUrl, {
            params: {
                id: id,
                type: "admission_invoice"
            }
        });
        console.log("schoolStudentInvoiceDetails res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolStudentInvoiceDetails(res?.data?.data);
        } else {
            Toastr({
                message: res?.data?.message,
                type: "error"
            });
        }
        setLoading(false);
    } catch (error) {
        console.log("schoolStudentInvoiceDetails: ", error);
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        return false;
    }
};

//Get Student Balance History
export const schoolStudentBalanceHistoryIndex = async (id, paginationUrl = "", taleAmount = 10, search = "") => {
    const {
        setBalanceHistoryList
    } = useSchoolStudentStore.getState();

    let body = {}

    if (search === "") {
        body = {
            student_id: id,
            take: taleAmount
        }
    } else {
        body = {
            student_id: id,
            take: taleAmount,
            search: search
        }
    }

    try {
        if (search === "") {
            setLoading(true);
        } else {
            setLoadingSearch(true);
        }
        const res = await axios.get(paginationUrl === "" ? schoolStudentBalanceHistoryUrl : paginationUrl, {
            params: body
        });
        console.log("schoolStudentBalanceHistoryIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setBalanceHistoryList(res?.data?.data);
        } else {
            Toastr({
                message: res?.data?.message,
                type: "error"
            });
        }
        if (search === "") {
            setLoading(false);
        } else {
            setLoadingSearch(false);
        }
    } catch (error) {
        console.log("schoolStudentBalanceHistoryIndex: ", error);
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        if (search === "") {
            setLoading(false);
        } else {
            setLoadingSearch(false);
        }
        return false;
    }
};

//Get Student Balance History Show
export const schoolStudentBalanceHistoryShow = async (id) => {
    const {
        setTransactionDetails
    } = useSchoolStudentStore.getState();
    try {
        setLoading(true);
        const res = await axios.get(schoolStudentBalanceHistoryShowUrl, {
            params: {
                id: id
            }
        });
        console.log("schoolStudentBalanceHistoryShow res.data:::: ", res?.data);

        if (res?.data?.success) {
            setTransactionDetails(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("schoolStudentBalanceHistoryShow: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//Student Balance Pay
export const schoolStudentBalancePay = async () => {
    const { pricePayForm } = useSchoolStudentStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolStudentBalancePayUrl, pricePayForm);
        console.log("schoolStudentBalancePay res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("schoolStudentBalancePay: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//Student Balance Refund
export const schoolStudentBalanceRefund = async () => {
    const {
        refundForm
    } = useSchoolStudentStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolStudentBalanceRefundUrl, refundForm);
        console.log("schoolStudentBalanceRefund res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" })
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("schoolStudentBalanceRefund: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//School Student Admission Invoice
export const getSchoolStudentAdmissionInvoice = async (id) => {
    const {
        setSchoolStudentNewReqDetails
    } = useSchoolStudentStore.getState();
    try {
        setLoading(true);
        const res = await axios.get(schoolStudentAdmissionInvoiceUrl, {
            params: { id: id }
        });
        console.log("getSchoolStudentAdmissionInvoice res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolStudentNewReqDetails(res?.data?.data)
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("getSchoolStudentAdmissionInvoice: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//School Student Admission Invoice
export const schoolStudentInvoiceStatusChange = async (body) => {

    try {
        setLoading(true);
        const res = await axios.post(schoolStudentInvoiceStatusChangeUrl, body);
        console.log("schoolStudentInvoiceStatusChange res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" })
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("schoolStudentInvoiceStatusChange: ", error);
        Toastr({
            message: t("An error occurred!"),
            type: "error"
        });
        setLoading(false);
        return false;
    }
};

export const categoryIndex = async () => {

    const { setCategoryList } = useSchoolStudentStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryListUrl);
        console.log("categoryIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setCategoryList(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("categoryIndex: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

export const packageIndex = async (id) => {

    const { setPackageList } = useSchoolStudentStore.getState();

    try {
        let body = {}
        body = { school_category_id: id }
        const res = await axios.get(schoolCategoryPackageUrl, { params: body });
        console.log("packageIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            await setPackageList(res?.data?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
    } catch (error) {
        console.log("packageIndex: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        return false;
    }
};

export const inviteStudent = async () => {

    const { studentAddForm, setStudentStatus } = useSchoolStudentStore.getState();

    setLoading(true);
    try {
        const res = await axios.post(schoolStudentInviteStudentUrl, studentAddForm);
        console.log("inviteStudent res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            await setStudentStatus("");
            await getSchoolStudentIndex();
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("inviteStudent: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

export const ShareCurriculum = async () => {
    const { shareCurriculumForm } = useSchoolStudentStore.getState();
    setLoading(true);
    try {
        const res = await axios.post(shareCurriculumUrl, shareCurriculumForm);
        console.log("ShareCurriculum res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("ShareCurriculum :: error ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};
