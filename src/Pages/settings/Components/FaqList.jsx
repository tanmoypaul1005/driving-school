import React from 'react';
import { useState, useEffect } from 'react';
import useSettingsStore, { faqToggleStatus, getFaqDetail } from '../../../App/Stores/SettingsStore';
import { iSettingsEditIcon } from '../../../App/Utility/source';
import CommonAccordion from "../../../Components/Accordion/CommonAccordion";
import CommonEmptyStatus from '../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import GreenSwitch from '../../../Components/Switch/GreenSwitch';
import { k_role } from '../../../App/Utility/const';

const FaqList = ({ data }) => {

    const { setShowEditFaqModal, setShowFaqDeactivateModal, setFaqActiveID } = useSettingsStore();

    const [enabled, setEnabled] = useState(false);

    const role=localStorage.getItem('maway_role')

    const HandleDeactivate = async () => {
        await setFaqActiveID(data?.id)
        if (enabled === true) {

            await setShowFaqDeactivateModal(true);
        } else {
            let activateSuccess = await faqToggleStatus(data?.id);
            if (activateSuccess) setEnabled(true);
        }
    }

    useEffect(() => {
        setEnabled(data?.is_active === 'true' || data?.is_active === true ? true : false);
    }, [data]);

    return (
        <div>
            <div>
                <CommonAccordion
                    header={
                        <div className="card flex flex-row justify-between align-middle w-full">
                            <div className="text-fs16 font-semibold pb-s8  capitalize">
                                <span className=''>
                                    <span className='w-s150'> {data?.title ? data?.title : <CommonEmptyStatus />}</span>
                                    <span className='uppercase ml-s10 text-fs8 border-cBrandColor border rounded-full px-s3  text-cBrandColor font-normal'>
                                        {data?.app_type ? data?.app_type :
                                            <CommonEmptyStatus fontWeight='font-normal' textColor='text-cBrandColor' size='text-fs8' />}
                                    </span>
                                </span>
                            </div>
                        </div>
                    }
                    rightIconWidth="w-[115px]"
                    rightEndIcon={
                        role === k_role.admin ? <div className="flex items-center justify-end">

                            <img
                                src={iSettingsEditIcon}
                                alt=""
                                onClick={async (e) => {
                                    e.preventDefault();
                                    await getFaqDetail(data?.id);
                                    setShowEditFaqModal(true);
                                }}
                                className="w-s20 h-s20 object-cover ml-s5 mr-s10"
                            />

                            <GreenSwitch
                                enabled={enabled}
                                setEnabled={() => HandleDeactivate()}
                                width='w-s30'
                                height='h-s16'
                                toggleButtonWidth="w-s12"
                                toggleButtonHeight="h-s10"
                            />
                        </div> : ""
                    }
                    body={
                        <div className="max-h-s250 overflow-y-auto text-fs14 text-cTextBody">
                            <div className="max-h-s250 overflow-y-auto text-fs14 bg-cBrandColor2 text-cTextBody">
                                {data?.description ? data?.description : <CommonEmptyStatus textColor='text-cTextBody' />}
                            </div>
                        </div>
                    }
                />
            </div>
           
        </div>
    );
};

export default FaqList;