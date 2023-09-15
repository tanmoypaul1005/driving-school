import { t } from "i18next";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PageTitle = (newTitle) => {
  return (document.title = t("MaWay") + " | " + newTitle);
};

export const Toastr = ({ message = "", type = "error" }) => {
  toast(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: type,
  });
};

export const formatDate = (date, withTime = false) => {
const app_lang_code=localStorage.getItem("lang_code");
  if (!date) return null;
  const months = [];
  months["en"] = [
    ". Jan.",
    ". Feb.",
    ". Mar.",
    ". Apr.",
    ". May.",
    ". Jun.",
    ". Jul.",
    ". Aug.",
    ". Sep.",
    ". Oct.",
    ". Nov.",
    ". Dec.",
  ];
  months["da"] = [
    ". jan.",
    ". feb.",
    ". mar.",
    ". apr.",
    ". maj.",
    ". jun.",
    ". jul.",
    ". aug.",
    ". sept.",
    ". okt.",
    ". nov.",
    ". dec.",
  ];
  const targetDate = new Date(date);
  const hours = targetDate.getHours();
  const minutes = targetDate.getMinutes();

  if (withTime)
    return `${new Date(date).getDate()}${months[app_lang_code?app_lang_code:'en'][new Date(date).getMonth()]} ${new Date(date).getFullYear()}, ${hours}:${minutes}`;
  else
    return `${new Date(date).getDate() < 10 ? '0' + new Date(date).getDate() : 
    new Date(date).getDate()}${months[app_lang_code?app_lang_code:'en'][new Date(date).getMonth()]}
     ${new Date(date).getFullYear()}`;

};

export const formatDateOrTime = (dateTime, type) => {
  const date = new Date(
    new Date(dateTime).toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
    }));
  if (type === "date") {
    return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}. ${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
      }. ${date.getFullYear()}`;
  } else {
    //return time
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
};

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};

export const dateDifference = (date) => {
  const date1 = new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
    }));
  const date2 = new Date(
    new Date(date).toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
    }));
  const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
  const DifferenceDay = Math.abs(diffDays)
  const value2 = DifferenceDay === 0 ? 'Today' : Math.abs(diffDays)
  return value2
};

export const dateDifference2 = (startDate, endDate) => {
  const date1 = new Date(
    new Date(startDate).toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
    }));
  const date2 = new Date(
    new Date(endDate).toLocaleString('en-US', {
      timeZone: 'Europe/Berlin',
    }));
  const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
  return Math.abs(diffDays);
};

export const isLettersOnly = (string) => {
  return /^[a-zA-Z]+$/.test(string);
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


export const getFormatedStringFromDays = (numberOfDays) => {
  var years = Math.floor(numberOfDays / 365);
  var months = Math.floor(numberOfDays % 365 / 30);
  var days = Math.floor(numberOfDays % 365 % 30);

  var yearsDisplay = years > 0 ? years + (years === 1 ? " year " : " years ") : "";
  var monthsDisplay = months > 0 ? months + (months === 1 ? " month " : " months ") : "";
  var daysDisplay = days > 0 ? days + (days === 1 ? " day" : " days") : "0 days";
  return yearsDisplay + monthsDisplay + daysDisplay;
}

export const smartFormattedDateDiff = (startDateInput = "", endDateInput) => {

  if (startDateInput === "") startDateInput = new Date(startDateInput);
  else startDateInput = new Date();
  endDateInput = new Date(endDateInput);

  startDateInput.setHours(0, 0, 0, 0);
  // console.log("startDateInput::::", startDateInput);
  endDateInput.setHours(0, 0, 0, 0);
  // console.log("endDateInput::::", endDateInput);

  let dateTimeToFormat = endDateInput.getTime() - startDateInput.getTime();

  if (dateTimeToFormat < 0) dateTimeToFormat = dateTimeToFormat * (-1);
  // if (dateTimeToFormat < 0) return "0 Hours 0 Minutes ";

  const diffDuration = moment.duration(dateTimeToFormat);

  // console.log("diffDuration ::::::", diffDuration, "\n\n dateTimeToFormat", dateTimeToFormat); 

  let yearString = diffDuration.years() > 1 ? " Years" : " Year";
  let monthString = diffDuration.months() > 1 ? " Months" : " Month";
  let dayString = diffDuration.days() > 1 ? " Days" : " Day";
  let hourString = diffDuration.hours() > 1 ? " Hours" : " Hour";
  let minuteString = diffDuration.minutes() > 1 ? " Minutes" : " Minute";

  // if (diffDuration.years() > 0) {
  //   if (diffDuration.months() === 0) return diffDuration.years() + yearString + ", " + diffDuration.days() + dayString + ", " + diffDuration.hours() + hourString + ", " + diffDuration.minutes() + minuteString;
  //   else return diffDuration.years() + yearString + ", " + diffDuration.months() + monthString + ", " + diffDuration.days() + dayString + ", " + diffDuration.hours() + hourString + ", " + diffDuration.minutes() + minuteString;
  // }

  // if (diffDuration.years() === 0 && diffDuration.months() > 0) return diffDuration.months() + monthString + ", " + diffDuration.days() + dayString + ", " + diffDuration.hours() + hourString + ", " + diffDuration.minutes() + minuteString;
  // if (diffDuration.years() === 0 && diffDuration.months() === 0 && diffDuration.days() > 0) return diffDuration.days() + dayString + ", " + diffDuration.hours() + hourString + ", " + diffDuration.minutes() + minuteString;
  // if (diffDuration.years() === 0 && diffDuration.months() === 0 && diffDuration.days() === 0) return diffDuration.hours() + hourString + ", " + diffDuration.minutes() + minuteString;

  return "00 [NEW VERSION NEEDED] ";

}
export const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${padTo2Digits(hours)}.${padTo2Digits(minutes)} hr`;
}
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export const dateDiffCalendar = (startingDateInput, endingDateInput, lastAction = false) => {

  if (lastAction) startingDateInput = startingDateInput.setDate(startingDateInput.getDate() + 1);

  let startingDate = new Date(startingDateInput).setHours(0, 0, 0, 0);


  let endingDate = new Date(endingDateInput).setHours(0, 0, 0, 0);

  let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
  if (!endingDate) {
    endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
  }
  let endDate = new Date(endingDate);
  if (startDate > endDate) {
    const swap = startDate;
    startDate = endDate;
    endDate = swap;
  }
  const startYear = startDate.getFullYear();
  const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
  const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let yearDiff = endDate.getFullYear() - startYear;
  let monthDiff = endDate.getMonth() - startDate.getMonth();
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }
  let dayDiff = endDate.getDate() - startDate.getDate();
  if (dayDiff < 0) {
    if (monthDiff > 0) {
      monthDiff--;
    } else {
      yearDiff--;
      monthDiff = 11;
    }
    dayDiff += daysInMonth[startDate.getMonth()];
  }

  let yearString = yearDiff > 1 ? " years " : " year ";
  let monthString = monthDiff > 1 ? " months " : " month ";
  let dayString = dayDiff > 1 ? " days" : " day";

  return (yearDiff ? (yearDiff + yearString) : "") + (monthDiff ? (monthDiff + monthString) : "") + (dayDiff ? (dayDiff + dayString) : '0 day ');
}

export const calculateEndDateCalendar = (months, startDate = new Date()) => {
  let date = new Date(startDate);

  date.setHours(0, 0, 0, 0);
  date.setMonth(date.getMonth() + months)
  date.setDate(date.getDate() - 1);

  return date;
}

export const roughLicenseDurationFormatter = (days = 0) => {


  let monthCounter = parseInt(days / 30);
  let yearCounter = 0;


  if (monthCounter > 11) {
    yearCounter = parseInt(monthCounter / 12);
    monthCounter = parseInt(monthCounter - (12 * yearCounter));
  }
  //console.log("roughLicenseDurationFormatter::: monthCounter: " + monthCounter + " yearCounter: " + yearCounter);

  let yearString = yearCounter > 1 ? " Years " : " Year ";
  let monthString = monthCounter > 1 ? " Months " : " Month ";

  return (yearCounter ? (yearCounter + yearString) : "") + (monthCounter ? (monthCounter + monthString) : "");

}

export function isNullDirty(value) {
  if (value === null || value === undefined || value === "" || value === "null") return true;
  else return false;
}

// auto remove empty items from an object
export function removeEmpty(obj) {
  for (let prop in obj) {
    if (!obj[prop] || obj[prop]?.length === 0) {
      delete obj[prop];
    }
  }
  return obj;
}

// auto check how many percentage of a number is changed:
export function calculatePercentage(oldValue, newValue) {
  return ((((newValue - oldValue) / oldValue) * 100));
}

// function to convert price into denmark format
export function formatDkkPrice(price) {
  price = parseInt(price);
  return price.toLocaleString("da-DK");
}


export function changeValueByPercentage(originalValue, percentageChange) {
  if (percentageChange === 100) return originalValue;
  return (originalValue * (1 + percentageChange / 100)).toFixed(2);

}

export function LogDanger(message, value) {
  console.log('%c' + message, 'background: #f40e44; color: #ffffff; font-weight: bold; padding:15px; border-radius: 1500px', value);
}

export function LogToDo(message, value) {
  console.log('%c' + message, 'background: #f4ef4b; color: #000000; font-weight: bold; padding:15px; border-radius: 1500px', value);
}

export function LogSuccess(message, value) {
  console.log('%c' + message, 'background: #47ff90; color: #000000; font-weight: bold; padding:15px; border-radius: 1500px', value);
}

export function LogWarning(message, value) {
  console.log('%c' + message, 'background: #FC4C02; color: #ffffff; font-weight: bold; padding:15px; border-radius: 1500px', value);
}

