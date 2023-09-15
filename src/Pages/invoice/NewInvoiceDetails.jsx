/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useLayoutStore from '../../App/Stores/LayoutStore.js';
import useNewInvoiceStore, { getNewInvoiceDetails } from '../../App/Stores/NewInvoiceStore.js';
import { formatDate, PageTitle, roughLicenseDurationFormatter } from '../../App/Utility/UtilityFunctions.js';
import NewTextButton from '../../Components/Button/NewTextButton.jsx';
import BackLink from '../../Components/Pagination/BackLink';
import CommonTitle from '../../Components/Title/CommonTitle';
import NewInvoiceInfoCard from './NewInvoiceInfoCard.jsx';
import NewInvoiceProfile from './NewInvoiceProfile.jsx';
import NewInvoiceStatusTracker2 from './NewInvoiceStatusTracker2.jsx';
import NewInvoiceCommentArea from './NewInvoiceCommentArea.jsx';
import { useTranslation } from 'react-i18next';
import { iShareBlue } from '../../App/Utility/source.js';

const NewInvoiceDetails = () => {

    const { setBarTitle } = useLayoutStore();

    const {
        invoiceDetailsData,
        setShowInvoiceShareModal,
        invoiceShareForm,
        setInvoiceShareForm,
        setShowInvoiceLessonModal,
        resetInvoiceShareForm,
        setShowInvoiceUpdateModal,
        setShowInvoiceDetailsLessonList,
        setInvoiceDetailsLessonModalData,
        setInvoicePriceChangeFactor,
    } = useNewInvoiceStore();

    const { t } = useTranslation();

    const [profileData, setProfileData] = useState({
        profile_image: "",
        name: "",
        email: "",
        phone: "",
        joined: "",
        profile_link: "",
    });
    const [invoiceInfoCardData, setInvoiceInfoCardData] = useState({
        title: "",
        dataArray: [],
        momsValue: "",
        totalValue: "",
        withPdfDlButton: false,
        pdfLink: "",
        editableTotalPrice: false,
    });

    const { invoice_id, invoice_type } = useParams();

    useEffect(() => {
        FetchInvoiceDetails();
    }, [invoice_id])

    const FetchInvoiceDetails = async () => {
        // get invoice details data
        await getNewInvoiceDetails(invoice_id, invoice_type);
    }

    useEffect(() => {
        setInvoicePriceChangeFactor(100);
        resetInvoiceShareForm();
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        PageTitle(t("Order details"));
        setBarTitle(t("Order details"));
    }, [setBarTitle]);

    useEffect(() => {
        switch (invoice_type) {
            case 'admission_invoice':
                setProfileData({
                    profile_image: invoiceDetailsData?.student_photo ?? "",
                    name: invoiceDetailsData?.student_name ?? "NA",
                    email: invoiceDetailsData?.student_email ?? "NA",
                    phone: invoiceDetailsData?.student_phone ?? "NA",
                    joined: invoiceDetailsData?.student_joined_date ? formatDate(invoiceDetailsData?.student_joined_date) : "NA",
                    profile_link: "/school-student/details/" + invoiceDetailsData?.student_id ?? "",
                });
                setInvoiceInfoCardData({
                    title: t("Purchase details"),
                    momsValue: invoiceDetailsData?.moms,
                    totalValue: invoiceDetailsData?.price,

                    dataArray: [
                        {
                            label: t("category"),
                            value: invoiceDetailsData?.category_name,
                        },
                        {
                            label: t("Package"),
                            value: invoiceDetailsData?.is_package === 1 ? 
                            invoiceDetailsData?.package_title :"Custom package",
                        },
                        {
                            label: t("lessons"),
                            value: invoiceDetailsData?.lessons?.length,
                            clickable: true,
                            onClick: () => {
                                setShowInvoiceLessonModal(true);
                            }
                        },
                        {
                            label: t("hours"),
                            value: invoiceDetailsData?.total_lessons_duration,
                        },
                    ],

                    withPdfDlButton: false,
                    editableTotalPrice: invoiceDetailsData?.status === 'requested' ? true : false,
                });

                //r         tracker data analysis:
                let t_array = [];

                if (invoiceDetailsData?.action_dates?.requested !== "null") t_array.push({ title: "student", subtitle: "requested", value: invoiceDetailsData?.action_dates?.requested, isActive: true })

                break;
            case 'instructor_invoice':
                setProfileData({
                    profile_image: invoiceDetailsData?.instructor_photo ?? "",
                    name: invoiceDetailsData?.instructor_name ?? "NA",
                    email: invoiceDetailsData?.instructor_email ?? "NA",
                    phone: invoiceDetailsData?.instructor_phone === "null" || invoiceDetailsData?.instructor_phone === null ? "NA" : invoiceDetailsData?.instructor_phone ?? "NA",
                    joined: invoiceDetailsData?.instructor_joined_date ? formatDate(invoiceDetailsData?.instructor_joined_date) : "NA",
                    profile_link: "/school-instructor/details/" + invoiceDetailsData?.application_id + "/invoice",
                });
                setInvoiceInfoCardData({
                    title: `${t("Order Items")} (${invoiceDetailsData?.start_date + "- " + invoiceDetailsData?.end_date})`,
                    momsValue: invoiceDetailsData?.moms,
                    totalValue: invoiceDetailsData?.amount,

                    dataArray: [
                        {
                            label: t("Classroom lessons"),
                            value: invoiceDetailsData?.ceds?.classroom_total_duration,
                            clickable: true,
                            onClick: () => {
                                setShowInvoiceDetailsLessonList(true);
                                setInvoiceDetailsLessonModalData({
                                    title: `${t("Classroom lesson")} (${invoiceDetailsData?.ceds?.classroom_total_duration})`,
                                    type: "classroom",
                                    dataArray: invoiceDetailsData?.ceds?.classroom,
                                })
                            },
                        },
                        {
                            label: t("Driving lessons"),
                            value: invoiceDetailsData?.ceds?.driving_total_duration,
                            clickable: true,
                            onClick: () => {
                                setShowInvoiceDetailsLessonList(true);
                                setInvoiceDetailsLessonModalData({
                                    title: `${t("Driving Lesson")} (${invoiceDetailsData?.ceds?.driving_total_duration})`,
                                    type: "driving",
                                    dataArray: invoiceDetailsData?.ceds?.driving,
                                })
                            },
                        },
                        {
                            label: t("External lessons"),
                            value: invoiceDetailsData?.ceds?.external_total_count,
                            clickable: true,
                            onClick: () => {
                                setShowInvoiceDetailsLessonList(true);
                                setInvoiceDetailsLessonModalData({
                                    title: `${t("External Lesson")} (${invoiceDetailsData?.ceds?.external_total_count})`,
                                    type: "external",
                                    dataArray: invoiceDetailsData?.ceds?.external,
                                })
                            },
                        },
                    ],

                    withPdfDlButton: false,
                    editableTotalPrice: false,
                });
                break;
            case 'license_invoice':
                setProfileData({
                    profile_image: invoiceDetailsData?.instructor_photo ?? "",
                    name: "Maway",
                    email: "admin.maway.dk",
                    phone: "",
                    joined: "",
                    profile_link: "",
                });
                setInvoiceInfoCardData({
                    title: t("License purchase details"),
                    momsValue: invoiceDetailsData?.moms,
                    totalValue: invoiceDetailsData?.price,

                    dataArray: [
                        {
                            label: t("License name"),
                            value: invoiceDetailsData?.lisence?.title,
                        },
                        {
                            label: t("Duration"),
                            value: roughLicenseDurationFormatter(invoiceDetailsData?.lisence?.duration),
                        },
                        {
                            label: t("Price"),
                            value: "DKK " + invoiceDetailsData?.lisence?.price.toLocaleString("da-DK"),
                        },
                    ],

                    withPdfDlButton: false,
                    editableTotalPrice: false,
                });
                break;

            // for type admin->school
            case 'freepay_school':
                setProfileData({
                    profile_image: invoiceDetailsData?.instructor_photo ?? "",
                    name: "Maway",
                    email: "",
                    phone: "",
                    joined: "",
                    profile_link: "",
                });
                setInvoiceInfoCardData({
                    title: t("Payment details"),
                    momsTitle: "Transaction fee ( 1% of " + invoiceDetailsData?.amount + " )",
                    momsValue: invoiceDetailsData?.transaction_fee,
                    totalValue: invoiceDetailsData?.total_amount,
                    dataArray: [
                        {
                            label: "Order id",
                            value: invoiceDetailsData?.invoice_id,
                        },
                        {
                            label: t("Total Student Payment"),
                            value: "DKK " + invoiceDetailsData?.amount,
                        },
                    ],

                    withPdfDlButton: true,
                    editableTotalPrice: false,
                    pdfLink: invoiceDetailsData?.transaction_pdf
                });
                break;
            default:
                break;
        }
    }, [invoice_type, invoice_id, invoiceDetailsData]);

    return (
        <div>
            <div>
                <div className="">
                    <div className="flex items-baseline justify-between">
                        <CommonTitle title={t("Order details")} onClick={() => console.log("invoiceDetailsData:::", invoiceDetailsData)}>
                            <BackLink linksArray={[
                                { label: "Order", linkTo: "/invoice" },
                                { label: t("Order details"), linkTo: "" }
                            ]} />
                        </ CommonTitle >

                        <NewTextButton
                            btnLabel={t('share order')}
                            iconLeft={iShareBlue}
                            onClick={() => {
                                setInvoiceShareForm({
                                    ...invoiceShareForm,
                                    id: parseInt(invoice_id),
                                    user_id: invoice_type === "license_invoice" ? invoiceDetailsData?.scl_ins_id : invoiceDetailsData?.school_info?.user_id,
                                    role: "school",
                                    type: invoice_type,

                                });
                                console.log('share invoice modal clicked!');
                                setShowInvoiceShareModal(true);
                            }}
                        />
                    </div>

                    {/* B:      main details part */}
                    <div className="bg-cBrandColor2 rounded-br8">
                        <div
                            // onClick={() => { console.log("profileData: ", profileData); }}
                            className="rounded-br8 bg-cBrandColor2 px-s20 pt-s20">
                            {/* G:      profile details */}
                            <NewInvoiceProfile
                                profile_image={profileData?.profile_image}
                                name={profileData?.name}
                                email={profileData?.email}
                                phone={profileData?.phone}
                                joined={profileData?.joined}
                                profile_link={profileData?.profile_link}
                            />

                            {/* <div className='w-full my-5 bg-cBackgroundAndCategory h-s1'></div> */}
                            <div className="pt-5"></div>
                            <div className="sub_title text-cHighlighted mb-s15">{t("Order status")}</div>
                            <NewInvoiceStatusTracker2 />

                            <div className='w-full my-5 bg-cBackgroundAndCategory h-s1'></div>

                            <div className="pb-5 space-y-5 xl:flex xl:flex-row-reverse xl:justify-between xl:space-y-0">

                                {/* b          invoice info card      */}
                                <div className='w-full max-w-[400px] min-w-[350px]'>
                                    { invoiceDetailsData?.status === "requested" ?
                                        <NewInvoiceInfoCard
                                            title={invoiceInfoCardData?.title}

                                            content={invoiceInfoCardData?.dataArray}
                                            momsTitle={invoiceInfoCardData?.momsTitle}
                                            momsValue={invoiceInfoCardData?.momsValue}
                                            totalValue={invoiceInfoCardData?.totalValue}
                                            discount={true}
                                            discount_value={invoiceDetailsData?.discount}

                                            withPdfDlButton={invoiceInfoCardData?.withPdfDlButton}
                                            pdfDownloadLink={invoiceInfoCardData?.pdfLink}

                                            editableTotalPrice={invoiceInfoCardData?.editableTotalPrice}

                                            OnEditTotalPrice={() => {setShowInvoiceUpdateModal(true);}}
                                        /> :
                                        <NewInvoiceInfoCard
                                            title={invoiceInfoCardData?.title}

                                            content={invoiceInfoCardData?.dataArray}
                                            momsTitle={invoiceInfoCardData?.momsTitle}
                                            momsValue={invoiceInfoCardData?.momsValue}
                                            totalValue={invoiceInfoCardData?.totalValue}

                                            withPdfDlButton={invoiceInfoCardData?.withPdfDlButton}
                                            pdfDownloadLink={invoiceInfoCardData?.pdfLink}

                                            editableTotalPrice={invoiceInfoCardData?.editableTotalPrice}

                                            OnEditTotalPrice={() => {setShowInvoiceUpdateModal(true);}}
                                        />

                                    }
                                </div>

                                <div className='flex flex-col max-h-[5220px] w-s1 bg-cBackgroundAndCategory mx-5'></div>

                                <div className='pr-5 w-full max-w-[700px] min-w-10'>
                                    <NewInvoiceCommentArea />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default NewInvoiceDetails