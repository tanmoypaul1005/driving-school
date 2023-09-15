import React from "react";
import CommonButton from "../../Components/Button/CommonButton";
import CommonModal from "../../Components/Modal/CommonModal";

export default function CommonDeactivateModal({
  showDeactivateModal,
  setShowDeactivateModal,
  messageToShow = "Some warning...?",
  onConfirm,
}) {
  return (
    <div>
      <CommonModal
        showModal={showDeactivateModal}
        setShowModal={setShowDeactivateModal}        
        modalTitle="Confirmation"
        mainContent={
          <div className="pt-5 pb-[30px] flex justify-center items-center">
            <div>{messageToShow}</div>
          </div>
        }
        primaryActionButton={
          <>
            <CommonButton
              btnLabel="Deactivate"
              colorType="danger"
              onClick={() => {
                onConfirm();
                setShowDeactivateModal(false);
              }}
            />
          </>
        }
        secondaryActionButton={
          <>
            <CommonButton
              btnLabel="Cancel"
              onClick={() => setShowDeactivateModal(false)}
            />
          </>
        }
      />
    </div>
  );
}
