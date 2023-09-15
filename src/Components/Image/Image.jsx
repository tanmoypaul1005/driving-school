import React from 'react';
import useUtilityStore from '../../App/Stores/UtilityStore';
import { iUserAvatar } from '../../App/Utility/source';
import { BaseUrlSrc } from './../../App/Utility/Url';


const Image = ({ src, src2, className, onClick = () => { }, dummyImage, withPreview = false, isCategoryImage = false,cursorPointerClass="cursor-default" }) => {
    const { setShowImagePopup, setShowImagePreviewSRC } = useUtilityStore();

    return (
        <>
            <img
                onClick={() => {
                    onClick();
                    if ((src || src2) && (withPreview === true)) {
                        setShowImagePopup(true);
                        // console.log("showImagePopup");
                        setShowImagePreviewSRC(src);
                    }
                }}
                className={`
                    ${isCategoryImage ? "" : "object-cover"}
                    ${className}
                    ${withPreview ? "cursor-pointer" : cursorPointerClass}
                `}
                src={src ? BaseUrlSrc + src : (src2 ? src2 : dummyImage ? dummyImage : iUserAvatar)}
                alt="Attachment"
                onError={(e) => { e.target.onerror = null; e.target.src = dummyImage ? dummyImage : iUserAvatar; setShowImagePreviewSRC(""); setShowImagePopup(false); }}
            />
        </>
    )
}

export default Image