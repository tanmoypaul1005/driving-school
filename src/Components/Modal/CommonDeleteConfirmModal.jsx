import React from "react";
import CommonButton from "../Button/CommonButton";
import CommonModal from "./CommonModal";

export default function CommonDeleteConfirmModal({
  showDeleteModal,
  setShowDeleteModal,
  messageToShow = "Some warning...?",
  onConfirm,
}) {
  return (
    <div>
      <CommonModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        
        modalTitle="Confirmation"
        mainContent={
          <div className="pt-5 pb-[30px] flex justify-center items-center">
            <div>{messageToShow}</div>
          </div>
        }
        primaryActionButton={
          <>
            <CommonButton
              btnLabel="Delete"
              colorType="danger"
              onClick={() => {
                onConfirm();
                setShowDeleteModal(false);
              }}
            />
          </>
        }
        secondaryActionButton={
          <>
            <CommonButton
              btnLabel="Cancel"
              onClick={() => setShowDeleteModal(false)}
            />
          </>
        }
      />
    </div>
  );
}
