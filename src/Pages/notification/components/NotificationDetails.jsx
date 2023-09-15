import React from 'react'
import { iCalendarNotification, iWatchNotification } from '../../../../App/Utility/source'
import useNotificationStore from '../../../../App/Stores/notificationStore'
import { formatDate } from '../../../../App/Utility/UtilityFunctions';

function NotificationDetails({ notification, selectedNotification }) {

    const { notificationDetails } = useNotificationStore();

    return (
        <>
            <div className="bg-white p-2 md:px-5 py-5 shadow rounded-xl">
              {notificationDetails?.title?  <div className='space-y-5'>
                    <div className="text-fs18 font-fw600 text-cMainBlack text-capitalize text-lowercase break-all">
                        {notificationDetails?.title ? notificationDetails?.title : 'NA'}
                    </div>

                    <div className="text-fs14 font-fw400 text-cTextBody text-capitalize text-lowercase break-all">
                        {notificationDetails?.description ? notificationDetails?.description : 'NA'}
                    </div>

                    <div className="flex justify-end items-center space-x-5">
                        <div className="flex justify-end items-center ">
                            <img src={iCalendarNotification} alt="" />
                            <span className='ml-s5 text-fs12 font-fw400 text-cTextBody'>
                                {formatDate(notificationDetails?.created_date)}
                            </span>
                        </div>

                        <div className="flex justify-end items-center">
                            <img src={iWatchNotification} alt="" />
                            <span className='ml-s5 text-fs12 font-fw400 text-cTextBody'>
                                {notificationDetails?.created_time}
                            </span>
                        </div>
                    </div>
                </div>:'No Notification'}
            </div>
        </>
    )
}

export default NotificationDetails