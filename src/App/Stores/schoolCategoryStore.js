import axios from "axios";
import create from "zustand";
import useUtilityStore from "./UtilityStore";
import { Toastr } from "../Utility/UtilityFunctions";
import { t } from "i18next";

import {
    schoolCategoryLessonShowUrl,
    schoolCategoryListUrl,
    schoolCategoryListShowUrl,
    schoolCategoryLessonUrl,
    schoolCategoryToggleUrl,
    schoolCategoryAddLessonUrl,
    schoolCategoryEditLessonUrl,
    schoolCategoryDeleteLessonUrl,
    schoolCategoryLessonUpdateIndexUrl,
    schoolCategoryEditUrl,
    schoolCategoryPackageUrl,
    schoolCategoryPackageAddUrl,
    schoolCategoryPackageEditUrl,
    schoolCategoryPackageDeleteUrl,
    packageToggleStatusUrl
} from "../Utility/Url";

const { setLoading, setLoadingSearch } = useUtilityStore.getState();

const useSchoolCategoryStore = create((set) => ({

    schoolCategoryListAll: [],
    setSchoolCategoryListAll: (value) => set({ schoolCategoryListAll: value }),

    schoolCategoryTampList: [],
    setSchoolCategoryTampList: (value) => set({ schoolCategoryTampList: value }),

    schoolCategoryDetails: {},
    setSchoolCategoryDetails: (value) => set({ schoolCategoryDetails: value }),

    schoolCategoryLessonList: [],
    setSchoolCategoryLessonList: (value) => set({ schoolCategoryLessonList: value }),

    category_take: 10,
    setCategory_take: (value) => set({ category_take: value }),

    lessonsAddFromData: {
        school_category_id: "",
        name: "",
        type: "",
        price: "",
        lesson_duration_id: "",
        duration: "00:00",
        description: "",
        requirements: "",
        is_mandatory: true,
        is_moms: ""
    },
    setLessonsAddFromData: (value) => set({ lessonsAddFromData: value }),

    lessonsEditFromData: {
        school_category_id: "",
        id: "",
        name: "",
        type: "",
        price: "",
        lesson_duration_id: "",
        duration: "00:00",
        description: "",
        requirement: "",
        // is_mandatory: true,
        is_moms: false
    },
    setLessonsEditFromData: (value) => set({ lessonsEditFromData: value }),

    schoolCategoryLessonDetails: {},
    setSchoolCategoryLessonDetails: (value) => set({ schoolCategoryLessonDetails: value }),

    schoolCategoryLessonDeleteId: null,
    setSchoolCategoryLessonDeleteId: (value) => set({ schoolCategoryLessonDeleteId: value }),

    schoolCategoryPageUrl: "",
    setSchoolCategoryPageUrl: (value) => set({ schoolCategoryPageUrl: value }),

    schoolCategorySearchKey: "",
    setSchoolCategorySearchKey: (value) => set({ schoolCategorySearchKey: value }),

    categoryEditForm: {
        id: "",
        price: "",
        description: "",
        requirement: ""
    },
    setCategoryEditForm: (value) => set({ categoryEditForm: value }),

    categoryPackageList: [],
    setCategoryPackageList: (value) => set({ categoryPackageList: value }),

    addPackageForm: {
        school_category_id: "",
        title: "",
        capacity:"",
        description: "",
        price: 0,
        duration: 0,
        lessons: []
    },
    setAddPackageForm: (value) => set({ addPackageForm: value }),

    resetAddPackageForm: () => set({
        addPackageForm: {
            school_category_id: "",
            title: "",
            stock:"",
            description: "",
            price: 0,
            duration: 0,
            lessons: []
        }
    }),

    editPackageForm: {
        id: "",
        school_category_id: "",
        title: "",
        stock:"",
        description: "",
        price: 0,
        duration: 0,
        lessons: []
    },
    setEditPackageForm: (value) => set({ editPackageForm: value }),
    resetEditPackageForm: () => set({
        editPackageForm: {
            id: "",
            school_category_id: "",
            title: "",
            stock:"",
            description: "",
            price: 0,
            duration: 0,
            lessons: []
        }
    }),

    packageDetails: {},
    setPackageDetails: (value) => set({ packageDetails: value }),

    package_overview_take: 10,
    setPackage_overview_take: (value) => set({ package_overview_take: value }),

    package_overview_search: "",
    setPackage_overview_search: (value) => set({ package_overview_search: value }),

    //All Modal

    showSchoolCategoryListDeactivateModal: false,
    setShowSchoolCategoryListDeactivateModal: (value) => set({ showSchoolCategoryListDeactivateModal: value }),

    showAddCategoryListLessonModal: false,
    setShowAddCategoryListLessonModal: (value) => set({ showAddCategoryListLessonModal: value }),

    showEditCategoryListLessonModal: false,
    setShowEditCategoryListLessonModal: (value) => set({ showEditCategoryListLessonModal: value }),

    showDeleteCategoryListLessonModal: false,
    setShowDeleteCategoryListLessonModal: (value) => set({ showDeleteCategoryListLessonModal: value }),

    showEditSchoolCategoryDetailsModal: false,
    setShowEditSchoolCategoryDetailsModal: (value) => set({ showEditSchoolCategoryDetailsModal: value }),

    showAddPackageModal: false,
    setShowAddPackageModal: (value) => set({ showAddPackageModal: value }),

    showEditPackageModal: false,
    setShowEditPackageModal: (value) => set({ showEditPackageModal: value }),

    showDeletePackageModal: false,
    setShowDeletePackageModal: (value) => set({ showDeletePackageModal: value }),

    showPackageDeActivateModal: false,
    setShowPackageDeActivateModal: (value) => set({ showPackageDeActivateModal: value }),

    packageActivateId: null,
    setPackageActivateId: (value) => set({ packageActivateId: value }),

}));

export default useSchoolCategoryStore;

//get category
export const schoolCategoryIndex = async (url = "") => {

    const { category_take, setSchoolCategoryListAll, setSchoolCategoryTampList } = useSchoolCategoryStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(url === "" ? schoolCategoryListUrl : url, { take: 100, is_web: true });
        console.log("schoolCategoryIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            setSchoolCategoryListAll(res?.data?.data);
            setSchoolCategoryTampList(res?.data?.data)
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("schoolCategoryIndex: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

export const getSchoolCategoryDetails = async (id) => {

    const { setSchoolCategoryDetails } = useSchoolCategoryStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryListShowUrl, { id: id });
        console.log("getSchoolCategoryDetails res.data:::: ", res?.data);

        if (res?.data?.success) {
            await setSchoolCategoryDetails(res?.data?.data);
            if (res?.data?.data?.id) {
                await getSchoolCategoryLessonIndex(res?.data?.data?.id)
            }
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getSchoolCategoryDetails: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

// get lessons
export const getSchoolCategoryLessonIndex = async (category_id) => {
    const { setSchoolCategoryLessonList } = useSchoolCategoryStore.getState();
    try {
        // setLoading(true);
        const res = await axios.post(schoolCategoryLessonUrl, { school_category_id: category_id });
        console.log("getSchoolCategoryLessonIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            await setSchoolCategoryLessonList(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        // setLoading(false);
    } catch (error) {
        console.log("getSchoolCategoryLessonIndex: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        // setLoading(false);
        return false;
    }
};

// category toggle
export const schoolCategoryToggleIndex = async (id) => {

    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryToggleUrl, { id: id });
        console.log("schoolCategoryToggleIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            await getSchoolCategoryDetails(res?.data?.data?.id);
            setLoading(false);
            return true;

        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }

    } catch (error) {
        console.log("schoolCategoryToggleIndex: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//add lesson
export const addLessonFn = async (category_id) => {

    const { lessonsAddFromData } = useSchoolCategoryStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryAddLessonUrl, lessonsAddFromData);
        console.log("addLessonFn res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            await getSchoolCategoryLessonIndex(category_id);
            await schoolCategoryPackageIndex(category_id,"","",false);
            await getSchoolCategoryDetails(category_id);
            setLoading(false);
            return true;

        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }

    } catch (error) {
        console.log("addLessonFn: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};


export const getSchoolCategoryLessonShow = async (id) => {
    const { setSchoolCategoryLessonDetails } = useSchoolCategoryStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryLessonShowUrl, { id: id });
        console.log("addSchoolCategoryLesson res.data:::: ", res?.data);

        if (res?.data?.success) {
            await setSchoolCategoryLessonDetails(res?.data?.data);

        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("addSchoolCategoryLesson: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

export const editLessonFn = async (category_id) => {
    const { lessonsEditFromData } = useSchoolCategoryStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryEditLessonUrl, lessonsEditFromData);
        console.log("editLessonFn res.data:::: ", res?.data);

        if (res?.data?.success) {
            await getSchoolCategoryLessonIndex(category_id);
            await schoolCategoryPackageIndex(category_id,"","",false);
            await getSchoolCategoryDetails(category_id);
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("editLessonFn: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

export const deleteLessonFn = async (category_id) => {
    const { schoolCategoryLessonDeleteId } = useSchoolCategoryStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryDeleteLessonUrl, { id: schoolCategoryLessonDeleteId });
        console.log("deleteLessonFn res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            await getSchoolCategoryLessonIndex(category_id);
            await schoolCategoryPackageIndex(category_id,"","",false);
            await getSchoolCategoryDetails(category_id);
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("deleteLessonFn : ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};


export const schoolCategoryLessonUpdateIndex = async (data, category_id) => {

    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryLessonUpdateIndexUrl, { order: data });
        console.log("deleteSchoolCategoryLesson res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            await getSchoolCategoryDetails(category_id);
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("deleteSchoolCategoryLesson: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

// Search Category
export const searchSchoolCategoryList = async (event) => {

    const { schoolCategoryTampList, setSchoolCategoryListAll } = useSchoolCategoryStore.getState();

    console.log("schoolCategoryTampList", schoolCategoryTampList)
    const result = await schoolCategoryTampList?.data?.filter((item) => {
        if (item) {
            let name = "";
            name = item.category_name ?? "";
            if (name.toLowerCase().includes(event.toLowerCase())) {
                return item;
            } else {
                return null;
            }
        } else {
            return null;
        }
    });
    console.log("search result: ", result);
    const data = { data: result }
    await setSchoolCategoryListAll(data);
};

// category edit
export const schoolCategoryEdit = async () => {

    const { categoryEditForm } = useSchoolCategoryStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryEditUrl, categoryEditForm);
        console.log("schoolCategoryEdit res.data:::: ", res?.data);

        if (res?.data?.success) {
            await getSchoolCategoryDetails(res?.data?.data?.id);
            setLoading(false);
            return true;

        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }

    } catch (error) {
        console.log("schoolCategoryEdit: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

export const schoolCategoryPackageIndex = async (id, url = "", search = "",isLoading=true) => {

    const { setCategoryPackageList, package_overview_take } = useSchoolCategoryStore.getState();

    try {
        if (search === "") if(isLoading)setLoading(true); else setLoadingSearch(true)
        let body = {}
        if (search === "") { body = { school_category_id: id, take: package_overview_take } }
        else { body = { school_category_id: id, search: search, take: package_overview_take } }
        const res = await axios.get(url === "" ? schoolCategoryPackageUrl : url, { params: body });
        console.log("schoolCategoryPackageIndex res.data:::: ", res?.data);

        if (res?.data?.success) {
            await setCategoryPackageList(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") if(isLoading) setLoading(false); else setLoadingSearch(false)
    } catch (error) {
        console.log("schoolCategoryPackageIndex: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") if(isLoading) setLoading(false); else setLoadingSearch(false)
        return false;
    }
};


export const addSchoolCategoryPackage = async () => {

    const { addPackageForm } = useSchoolCategoryStore.getState();

    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryPackageAddUrl, addPackageForm);
        console.log("addSchoolCategoryPackage res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            await schoolCategoryPackageIndex(addPackageForm?.school_category_id);
            setLoading(false);
            return true;

        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }

    } catch (error) {
        console.log("addSchoolCategoryPackage :: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};


export const editSchoolCategoryPackage = async () => {

    const { editPackageForm } = useSchoolCategoryStore.getState();

    console.log("editPackageForm", editPackageForm)

    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryPackageEditUrl, editPackageForm);
        console.log(" editSchoolCategoryPackage res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            await schoolCategoryPackageIndex(editPackageForm?.school_category_id);
            setLoading(false);
            return true;

        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }

    } catch (error) {
        console.log("editSchoolCategoryPackage :: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

export const deleteSchoolCategoryPackage = async (id, school_category_id) => {

    try {
        setLoading(true);
        const res = await axios.post(schoolCategoryPackageDeleteUrl, { id: id });
        console.log("deleteSchoolCategoryPackage res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            await schoolCategoryPackageIndex(school_category_id);
            setLoading(false);
            return true;

        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }

    } catch (error) {
        console.log("deleteSchoolCategoryPackage :: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};


export const packageToggleStatusIndex = async (id, school_category_id) => {

    try {
        setLoading(true);
        const res = await axios.post(packageToggleStatusUrl, { id: id });
        console.log("packageToggleStatus res.data:::: ", res?.data);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            await schoolCategoryPackageIndex(school_category_id);
            setLoading(false);
            return true;

        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }

    } catch (error) {
        console.log("packageToggleStatus :: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};
