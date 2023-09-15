import create from "zustand";
import axios from "axios";
import useUtilityStore from "./UtilityStore";
import AxiosHeader from "../Utility/AxiosHeader";
import { Toastr } from "../Utility/UtilityFunctions";
import { kuAuthRegister, kuAuthVerify, kuForgetPassword, kuFpOtpVerify, kuResendOtp, kuResetPassword, userLoginUrl, userLogoutUrl, userVerifyUrl } from "../Utility/Url";
import { k_submit_otp_type } from "../Utility/const";
import { t } from "i18next";

const { setLoading, setLoggedUser } = useUtilityStore.getState();

const useAuthStore = create((set, get) => ({
  isLoggedIn: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),

  //login form
  login_form: { email: "", password: "", },
  changeLoginForm: (e) => set({ login_form: { ...get().login_form, [e.target.name]: e.target.value } }),
  resetLoginForm: () => set({ login_form: { email: "", password: "", } }),

  //register form
  register_form: {
    cvr: '',
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "school",
  },
  changeRegisterFormValue: (e) => set((state) => (state.register_form[e.target.name] = e.target.value)),
  resetRegisterForm: () => set({
    register_form:
    {
      cvr: "",
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "school",
    }
  }),

  submit_otp_type: k_submit_otp_type.auth_verify,
  setSubmitOtpType: (value) => set({ submit_otp_type: value }),

  forget_password_form: { new_password: "", confirm_password: "" },
  setForgetPasswordForm: (e) => set({ forget_password_form: { ...get().forget_password_form, [e.target.name]: e.target.value } }),
  resetForgetPasswordForm: () => set({ forget_password_form: { new_password: "", confirm_password: "" } }),

  // user profile from local storage
  user_profile: { name: "", email: "", phone: "", image: "" },
  changeUserProfileValue: (e) =>set((state) => (state.user_profile[e.target.name] = e.target.value)),

  // change password
  change_password_form: {
    old_password: "",
    password: "",
    password_confirmation: "",
  },
  changePasswordFormValue: (e) =>
    set((state) => (state.change_password_form[e.target.name] = e.target.value)),

  resetChangePasswordFormValue: () =>
    set(
      (state) =>
      (state.change_password_form = {
        old_password: "",
        password: "",
        password_confirmation: "",
      })
    ),

  // user profile from api
  user_profile_api_data: {},
  setUserProfileData: (value) =>set((state) => (state.user_profile_api_data = value)),

}));



// verify Auth User
export const verifyAuthUser = async () => {
  try {
    setLoading(true);
    const res = await axios.get(userVerifyUrl);
    console.log("verifyAuthUser : ", res.data);

    if (res?.data?.success) {
      const data = {
        name: res?.data?.data?.user_name,
        email: res?.data?.data?.email,
        moms: res?.data?.data?.moms,
        school_id: res?.data?.data?.user_table_id,
      }
      localStorage.setItem("user", JSON.stringify(data));

      console.log('role', res.data.data.role);
      useUtilityStore.getState().setRole(res?.data?.data?.role);
    } else {
      localStorage.setItem("user", "");
      localStorage.setItem("maway_token", "");
      useAuthStore.getState().setIsLoggedIn(false);
      Toastr({ message: res?.data?.message ?? 'An error occurred!', type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("verifyAuthUser: ", error);
    localStorage.setItem("user", "");
    localStorage.setItem("maway_token", "");
    useAuthStore.getState().setIsLoggedIn(false);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
  }
};

// User Login
export const handleUserLogin = async (navigateTo) => {
  try {
    setLoading(true);
    const { login_form, setIsLoggedIn, setSubmitOtpType, resetLoginForm, setUserProfileData } = useAuthStore.getState();
    console.log("login_form:::", login_form);

    const res = await axios.post(userLoginUrl, login_form);

    console.log("handleUserLogin res.data:::: ", res.data);

    if (res.data.success) {
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      setLoggedUser(res.data.data.user);
      setUserProfileData(res.data.data.user);
      localStorage.setItem("is_verified", res?.data?.data?.user?.is_verified);
      localStorage.setItem("maway_token", res.data.data.token);
      AxiosHeader(res.data.data.token);
      resetLoginForm();
      // verifyAuthUser();
      Toastr({ message: res.data.message, type: "success" });
      return res.data.data;
    } else {
      if (res.data?.data?.user && !res.data?.data?.user?.is_verified) {
        navigateTo('/otp-verification');
        sessionStorage.setItem('user_email', login_form?.email);
        setSubmitOtpType(k_submit_otp_type.auth_verify);
      }
      Toastr({ message: res.data.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log("handleUserLogin: ", error);
    Toastr({ message: t("An error occurred!"), type: "error" });
    setLoading(false);
  }
};

// register
export const register = async (navigateTo) => {
  try {
    const { register_form, setSubmitOtpType, resetRegisterForm } = useAuthStore.getState();

    setLoading(true);

    console.log('register form', register_form);

    const res = await axios.post(kuAuthRegister, register_form);

    console.log('register: ', res.data);

    if (res.data.success) {
      sessionStorage.setItem('maway_token', res?.data?.data?.token);
      AxiosHeader(res?.data?.data?.token);
      navigateTo('/otp-verification');
      sessionStorage.setItem('user_email', register_form?.email);
      setSubmitOtpType(k_submit_otp_type.auth_verify);
      resetRegisterForm();
      Toastr({ message: res.data.message, type: 'success' });
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
    }
    setLoading(false);
  } catch (error) {
    console.log('register: ', error);
    setLoading(false);
    Toastr({ message: t("An error occurred!"), type: "error" });
  }
};

//submit OPT
export const submitOtp = async (otp, navigateTo, email) => {
  const { submit_otp_type } = useAuthStore.getState();
  try {
    if (!email) {
      Toastr({ message: 'Session Expired!' });
      navigateTo('/login');
      return;
    }
    setLoading(true);
    let body = {};
    if (submit_otp_type === k_submit_otp_type.forget_password) {
      body = { email: email, otp: otp, forget: true }
    } else {
      body = { email: email, otp: otp }
    }
    console.log('email', email);
    const res = await axios.post(submit_otp_type === k_submit_otp_type.auth_verify ? kuAuthVerify : kuFpOtpVerify, body);
    console.log("submitOtp: ", res.data);

    if (res?.data?.success) {
      if (submit_otp_type === k_submit_otp_type.auth_verify) {
        navigateTo('/login');
        Toastr({ message: 'OTP verified, please login to continue.', type: 'success' });
      } else {
        sessionStorage.setItem('forget_password_token', res?.data?.data?.token);
        navigateTo('/set-new-password');
        Toastr({ message: res.data.message, type: 'success' });
      }
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
    }
    setLoading(false)
  } catch (err) {
    console.log('submitOtp: ', err);
    setLoading(false)
    Toastr({ message: t("An error occurred!"), type: "error" });
  }
}

//Resend OPT
export const resendOtp = async (email, navigateTo) => {
  try {
    if (!email) {
      Toastr({ message: 'Session Expired!' });
      navigateTo('/login');
      return false;
    }

    setLoading(true);
    const res = await axios.post(kuResendOtp, { email: email, is_web: 1 });
    console.log('resendOtp: response', res.data);

    if (res.data.success) {
      setLoading(false);
      Toastr({ message: res.data.message, type: 'success' });
      return true
    } else {
      setLoading(false);
      console.log('resendOtp: failed' + res.data.message);
      Toastr({ message: res?.data?.message, type: "error" });
      return false;
    }
  } catch (err) {
    setLoading(false);
    console.log('resendOtp: error' + err);
    Toastr({ message: t("An error occurred!"), type: "error" });
    return false;
  }
};

//forget Password
export const forgetPassword = async (email, navigateTo) => {
  const { setSubmitOtpType } = useAuthStore.getState();
  try {
    setLoading(true);

    const res = await axios.post(kuForgetPassword,{ email: email, forget: true });

    console.log('forgetPassword:', res.data);

    if (res.data.success) {
      sessionStorage.setItem('user_email', email);
      navigateTo('/otp-verification');
      setSubmitOtpType(k_submit_otp_type.forget_password);
      Toastr({ message: res.data.message, type: 'success' });
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
      console.log('forgetPassword:' + res.data.message);
    }
    setLoading(false);
  } catch (err) {
    setLoading(false);
    console.log('forgetPassword: ', err);
    Toastr({ message: t("An error occurred!"), type: "error" });
  }
};

// change Password
export const changePassword = async (navigateTo, token, email, password, confirm_password) => {
  const { resetForgetPasswordForm } = useAuthStore.getState();
  try {
    setLoading(true);

    const res = await axios.post(kuResetPassword,
      {
        token: token,
        email: email,
        password: password,
        password_confirmation: confirm_password,
      }
    );

    console.log('changePassword: ', res?.data);

    if (res.data.success) {
      navigateTo('/login');
      Toastr({ message: res.data.message, type: 'success' });
      resetForgetPasswordForm();
      setLoading(false);
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
      console.log('changePassword: ' + res.data.message);
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    console.log('changePassword: ' + err);
    Toastr({ message: t("An error occurred!"), type: "error" });
  }
};

// Logout
export const handleUserLogout = async () => {
  const { setIsLoggedIn } = useAuthStore.getState()
  setLoading(true)
  try {
    const res = await axios.post(userLogoutUrl);
    if (res?.data?.success) {
      localStorage.setItem("user", "");
      localStorage.setItem("maway_token", "");
      AxiosHeader(null);
      setIsLoggedIn(false);
    } else {
      Toastr({ message: res?.data?.message, type: "error" });
    }
    setLoading(false)
  } catch (error) {
    Toastr({ message: t("An error occurred!"), type: "error" });
    setIsLoggedIn(false);
    setLoading(false)
    console.log("Logout error", error);
  }
};

export default useAuthStore;