import axios from "axios";
import { t } from "i18next";
import create from "zustand";
import useUtilityStore from "./UtilityStore";
import { classWebCalenderUrl, schoolClassDeleteUrl, schoolClassListUrl, schoolClassAddUrl, schoolClassAddInfoUrl, schoolClassDetailsUrl, schoolClassEditUrl, schoolClassCancelUrl } from "../Utility/Url";
import { Toastr } from "../Utility/UtilityFunctions";
const { setLoading, setLoadingSearch } = useUtilityStore.getState();

const useClassStore = create((set) => ({

    classList: [],
    setClassList: (value) => set({ classList: value }),

    calenderList: [],
    setCalenderList: (value) => set({ calenderList: value }),

    currentDate: "",
    setCurrentDate: (value) => set({ currentDate: value }),

    selectedCalenderDate: "",
    setSelectedCalenderDate: (value) => set({ selectedCalenderDate: value }),

    classAddForm:
    {
        school_category_id: "",
        lesson_id: "",
        classroom_id: "",
        date: "",
        start_time: "00:00",
        end_time: "00:00",
        instructor_type: "2",
        capacity: "",
        type: ""
    },
    setClassAddForm: (value) => set({ classAddForm: value }),

    resetClassAddForm: () => set({
        classAddForm: {
            school_category_id: "",
            lesson_id: "",
            classroom_id: "",
            date: "",
            start_time: "00:00",
            end_time: "00:00",
            instructor_type: "2"
        }
    }),

    classEditForm:
    {
        id: "",
        school_category_id: "",
        lesson_id: "",
        classroom_id: "",
        date: "",
        start_time: "00:00",
        end_time: "00:00",
        instructor_type: "2",
        capacity: "",
        type: ""
    },
    setClassEditForm: (value) => set({ classEditForm: value }),

    schoolClassAddInfo: {},
    setSchoolClassAddInfo: (value) => set({ schoolClassAddInfo: value }),

    calenderTableData: [],
    setCalenderTableData: (value) => set({ calenderTableData: value }),

    calendarSelected: false,
    setCalendarSelected: (value) => set({ calendarSelected: value }),

    schoolDetails: {},
    setSchoolDetails: (value) => set({ schoolDetails: value }),

    schoolDeleteId: {},
    setSchoolDeleteId: (value) => set({ schoolDeleteId: value }),

    schoolPageUrl: "",
    setSchoolPageUrl: (value) => set({ schoolPageUrl: value }),

    classTakeItem: 10,
    setClassTakeItem: (value) => set({ classTakeItem: value }),

    classSearchValue: "",
    setClassSearchValue: (value) => set({ classSearchValue: value }),

    selectedDate: "",
    setSelectedDate: (value) => set({ selectedDate: value }),

    classStatus: "all",
    setClassStatus: (value) => set({ classStatus: value }),

    //All Modal
    showAddClassModal: false,
    setShowAddClassModal: (value) => set({ showAddClassModal: value }),

    showEditClassModal: false,
    setShowEditClassModal: (value) => set({ showEditClassModal: value }),

    showDeleteClassModal: false,
    setShowDeleteClassModal: (value) => set({ showDeleteClassModal: value }),

    showClassDetailsModal: false,
    setShowClassDetailsModal: (value) => set({ showClassDetailsModal: value }),

    showCancelNoteModal: false,
    setShowCancelNoteModal: (value) => set({ showCancelNoteModal: value }),

    showCalendarViewModal: false,
    setShowCalendarViewModal: (value) => set({ showCalendarViewModal: value }),

}));

export default useClassStore;

//Get class
export const getSchoolClass = async (url = "", search = "") => {
    if (search === "") setLoading(true); else setLoadingSearch(true);
    const { setClassList, classTakeItem, classStatus } = useClassStore.getState();
    let body = {};
    if (search === "") { body = { take: classTakeItem, status: classStatus, is_web: true } }
    else { body = { take: classTakeItem, status: classStatus, is_web: true, search: search } }

    try {
        const res = await axios.post(url === "" ? schoolClassListUrl : url, body);
        console.log("getSchoolClass res.data:::: ", res?.data);

        if (res?.data?.success) {
            await setClassList(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") setLoading(false); else setLoadingSearch(false);
    } catch (error) {
        console.log("getSchoolClass: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") setLoading(false); else setLoadingSearch(false)
        return false;
    }
};


export const getClassCalenderIndex = async (date = "", loading = true) => {

    const { setCalenderList, classStatus, setCurrentDate } = useClassStore.getState();
    await setCurrentDate(date);

    try {
        if (loading) setLoading(true);
        const res = await axios.get(classWebCalenderUrl, { params: { month: date, status: classStatus } });
        console.log("getClassCalenderIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setCalenderList(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (loading) setLoading(false);
    } catch (error) {
        console.log("getClassCalenderIndex::: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (loading) setLoading(false);
        return false;
    }
};

//Add class
export const addSchoolClass = async () => {

    const { classAddForm, currentDate } = useClassStore.getState();
    let data = {};
    if (classAddForm?.classroom_id === "") {
        data = {
            school_category_id: classAddForm?.school_category_id,
            lesson_id: classAddForm?.lesson_id,
            date: classAddForm?.date,
            start_time: classAddForm?.start_time,
            end_time: classAddForm?.end_time,
            instructor_type: "2",
            capacity: classAddForm?.capacity,
            type: classAddForm?.type
        }
    } else {
        data = {
            school_category_id: classAddForm?.school_category_id,
            lesson_id: classAddForm?.lesson_id,
            classroom_id: classAddForm?.classroom_id,
            date: classAddForm?.date,
            start_time: classAddForm?.start_time,
            end_time: classAddForm?.end_time,
            instructor_type: "2",
            capacity: classAddForm?.capacity,
            type: classAddForm?.type
        }
    }

    try {
        setLoading(true);
        const res = await axios.post(schoolClassAddUrl, data);
        console.log("addSchoolClass res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            await getClassCalenderIndex(currentDate, false);
            await getSchoolClass();
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("addSchoolClass: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//get class add info
export const getSchoolClassAddInfo = async () => {

    const { setSchoolClassAddInfo } = useClassStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolClassAddInfoUrl);
        console.log("getSchoolClassAddInfo res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolClassAddInfo(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getSchoolClassAddInfo: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//get school Details
export const getSchoolClassDetails = async (id) => {

    const { setSchoolDetails } = useClassStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolClassDetailsUrl, { id: id });
        console.log("getSchoolClassDetails res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolDetails(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getSchoolClassDetails: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

// class edit
export const editSchoolClass = async () => {

    const {classEditForm, schoolPageUrl, currentDate } = useClassStore.getState();

    let data = {};
    if (classEditForm?.classroom_id === "") {
        data = {
            id: classEditForm?.id,
            school_category_id: classEditForm?.school_category_id,
            lesson_id: classEditForm?.lesson_id,
            date: classEditForm?.date,
            start_time: classEditForm?.start_time,
            end_time: classEditForm?.end_time,
            instructor_type: "2",
            capacity: classEditForm?.capacity,
            type: classEditForm?.type
        }
    } else {
        data = {
            id: classEditForm?.id,
            school_category_id: classEditForm?.school_category_id,
            lesson_id: classEditForm?.lesson_id,
            classroom_id: classEditForm?.classroom_id,
            date: classEditForm?.date,
            start_time: classEditForm?.start_time,
            end_time: classEditForm?.end_time,
            instructor_type: "2",
            capacity: classEditForm?.capacity,
            type: classEditForm?.type
        }
    }

    try {
        setLoading(true);
        const res = await axios.post(schoolClassEditUrl, data);
        console.log("editSchoolClass res.data:::: ", res?.data);

        if (res?.data?.success) {
            await getSchoolClass(schoolPageUrl);
            await getClassCalenderIndex(currentDate, false);
            Toastr({ message: res?.data?.message, type: "success" });
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("editSchoolClass: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

// delete school
export const deleteSchoolClass = async () => {
    const { schoolDeleteId, schoolPageUrl, currentDate } = useClassStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolClassDeleteUrl, { id: schoolDeleteId });
        console.log("deleteSchoolClass res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            await getSchoolClass(schoolPageUrl);
            await getClassCalenderIndex(currentDate, false);
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("deleteSchoolClass: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//cancel school
export const cancelSchoolClass = async (body) => {

    const { schoolPageUrl, currentDate } = useClassStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolClassCancelUrl, body);
        console.log("cancelSchoolClass res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            await getClassCalenderIndex(currentDate, false);
            await getSchoolClass(schoolPageUrl);
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("cancelSchoolClass: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};
