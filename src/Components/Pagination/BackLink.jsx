import React from 'react'
import { Link } from 'react-router-dom'
import { } from '../../App/Utility/source'
import { iRIGHT_ARROW } from './../../App/Utility/source';

export default function BackLink({
  linksArray = [
    { label: "one", linkTo: "/test/one", linkFn: '' },
    { label: "two", linkTo: "/test/two" }
  ]
}) {
  // console.log(linksArray);
  return (
    <div className='text-cIconColor flex items-center button_text'>
      {
        linksArray.map((item, index) =>
          <div onClick={() => { item.linkFn("") }}>
            <Link key={index} to={item.linkTo} className={`cursor-pointer capitalize flex items-center button_text ${linksArray.length === index + 1 ? "text-cBrand" : "text-cIconColor hover:text-cBrand"}`} >
              {item.label}{linksArray.length !== index + 1 ?
                <img src={iRIGHT_ARROW} alt="arrow-right" className='mx-1 h-auto rotate-60' />
                : ""}
            </Link>
          </div>
        )
      }
    </div>
  )
}
