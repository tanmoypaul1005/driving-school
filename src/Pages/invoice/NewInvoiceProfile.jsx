import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NewTextButton from '../../Components/Button/NewTextButton';
import Image from '../../Components/Image/Image';
import { useTranslation } from 'react-i18next';

const NewInvoiceProfile = ({
    name = "name",
    email = "email",
    phone = "phone",
    joined = 'joined date',
    profile_link = "abc",
    profile_image = "123",
}) => {
    const { invoice_type } = useParams();

    const { t } = useTranslation();

    return (
        <div className="flex justify-between items-center bg-cBackgroundAndCategory rounded-br10">
            <div className={`flex ${(invoice_type === "freepay_school" || invoice_type === "license_invoice") ? " items-center" : "col-span-5"} py-s20 px-s20 w-full`}>
                <Image className="rounded-full w-w88 h-h88" src={profile_image} />
                <div className="ml-s15 w-full">
                    <div className="w-full flex items-start justify-between">
                        <div>
                            <div className="section_title text-cBlack capitalize">
                                {name}
                            </div>
                            {invoice_type === "freepay_school" || invoice_type === "license_invoice" ?
                                <div
                                onClick={() => {
                                     window.location = "mailto:" + "kontact@maway.dk";
                                }}
                                className='small_body_text cursor-pointer underline text-cBrand'>kontact@maway.dk</div> : ""}
                        </div>
                        {profile_link ?
                            <Link to={profile_link} >
                                <NewTextButton
                                    btnLabel={t('go to profile')}
                                    withBg={false}
                                /></Link>
                            : ""}
                    </div>
                    {(invoice_type === "freepay_school" || invoice_type === "license_invoice") ? "" :
                        <div className="small_body_text">
                            {email ? <div className="text-cImportantText">{t("Email")}: {email}</div> : ""}
                            {phone ? <div className="text-cImportantText">{t("Phone")}: {phone}</div> : ""}
                            {joined ? <div className="text-cImportantText">{t("Joined")}: {joined}</div> : ""}
                        </div>}
                </div>
            </div>

        </div>
    );
};

export default NewInvoiceProfile
