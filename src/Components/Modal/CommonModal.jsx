import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { iCross } from './../../App/Utility/source';


const CommonModal = ({
  modalSpace = false,
  showModal,
  setShowModal,
  mainContent,
  modalTitle,
  customClose,
  subTitle = "",
  singleButton,
  primaryActionButton,
  secondaryActionButton,
  useAutoClose = true,
  widthClass = "w-full md:w-[60vw] lg:w-[55vw] xl:w-[650px]",
}) => {
  return (
    <div>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="overflow-y-auto fixed inset-0 z-index-120 font-[poppins]"
          onClose={() => setShowModal(false)}
        >
          <div className="px-4 min-h-screen text-center opacity-100 bg-cModalDropBg font-poppins">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={`${modalSpace ? 'my-s20' : ''} inline-block p-5 text-left align-middle bg-white rounded-br8 shadow-xl opacity-100 transition-all transform gs-text-main-black ${widthClass}`}
              >
                <div className="flex relative flex-col justify-center items-center">
                  <div
                    onClick={() => setShowModal(false)}
                    className="absolute top-0 right-0 cursor-pointer"
                  >
                    {customClose ?
                      <img src={customClose} alt="" className="z-50 pr-s10  " />
                      : <img src={iCross} alt="" />
                    }
                  </div>
                  {modalTitle ? <div className="capitalize text-fs24 font-fw600">
                    {modalTitle}
                  </div> : ""}
                  <div>{subTitle}</div>
                </div>
                {mainContent}
                {singleButton ? (
                  <div
                    onClick={() => {
                      if (useAutoClose) {
                        setShowModal(false);
                      }
                    }}
                    className="flex justify-center items-center mx-auto w-fit"
                  >
                    {singleButton}
                  </div>
                ) : (
                  ""
                )}
                <div className="flex justify-between items-center">
                  <div onClick={() => setShowModal(false)}>
                    {secondaryActionButton}
                  </div>
                  <div
                    onClick={() => {
                      if (useAutoClose) {
                        setShowModal(false);
                      }
                    }}
                  >
                    {primaryActionButton}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CommonModal;
