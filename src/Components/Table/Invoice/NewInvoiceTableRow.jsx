
import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { iRightArrow2 } from '../../../App/Utility/source';
import { formatDate, formatDkkPrice } from '../../../App/Utility/UtilityFunctions';
import CommonEmptyStatus from '../../CommonEmptyStatus/CommonEmptyStatus';
import Image from '../../Image/Image';
import useNewInvoiceStore from '../../../App/Stores/NewInvoiceStore';

const NewInvoiceTableRow = ({ data, index }) => {

    const [invoiceStatus, setInvoiceStatus] = useState("accepted");
    // const [invoiceStatusColor, setInvoiceStatusColor] = useState("text-c");
    // const [] = useState({});
    const [invoiceLastAction, setInvoiceLastAction] = useState("");

    const navigate = useNavigate();

    const location = useLocation();

    const { instructor_id, school_id, student_id } = useParams();

    const invoiceClick = () => {
        if (location.pathname === `/student/details/${student_id}/invoice`) {
            navigate(`/student/details/${student_id}/invoice/${data?.id}`)
        } else if (location.pathname === `/instructor/details/${instructor_id}/invoice`) {
            navigate(`/instructor/details/${instructor_id}/invoice/${data?.id}`)
        } else if (location.pathname === `/school/details/${school_id}/invoice`) {
            navigate(`/school/details/${school_id}/invoice/${data?.id}`)
        }
        else navigate("/invoice/details/" + data?.id + "/" + data?.invoice_type)
    }

    useEffect(() => {

        // if (data?.action_dates) {
        // console.log("DATES", data?.id, JSON.parse(data?.action_dates))
        // setInvoiceActionDates(JSON.parse(data?.action_dates));


        switch (data?.invoice_status) {
            case "accepted":
                setInvoiceStatus("accepted");
                if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).accepted);
                break;
            case "generated":
                setInvoiceStatus("generated");
                if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).generated);
                break;
            case "rejected":
                setInvoiceStatus("rejected");
                if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).rejected);
                break;
            case "cancelled":
                setInvoiceStatus("cancelled");
                if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).cancelled);
                break;
            case "created":
                setInvoiceStatus("created");
                if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).created);
                break;
            case "requested":
                setInvoiceStatus("requested");
                if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).requested);
                break;
            case "expired":
                setInvoiceStatus("expired");
                if (data?.action_dates) { JSON.parse(data?.action_dates).expired === "null" ? setInvoiceLastAction(data?.update_date) : setInvoiceLastAction(JSON.parse(data?.action_dates).expired); }
                break;
            case "paid":
                setInvoiceStatus("paid");
                if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).paid);
                break;
            case "paid1":
                setInvoiceStatus("paid");
                if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).paid1);
                break;
            case "paid2":
                setInvoiceStatus("paid");
                if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).paid2);
                break;
            case "missing1":
                setInvoiceStatus("missing payment");
                if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).missing1);
                break;
            case "missing2":
                setInvoiceStatus("missing payment");
                if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).missing2);
                break;
            case "completed":
                setInvoiceStatus("completed");
                if (data?.action_dates) setInvoiceLastAction(JSON.parse(data?.action_dates).completed);
                break;

            default:
                setInvoiceLastAction("");
                break;
        }
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const ClickEvent = async () => {
        await navigate("/invoice/details/" + data?.id + "/" + data?.invoice_type);
    }

    return (
        <>
            <tr
                onClick={ClickEvent}
                className={`body_text text-cBlack border-b border-collapse cursor-pointer border-cNmSelect hover:bg-cGridView`} >

                {/*l        # */}
                <td className='px-s10 text-center border-r py-s10'>
                    {index}
                </td>

                {/*e           name with image */}
                <td className='border-r-[1px] px-s10 min-w-[180px] 2xl:min-w-[250px]'>
                    <span className='flex items-center py-s10'>
                        <span className='min-w-[50px]'>
                            <Image cursorPointerClass="cursor-pointer" className='rounded-full w-w44 h-h44 grow-0' src={data?.user?.from_image} alt="" />
                        </span>
                        <Tooltip title={data?.invoice_type === "license_invoice" ? data?.to_name : data?.from_name}>
                            <div className='body_text text-cGray ml-s5 max-w-[130px] 2xl:max-w-[200px] truncate'>{data?.invoice_type === "license_invoice" ? data?.to_name : data?.from_name ??
                                <CommonEmptyStatus />}</div>
                        </Tooltip>
                    </span>
                </td>

                {/*g           invoice id */}
                <td className='border-r-[1px] min-w-[120px] body_text text-cGray'>
                    <Tooltip title={data?.invoice_id ?? "NA"}>
                        <div className='truncate text-center'>
                            {data?.invoice_id ?? "NA"}
                        </div>
                    </Tooltip>
                </td>

                {/*l             user type  */}
                <td
                    className='py-s10 border-r-[1px] text-center min-w-[150px] capitalize body_text text-cGray'
                >
                    {data?.from_role && data?.to_role ?
                        data?.invoice_type === "license_invoice" ?
                            <div className="flex items-center justify-center space-x-2 w-full">
                                <div>{data?.to_role}</div>
                                <img src={iRightArrow2} alt="" className='' />
                                <div>{data?.from_role}</div>
                            </div>
                            : <div className="flex items-center justify-center space-x-2 w-full">
                                <div>{data?.from_role}</div>
                                <img src={iRightArrow2} alt="" className='' />
                                <div>{data?.to_role}</div>
                            </div>
                        : <CommonEmptyStatus />}
                </td>

                {/*b          date & time */}
                <td className='p-s10 border-r-[1px] body_text text-cGray text-center min-w-[150px]'>
                    {data?.created_at === "null" || data?.created_at === "" || data?.created_at === null ? <CommonEmptyStatus /> : formatDate(data?.created_at) + ', ' + data?.create_time}
                </td>

                {/* p       amount */}
                <td className='p-s10 border-r-[1px] text-center min-w-[180px] body_text text-cGray capitalize'>
                    {"DKK " + formatDkkPrice(data?.price)?.toLocaleString("da-DK") ?? 0}
                </td>

                {/*e             status of the invoice */}
                <td className='p-s10 border-r-[1px] relative min-w-[160px] body_text text-center capitalize text-cGray'>
                    {invoiceStatus}
                </td>

            </tr >
        </>
    )
}


export default NewInvoiceTableRow



