import React from 'react'

function DashboardCard({title="Title",value=0}) {
    return (
        <div className="bg-cLessImportant px-s14 py-s12 rounded-br4 ">
            <div className='text-center body_text text-cGrayishBlue'>{title??'NA'}</div>
            <div className='text-center section_title text-cGrayishBlue'>{value??'NA'}</div>
        </div>
    )
}

export default DashboardCard
