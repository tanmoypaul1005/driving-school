// ! React Toastify
import {
    toast
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLayoutStore from '../App/Stores/LayoutStore';
import { k_role } from '../App/Utility/const';
import SchoolSideBarList from '../Components/Layout/SidebarItemArrays/SchoolSideBarList';
import useSettingsStore from '../App/Stores/SettingsStore';
import moment from 'moment/moment';
// toast.configure()

export const setAppSidebarList = (user_role) => {

    const { setSidebarItemsList } = useLayoutStore.getState();
    setSidebarItemsList([...SchoolSideBarList]);
}

export const Toastr = (msg, type = 'error') => {
    // toast.error(msg, { autoClose: 2000, position: "top-center"});
    toast.error(msg, {
        position: "bottom-right",
        autoClose: 2000,
        type: type,
        theme: "dark",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}


export const ToastrLoading = (msg = "Please wait...", action = 'start', type = 'success', the_toastr) => {
    const options = {
        position: "bottom-right",
        autoClose: 2000,
        type: type,
        theme: "dark",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        // progress: undefined,
    }

    if (action === 'start') {
        return toast.loading(msg, options)
    } else if (action === 'stop') {
        toast.update(the_toastr, {
            render: msg,
            type: type,
            isLoading: false,
            ...options
        });
    }
}


// export const formatDate = (date, withTime = false) => {
//     const {app_lang_code} = useSettingsStore.getState();
//     if (!date) return null;
//     const months = [];
//     months["en"] = [
//         ". Jan",
//         ". Feb",
//         ". Mar",
//         ". Apr",
//         ". May",
//         ". Jun",
//         ". Jul",
//         ". Aug",
//         ". Sep",
//         ". Oct",
//         ". Nov",
//         ". Dec",
//     ];
//     months["da"] = [
//         ". jan.",
//         ". feb.",
//         ". mar.",
//         ". apr.",
//         ". maj",
//         ". jun.",
//         ". jul.",
//         ". aug.",
//         ". sept.",
//         ". okt.",
//         ". nov.",
//         ". dec.",
//     ];
//     const targetDate = new Date(date);
//     const hours = targetDate.getHours();
//     const minutes = targetDate.getMinutes();

//     if (withTime)
//         return `${new Date(date).getDate()}${months[app_lang_code][new Date(date).getMonth()]} ${new Date(date).getFullYear()}, ${hours}:${minutes}`;
//     else
//         return `${new Date(date).getDate() < 10 ? '0' + new Date(date).getDate() : new Date(date).getDate()}${months[app_lang_code][new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;
// };


export const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}


export const calculateDate = (end_date, start_date) => {
    const date1 = new Date(
        new Date(start_date).toLocaleString('en-US', {
            timeZone: 'Europe/Berlin',
        }));
    const date2 = new Date(
        new Date(end_date).toLocaleString('en-US', {
            timeZone: 'Europe/Berlin',
        }));
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export const PageTitle = (newTitle) => {
    return (document.title = newTitle);
};

export const CalculateMonthsYears = (days) => {
    let month = 0;
    let year = 0;
    if (days < 365) {
        month = Math.round(days / 30);
        return {
            month: month,
            year: year,
        };
    } else {
        year = days / 365;
        year = parseInt(year);
        days = (days - (year * 365));
        month = parseInt(days / 30)
        return {
            month: month,
            year: year,
        };
    }
};


export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


export const DistanceIntoKM = (meterValue) => {
    return (meterValue / 1000).toFixed(1);
};

export const TimeIntoHours = (secondValue) => {
    return (secondValue / 3600).toFixed(1);
};

export const formatDateOrTime = (dateTime, type) => {
    let date = new Date(
        new Date(dateTime).toLocaleString('en-US', {
            timeZone: 'Europe/Berlin',
        }));

    if (type === "date") {
        return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}. ${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
            }. ${date.getFullYear()}`;
    } else {
        //return time
        // let currentHours = date.getHours();
        // currentHours = ("0" + currentHours).slice(-2);
        return `${date.getHours() < 10 && '0' + date.getHours() ||
            date.getHours() > 10
            && date.getHours() || date.getHours() <= 10 &&
            date.getHours()}:${date.getMinutes() < 10 && '0' + date.getMinutes() ||
            date.getMinutes() > 10 && date.getMinutes() || date.getMinutes() <= 10
            && date.getMinutes()}`;
    }
};

export const timeDiffHours = (dt2, dt1, startDate) => {
    //create date format
    var timeStart = new Date(
        new Date(startDate + "T" + dt1).toLocaleString('en-US', {
            timeZone: 'Europe/Berlin',
        }));
    var timeEnd = new Date(
        new Date(startDate + "T" + dt2).toLocaleString('en-US', {
            timeZone: 'Europe/Berlin',
        }));

    var diff = (timeEnd - timeStart) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
};


export const extractDate = (date) => {
    const t_date = new Date(date);
    let month = (t_date.getMonth() + 1)
    if (month < 10) month = "0" + month.toString();

    let day = (t_date.getDate());
    if (day < 10) day = "0" + day.toString();
    // return t_date;
    return t_date.getFullYear() + "-" + month + "-" + day;
}


export const incrementDate = (date, numberOfDays) => {
    date = extractDate(date);
    const new_date = new Date(date);
    new_date.setDate(new_date.getDate() + numberOfDays);
    return extractDate(new_date);
}


export const differenceInDaysDate = (endDate) => {
    const startDate = new Date(
        new Date().toLocaleString('en-US', {
            timeZone: 'Europe/Berlin',
        }));
    // endDate = extractDate(endDate)

    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return Math.round(differenceInDays) ?? 0;
    return differenceInDays ?? false;
}

export const htmlToPlainText = (html) => {

    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
}

export const getFormatStringFromDays = (numberOfDays) => {
    var years = Math.floor(numberOfDays / 365);
    var months = Math.floor(numberOfDays % 365 / 30);
    var days = Math.floor(numberOfDays % 365 % 30);

    var yearsDisplay = years > 0 ? years + (years === 1 ? " year " : " years") : "";
    var monthsDisplay = months > 0 ? months + (months === 1 ? " month" : " months ") : "";
    var daysDisplay = days > 0 ? days + (days === 1 ? " day" : " days") : "";
    return yearsDisplay + monthsDisplay + daysDisplay;
}

export const checkValidEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


export const valueCheck = (value) => {
    return value === "null" ||
        value === null ? '' :
        value
}

export const NACheck = (value) => {
    return value === "null" ||
        value === null ? 'NA' :
        value
}



export const MinToHour = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    // add leading zeros if necessary
    let formattedHours = hours < 10 ? "0" + hours : hours.toString();
    let formattedMinutes = remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes.toString();
    return formattedHours + ":" + formattedMinutes;
}

export const HourToMin = (str) => {
    var parts = str?.split(":");
    var minutes = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    return minutes // 257 (four hours and seventeen minutes)
}

export function timeToMinutes(timeString) {
    const [hours, minutes] = timeString?.split(':').map(Number);
    const totalMinutes = (hours * 60) + minutes;
    return totalMinutes;
}

export const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            item,
        };
    }, initialValue);
};


//   export const arraysEqual=(arr1, arr2)=> {
//     if (arr1.length !== arr2.length) return false;
//     for (let i = 0; i < arr1.length; i++) {
//         if (arr1[i] !== arr2[i]) return false;
//     }
//     return true;
// }


export const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) {
            return false;
        }
    }
    return true;
}



export const percentageCalculate = (partialValue, totalValue) => {
    return Math.round((parseInt(totalValue) * parseInt(partialValue)) / 100);
}

export const setAppRole = (role = k_role.school) => {
    if (role === k_role.admin) localStorage.setItem('maway_role', k_role.admin);
    else localStorage.setItem('maway_role', k_role.school);
}

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}


export const numberWithCommas = (number) => {
    return number.toLocaleString().replace(/\,/g, ".");
};

export function getFirstDateOfMonth(date) {
    const formattedDate = date?.toLocaleDateString('en-GB').split('/');
    return `${formattedDate[0]}-${formattedDate[1]}-${formattedDate[2]}`;
}

export const dateFormatRowTo = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}
