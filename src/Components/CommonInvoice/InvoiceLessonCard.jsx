import React from 'react';
import { iStudentCard } from '../../App/Utility/source';
import Image from '../Image/Image';

const InvoiceLessonCard = ({ data }) => {

    return (
        <div>
            <div className='mt-s5 flex justify-between text-fs14 text-cHighlighted font-fw500 bg-cInvoiceLesson rounded-br10'>
                <div>
                    <div className='flex'>
                        <div className='rounded-full w-s50 h-s50 py-s10 px-s10 bg-cBackgroundAndCategory my-s5 mx-s10'>
                            <Image className='h-s30 w-s30' src={iStudentCard} />
                        </div>
                        <div className='my-s8'><div className='text-cBlack text-fs14 font-fw600'>
                            {data?.title}</div>
                            <div className='text-cBlack text-fs12 font-fw400'>
                                Duration {data?.time} Hr</div></div>
                    </div>
                </div>

                <div className='mr-s10 text-cBlack text-fw600 text-fs14 my-s20'>DKK {data?.price}</div>
            </div>
        </div>
    );
};

export default InvoiceLessonCard;