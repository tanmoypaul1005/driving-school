import axios from "axios";
import { t } from "i18next";
import create from "zustand";
import { dashboardUrl, incomeChartUrl } from "../Utility/Url";
import { Toastr } from "../../Utility/UtilityFunctions";
import useUtilityStore from "./UtilityStore";
const { setLoading, setLoadingSearch } = useUtilityStore.getState();

const useDashboardStore = create((set) => ({

    dashboardDetails: {},
    setDashboardDetails: (value) => set({ dashboardDetails: value }),

    pending_booking_take: 10,
    setPending_booking_take: (value) => set({ pending_booking_take: value }),

    pending_booking_search: "",
    setPending_booking_search: (value) => set({ pending_booking_search: value }),

    incomeChartData: {},
    setIncomeChartData: (value) => set({ incomeChartData: value }),

    chart_week_data: [
        {
            "name": "Sun",
            "uv": 0,
            "pv": 0,
        },
        {
            "name": "Mon",
            "uv": 0,
            "pv": 0,
            "amt": 100
        },
        {
            "name": "Tue",
            "uv": 0,
            "pv": 0,
            "amt": 500
        },
        {
            "name": "Wed",
            "uv": 0,
            "pv": 0,
            "amt": 100
        },
        {
            "name": "Thu",
            "uv":0,
            "pv": 0,
            "amt": 200
        },
        {
            "name": "Fri",
            "uv": 0,
            "pv": 0,
            "amt": 500
        },
        {
            "name": "Sat",
            "uv": 0,
            "pv": 0,
            "amt": 100
        },
    ],

    chart_value: 'weekly',
    setChart_value: (value) => set({ chart_value: value }),

    pendingBookingLessonsUpdate: false,
    setPendingBookingLessonsUpdate: (value) => set({ pendingBookingLessonsUpdate: value }),

    pendingBookingLessonsUrl: "",
    setPendingBookingLessonsUrl: (value) => set({ pendingBookingLessonsUrl: value }),

}));

export default useDashboardStore;

//Get Dashboard
export const getDashboard = async (url = "", search = "") => {

    const { setDashboardDetails, pending_booking_take } = useDashboardStore.getState();

    let body = {};
    if (search === "") body = { take: pending_booking_take }
    else body = { take: pending_booking_take, search: search }

    try {
        if (search === "") setLoading(true); else setLoadingSearch(true)
        const res = await axios.get(url === "" ? dashboardUrl : url, { params: body });
        console.log("getDashboard res.data:::: ", res?.data);

        if (res?.data?.success) { setDashboardDetails(res?.data?.data); }
        else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        if (search === "") setLoading(false); else setLoadingSearch(false);
    } catch (error) {
        console.log("getDashboard: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        if (search === "") setLoading(false); else setLoadingSearch(false)
        return false;
    }
};

//Get Income Chart
export const getIncomeChart = async (filter_type="weekly") => {

    const { setIncomeChartData} = useDashboardStore.getState();

    try {
        setLoading(true);
        const res = await axios.get(incomeChartUrl, { params: { filter_type: filter_type } });
        console.log("getIncomeChart res.data:::: ", res?.data);

        if (res?.data?.success) { setIncomeChartData(res?.data?.data); }
        else {
            Toastr({ message: res?.data?.message, type: "error" });
        }
        setLoading(false);
    } catch (error) {
        console.log("getIncomeChart: ", error);
        Toastr({ message: t("An error occurred!"), type: "error" });
        setLoading(false);
        return false;
    }
};


