import axios from "axios";
import create from "zustand";
import i18next, { t } from "i18next";
import useUtilityStore from "./UtilityStore";
import { Toastr } from "../Utility/UtilityFunctions";
import { schoolAddLicenseUrl, schoolDashboardUrl, schoolDeleteMessageUrl, schoolDeleteUrl, schoolGetLicenseUrl, schoolProfileEditUrl } from "../Utility/Url";
const { setLoading } = useUtilityStore.getState();

const useProfileStore = create((set) => ({

    schoolDashboardDetails: {},
    setSchoolDashboardDetails: (value) => set({ schoolDashboardDetails: value }),

    editFormData: {
        school_name: "",
        cvr: "",
        address: "",
        website: "",
        phone_number: "",
        contact_mail: "",
        cover: "",
        l_description: "",
        zip: "",
        city: "",
    },
    setEditFormData: (value) => set({ editFormData: value }),
    setEditForm: (name, value) => set((state) => (state.editFormData[name] = value)), //todo:: update state as object format

    schoolLicenseOverview: false,
    setSchoolLicenseOverview: (value) => set({ schoolLicenseOverview: value }),

    selectedLicense: null,
    setSelectedLicense: (value) => set({ selectedLicense: value }),

    licenseOverViewDetails: {},
    setLicenseOverViewDetails: (value) => set({ licenseOverViewDetails: value }),

    licenseStatus: false,
    setLicenseStatus: (value) => set({ licenseStatus: value }),

    deleteMessageText: {},
    setDeleteMessageText: (value) => set({ deleteMessageText: value }),

    //All Modal

    showEditProfileModal: false,
    setShowEditProfileModal: (value) => set({ showEditProfileModal: value }),

    showLicenseDetailsModal: false,
    setShowLicenseDetailsModal: (value) => set({ showLicenseDetailsModal: value }),

    showDeleteAccountModal: false,
    setShowDeleteAccountModal: (value) => set({ showDeleteAccountModal: value }),

    showLicenseOverViewDetailsModal: false,
    setShowLicenseOverViewDetailsModal: (value) => set({ showLicenseOverViewDetailsModal: value }),

}));

export default useProfileStore;

// school Dashboard
export const getSchoolDashboard = async (loading = true) => {
    const { setSchoolDashboardDetails } = useProfileStore.getState();
    try {
            if (loading) setLoading(true);
            const res = await axios.get(schoolDashboardUrl);
            //console.log("getSchoolDashboard res.data:::: ", res);

            if (res?.data?.success) {
                await setSchoolDashboardDetails(res?.data?.data);
                await i18next.changeLanguage(res?.data?.data?.language?.langCode);
                localStorage.setItem("lang_code", res?.data?.data?.language?.langCode);
                await setLoading(false)
            } else {
                // Toastr({ message: res?.data?.message, type: "error" });
                await setLoading(false)
            }
            setLoading(false)
    } catch (error) {
        console.log("getSchoolDashboard: ", error);
        // Toastr({ message: t("An error occurred!"), type: "error" });
        await setLoading(false)
        return false;
    }
};

//school Profile Edit
export const schoolProfileEdit = async () => { // todo:: body is not used in here, remove it.
    const { editFormData } = useProfileStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolProfileEditUrl, editFormData);
        console.log("getSchoolDashboard res.data:::: ", res);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            getSchoolDashboard();
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
            setLoading(false);
            return false;
        }
    } catch (error) {
        console.log("getSchoolDashboard: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//School Get License
export const getSchoolGetLicense = async () => {
    const { setSchoolLicenseOverview } = useProfileStore.getState();
    try {
        setLoading(true);
        const res = await axios.get(schoolGetLicenseUrl);
        console.log("getSchoolGetLisences res.data:::: ", res);

        if (res?.data?.success) {
            setSchoolLicenseOverview(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getSchoolGetLisences: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//add License
export const addSchoolAddLicense = async (id, comment = "") => {

    const body = { lisence_id: id, comment: comment }
    try {
        setLoading(true);
        const res = await axios.post(schoolAddLicenseUrl, body);
        console.log("getSchoolGetLicense res.data:::: ", res);

        if (res?.data?.success) {
            Toastr({ message: res?.data?.message, type: "success" });
            await getSchoolGetLicense()
            getSchoolDashboard(false)
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getSchoolGetLicense: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//School Delete Message
export const getSchoolDeleteMessage = async (id, comment = "") => {
    const { setDeleteMessageText } = useProfileStore.getState();
    try {
        setLoading(true);
        const res = await axios.get(schoolDeleteMessageUrl, {});
        console.log("getSchoolDeleteMessage res.data:::: ", res);

        if (res?.data?.success) {
            setDeleteMessageText(res?.data?.data);
            setLoading(false);
        } else {
            setLoading(false);
        }
    } catch (error) {
        console.log("getSchoolDeleteMessage: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};

//school Delete Index
export const schoolDeleteIndex = async () => {
    const { setDeleteMessageText } = useProfileStore.getState();
    try {
        setLoading(true);
        const res = await axios.post(schoolDeleteUrl);
        console.log("schoolDeleteIndex res.data:::: ", res);

        if (res?.data?.success) {
            Toastr({ message: res.data.message, type: "error" });
            setDeleteMessageText(res?.data?.data);
            setLoading(false);
            return true;
        } else {
            Toastr({ message: res.data.message, type: "error" });
            setLoading(false);
            return false;
        }

    } catch (error) {
        console.log("schoolDeleteIndex: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};
