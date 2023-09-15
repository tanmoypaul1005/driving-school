import React from 'react';
import useDashboardStore from '../../../App/Stores/dashboardStore';
import { useNavigate } from 'react-router-dom';
import useSchoolStudentStore, { getSchoolStudentIndex } from '../../../App/Stores/schoolStudentStore';
import { useTranslation } from 'react-i18next';

const StudentStatics = () => {

    const { dashboardDetails } = useDashboardStore();

    const { setStudentStatus } = useSchoolStudentStore();

    const navigateTo = useNavigate();

    const { t } = useTranslation();

    const clickEvent = async (status) => {
        await setStudentStatus(status);
        await getSchoolStudentIndex("", 10, "");
        navigateTo('/school-student')
    }

    return (
        <div>
            <div className="section_title text-cText mb-s16">{t("Student’s Statics")}</div>

            <div className="flex flex-col justify-between h-[260px]">
                <div onClick={() => { clickEvent('new_request') }} className="cursor-pointer w-full rounded-br4 flex justify-between sub_title py-s20 px-s16 ring-2 ring-[#F4F4F4]">
                    <div className="text-cPrimary">Request</div>
                    <div className="text-cBlack">{dashboardDetails?.total?.students_count?.request_student ?? 0}</div>
                </div>

                <div onClick={() => { clickEvent('pending') }} className="cursor-pointer w-full rounded-br4 flex justify-between sub_title py-s20 px-s16 ring-2 ring-[#F4F4F4]">
                    <div className="text-cSecondary">Pending</div>
                    <div className="text-cBlack">{dashboardDetails?.total?.students_count?.pending_student ?? 0}</div>
                </div>

                <div onClick={() => { clickEvent('active') }} className="cursor-pointer w-full rounded-br4 flex justify-between sub_title py-s20 px-s16 ring-2 ring-[#F4F4F4]">
                    <div className="text-cPassed">Active Student</div>
                    <div className="text-cBlack">{dashboardDetails?.total?.students_count?.active_student ?? 0}</div>
                </div>

            </div>
        </div>
    );
};

export default StudentStatics;