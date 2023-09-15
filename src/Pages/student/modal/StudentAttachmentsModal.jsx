import React from 'react';
import CommonModal from '../../../Components/Modal/CommonModal';
import useSchoolStudentStore from '../../../App/Stores/schoolStudentStore';
import { useTranslation } from 'react-i18next';
import { BaseUrlSrc } from '../../../App/Utility/Url';
import { iImageIogo } from '../../../App/Utility/source';
import Image from '../../../Components/Image/Image';
import Clamp from "react-multiline-clamp";

const StudentAttachmentsModal = () => {

    const { setShowStudentAttachmentsModal, showStudentAttachmentsModal, schoolStudentDetails } = useSchoolStudentStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                modalSpace={true}
                showModal={showStudentAttachmentsModal}
                setShowModal={setShowStudentAttachmentsModal}
                modalTitle={t("Attachments")}
                mainContent={

                    schoolStudentDetails?.additional_attachment?.length > 0 ?
                        schoolStudentDetails?.additional_attachment?.map((item, index) => (
                            <div className="space-y-s20 mt-s20">
                                {
                                    item?.attachment_file?.split('.').pop() !== "pdf" ?
                                        <div className='space-y-2'>
                                            <div className="capitalize text-fs14 font-fw600 text-cNero">
                                                {index+1}. {item?.attachment_name}
                                            </div>
                                            <div className='flex items-center justify-center border-2 border-dashed bg-cTintBlue h-s190 border-cPrimary text-fs14 font-fw400 text-cNero p-s16 rounded-br10'>
                                                <Image dummyImage={iImageIogo} withPreview={true} className="h-[160px]" alt="" src={item?.attachment_file} />
                                            </div>
                                        </div>
                                        :
                                        <div className='space-y-2'>
                                            <div
                                                className="capitalize text-fs14 font-fw600 text-cNero mb-s8">
                                               {index+1}. {item?.attachment_name}
                                            </div>

                                            <a
                                                href={BaseUrlSrc + item?.attachment_file}
                                                download="Example-PDF-document"
                                                target="_blank"
                                                rel="noreferrer"
                                            > <div className='capitalize border-2 border-dashed cursor-pointer bg-cTintBlue border-cPrimary text-fs14 font-fw400 text-cNero p-s16 rounded-br10'>
                                                    <Clamp withTooltip lines={1} >
                                                        {item?.attachment_file}
                                                    </Clamp>
                                                </div>
                                            </a>
                                        </div>
                                }
                            </div>
                        ))
                        : <div className="text-center body_text text-cBlack mt-s20"> {t("No Attachments")}</div>
                }
            />

        </div>
    );
};

export default StudentAttachmentsModal;