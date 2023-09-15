/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useDebounce } from 'use-debounce';
import { useNavigate, useParams } from 'react-router-dom'
import CommonTitle from '../../../Components/Title/CommonTitle';
import { iShareBlue, iUserAvatar } from '../../../App/Utility/source';
import Image from '../../../Components/Image/Image';
import CommonButtonOutlined from '../../../Components/Button/CommonButtonOutlined';
import CommonButton from '../../../Components/Button/CommonButton';
import NoActiveCurriculum from './NoActiveCurriculum';
import useSchoolStudentStore, { getSchoolStudentShow, schoolStudentInvoiceIndex } from '../../../App/Stores/schoolStudentStore';
import { useEffect } from 'react';
import StudentInvoiceTableRow from '../table/StudentInvoiceTableRow';
import CurriculumTableRow from '../table/CurriculumTableRow';
import { MinToHour } from '../../../Utility/UtilityFunctions';
import CommonTable2 from '../../../Components/Table/CommonTable2';
import BackLink from '../../../Components/Pagination/BackLink';
import { PageTitle, formatDate, formatDkkPrice } from '../../../App/Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';
import useLayoutStore from '../../../App/Stores/LayoutStore';
import NewTextButton from '../../../Components/Button/NewTextButton';
import ShareCurriculumModal from '../modal/ShareCurriculumModal';

function StudentProfile() {

    const { shareCurriculumForm,setShareCurriculumForm,setShowShareCurriculumModal,setShowStudentAttachmentsModal, studentInvoiceTakeAmount, setStudentInvoiceTakeAmount, setNewPricePercentage, setShowPayModal, schoolStudentInvoiceSearch, setSchoolStudentInvoiceSearch, schoolStudentCurriculumList, schoolStudentInvoiceList, schoolStudentDetails, setSchoolStudentInvoiceModal, setShowRefundModal } = useSchoolStudentStore();

    const { school_student_id } = useParams();

    const { t } = useTranslation();

    const invoiceHeaders = [
        { index: 1, name: "#" },
        { index: 2, name: t("Order ID") },
        { index: 3, name: t("Created date") },
        { index: 4, name: t("Amount") },
        { index: 5, name: t("Status") },
    ];

    const curriculumHeaders = [
        { index: 1, name: "#" },
        { index: 2, name: t("Title") },
        { index: 3, name: t("Type") },
        { index: 4, name: t("Duration") },
        { index: 5, name: t("Status") },
    ];

    const navigateTo = useNavigate();

    const { setBarTitle } = useLayoutStore();

    useEffect(() => {
        PageTitle(t("Student"));
        setBarTitle(t("Student"));
        if (school_student_id) { getSchoolStudentShow(school_student_id) }
    }, [school_student_id])

    const [searchValue] = useDebounce(schoolStudentInvoiceSearch, 500);

    useEffect(() => {
        if (school_student_id) {
            if (searchValue) {
                schoolStudentInvoiceIndex("", school_student_id, searchValue)
            } else {
                schoolStudentInvoiceIndex("", school_student_id, "")
            }
        }
    }, [searchValue])

    return (
        <div>
            <div className="flex justify-between items-baseline">
                <CommonTitle title={t("Student profile")} >
                    <BackLink linksArray={[
                        { label: t("Student"), linkTo: "/school-student" },
                        { label: t("Student profile"), linkTo: "" }
                    ]} />
                </CommonTitle>

                <NewTextButton
                    btnLabel={t('Share curriculum')}
                    iconLeft={iShareBlue}
                    onClick={() => {
                        setShowShareCurriculumModal(true);
                        setShareCurriculumForm({...shareCurriculumForm,'id': school_student_id});
                        console.log('share curriculum modal clicked!');
                    }}
                />
            </div>
            <ShareCurriculumModal/>

            <div className="w-full overflow-hidden bg-cBrandColor2 rounded-br8 px-s20 py-s20">
                <div className='flex flex-col md:flex-row'>

                    <div className="relative w-full pr-s20 bg-cBackgroundAndCategory rounded-br8 p-s20">
                        <div className="flex flex-col lg:flex-row">
                            <div className='max-w-[88px] min-w-[88px] h-s88 mb-s18'>
                                <Image className='rounded-full w-s86 h-s86 '
                                    src={schoolStudentDetails?.image}
                                    dummyImage={iUserAvatar}
                                />
                            </div>

                            <div className="ml-s15">
                                <div className="capitalize break-all section_title text-cBlack mb-s2">
                                    {
                                        schoolStudentDetails?.student_all_info?.name === "null" ||
                                            schoolStudentDetails?.student_all_info?.name === null ?
                                            "NA" : schoolStudentDetails?.student_all_info?.name
                                    }
                                </div>

                                <ProfileList title={t('Email')} value={schoolStudentDetails?.student_all_info?.user_email ?? 'NA'} />
                                <ProfileList title={t('Phone')} value={schoolStudentDetails?.student_all_info?.phone_number ?? 'NA'} />
                                <ProfileList title={t('Birth date')} value={formatDate(schoolStudentDetails?.student_all_info?.birthday) ?? 'NA'} />
                                {/* <ProfileList title='Address' value={schoolStudentDetails?.student_all_info?.address ?? 'NA'} /> */}
                            </div>
                        </div>

                        <></>
                        {schoolStudentDetails?.status === "requested" &&
                            <div className='absolute bottom-0 right-0 flex justify-between space-x-5 m-s20'>
                                <CommonButton
                                    onClick={() => {
                                        setNewPricePercentage(null)
                                        setSchoolStudentInvoiceModal(true)
                                    }}
                                    width="w-[150px]"
                                    roundedFull={false}
                                    btnLabel={t('New Request')}
                                />
                            </div>}

                        <div onClick={() => { setShowStudentAttachmentsModal(true) }} className='absolute top-5 right-5 cursor-pointer text-fs14 font-fw600 text-cPrimary'>
                            {t("See Attachments")}
                        </div>
                    </div>

                    <div>
                        {schoolStudentDetails?.balance?.total_request ?
                            <div className='w-[400px] pl-5'>
                                <div className='flex justify-between mb-s16'>
                                    <div className='sub_title text-cBlack'>{t("Balance")}</div>
                                    <div className='cursor-pointer button_text text-cBrand'
                                        onClick={() => {
                                            navigateTo(`/school-student/details/${school_student_id}/balance-history`)
                                        }}>{t("History")}
                                    </div>
                                </div>
                                <BalanceList title={t("Balance")} value={"DKK " + formatDkkPrice(schoolStudentDetails?.balance?.actual_balance) ?? 0} />
                                <BalanceList title={t("Total request")} value={"DKK " + formatDkkPrice(schoolStudentDetails?.balance?.total_request) ?? 0} />
                                <BalanceList title={t("Paid amount")} value={"DKK " + formatDkkPrice(schoolStudentDetails?.balance?.paid_balance) ?? 0} />
                                <BalanceList title={t("Due amount")} value={"DKK " + formatDkkPrice(schoolStudentDetails?.balance?.due_balance) ?? 0} />

                                <div className='flex justify-between mt-s20'>
                                    <CommonButtonOutlined
                                        onClick={() => { setShowRefundModal(true) }}
                                        width="w-[100px]"
                                        isFullRounded={false}
                                        colorType='danger'
                                        btnLabel={t('Refund')}
                                    />
                                    <CommonButton
                                        onClick={() => { setShowPayModal(true) }}
                                        width="w-[100px]"
                                        roundedFull={false}
                                        btnLabel={t('Pay')}
                                    />
                                </div>
                            </div> : ''}
                    </div>
                </div>
            </div>

            <div className='mt-s20 rounded-br8'>
                <div className='section_title text-cBlack mb-s8'>{t("Orders")}</div>
                <CommonTable2
                    headers={invoiceHeaders}
                    tableTitle=""
                    paginationObject={schoolStudentInvoiceList}
                    paginationOnClick={async (url) => {
                        if (school_student_id) {
                            if (searchValue) {
                                schoolStudentInvoiceIndex(url, school_student_id, searchValue)
                            } else {
                                schoolStudentInvoiceIndex(url, school_student_id, "")
                            }
                        }
                    }}

                    showTakeOption={true}
                    currentTakeAmount={studentInvoiceTakeAmount}
                    takeOptionOnChange={async (takeAmount) => {
                        await setStudentInvoiceTakeAmount(takeAmount);
                        if (school_student_id) {
                            if (searchValue) {
                                schoolStudentInvoiceIndex("", school_student_id, searchValue)
                            } else {
                                schoolStudentInvoiceIndex("", school_student_id, "")
                            }
                        }
                    }}

                    showPagination={true}
                    showPageCountText={true}

                    showSearchBox={true}
                    searchValue={schoolStudentInvoiceSearch}
                    withClearSearch={true}
                    onSearchClear={() => setSchoolStudentInvoiceSearch("")}
                    searchOnChange={(e) => setSchoolStudentInvoiceSearch(e.target.value)}

                    autoManageRow={true}
                    TableRowComponent={StudentInvoiceTableRow}

                />
            </div>

            {schoolStudentCurriculumList?.curriculum?.length > 0 ?
                <div className='relative w-full mt-s20 rounded-br8'>
                    <div className='section_title text-cBlack mb-s8'>{t("Curriculum")}</div>
                    <div className='absolute left-0 w-full bg-white h-[73px] rounded-t-[8px] overflow-hidden px-5'>
                        <div className='flex justify-between bg-cWhite pt-s20'>
                            <CurriculumList
                                title={t('Category')}
                                value={schoolStudentCurriculumList?.curriculum_info?.category_name ?? 'NA'} />
                            <CurriculumList
                                title={t('Total lessons')}
                                value={`${schoolStudentCurriculumList?.curriculum_info?.total_lessons}(${MinToHour(schoolStudentCurriculumList?.curriculum_info?.total_lesson_duration)} hr)`} />
                            <CurriculumList
                                title={t('Remaining')}
                                value={schoolStudentCurriculumList?.curriculum_info?.total_lessons_remaining + "(" + MinToHour(schoolStudentCurriculumList?.curriculum_info?.total_lesson_duration_remaining) + " hr)"} />
                        </div>
                    </div>
                    <div className="pt-[60px]">
                        <CommonTable2
                            headers={curriculumHeaders}
                            tableTitle=""
                            paginationObject={schoolStudentCurriculumList?.curriculum}

                            items={
                                <>
                                    {
                                        schoolStudentCurriculumList?.curriculum?.map((item, index) => (
                                            <CurriculumTableRow data={item} key={index} index={index + 1} />
                                        ))
                                    }
                                </>
                            }
                        />
                    </div>
                </div> : <div className='mt-s20'>
                    <NoActiveCurriculum />
                </div>}
        </div>
    )
}

export default StudentProfile

export const CurriculumList = ({ title = "", value = "" }) => {
    return (
        <div>
            <div className='text-cBlack sub_title'>{title}</div>
            <div className='text-center body_text text-cGray'>
                {value ?? "NA"}
            </div>
        </div>
    )
}


export const BalanceList = ({ title, value }) => {
    return (
        <div className='flex justify-between '>
            <div className='body_text text-cGray'>{title}</div>
            <div className='body_text text-cGray'>{value ?? 'NA'}</div>
        </div>
    )
}

export const ProfileList = ({ title, value }) => {
    return (
        <div className="break-all small_body_text text-cGray">
            {title}: {value === "null" || value === null ? "NA" : value}
        </div>
    )
}



