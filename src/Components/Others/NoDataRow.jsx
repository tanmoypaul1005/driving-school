import React from 'react'

function NoDataRow({ message = "No Data Found !", columnNumber = 5 }) {
  return (
    <tr className='w-full'>
      <th colSpan={columnNumber} className="py-s10">
        {message}
      </th>
    </tr>
  )
}

export default NoDataRow