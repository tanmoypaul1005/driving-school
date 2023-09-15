import React from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { iDrivingCard, iExternalCard, iInvoiceCard, iPendingRequests, iSchedule, iSchoolClassroomLesson } from '../../../App/Utility/source';
import CommonCard from '../../../Components/Card/CommonCard';
import useSchoolInstructorStore, { getSchoolInstructorsAdditionalInfo } from '../../../App/Stores/schoolInstructorStore';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function InstructorAdditionalInfo() {

    const location = useLocation();
    const { school_instructor_id } = useParams();

    const {
        setInstructor_invoice_search,
        instructor_additional_info,
        schoolInstructorDetails,
        setInstructor_classroom_search,
        setInstructor_driving_search,
        setInstructor_external_search,
        setPending_requests_search,
        setPending_requests_take
    } = useSchoolInstructorStore();

    const { t } = useTranslation();

    // useEffect(() => {
    //     if (schoolInstructorDetails?.instructor?.id) {
    //         getSchoolInstructorsAdditionalInfo(schoolInstructorDetails?.instructor?.id)
    //     }
    // }, [schoolInstructorDetails?.instructor?.id])

    return (
        <div>
            <div className="grid w-full grid-cols-1 gap-5 px-0 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 pt-s6">
                <NavLink onClick={() => { }} to={`/school-instructor/details/${school_instructor_id}/schedule`}>
                    <CommonCard
                        cardIcon={iSchedule}
                        title={t('Schedule')}
                        note={``}
                        isSelected={location.pathname === `/school-instructor/details/${school_instructor_id}/schedule`}
                    />
                </NavLink>

                <NavLink onClick={() => {
                    setPending_requests_search("");
                    setPending_requests_take(10);
                }}
                to={`/school-instructor/details/${school_instructor_id}/pending_requests`}>
                    <CommonCard
                        cardIcon={iPendingRequests}
                        title={t('Pending requests')}
                        note={``}
                        isSelected={location.pathname === `/school-instructor/details/${school_instructor_id}/pending_requests`}
                    />
                </NavLink>

                <NavLink
                    onClick={() => { setInstructor_invoice_search("") }}
                    to={`/school-instructor/details/${school_instructor_id}/invoice`}>
                    <CommonCard
                        cardIcon={iInvoiceCard}
                        title={t('Orders')}
                        note={``}
                        isSelected={location.pathname === `/school-instructor/details/${school_instructor_id}/invoice`}
                    />
                </NavLink>
            </div>
        </div>
    )
}

export default InstructorAdditionalInfo
