/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Settings from '../Settings';
import { useEffect } from 'react';
import useSettingsStore, { getFaqList } from '../../../App/Stores/SettingsStore';
import CommonEmptyStatus from '../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import { useTranslation } from 'react-i18next';

export default function FaqManagement() {

    const { faqListAll } = useSettingsStore();
    const { t } = useTranslation();

    useEffect(() => {
        fetchCategoryData()
    }, []);

    const fetchCategoryData = async () => {
        await getFaqList();
    }

    return (
        <Settings>
            <div>
                <h1 className="section_title text-cBlack mb-s8 ">{t("Frequently asked questions(FAQ)")}</h1>
            </div>

            {faqListAll?.data?.length > 0 ?
                faqListAll?.data?.map((item, index) => (
                    <div key={index} className='p-0 mb-s8'>
                        <Accordion>
                            <div className='h-[48px] rounded-br8'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography>
                                        <span className='sub_title text-cBlack'>
                                            {item?.title}
                                        </span>
                                    </Typography>
                                </AccordionSummary>
                            </div>

                            <AccordionDetails>
                                <Typography>
                                    <span className='body_text text-cGray'></span>
                                    {item?.description ? item?.description : <CommonEmptyStatus textColor='text-cGray' />}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>))
                : <span className='my-s20 body_text text-cGray'>{t("No FAQ found")}</span>
            }
        </Settings >
    );
}
