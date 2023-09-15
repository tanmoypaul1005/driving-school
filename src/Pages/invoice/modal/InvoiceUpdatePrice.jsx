/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import useNewInvoiceStore from '../../../App/Stores/NewInvoiceStore'
import CommonButton from '../../../Components/Button/CommonButton';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonModal from '../../../Components/Modal/CommonModal';
import { Toastr, calculatePercentage, } from '../../../App/Utility/UtilityFunctions';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const InvoiceUpdatePrice = () => {
    const {
        showInvoiceUpdateModal,
        setShowInvoiceUpdateModal,
        invoiceDetailsData,
        setInvoiceDetailsData,
        setInvoicePriceChangeFactor,
        setInvoiceDetailsTotalPriceLocal,
        invoice_update_price, setInvoice_update_price
    } = useNewInvoiceStore();

    const { t } = useTranslation();

    useEffect(() => {
        setInvoice_update_price(parseInt(invoiceDetailsData?.price_without_moms));
    }, [invoiceDetailsData]);

    return (
        <CommonModal
            showModal={showInvoiceUpdateModal}
            setShowModal={setShowInvoiceUpdateModal}
            modalTitle={t("Update price")}
            mainContent={
                <div>
                    <div className="pt-5">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <CommonInput
                                label={t('updated price (Without MOMS)')}
                                placeholder={t('Write an updated price')}
                                required={true}
                                value={invoice_update_price}
                                max_number={invoiceDetailsData?.price_without_moms}
                                min_number={0}
                                onChange={(e) => {
                                    if (e.target.value > invoiceDetailsData?.price_without_moms) Toastr({ type: 'error', message: 'New price cannot exceed the original price' });
                                    setInvoice_update_price(e.target.value);
                                    setInvoiceDetailsTotalPriceLocal(e.target.value);
                                }}
                                type='number'
                                 unnecessaryCharacters = {true}
                            />

                            <div className="pt-5 space-y-2 text-sm text-cRed">
                                <div>{t("*New price cannot exceed the original price")}</div>
                                <div>{t("*Excluding MOMS amount")}</div>
                            </div>


                            <div className="flex justify-center pt-5">
                                <CommonButton
                                    roundedFull={false}
                                    btnLabel={t('update')}
                                    type='submit'
                                    onClick={() => {
                                        if (invoice_update_price > invoiceDetailsData?.price_without_moms) return Toastr({ type: 'error', message: 'New price cannot exceed the original price' });
                                        let newPercentage = calculatePercentage(invoiceDetailsData.price_without_moms, parseInt(invoice_update_price));
                                        let newMoms = Math.round(parseInt(invoice_update_price) * (invoiceDetailsData?.moms_percentage / 100));
                                        let newTotalPrice = Math.round(parseInt(invoice_update_price) + newMoms);
                                        setInvoiceDetailsData({ ...invoiceDetailsData, price: newTotalPrice, moms: newMoms });
                                        setInvoicePriceChangeFactor(newPercentage);
                                        setShowInvoiceUpdateModal(false);
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            }
        />
    )
}

export default InvoiceUpdatePrice

const CalculateMomsNew = (percentageValue, lessonArray) => {
    let resMoms = 0;
    lessonArray?.map(item => {
        let t_mom = item?.price - item?.price_without_moms
        if (item?.is_moms) return resMoms = resMoms + (t_mom * (percentageValue / 100))
        else return 0
    })
    return Math.round(resMoms);
}