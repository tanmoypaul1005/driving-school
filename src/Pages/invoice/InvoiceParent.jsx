import React from 'react';
import { Outlet } from 'react-router-dom';

const InvoiceParent = () => {
    return (
        <>
            <Outlet/>
        </>
    );
};

export default InvoiceParent;