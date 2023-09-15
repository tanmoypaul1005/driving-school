/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Settings from '../Settings';
import { iDownload } from '../../../App/Utility/source';
import useSettingsStore, { getBankInfo, getPaymentInfo, } from '../../../App/Stores/SettingsStore';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../App/Utility/UtilityFunctions';
import { BaseUrlSrc } from '../../../App/Utility/Url';
import useUtilityStore from '../../../App/Stores/UtilityStore';

function BankInformation() {

    const { paymentInfo, bankInfo } = useSettingsStore();

    const { setLoading } = useUtilityStore.getState();

    useEffect(() => {
        fetchData();
    }, [])

    const { t } = useTranslation();

    const fetchData = async () => {
        setLoading(true);
        await getPaymentInfo();
        await getBankInfo();
        console.log("")
        setLoading(false);
    }

    return (
        <Settings>
            <div className="flex justify-between">
                <div>
                    <h1 className="section_title text-cBlack mb-s8">{t("Payment Information")}</h1>
                </div>
            </div>


            <div className='bg-white shadow p-s20 md:p-5 rounded-br8'>
                {paymentInfo?.status === "active" && <div className='relative rounded-br8 bg-[#EDF1F8] small_body_text text-cGray p-s20'>
                    <CommonList title={t("Status")} value={paymentInfo?.status ?? 'NA'} />
                    <CommonList title={t("Generated Date")} value={formatDate(paymentInfo?.date) ?? 'NA'} />
                    <CommonList title={t("API Key")} value={paymentInfo?.api_key ?? 'NA'} />
                    <CommonList isDownload={true} title={t("Application Form")} value={paymentInfo?.application_form ?? 'NA'} fileName="Application File" />
                    <CommonList isDownload={true} title={t("Warrant Form")} value={paymentInfo?.warrant_letter ?? 'NA'} fileName="Warrant Letter" />
                </div>}

                {
                    paymentInfo?.status === "processing" &&
                    <div className='text-center font-fw600 text-[#616888] text-fs14'>{t("Your application is in progress")}</div>
                }

                {
                    paymentInfo?.status === "pending" &&
                    <div className='text-center font-fw600 text-[#616888] text-fs14'>{t("Your application is in pending")}</div>
                }
            </div>

            <div className='mt-s20'>
                <div>
                    <div className="section_title text-cBlack mb-s8">{t("Payment guideline")}</div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: bankInfo?.bank_policy ? bankInfo?.bank_policy : 'NA' }}
                    className="bg-white shadow p-s20 md:p-5 rounded-br8 body_text text-cGray">
                </div>
            </div>
        </Settings>
    )
}

export default BankInformation

const CommonList = ({ fileName, isDownload = false, value, title }) => {

    return (
        <div className='flex justify-between'>
            <div className='capitalize body_text text-cGray'>{title ? title : 'NA'}</div>
            <div className='capitalize body_text text-cGray'>
                {isDownload ?
                    <a
                        href={BaseUrlSrc + value}
                        download="Example-PDF-document"
                        target="_blank"
                        rel="noreferrer"
                        className='flex cursor-pointer'>
                        <div className='flex items-center underline truncate text-cBrandColor mr-s4'>{fileName}</div>
                        <img className='flex items-center cursor-pointer mb-s3' src={iDownload} alt="" />
                    </a>
                    : value ? value : 'NA'
                }
            </div>
        </div>
    )
}