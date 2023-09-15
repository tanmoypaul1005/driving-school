/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import AxiosHeader from "./App/Utility/AxiosHeader";
import Layout from "./Components/Layout/Layout";
import LoadingModal from "./Components/Modal/LoadingModal";
import Error404 from "./Components/Others/Error404";
import Login from "./Pages/auth/Login";
import LoginScreen from "./Pages/auth/LoginScreen";
import Test from "./Pages/Test/Test";
import { useEffect, useState } from "react";
import useAuthStore, { verifyAuthUser } from "./App/Stores/authStore";
import ProtectedRoute from "./App/Utility/ProtectedRoute";
import SplashScreen from "./Components/Layout/SplashScreen";
import useUtilityStore from "./App/Stores/UtilityStore";
import InvoiceParent from "./Pages/invoice/InvoiceParent";
import SettingsParent from "./Pages/settings/SettingsParent";
import { setAppSidebarList } from "./Utility/UtilityFunctions";
import Contact from "./Pages/settings/Components/Contact";
import Classes from "./Pages/classes/Classes";
import LicenseOverview from "./Pages/profile/components/LicenseOverview";
import Classroom from "./Pages/classroom/Classroom";
import Notification from "./Pages/notification/Notification";
import NewInvoice from "./Pages/invoice/NewInvoice";
import BankInformation from "./Pages/settings/Components/BankInformation";
import SchoolChangePassword from "./Pages/settings/Components/SchoolChangePassword";
import FaqManagement from "./Pages/settings/Components/FaqManagement";
import Student from "./Pages/student/Student";
import InstructorParent from "./Pages/Instructor/InstructorParent";
import SchoolInstructor from "./Pages/Instructor/SchoolInstructor";
import InstructorInvoice from "./Pages/Instructor/components/InstructorInvoice";
import InstructorClassRoom from "./Pages/Instructor/components/InstructorClassRoom";
import InstructorDriving from "./Pages/Instructor/components/InstructorDriving";
import InstructorExternal from "./Pages/Instructor/components/InstructorExternal";
import StudentProfile from "./Pages/student/components/StudentProfile";
import NewInvoiceDetails from "./Pages/invoice/NewInvoiceDetails";
import Register from "./Pages/auth/Register";
import OtpVerification from "./Pages/auth/OtpVerification";
import ForgotPassword from "./Pages/auth/ForgetPassword";
import CreateNewPassword from "./Pages/auth/CreateNewPassword";
import BalanceHistory from "./Pages/student/components/BalanceHistory";
import LanguageChange from "./Pages/settings/Components/LanguageChange";
import TermsAndCondition from "./Pages/settings/Components/TermsAndCondition";
import SchoolTermsAndCondition from "./Pages/settings/Components/SchoolTermsAndCondition";
import SchoolProfile from "./Pages/profile/SchoolProfile";
import Category from "./Pages/category/Category";
import CategoryDetails from "./Pages/category/components/CategoryDetails";
import StudentParent from "./Pages/student/StudentParent";
import Dashboard from "./Pages/dashboard/Dashboard";
import ClassListView from "./Pages/classes/components/ClassListView";
import CalendarView from "./Pages/classes/components/CalendarView";
import Profile from "./Pages/settings/Components/Profile";
import ScheduleCalender from "./Pages/Instructor/components/newInstructor/ScheduleCalender";
import PendingRequests from "./Pages/Instructor/components/newInstructor/PendingRequests";


if (localStorage.maway_token) {
  AxiosHeader(localStorage.maway_token);
} else {
  if (localStorage.postcard_token) {
    AxiosHeader(localStorage.maway_token);
  } else {
    AxiosHeader(null);
  }
} function App(props) {
  const { setIsLoggedIn } = useAuthStore();
  const { loggedUser, setLoggedUser } = useUtilityStore();
  const [loading, setLoading] = useState(true);
  const { role } = useUtilityStore();

  const navigateTo = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("maway_token")
    if (token) {
      setIsLoggedIn(true);
      verifyIfRealUser();
      // navigateTo("/");
    } else {
      setIsLoggedIn(false);
      const path = window.location.pathname;
      if (path === '/login' || path === '/admin/login' || path === '/register' || path === '/otp-verification' || '/forgot-password') {
      } else {
        navigateTo("/login");
      }
    }

  }, []);

  const verifyIfRealUser = async () => {
    await verifyAuthUser();
  }

  useEffect(() => {

    if (loggedUser?.name === "") {
      let local_data = "";
      local_data = localStorage.getItem("user");
      local_data && setLoggedUser(JSON.parse(local_data));
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setAppSidebarList(role)
  }, [role])


  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <div className="bg-cLayoutBg text-cTextBlack">
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Slide}
            theme="dark"
            limit={2}
          />

          <LoadingModal />

          <Routes>
            {/* red 404 not found */}
            <Route exact path="/*">
              <Route
                path="*"
                element={
                  <Layout>
                    <Error404 />
                  </Layout>
                }
              />
            </Route>


            {/* red: auth */}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/otp-verification" element={<OtpVerification />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route exact path="/set-new-password" element={<CreateNewPassword />} />

            <Route exact path="/" element={<ProtectedRoute />}>

              {/* blue: dashboard */}
              <Route
                exact
                path="/"
                element={
                  <Layout {...props}>
                    <Dashboard />
                  </Layout>
                }
              >
              </Route>

              {/********************** license Start ***********************/}

              <Route
                exact
                path="/license/overview"
                element={
                  <Layout>
                    <LicenseOverview />
                  </Layout>
                }
              >
              </Route>

              {/**********************  license End ***********************/}


              {/********************** Invoice Start ***********************/}
              <Route
                exact
                path="/invoice"
                element={
                  <Layout {...props}>
                    <InvoiceParent />
                  </Layout>
                }
              >
                <Route index element={<NewInvoice />} />
                <Route path="details/:invoice_id" element={<NewInvoiceDetails />} />
                <Route path="details/:invoice_id/:invoice_type" element={<NewInvoiceDetails />} />

              </Route>
              {/********************** Invoice End ***********************/}



              {/********************** Settings Start ***********************/}
              <Route
                exact
                path="/settings"
                element={
                  <Layout {...props}>
                    <SettingsParent />
                  </Layout>
                }
              >
                <Route index element={<Profile />} />
                <Route path="faq" element={<FaqManagement />} />
                <Route path="bank-information" element={<BankInformation />} />
                <Route path="contact-us" element={<Contact />} />
                <Route path="change-password" element={<SchoolChangePassword />} />
                <Route path="language-change" element={<LanguageChange />} />
                <Route path="terms-condition" element={<TermsAndCondition />} />
                <Route path="school/terms-condition" element={<SchoolTermsAndCondition />} />

              </Route>
              {/********************** Settings End ***********************/}



              <Route
                exact
                path="/play"
                element={
                  <Layout>
                    <Test />
                  </Layout>
                }
              >
              </Route>
            </Route>

            <Route
              exact
              path="/classes/list"
              element={
                <Layout>
                  <ClassListView />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/classes/calendar"
              element={
                <Layout>
                  <CalendarView />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/school/category-list"
              element={
                <Layout>
                  <Category />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/classroom"
              element={
                <Layout>
                  <Classroom />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/school/category-list/details/:category_id"
              element={
                <Layout>
                  <CategoryDetails />
                </Layout>
              }
            ></Route>

            <Route
              exact
              path="/notification"
              element={
                <Layout>
                  <Notification />
                </Layout>
              }
            ></Route>

            {/********************** School Student start ***********************/}
            <Route
              exact
              path="/school-student"
              element={
                <Layout {...props}>
                  <StudentParent />
                </Layout>
              }
            >
              <Route index element={<Student />} />
              <Route path="details/:school_student_id" element={<><StudentProfile /></>} />
              <Route path="details/:school_student_id/balance-history" element={<><BalanceHistory /></>} />☻
            </Route>

            {/********************** School Student End ***********************/}


            {/********************** School Instructor start ***********************/}
            <Route
              exact
              path="/school-instructor"
              element={
                <Layout {...props}>
                  <InstructorParent />
                </Layout>
              }
            >
              <Route index element={<SchoolInstructor />} />
              <Route path="details/:school_instructor_id/invoice" element={<InstructorInvoice />} />
              <Route path="details/:school_instructor_id/schedule" element={<ScheduleCalender/>} />
              <Route path="details/:school_instructor_id/pending_requests" element={<PendingRequests/>} />
              <Route path="details/:school_instructor_id/classroom" element={<InstructorClassRoom />} />
              <Route path="details/:school_instructor_id/driving" element={<InstructorDriving />} />
              <Route path="details/:school_instructor_id/external" element={<InstructorExternal />} />
              {/* <Route index element={<SchoolInstructor />} />
              <Route path="details/:school_instructor_id/invoice" element={<InstructorInvoice />} />
              <Route path="details/:school_instructor_id/classroom" element={<InstructorClassRoom />} />
              <Route path="details/:school_instructor_id/driving" element={<InstructorDriving />} />
              <Route path="details/:school_instructor_id/external" element={<InstructorExternal />} /> */}
            </Route>

            {/********************** School Instructor End ***********************/}

            {/* blue: testing */}
            <Route exact path="/login2" element={<LoginScreen />}></Route>
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;


export const PrivateRoute = ({
  token,
  redirectPath = '/',
  children,
}) => {
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};