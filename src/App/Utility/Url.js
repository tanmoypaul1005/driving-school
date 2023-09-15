// export const BaseUrlSrc = "https://dev-api.maway.dk/";
export const BaseUrlSrc = "https://api.maway.dk/";
// export const BaseUrlSrc = "https://stg.maway.dk/";
// export const BaseUrlSrc = "http://192.168.0.210:8001/";

const BaseUrl = BaseUrlSrc + "api/v1.1";
export const BaseUrlSchool = BaseUrlSrc + "api/v1";
export default BaseUrl;
const version = "v1.1.1";

export const userLoginUrl = "/auth/login";
export const userVerifyUrl = "/auth/user";
export const userLogoutUrl = "/auth/logout";
export const kuAuthRegister = "/auth/register";
export const kuResendOtp = "/auth/resend-otp";
export const kuAuthVerify = "/auth/verify";
export const kuFpOtpVerify = "/auth/forgot-password-otp-verify";
export const kuForgetPassword = "/auth/forgot-password";
export const kuResetPassword = "/auth/reset-password";

//dashboard
export const dashboardUrl = "/school/web/dashboard";
export const incomeChartUrl = "/school/web/income-chart";

// invoice new
export const newInvoiceIndexUrl = "/school/invoice/filter-invoice";
export const newInvoiceDetailsUrl = "/school/invoice/show";
export const newSystemInvoiceStatusUpdateUrl = "/school/invoice/system-generated/status-change";
export const newInvoiceDetailsStatusUpdateUrl = "/school/invoice/status-change";
export const newInstructorInvoiceStatusUpdateUrl = "/school/invoice/ins_pay/pay";
export const newInstructorInvoiceStatusRejectUrl = "/school/invoice/ins_pay/reject";
export const newSchoolAdminPaymentUrl = "/common/invoice/pay";
export const newSchoolAdminCancelUrl = "/common/invoice/cancel";
export const commonInvoiceReminderUrl = "/remind";
export const commonInvoiceContactAdminUrl = "/remind";
export const balanceInvoiceUrl = "/school/invoice/balance-list";
export const invoicePayoutUrl = "/school/invoice/generate-freepay-order";
export const schoolInvoiceIndexUrl = "/admin/school/invoice/filter";

export const getInvoiceIndexUrl = "/admin/invoices/license_purchase/index";
export const getSystemGenInvoiceIndexUrl = "/admin/invoices/system-generated/index";
export const getSystemGenInvoiceDetailsUrl = "/admin/invoices/system-generated/show";
export const getInvoiceDetailsUrl = "/admin/invoices/license_purchase/show";
export const changeInvoiceStatusUrl = "admin/invoices/license_purchase/status-change";
export const changeSystemInvoiceStatusUrl = "/admin/invoices/system-generated/status-change";
export const shareInvoiceDetailsUrl = "/share";
export const secondaryInvoiceDetailsUrl = "/admin/school/invoice/show";


//Dashboard
export const schoolDashboardUrl = "/school/dashboard";
export const schoolProfileEditUrl = "/school/profile/update";
export const schoolGetLicenseUrl = "/common/lisence/get-lisences";
export const schoolDeleteMessageUrl = "/common/delete-msg";
export const schoolDeleteUrl = "/school/delete";

// category
export const schoolCategoryListUrl = "/school/school-category/index";
export const schoolCategoryListShowUrl = "/school/school-category/show";
export const schoolCategoryLessonUrl = "/school/lesson/index";
export const schoolCategoryToggleUrl = "/school/school-category/status-toggle";
export const schoolCategoryAddLessonUrl = "/school/lesson/create";
export const schoolCategoryLessonShowUrl = "/school/lesson/show";
export const schoolCategoryEditLessonUrl = "/school/lesson/update";
export const schoolCategoryDeleteLessonUrl = "/school/lesson/delete";
export const schoolCategoryLessonUpdateIndexUrl = "school/lesson/update-index";
export const schoolCategoryEditUrl = "/school/school-category/update";
export const schoolCategoryPackageUrl = "/school/school-category/package/index";
export const schoolCategoryPackageAddUrl = "/school/school-category/package/add";
export const schoolCategoryPackageEditUrl = "/school/school-category/package/update";
export const schoolCategoryPackageDeleteUrl = "/school/school-category/package/delete";
export const packageToggleStatusUrl = "/school/school-category/package/toggle-status";


//classRoom
export const schoolClassroomUrl = "/school/classroom/index";
export const schoolCreateClassroomUrl = "/school/classroom/create";
export const schoolShowClassroomUrl = "/school/classroom/show";
export const schoolEditClassroomUrl = "/school/classroom/update";
export const schoolDeleteClassroomUrl = "/school/classroom/delete";


//class
export const schoolClassListUrl = `/school/class/${version}/index`;
export const schoolClassAddUrl = `/school/class/${version}/add`;
export const schoolClassAddInfoUrl = `/school/class/${version}/add/index`;
export const schoolClassDetailsUrl = `/school/class/${version}/show`;
export const schoolClassEditUrl = `/school/class/${version}/edit`;
export const schoolClassDeleteUrl = `/school/class/${version}/delete`;
export const schoolClassCancelUrl = "/school/class/cancel";
export const classWebCalenderUrl = `/school/class/${version}/web/calender/index`;

//add License
export const schoolAddLicenseUrl = "/common/purchase-lisence/add";

//Notification
export const notificationIndexUrl = "/common/web/notification/index";
export const notificationShowUrl = "/common/notification/show";

//school-student
export const schoolStudentIndexUrl = "/school/student/web/index";
export const schoolStudentShowUrl = "/school/student/web/show";
export const schoolStudentInvoiceUrl = "/school/invoice/filter-invoice";
export const schoolStudentCurriculumUrl = "/school/student/web/curriculum";
export const schoolStudentCurriculumShowUrl = "/school/student/web/curriculum/show";
export const schoolStudentInvoiceShowUrl = "/school/invoice/show";
export const schoolStudentBalanceHistoryUrl = "/school/student/web/balance/history";
export const schoolStudentBalanceHistoryShowUrl = "/school/student/web/balance/history/show";
export const schoolStudentBalancePayUrl = "/school/student/balance/pay";
export const schoolStudentBalanceRefundUrl = "/school/student/balance/refund";
export const schoolStudentAdmissionInvoiceUrl = "/school/invoice/get-admission-invoice";
export const schoolStudentInvoiceStatusChangeUrl = "/school/invoice/status-change";
export const schoolStudentInviteStudentUrl = "/school/student/web/invite-student";
export const shareCurriculumUrl = "/share";


//school-instructor
export const schoolInstructorIndexUrl = "/school/instructor/web/index";
export const schoolInstructorDetailsUrl = "/school/instructor/web/show";
export const schoolInstructorRejectUrl = "/school/instructor/reject";
export const schoolInstructorAcceptUrl = "/school/instructor/accept";
export const schoolInstructorsRemoveUrl = "/school/instructor/remove";
export const schoolInstructorsLessonUrl = "/school/instructor/lesson-filter";
export const schoolInstructorsLessonDetailsUrl = "/school/instructor/lesson-details";
export const schoolInstructorsInvoiceFilterUrl = "/school/invoice/filter-invoice";
export const schoolInstructorsAdditionalInfoUrl = "/school/instructor/additional-info";
export const instructorsPendingLessonsUrl = "/school/instructor/web/pending-lessons";
export const activeCategoriesUrl = "/school/instructor/web/get-active-categories";
export const instructorUpdateUrl = "/school/instructor/web/update";
export const instructorScheduleUrl = "/school/instructor/web/schedule/home-page";
export const instructorCheckAvailabilityUrl = "/school/instructor/web/schedule/check-schedule";
export const instructorScheduleAddUrl = "/school/instructor/web/schedule/add";
export const instructorScheduleCheckUrl = "/school/instructor/web/schedule/check-schedule";
export const instructorScheduleDetailsUrl = "/school/instructor/web/schedule/details";
export const instructorScheduleEditUrl = "/school/instructor/web/schedule/update";
export const instructorPendingDrivingActionUrl = "/school/instructor/web/pending-driving-action";
export const instructorPendingExternalActionUrl = "/school/instructor/web/pending-external-action";


// bank
export const adminSchoolBankInfoUrl = "/admin/school/bank-info/get-info";

//Settings
export const schoolContactUsUrl = "/common/contact-us/send";
export const schoolFaqsUrl = "/common/faqs";
export const schoolTermsConditionsUrl = "/common/terms-conditions";
export const schoolLanguageIndexUrl = "/language/index";
export const schoolLanguageSetUrl = "/language/set";
export const schoolChangePasswordUrl = "/school/profile/change-password";
export const schoolPaymentInfoUrl = "school/payment-info/get-info";
export const schoolBankInfoUrl = "/school/bank-info/get-info";
export const schoolAddBankInfoUrl = "/school/bank-info/add-bank";
export const schoolPolicyUrl = "/school/school-policy/get-info";
export const schoolPolicyEditUrl = "/school/school-policy/update-policy";
export const allFaqListUrl = "/admin/faq/filter";
export const allTermsConditionUrl = "/admin/terms-conditions/index";
export const settingsChangePasswordUrl = "/admin/profile/change-password";
