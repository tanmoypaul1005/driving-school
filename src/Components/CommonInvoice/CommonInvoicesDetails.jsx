import React from 'react';
import CommonTitle from './../Title/CommonTitle';
import InvoiceProfile from './InvoiceProfile';
import InvoiceLicense from './InvoiceLicense';
import InvoiceComment2 from './InvoiceComment2';
import InvoiceStatus from './InvoiceStatus';

const CommonInvoicesDetails = () => {
    return (
        <div>
            <div className="mx-s12 md:mx-s32">
                <CommonTitle title="Invoice Details" />
                <div className="bg-cBrandColor2 rounded-br20">
                    <div className="rounded-lg bg-cBrandColor2 px-s20 py-s20">
                        <InvoiceProfile />
                        <div className="grid grid-flow-row my-s30 mr-s24 sm:grid-flow-row lg:grid-flow-col">
                            <div className="grid grid-cols-1 w-full lg:grid-cols-2 xl:bg-cRed sm:col-span-12 lg:pr-5">
                                <InvoiceStatus />
                                <InvoiceComment2 />
                            </div>
                            <InvoiceLicense />
                        </div>
                    </div>

                    <div className="px-1 pt-s1">
                        <hr />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CommonInvoicesDetails;