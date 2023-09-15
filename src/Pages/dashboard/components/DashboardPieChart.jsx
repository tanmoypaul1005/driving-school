import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import useDashboardStore from '../../../App/Stores/dashboardStore';
import { useNavigate } from 'react-router-dom';

const DashboardPieChart = () => {

    const { dashboardDetails } = useDashboardStore();

    const navigate = useNavigate();

    const total = dashboardDetails?.total?.students_count?.active_student +
        dashboardDetails?.total?.students_count?.request_student +
        dashboardDetails?.total?.students_count?.pending_student;

    const clickEvent = () => {
        // navigate('/school-student')
    }
    

    return (
        <div className="pt-s20">
            <div className="px-s20 ">
                <PieChart
                    lineWidth={28}
                    data={[
                        {
                            title: 'Pending',
                            value: (dashboardDetails?.total?.students_count?.pending_student / total) * 100,
                            color: '#EFA434'
                        },
                        {
                            title: 'Request',
                            value: (dashboardDetails?.total?.students_count?.request_student / total) * 100,
                            color: '#2257AA'
                        },
                        {
                            title: 'Active Student',
                            value: (dashboardDetails?.total?.students_count?.active_student / total) * 100,
                            color: '#2DBB55'
                        },
                    ]}
                />
            </div>
            <div className="px-s20 pb-s20">
                <div className="flex space-x-2">
                    <div className="mt-s4 bg-cBrandColor w-s10 h-s10"></div>
                    <div onClick={clickEvent} className="cursor-pointer text-fs16 font-fw400 cBlack">
                        Request: {dashboardDetails?.total?.students_count?.request_student ?? 0}</div>
                </div>

                <div className="flex space-x-2">
                    <div className="mt-s4 bg-[#EFA434] w-s10 h-s10"></div>
                    <div onClick={clickEvent} className="cursor-pointer text-fs16 font-fw400 cBlack">Pending: {dashboardDetails?.total?.students_count?.pending_student ?? 0}</div>
                </div>

                <div className="flex space-x-2">
                    <div className="mt-s4 bg-[#2DBB55] w-s10 h-s10"></div>
                    <div onClick={clickEvent} className="cursor-pointer text-fs16 font-fw400 cBlack">
                        Active Student: {dashboardDetails?.total?.students_count?.active_student ?? 0}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DashboardPieChart;