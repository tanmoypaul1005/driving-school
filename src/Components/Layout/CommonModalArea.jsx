import React from "react";
import LogoutModal from "./component/LogoutModal";
import useLayoutStore from "../../App/Stores/LayoutStore";
import { handleUserLogout } from "../../App/Stores/authStore";
import ImagePreviewPopup from "../Image/ImagePreviewPopup";
import AddClassModal from "../../Pages/classes/modal/AddClassModal";
import EditClassModal from "../../Pages/classes/modal/EditClassModal";
import EditProfile from "../../Pages/profile/modal/EditProfile";
import LicenseDetails from "../../Pages/profile/modal/LicenseDetails";
import CategoryDeactivateModal from "../../Pages/category/modal/CategoryDeactivateModal";
import AddClassroomModal from "../../Pages/classroom/modal/AddClassroomModal";
import EditClassroomModal from "../../Pages/classroom/modal/EditClassroomModal";
import DeleteClassroomModal from "../../Pages/classroom/modal/DeleteClassroomModal";
import DeleteLessonModal from "../../Pages/category/modal/DeleteLessonModal";
import DeleteClassModal from "../../Pages/classes/modal/DeleteClassModal";
import AddBankInfoModal from "../../Pages/settings/modal/AddBankInfoModal";
import ClassDetailsModal from "../../Pages/classes/modal/ClassDetailsModal";
import CancelClassNoteModal from "../../Pages/classes/modal/CancelClassNoteModal";
import AcceptNoteModal from "../../Pages/Instructor/modal/AcceptNoteModal";
import RejectionReasonModal from "../../Pages/Instructor/modal/RejectionReasonModal";
import InstructorRemoveModal from "../../Pages/Instructor/modal/InstructorRemoveModal";
import InstructorRequestDetailsModal from "../../Pages/Instructor/modal/InstructorRequestDetailsModal";
import SchoolStudentInvoiceModal from "../../Pages/student/modal/SchoolStudentInvoiceModal";
import LessonDetailsModal from "../../Pages/Instructor/modal/LessonDetailsModal";
import InvoicePaymentDetailsModal from "../../Pages/invoice/modal/InvoicePaymentDetailsModal";
import UpdatePrice from "../../Pages/student/modal/UpdatePrice";
import RefundModal from "../../Pages/student/modal/RefundModal";
import InvoiceLessonListModal from "../../Pages/invoice/modal/InvoiceLessonListModal";
import InstructorInvoiceMakePaymentModal from "../../Pages/invoice/modal/InstructorInvoiceMakePaymentModal";
import AdminInvoiceMakePaymentModal from "../../Pages/invoice/modal/AdminInvoiceMakePaymentModal";
import InstructorInvoiceRejectNote from "../../Pages/invoice/modal/InstructorInvoiceRejectNote";
import NewInvoiceShareModal from "../../Pages/invoice/modal/NewInvoiceShareModal";
import AdminInvoiceCancelNote from "../../Pages/invoice/modal/AdminInvoiceCancelNote";
import InvoiceDetailsLessonList from "../../Pages/invoice/modal/InvoiceDetailsLessonList";
import CurriculumDetailsModal from "../../Pages/student/modal/CurriculumDetailsModal";
import TransactionDetailsModal from "../../Pages/student/modal/TransactionDetailsModal";
import PayModal from "../../Pages/student/modal/PayModal";
import AdminToSchoolPayModal from "../../Pages/invoice/modal/AdminToSchoolPayModal";
import SchoolAcceptNoteToSystem from "../../Pages/invoice/modal/SchoolAcceptNoteToSystem";
import NotificationDetailsModal from "../../Pages/notification/modal/NotificationDetailsModal";
import LicenseOverViewDetails from "../../Pages/profile/modal/LicenseOverViewDetails";
import PayoutModal from "../../Pages/invoice/modal/PayoutModal";
import DeleteAccountModal from "../../Pages/profile/modal/DeleteAccountModal";
import InvoiceUpdatePrice from "../../Pages/invoice/modal/InvoiceUpdatePrice";
import InvoiceAcceptNote from "../../Pages/invoice/modal/InvoiceAcceptNote";
import InvoiceRejectNote from "../../Pages/invoice/modal/InvoiceRejectNote";
import InvoiceFilterModal from "../../Pages/invoice/modal/InvoiceFilterModal";
import DeActivatePackageModal from "../../Pages/category/modal/DeActivatePackageModal";
import BankInfoEditModal from "../../Pages/settings/modal/BankInfoEditModal";
import AddLessonModal from "../../Pages/category/modal/AddLessonModal";
import EditLessonModal from "../../Pages/category/modal/EditLessonModal";
import EditDetailsModal from "../../Pages/category/modal/EditDetailsModal";
import AddStudentModal from "../../Pages/student/modal/AddStudentModal";
import StudentAttachmentsModal from "../../Pages/student/modal/StudentAttachmentsModal";
import AddInstructorModal from "../../Pages/Instructor/modal/AddInstructorModal";
import ScheduleFilterModal from "../../Pages/Instructor/modal/ScheduleFilterModal";
import AddScheduleModal from "../../Pages/Instructor/modal/AddScheduleModal";
import RequestDetailsModal from "../../Pages/Instructor/modal/RequestDetailsModal";
import ScheduleListModal from "../../Pages/Instructor/modal/ScheduleListModal";
import EditInstructorModal from "../../Pages/Instructor/modal/EditInstructorModal";
import EditScheduleModal from "../../Pages/Instructor/modal/EditScheduleModal";

export default function CommonModalArea() {
  const { setShowLogoutModal, showLogoutModal } = useLayoutStore();
  return (
    <>
      {/* System Modal */}
      <LogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
        handleUserLogout={handleUserLogout}
      />
      <ImagePreviewPopup />

      {/* invoice modals */}
      <InvoiceFilterModal />


      <AddBankInfoModal />
      {/*e    invoice area  */}
      <InvoiceUpdatePrice />
      <InvoiceAcceptNote />
      <InvoiceRejectNote />
      <NewInvoiceShareModal />
      <InvoiceDetailsLessonList />

      <InstructorInvoiceRejectNote />
      <InstructorInvoiceMakePaymentModal />
      <AdminInvoiceMakePaymentModal />
      <AdminInvoiceCancelNote />
      <InvoicePaymentDetailsModal />
      <InvoiceLessonListModal />
      <AdminToSchoolPayModal />
      <SchoolAcceptNoteToSystem />
      <PayoutModal />


      {/* class Modal */}
      <AddClassModal />
      <EditClassModal />
      <DeleteClassModal />
      <ClassDetailsModal />
      <CancelClassNoteModal />


      {/* Profile */}
      <EditProfile />
      <LicenseDetails />
      <LicenseOverViewDetails />
      <DeleteAccountModal />

      {/* category */}
      <CategoryDeactivateModal />
      <AddLessonModal />
      <EditLessonModal />
      <DeleteLessonModal />
      <EditDetailsModal />
      <DeActivatePackageModal />

      {/* classroom */}
      <AddClassroomModal />
      <EditClassroomModal />
      <DeleteClassroomModal />

      {/* Instructor */}
      <AcceptNoteModal />
      <RejectionReasonModal />
      <InstructorRemoveModal />
      <InstructorRequestDetailsModal />
      <SchoolStudentInvoiceModal />
      <LessonDetailsModal />
      <AddInstructorModal/>
      <ScheduleFilterModal/>
      <AddScheduleModal/>
      <RequestDetailsModal/>
      <ScheduleListModal/>
      <EditInstructorModal/>
      <EditScheduleModal/>


      {/* student */}
      <UpdatePrice />
      <PayModal />
      <TransactionDetailsModal />
      <RefundModal />
      <CurriculumDetailsModal />
      <BankInfoEditModal />
      <AddStudentModal/>
      <StudentAttachmentsModal/>

      {/* Notification */}
      <NotificationDetailsModal />
    </>
  );
}
