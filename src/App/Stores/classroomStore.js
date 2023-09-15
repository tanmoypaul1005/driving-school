import axios from "axios";
import create from "zustand";
import useUtilityStore from "./UtilityStore";
import { Toastr } from "../Utility/UtilityFunctions";
import { schoolClassroomUrl, schoolCreateClassroomUrl, schoolShowClassroomUrl, schoolEditClassroomUrl, schoolDeleteClassroomUrl } from "../Utility/Url";
import { t } from "i18next";

const { setLoading, setLoadingSearch } = useUtilityStore.getState();

const useClassroomStore = create((set) => ({

    classroomList: [],
    setClassroomList: (value) => set({ classroomList: value }),

    classroomDetails: [],
    setClassroomDetails: (value) => set({ classroomDetails: value }),

    classroomDeleteId: null,
    setClassroomDeleteId: (value) => set({ classroomDeleteId: value }),

    classroomForm: {
        name: "",
        address: "",
        city: "",
        zip: "",
        capacity: ""
    },
    setClassroomForm: (value) => set({ classroomForm: value }),

    classroomEditForm: {
        id: "",
        name: "",
        address: "",
        city: "",
        zip: "",
        capacity: ""
    },
    setClassroomEditForm: (value) => set({ classroomEditForm: value }),

    classroom_take: 10,
    setClassroom_take: (value) => set({ classroom_take: value }),

    classroomSearch: "",
    setClassroomSearch: (value) => set({ classroomSearch: value }),

    //All Modal

    showAddClassroomModal: false,
    setShowAddClassroomModal: (value) => set({ showAddClassroomModal: value }),

    showEditClassroomModal: false,
    setShowEditClassroomModal: (value) => set({ showEditClassroomModal: value }),

    showDeleteClassroomModal: false,
    setShowDeleteClassroomModal: (value) => set({ showDeleteClassroomModal: value }),

}));

export default useClassroomStore;

//Get classRoom
export const getSchoolClassroom = async (url = "", search = "") => {
    const { setClassroomList, classroom_take } = useClassroomStore.getState();

    let body = {};

    if (search === "") {
        body = { take: classroom_take, is_web: true }
    } else {
        body = { take: classroom_take, is_web: true, search: search }
    }
    try {
        if (search === "") { setLoading(true); } else { setLoadingSearch(true) }
        const res = await axios.post(url === "" ? schoolClassroomUrl : url, body);
        console.log("getSchoolClassroom res.data:::: ", res?.data);

        if (res?.data?.success) {
            setClassroomList(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") { setLoading(false); } else { setLoadingSearch(false) }
    } catch (error) {
        console.log("getSchoolClassroom: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") { setLoading(false); } else { setLoadingSearch(false) }
        return false;
    }
};

//add classroom
export const addSchoolClassroom = async () => {

    const { classroomForm } = useClassroomStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolCreateClassroomUrl, classroomForm);
        console.log("addSchoolClassroom res.data:::: ", res?.data);

        if (res?.data?.success) {
            getSchoolClassroom();
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("addSchoolClassroom: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//show classroom
export const getSchoolClassroomShow = async (id) => {

    const { setClassroomDetails } = useClassroomStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolShowClassroomUrl, { id: id });
        console.log("getSchoolClassroomShow res.data:::: ", res?.data);

        if (res?.data?.success) {
            setClassroomDetails(res?.data?.data)
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getSchoolClassroomShow: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//edit classroom
export const schoolClassroomEditIndex = async () => {

    const { classroomEditForm } = useClassroomStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolEditClassroomUrl, classroomEditForm);
        console.log("schoolClassroomEditIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            getSchoolClassroom()
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("schoolClassroomEditIndex: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

// Delete classroom
export const deleteSchoolClassroom = async () => {

    const { classroomDeleteId } = useClassroomStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolDeleteClassroomUrl, { id: classroomDeleteId });
        console.log("deleteSchoolClassroom res.data:::: ", res?.data);

        if (res?.data?.success) {
            getSchoolClassroom();
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("deleteSchoolClassroom: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};