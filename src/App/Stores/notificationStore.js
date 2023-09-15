import axios from "axios";
import create from "zustand";
import { t } from "i18next";
import useUtilityStore from "./UtilityStore";
import { Toastr } from "../Utility/UtilityFunctions";
import { notificationIndexUrl, notificationShowUrl } from "../Utility/Url";
const { setLoading } = useUtilityStore.getState();
const { setLoadingSearch } = useUtilityStore.getState();

const useNotificationStore = create((set) => ({

    notificationList: [],
    setNotificationList: (value) => set({ notificationList: value }),

    notificationDetails: {},
    setNotificationDetails: (value) => set({ notificationDetails: value }),

    selectNotification: null,
    setSelectNotification: (value) => set({ selectNotification: value }),

    notificationSearch: "",
    setNotificationSearch: (value) => set({ notificationSearch: value }),

    notification_take: 10,
    setNotification_take: (value) => set({ notification_take: value }),

    notification_page_url: "",
    setNotification_page_url: (value) => set({ notification_page_url: value }),

    //All Modal
    showNotificationAlertModal: false,
    setShowNotificationAlertModal: (value) => set({ showNotificationAlertModal: value }),

    showNotificationDetailsModal: false,
    setShowNotificationDetailsModal: (value) => set({ showNotificationDetailsModal: value }),

}));

export default useNotificationStore;


//Get Notification
export const getNotification = async (url = "", search = "") => {

    const { notification_take, setNotificationList } = useNotificationStore.getState();

    let body = { take: notification_take, order_by: "id", is_asc: 0 }
    if (search === "") {
        body = { take: notification_take, order_by: "id", is_asc: 0 }
    } else {
        body = { take: notification_take, order_by: "id", is_asc: 0, search: search }
    }

    try {
        if (search === "") { setLoading(true); } else { setLoadingSearch(true) }
        const res = await axios.get(url === "" ? notificationIndexUrl : url,
            { params: body });
        console.log("getNotification res.data:::: ", res?.data);

        if (res?.data?.success) {
            await setNotificationList(res?.data?.data);
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") { setLoading(false); } else { setLoadingSearch(false) }
    } catch (error) {
        console.log("getNotification: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") { setLoading(false); } else { setLoadingSearch(false) }
        return false;
    }
};


//Get Notification Details
export const getNotificationDetails = async (id) => {

    const { setNotificationDetails,notificationSearch,notification_page_url } = useNotificationStore.getState();

    console.log("notification_page_url",notification_page_url)

    try {
        setLoading(true);
        const res = await axios.get(notificationShowUrl, { params: { id: id } });
        console.log("getNotificationDetails res.data:::: ", res?.data);

        if (res?.data?.success) {
            setNotificationDetails(res?.data?.data);
            getNotification(notification_page_url,notificationSearch)
        } else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getNotificationDetails: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};
