import React from 'react';
import { Outlet } from 'react-router-dom';

const InstructorParent = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default InstructorParent;