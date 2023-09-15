import axios from "axios";
import create from "zustand";
import i18next from "i18next";
import { t } from "i18next";
import {
  allFaqListUrl,
  schoolBankInfoUrl,
  schoolChangePasswordUrl,
  schoolContactUsUrl,
  schoolFaqsUrl,
  schoolLanguageIndexUrl,
  schoolLanguageSetUrl,
  schoolTermsConditionsUrl,
  settingsChangePasswordUrl,
  schoolAddBankInfoUrl,
  schoolPolicyUrl,
  schoolPolicyEditUrl,
  schoolPaymentInfoUrl
} from "../Utility/Url";
import { Toastr } from "../Utility/UtilityFunctions";
import useUtilityStore from "./UtilityStore";
import { k_role } from "../Utility/const";
const { setLoading } = useUtilityStore.getState();
const { role } = useUtilityStore.getState();

const useSettingsStore = create((set) => ({

  appLanguage: [
    { langName: "English", code: "en" },
    { langName: "Danish", code: "da" },
  ],
  setAppLanguage: (value) => set({ appLanguage: value }),

  schoolContactUsForm: { subject: "", message: "" },
  setSchoolContactUsForm: (value) => set({ schoolContactUsForm: value }),

  schoolTermsAndConditionData: {},
  setSchoolTermsAndConditionData: (value) => set({ schoolTermsAndConditionData: value }),

  faqListAll: [],
  setFaqListAll: (value) => set({ faqListAll: value }),

  faqDetail: [],
  setFaqDetails: (value) => set({ faqDetail: value }),

  schoolTermsConditionList: {},
  setSchoolTermsConditionList: (value) => set({ schoolTermsConditionList: value }),

  bankInfo: {},
  setBankInfo: (value) => set({ bankInfo: value }),

  paymentInfo: {},
  setPaymentInfo: (value) => set({ paymentInfo: value }),

  addBankInfoForm: {
    bank_name: "",
    account_name: "",
    account_number: "",
    reg_no: ""
  },
  setAddBankInfoForm: (value) => set({ addBankInfoForm: value }),


  // Modals
  showAddDeleteMessage: false,
  setShowAddDeleteMessage: (value) => set({ showAddDeleteMessage: value }),

  showEditDeleteMessage: false,
  setShowEditDeleteMessage: (value) => set({ showEditDeleteMessage: value }),

  showAddFaqModal: false,
  setShowAddFaqModal: (value) => set({ showAddFaqModal: value }),

  showEditFaqModal: false,
  setShowEditFaqModal: (value) => set({ showEditFaqModal: value }),

  showAddBankInfoModal: false,
  setShowAddBankInfoModal: (value) => set({ showAddBankInfoModal: value }),

  showEditBankInfoModal: false,
  setShowEditBankInfoModal: (value) => set({ showEditBankInfoModal: value }),

  changePasswordForm: {
    old_password: "",
    password: "",
    password_confirmation: "",
  },

}));

export default useSettingsStore;

//get list FAQ
export const getFaqList = async () => {
  const { setFaqListAll } = useSettingsStore.getState();
  const admin_role = localStorage.getItem('maway_role')
  try {
    setLoading(true);
    const res = await axios.get(admin_role === k_role.admin ? allFaqListUrl : schoolFaqsUrl);
    console.log("getFaqList res.data:::: ", res);

    if (res?.data?.success) {
      setFaqListAll(admin_role === k_role.admin ? res?.data?.data : res?.data);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("getFaqList: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};

//change Password
export const changePassword = async (body) => {

  try {
    setLoading(true);
    const res = await axios.post(role === k_role.admin ? settingsChangePasswordUrl : schoolChangePasswordUrl, body);
    console.log("changePassword res.data:::: ", res);

    if (res?.data?.success) {
      Toastr({ message: res.data.message, type: "success" });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
      setLoading(false);
      return false;
    }

  } catch (error) {
    console.log("changePassword: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};


//get School TermsCondition List
export const getTermsConditions = async () => {
  const { setSchoolTermsConditionList } = useSettingsStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(schoolTermsConditionsUrl);
    console.log("getTermsConditions res.data:::: ", res.data);

    if (res?.data?.success) {
      setSchoolTermsConditionList(res?.data?.data);
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("getTermsConditions: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};


//send School Contact Us
export const sendSchoolContactUs = async () => {
  const { schoolContactUsForm } = useSettingsStore.getState();
  try {
    setLoading(true);
    const res = await axios.post(schoolContactUsUrl, schoolContactUsForm);
    console.log("sendSchoolContactUs res.data:::: ", res.data);

    if (res?.data?.success) {
      Toastr({ message: res?.data?.message, type: "success" });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
      setLoading(false);
      return true;
    };
  } catch (error) {
    console.log("sendSchoolContactUs: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};


//school Language Index
export const schoolLanguageIndex = async () => {
  const { setAppLanguage } = useSettingsStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(schoolLanguageIndexUrl);
    console.log("schoolLanguageIndex res.data:::: ", res?.data);

    if (res?.data?.success) {
      setAppLanguage(res?.data?.data);
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("schoolLanguageIndex: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};

//school Language Set
export const schoolLanguageSet = async (id, lang_code = 'en') => {
  try {
    setLoading(true);
    const res = await axios.post(schoolLanguageSetUrl, { id: id });
    console.log("schoolLanguageIndex res.data:::: ", res?.data);

    if (res?.data?.success) {
      Toastr({ message: res?.data?.message, type: "success" });
      i18next.changeLanguage(lang_code);
      localStorage.setItem("lang_code", lang_code);
      schoolLanguageIndex();
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("schoolLanguageIndex: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};

//school Bank Information
export const getBankInfo = async () => {
  const { setBankInfo } = useSettingsStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(schoolBankInfoUrl);
    console.log("getBankInfo res.data:::: ", res?.data);

    if (res?.data?.success) {
      setBankInfo(res?.data?.data);
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("getBankInfo: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
     setLoading(false);
    return false;
  }
};

//get paymentInfo
export const getPaymentInfo = async () => {
  const { setPaymentInfo } = useSettingsStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(schoolPaymentInfoUrl);
    console.log("getPaymentInfo res.data:::: ", res?.data);

    if (res?.data?.success) {
      setPaymentInfo(res?.data?.data);
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("getPaymentInfo: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
     setLoading(false);
    return false;
  }
};


//school Bank Information
export const addSchoolBankInfo = async () => {
  const { addBankInfoForm } = useSettingsStore.getState();
  try {
    setLoading(true);
    const res = await axios.post(schoolAddBankInfoUrl, addBankInfoForm);
    console.log("addSchoolBankInfo res.data:::: ", res?.data);

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
    console.log("addSchoolBankInfo: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};


//School Terms And Condition
export const getSchoolPolicy = async () => {
  const { setSchoolTermsAndConditionData } = useSettingsStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(schoolPolicyUrl);
    console.log("getSchoolPolicy res.data:::: ", res?.data);

    if (res?.data?.success) {
      setSchoolTermsAndConditionData(res?.data?.data);
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("getSchoolPolicy: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};

//edit School Terms And Condition
export const editSchoolPolicy = async (body) => {

  try {
    setLoading(true);
    const res = await axios.post(schoolPolicyEditUrl, body);
    console.log("getSchoolPolicy res.data:::: ", res?.data);

    if (res?.data?.success) {
      await getSchoolPolicy();
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log("getSchoolPolicy: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
    return false;
  }
};