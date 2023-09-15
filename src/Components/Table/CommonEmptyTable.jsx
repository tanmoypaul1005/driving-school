import React from 'react'

function CommonEmptyTable() {
    return (
        <tr className='w-full'>
            <th colSpan={5} className="py-s10">
                No Data Found !
            </th>
        </tr>
    )
}

export default CommonEmptyTable
