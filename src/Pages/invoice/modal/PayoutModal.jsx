/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import useNewInvoiceStore, { addPayoutIndex, getNewSchoolInvoiceIndex, getPayoutIndex } from '../../../App/Stores/NewInvoiceStore';
import CommonModal from '../../../Components/Modal/CommonModal';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import { Toastr, formatDate } from '../../../App/Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';
import { k_role } from '../../../App/Utility/const';
import { useLocation } from 'react-router-dom';
import useUtilityStore from '../../../App/Stores/UtilityStore';

const PayoutModal = () => {

    const { invoiceSearchKey, setSelectedInvoiceChip, setInvoicePaginationUrl, invoiceTake, showPayoutModal, setShowPayoutModal, payOutList, payOutForm, setPayOutForm, resetPayOutForm } = useNewInvoiceStore();

    const { t } = useTranslation();

    const { role } = useUtilityStore();

    useEffect(() => {
        setPayOutForm({ ...payOutForm, school_id: payOutList?.data?.[0]?.school_id })
    }, [payOutList?.data?.[0]?.school_id])

    const resetData = () => {
        setPayOutForm({
            school_id: payOutList?.data?.[0]?.school_id,
            transaction_ids: [],
            comment: "",
            price: 0
        })
    }

    const SelectAll = () => {
        if (payOutList?.data.length === payOutForm?.transaction_ids?.length) {
            resetData()
        } else {
            let price = 0
            const all_data = payOutList?.data?.map((item, index) => {
                return item?.transaction_details?.transaction_id
            })
            payOutList?.data?.map((item, index) => { price = price + item?.amount })
            setPayOutForm({ ...payOutForm, school_id: payOutList?.data?.[0]?.school_id, transaction_ids: all_data, price: price })
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const location = useLocation();

    const fetchData = async () => {
        if (role === k_role?.school && location.pathname === "/invoices") {
            await getPayoutIndex();
        }
    }

    return (
        <div>
            <CommonModal
                showModal={showPayoutModal}
                setShowModal={setShowPayoutModal}
                modalTitle={t("Generate payout")}
                mainContent={
                    <div className='mt-s20'>
                        <div className='flex items-center justify-between mb-s12'>
                            <div className='sub_title text-cBlack'>{t("Total items")} ({payOutList?.data?.length})</div>
                            <div onClick={() => { SelectAll() }} className='cursor-pointer sub_title text-cBrand'>
                                {
                                    payOutForm?.transaction_ids?.length === payOutList?.data?.length ? t("Remove all") : t("Select all")
                                }
                            </div>
                        </div>
                        <div className={`space-y-2 ${payOutList?.data?.length > 6 && 'h-[400px] overflow-y-auto'} `}>
                            {
                                payOutList?.data?.map((item, index) => (
                                    <CommonList
                                        transaction_id={item?.transaction_details?.transaction_id}
                                        price={item?.amount}
                                        date={formatDate(item?.transaction_date)}
                                        title={item?.title}
                                        key={index} />
                                ))
                            }
                        </div>
                        <div className='flex items-center justify-between mb-s12 my-s12'>
                            <div className='sub_title text-cBrand'>{t("Total")}</div>
                            <div className='sub_title text-cBrand'>DKK {payOutForm?.price?.toLocaleString("da-DK") ?? '0'}</div>
                        </div>
                        <CommonInput
                            max_input={255}
                            value={payOutForm.comment}
                            onChange={(e) => {
                                setPayOutForm({ ...payOutForm, comment: e.target.value })
                            }}
                            textarea={true} label={t('Comment')} />

                        <div className='flex items-center justify-center mt-s20'>
                            <CommonButton
                                onClick={async () => {
                                    console.log("payOutForm", payOutForm)
                                    if (payOutForm?.transaction_ids?.length > 0) {
                                        const success = addPayoutIndex()
                                        if (success) {
                                            await setShowPayoutModal(false);
                                            await resetData();
                                            await setSelectedInvoiceChip("balance")
                                            await setInvoicePaginationUrl("");
                                            await getNewSchoolInvoiceIndex("balance", invoiceTake, "", invoiceSearchKey, {});
                                        }
                                    } else {
                                        Toastr({ message: t("Please select at least one item"), type: "warning" });
                                    }
                                }}
                                roundedFull={false} btnLabel={t('Submit')} />
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default PayoutModal;

export const CommonList = ({ date, title, price, transaction_id }) => {
    const { setPayOutForm, payOutForm } = useNewInvoiceStore();

    return (
        <div className='flex justify-between bg-cInvoiceLesson rounded-br8 pl-s8 py-s8'>
            <div>
                <div className='text-[#202020] text-fs14 font-fw600 capitalize mb-s4'>{title ?? 'NA'}</div>
                <div className='text-[#202020] body_text'>
                    {date ?? 'NA'}
                </div>
            </div>

            <div className='flex'>
                <div className='text-[#202020] flex justify-center items-center text-fs12 font-fw400 mr-s30'>
                    DKK {price?.toLocaleString("da-DK") ?? '0'}
                </div>
                <FormControlLabel
                    label=""
                    control={
                        <Checkbox
                            sx={{
                                color: "#7A7A7A",
                                '&.Mui-checked': {
                                    color: "#2257AA"
                                },
                                width: '20px',
                                height: '20px'
                            }}
                            value={transaction_id}
                            checked={payOutForm?.transaction_ids?.includes(transaction_id)}
                            onChange={(e) => {
                                if (payOutForm?.transaction_ids?.includes(transaction_id)) {
                                    const filter_data = payOutForm?.transaction_ids?.filter((item) => item !== transaction_id)
                                    setPayOutForm({ ...payOutForm, transaction_ids: filter_data, price: payOutForm?.price - price })
                                } else {
                                    setPayOutForm({
                                        ...payOutForm,
                                        transaction_ids: [...payOutForm?.transaction_ids, transaction_id],
                                        price: payOutForm?.price + price
                                    })
                                }
                            }}
                        />}
                />
            </div>
        </div>
    )
}