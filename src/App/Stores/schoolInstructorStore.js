import axios from "axios";
import create from "zustand";
import { t } from "i18next";
import useUtilityStore from "./UtilityStore";
import { Toastr } from "../Utility/UtilityFunctions";
import {instructorPendingDrivingActionUrl,instructorPendingExternalActionUrl, activeCategoriesUrl,instructorScheduleEditUrl,instructorCheckAvailabilityUrl, instructorScheduleAddUrl, instructorScheduleCheckUrl, instructorScheduleDetailsUrl, instructorScheduleUrl, instructorUpdateUrl, instructorsPendingLessonsUrl, schoolDashboardUrl, schoolInstructorAcceptUrl, schoolInstructorDetailsUrl, schoolInstructorIndexUrl, schoolInstructorRejectUrl, schoolInstructorsAdditionalInfoUrl, schoolInstructorsInvoiceFilterUrl, schoolInstructorsLessonDetailsUrl, schoolInstructorsLessonUrl, schoolInstructorsRemoveUrl } from "../Utility/Url";

const { setLoading, setLoadingSearch } = useUtilityStore.getState();

const useSchoolInstructorStore = create((set) => ({

    schoolInstructorList: [],
    setSchoolInstructorList: (value) => set({ schoolInstructorList: value }),

    schoolInstructorsLessonList: [],
    setSchoolInstructorsLessonList: (value) => set({ schoolInstructorsLessonList: value }),

    schoolInstructorsInvoiceList: [],
    setSchoolInstructorsInvoiceList: (value) => set({ schoolInstructorsInvoiceList: value }),

    schoolInstructorsDrivingList: [],
    setSchoolInstructorsDrivingList: (value) => set({ schoolInstructorsDrivingList: value }),

    schoolInstructorsExternalList: [],
    setSchoolInstructorsExternalList: (value) => set({ schoolInstructorsExternalList: value }),

    schoolInstructorsLessonDetails: {},
    setSchoolInstructorsLessonDetails: (value) => set({ schoolInstructorsLessonDetails: value }),

    pendingLessons: [],
    setPendingLessons: (value) => set({ pendingLessons: value }),

    schoolInstructorDetails: {},
    setSchoolInstructorDetails: (value) => set({ schoolInstructorDetails: value }),

    schoolInstructorSearchKey: "",
    setSchoolInstructorSearchKey: (value) => set({ schoolInstructorSearchKey: value }),

    schoolInstructorRejectionNote: null,
    setSchoolInstructorRejectionNote: (value) => set({ schoolInstructorRejectionNote: value }),

    instructorPageUrl: "",
    setInstructorPageUrl: (value) => set({ instructorPageUrl: value }),

    school_instructor_take: 10,
    setSchool_instructor_take: (value) => set({ school_instructor_take: value }),

    invoice_take: 10,
    setInvoice_take: (value) => set({ invoice_take: value }),

    classroom_take: 10,
    setClassroom_take: (value) => set({ classroom_take: value }),

    driving_take: 10,
    setDriving_take: (value) => set({ driving_take: value }),

    external_take: 10,
    setExternal_take: (value) => set({ external_take: value }),

    pending_requests_take: 10,
    setPending_requests_take: (value) => set({ pending_requests_take: value }),

    pending_requests_search: "",
    setPending_requests_search: (value) => set({ pending_requests_search: value }),

    instructor_additional_info: {},
    setInstructor_additional_info: (value) => set({ instructor_additional_info: value }),

    instructor_invoice_search: "",
    setInstructor_invoice_search: (value) => set({ instructor_invoice_search: value }),

    instructor_classroom_search: "",
    setInstructor_classroom_search: (value) => set({ instructor_classroom_search: value }),

    instructor_driving_search: "",
    setInstructor_driving_search: (value) => set({ instructor_driving_search: value }),

    instructor_external_search: "",
    setInstructor_external_search: (value) => set({ instructor_external_search: value }),


    schoolInstructorAppliedCategories: [],
    setSchoolInstructorAppliedCategories: (value) => set({ schoolInstructorAppliedCategories: value }),

    schoolInstructorAppliedCategoriesValue: [],
    setSchoolInstructorAppliedCategoriesValue: (value) => set({ schoolInstructorAppliedCategoriesValue: value }),

    categoryList: [],
    setCategoryList: (value) => set({ categoryList: value }),

    instructorIndex: {},
    setInstructorIndex: (value) => set({ instructorIndex: value }),

    instructorSearchKey: "",
    setInstructorSearchKey: (value) => set({ instructorSearchKey: value }),

    expertiseArea: [],
    setExpertiseArea: (value) => set({ expertiseArea: value }),

    applyFor: [],
    setApplyFor: (value) => set({ applyFor: value }),

    addInstructorFormData: {
        name: "",
        email: "",
        phone_number: "",
        about: "",
        image:"",
        expertise: [],
        
        apply_category:[]
    },
    setAddInstructorFormData: (value) => set({ addInstructorFormData: value }),
    setInstructorImage: (name, value) => set((state) => (state.addInstructorFormData[name] = value)),

    resetAddInstructorFormData: () => set({
        addInstructorFormData: {
            name: "",
            email: "",
            phone_number: "",
            about: "",
            image:"",
            expertise: [],
            apply_category:[]
        }
    }),

    calenderList: [],
    setCalenderList: (value) => set({ calenderList: value }),

    schoolClassAddInfo: {},
    setSchoolClassAddInfo: (value) => set({ schoolClassAddInfo: value }),

    calenderTableData: [],
    setCalenderTableData: (value) => set({ calenderTableData: value }),

    checkSchedule: [],
    setCheckSchedule: (value) => set({ checkSchedule: value }),

    calendarSelected: false,
    setCalendarSelected: (value) => set({ calendarSelected: value }),

    classStatus: "all",
    setClassStatus: (value) => set({ classStatus: value }),

    currentDate: "",
    setCurrentDate: (value) => set({ currentDate: value }),

    selectedCalenderDate: "",
    setSelectedCalenderDate: (value) => set({ selectedCalenderDate: value }),

    endDate: "",
    setEndDate: (value) => set({ endDate: value }),

    selectedDate: "",
    setSelectedDate: (value) => set({ selectedDate: value }),

    addScheduleFormData: {
        instructor_id: "",
        is_recurring: false,
        start_date: "",
        end_date: "",
        times: []
    },
    setAddScheduleFormData: (value) => set({ addScheduleFormData: value }),

    resetAddScheduleForm: () => set({
        addScheduleFormData: {
            instructor_id: "",
            is_recurring: false,
            start_date: "",
            end_date: "",
            times: []
        }
    }),

    scheduleTimeForm: {
            start_time: "",
            end_time: "",
            days: []
        },
    setScheduleTimeForm: (value) => set({ scheduleTimeForm: value }),

    scheduleDetails: {},
    setScheduleDetails: (value) => set({ scheduleDetails: value }),

    editScheduleFormData: {
        id:"",
        instructor_id: "",
        is_recurring: false,
        deletable_ids:[],
        times: []
    },
    setEditScheduleFormData: (value) => set({ editScheduleFormData: value }),

    scheduleTimeEditForm: {
        id:"",
        start_time: "",
        end_time: "",
        days: []
    },
   setScheduleTimeEditForm: (value) => set({ scheduleTimeEditForm: value }),

   pendingExternalAction:{
     id: "",
     instructor_id: "",
     flag: "accepted",
     date: "",
     start_time: "",
     end_time: "",
     accept_note: ""
   },
   setPendingExternalAction: (value) => set({ pendingExternalAction: value }),

       resetPendingExternalAction: () => set({
        pendingExternalAction: {
            id: "",
            instructor_id: "",
            flag: "",
            date: "",
            start_time: "",
            end_time: "",
            accept_note: ""
        }
    }),

    //All Modal

    showAcceptNoteModal: false,
    setShowAcceptNoteModal: (value) => set({ showAcceptNoteModal: value }),

    showRejectionReasonModal: false,
    setShowRejectionReasonModal: (value) => set({ showRejectionReasonModal: value }),

    showInstructorRemoveModal: false,
    setShowInstructorRemoveModal: (value) => set({ showInstructorRemoveModal: value }),

    showInstructorRequestDetailsModal: false,
    setShowInstructorRequestDetailsModal: (value) => set({ showInstructorRequestDetailsModal: value }),

    showLessonDetailsModal: false,
    setShowLessonDetailsModal: (value) => set({ showLessonDetailsModal: value }),

    showAddInstructorModal: false,
    setShowAddInstructorModal: (value) => set({ showAddInstructorModal: value }),

    showEditInstructorModal: false,
    setShowEditInstructorModal: (value) => set({ showEditInstructorModal: value }),

    showScheduleFilterModal: false,
    setShowScheduleFilterModal: (value) => set({ showScheduleFilterModal: value }),

    showAddScheduleModal: false,
    setShowAddScheduleModal: (value) => set({ showAddScheduleModal: value }),

    showEditScheduleModal: false,
    setShowEditScheduleModal: (value) => set({ showEditScheduleModal: value }),

    showRequestDetailsModal: false,
    setShowRequestDetailsModal: (value) => set({ showRequestDetailsModal: value }),

    showScheduleListModal: false,
    setShowScheduleListModal: (value) => set({ showScheduleListModal: value }),

}));

export default useSchoolInstructorStore;

//Get School Instructor
export const getSchoolInstructorIndex = async (url = "", search = "") => {

    const { school_instructor_take, setSchoolInstructorList, schoolInstructorSearchKey } = useSchoolInstructorStore.getState();

    if (search === "") setLoading(true); else setLoadingSearch(true);

    try {
        // const school = await axios.get(schoolDashboardUrl);
        let body = {}
        if (search === "")
        body = {  take: school_instructor_take };
        else body = { take: school_instructor_take, search: schoolInstructorSearchKey }
        const res = await axios.get(url === "" ? schoolInstructorIndexUrl : url, { params: body });
        console.log("getSchoolInstructorIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolInstructorList(res?.data?.data)
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
    } catch (error) {
        console.log("getSchoolInstructorIndex::::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
        return false;
    }
};

//Get School Instructor Details
export const getSchoolInstructorDetails = async (id) => {

    const { setSchoolInstructorDetails } = useSchoolInstructorStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolInstructorDetailsUrl, { id: id });
        console.log("getSchoolInstructorDetails res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolInstructorDetails(res?.data?.data[0])
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getSchoolInstructorDetails::::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//School Instructor Remove
export const schoolInstructorsRemove = async (id) => {

    try {
        setLoading(true);
        const res = await axios.post(schoolInstructorsRemoveUrl, { id: id });
        console.log("schoolInstructorsRemove res.data:::: ", res?.data);

        if (res?.data?.success) {
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("schoolInstructorsRemove::::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//School Instructor Accept
export const schoolInstructorAcceptIndex = async (id) => {

    try {
        setLoading(true);
        const res = await axios.post(schoolInstructorAcceptUrl, { id: id });
        console.log("schoolInstructorAcceptIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("schoolInstructorAcceptIndex::::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//School Instructor Reject
export const schoolInstructorRejectIndex = async (id) => {
    const { schoolInstructorRejectionNote } = useSchoolInstructorStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolInstructorRejectUrl, { id: id, reject_note: schoolInstructorRejectionNote });
        console.log("schoolInstructorRejectIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("schoolInstructorRejectIndex::::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//school Instructors Classroom
export const schoolInstructorsClassroomIndex = async (url = "", id, search = "") => {

    const { setSchoolInstructorsLessonList, classroom_take } = useSchoolInstructorStore.getState();

    let body = {};

    if (search === "") {
        body = { id: id, type: "classroom", take: classroom_take }
    } else {
        body = { id: id, type: "classroom", take: classroom_take, search: search }
    }

    try {
        if (search === "") { setLoading(true); } else { setLoadingSearch(true); }
        const res = await axios.get(url === "" ? schoolInstructorsLessonUrl : url, { params: body });
        console.log("schoolInstructorsLessonIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolInstructorsLessonList(res?.data?.data)
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
    } catch (error) {
        console.log("schoolInstructorsLessonIndex :::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
        return false;
    }
};

//school Instructors Driving
export const schoolInstructorsDrivingIndex = async (url = "", id, search = "") => {

    const { setSchoolInstructorsDrivingList, driving_take } = useSchoolInstructorStore.getState();

    let body = {};

    if (search === "") {
        body = { id: id, type: "driving", take: driving_take }
    } else {
        body = { id: id, type: "driving", take: driving_take, search: search }
    }

    try {
        if (search === "") { setLoading(true); } else { setLoadingSearch(true); }
        const res = await axios.get(url === "" ? schoolInstructorsLessonUrl : url, { params: body });
        console.log("schoolInstructorsDrivingIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolInstructorsDrivingList(res?.data?.data)
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
    } catch (error) {
        console.log("schoolInstructorsDrivingIndex :::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
    }
};

//school Instructors External
export const schoolInstructorsExternalIndex = async (url = "", id, search = "") => {

    const { setSchoolInstructorsExternalList, external_take } = useSchoolInstructorStore.getState();

    let body = {};

    if (search === "") {
        body = { id: id, type: "external", take: external_take }
    } else {
        body = { id: id, type: "external", take: external_take, search: search }
    }

    try {
        if (search === "") { setLoading(true); } else { setLoadingSearch(true); }
        const res = await axios.get(url === "" ? schoolInstructorsLessonUrl : url,
            { params: body });
        console.log("schoolInstructorsExternalIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolInstructorsExternalList(res?.data?.data)
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
    } catch (error) {
        console.log("schoolInstructorsExternalIndex :::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
        return false;
    }
};

//school Instructors dETAILS
export const schoolInstructorsAllTypeDetails = async (id, type = "") => {

    const { setSchoolInstructorsLessonDetails } = useSchoolInstructorStore.getState();

    try {
        setLoading(true);
        const res = await axios.get(schoolInstructorsLessonDetailsUrl, { params: { id: id, type: type } });
        console.log("schoolInstructorsExternalIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            if (type === "classroom") {
                setSchoolInstructorsLessonDetails(res?.data?.data[0])
            } else {
                setSchoolInstructorsLessonDetails(res?.data?.data)
            }

            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("schoolInstructorsExternalIndex:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//school Instructors Invoice List
export const schoolInstructorsInvoiceIndex = async (url = "", id, search = "") => {

    const { setSchoolInstructorsInvoiceList, invoice_take } = useSchoolInstructorStore.getState();

    let body = {};
    if (search === "") {
        body = { instructor_id: id, type: "school_instructor", take: invoice_take }
    } else {
        body = { instructor_id: id, type: "school_instructor", take: invoice_take, search: search }
    }
    console.log("InstructorsInvoiceBody", body)
    try {
        if (search === "") { setLoading(true); } else { setLoadingSearch(true); }
        const res = await axios.get(url === "" ? schoolInstructorsInvoiceFilterUrl : url, {
            params: body
        });

        console.log("schoolInstructorsInvoiceIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolInstructorsInvoiceList(res?.data?.data)

        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
    } catch (error) {
        console.log("schoolInstructorsInvoiceIndex:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") { setLoading(false); } else { setLoadingSearch(false); }
        return false;
    }
};

export const getSchoolInstructorsAdditionalInfo = async (id) => {

    const { setInstructor_additional_info } = useSchoolInstructorStore.getState();

    try {
        setLoading(true);
        const res = await axios.get(schoolInstructorsAdditionalInfoUrl, { params: { id: id } });
        console.log("getSchoolInstructorsAdditionalInfo res.data:::: ", res?.data);

        if (res?.data?.success) {
            setInstructor_additional_info(res?.data?.data)
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("getSchoolInstructorsAdditionalInfo:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

export const getInstructorsPendingLessons = async (id, url = "", search = "") => {

    const { setPendingLessons, pending_requests_take } = useSchoolInstructorStore.getState();
    let body = {}
    if (search === "") body = { id: id, take: pending_requests_take, search: search };
    else body = { id: id, take: pending_requests_take };
    try {
        if (search === "") setLoading(true); else setLoadingSearch(true)
        const res = await axios.get(url === "" ? instructorsPendingLessonsUrl : url, { params: body });
        console.log("getInstructorsPendingLessons res.data:::: ", res?.data);

        if (res?.data?.success) {
            setPendingLessons(res?.data?.data)
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") setLoading(false); else setLoadingSearch(false);
    } catch (error) {
        console.log("getInstructorsPendingLessons:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") setLoading(false); else setLoadingSearch(false);
        return false;
    }
};


export const getActiveCategories = async () => {

    const { setCategoryList } = useSchoolInstructorStore.getState();

    try {
        setLoading(true);
        const res = await axios.get(activeCategoriesUrl);
        console.log("getActiveCategories res.data:::: ", res?.data);

        if (res?.data?.success) {
            setCategoryList(res?.data?.data)
            setLoading(false);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getActiveCategories ERROR:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

export const instructorUpdate = async () => {

    const { addInstructorFormData } = useSchoolInstructorStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(instructorUpdateUrl,addInstructorFormData);
        console.log("instructorUpdate res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            //await getSchoolInstructorDetails(parseInt(res?.data?.data[0]?.id));
            window.location.href="/school-instructor/details/" + res?.data?.data[0]?.id + "/schedule"
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("instructorUpdate ERROR:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

export const getInstructorSchedule = async (date="",instructor_id) => {

    const { setCalenderList } = useSchoolInstructorStore.getState();

    try {
        setLoading(true);
        const res = await axios.get(instructorScheduleUrl,{ params: {instructor_id:instructor_id,month:date} });
        console.log("getInstructorSchedule res.data:::: ", res?.data);

        if (res?.data?.success) {
            setCalenderList(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getInstructorSchedule ERROR:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

export const getCheckAvailability = async (date="",instructor_id) => {

    const { setCheckSchedule } = useSchoolInstructorStore.getState();

    try {
        setLoading(true);
        const res = await axios.get(instructorCheckAvailabilityUrl,{ params: {instructor_id:instructor_id,date:date} });
        console.log("getInstructorCheckSchedule res.data:::: ", res?.data);

        if (res?.data?.success) {
            setCheckSchedule(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getInstructorCheckSchedule ERROR:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};


export const instructorScheduleAdd = async () => {

    const { addScheduleFormData } = useSchoolInstructorStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(instructorScheduleAddUrl,addScheduleFormData);
        console.log("instructorScheduleAdd res.data:::: ", res?.data);

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
        console.log("instructorScheduleAdd ERROR:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};


export const instructorScheduleCheck = async (body) => {

    try {
        setLoading(true);
        const res = await axios.post(instructorScheduleCheckUrl,body);
        console.log("instructorScheduleCheck res.data:::: ", res?.data);

        if (res?.data?.success) {
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("instructorScheduleCheck ERROR:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};


export const instructorScheduleDetails = async (id,instructor_id) => {

    const { setScheduleDetails } = useSchoolInstructorStore.getState();

    try {
        setLoading(true);
        const res = await axios.get(instructorScheduleDetailsUrl,{ params: {id:id,instructor_id:instructor_id} });
        console.log("instructorScheduleDetails res.data:::: ", res?.data);

        if (res?.data?.success) {
            setScheduleDetails(res?.data?.data)
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("instructorScheduleDetails ERROR:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

export const instructorScheduleEdit = async () => {

    const { editScheduleFormData } = useSchoolInstructorStore.getState();

    console.log("editScheduleFormData",editScheduleFormData)

    try {
        setLoading(true);
        const res = await axios.post(instructorScheduleEditUrl,editScheduleFormData);
        console.log("instructorScheduleEdit res.data:::: ", res?.data);

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
        console.log("instructorScheduleEdit ERROR:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

export const instructorPendingAction = async (type) => {

    const { currentDate,schoolInstructorDetails,pendingExternalAction,pending_requests_search } = useSchoolInstructorStore.getState();

    console.log("pendingExternalAction",pendingExternalAction)
    let body={
    id: pendingExternalAction?.id,
    instructor_id: pendingExternalAction?.instructor_id,
    status: pendingExternalAction?.flag,
    note: pendingExternalAction?.accept_note
}
    console.log("body",body)

    try {
        setLoading(true);
        const res = await axios.post(type === "driving"?instructorPendingDrivingActionUrl:
        instructorPendingExternalActionUrl,type === "driving"?body:pendingExternalAction);
        console.log("instructorPendingAction res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            await getInstructorsPendingLessons(pendingExternalAction?.instructor_id,"",pending_requests_search)
            await getInstructorSchedule(currentDate,schoolInstructorDetails?.instructor_id);
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("instructorPendingAction ERROR:::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};
