import React from 'react'
import {useRef} from 'react';
import { iProfile } from '../../App/Utility/source';
export default function InputImage({CustomStyles}) {
  const inputRef = useRef(null)

    const handleClick = () => {
        inputRef.current.click()
    }

    const handleFileChange = (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        event.target.value = null;

        // console.log('fileObj is', fileObj);

    }

  return (
    <>
        <div className="bg-cPlaceholder p-s35 rounded-full" onClick={handleClick}>
            <input type="file" className='hidden' ref={inputRef} onChange={handleFileChange}/>
            <img src={iProfile} alt="camera-icon" />
            
        </div>
    </>
  )
}
