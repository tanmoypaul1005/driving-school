import React from 'react'
import useUtilityStore from '../../App/Stores/UtilityStore'
import { iCloseRed } from '../../App/Utility/source';
import CommonModal from '../Modal/CommonModal'
import Image from './Image';

const ImagePreviewPopup = () => {
    const { showImagePopup, setShowImagePopup, showImagePreviewSRC } = useUtilityStore();

    return (
        <>
            <CommonModal
                modalSpace = {true}
                showModal={showImagePopup}
                setShowModal={setShowImagePopup}
                customClose={iCloseRed}
                widthClass="w-fit"
                mainContent={
                    <div className='w-full max-w-[95vw]'>
                        <Image
                            className={"object-contain w-full max-w-[95vh] h-screen rounded-br5"}
                            src={showImagePreviewSRC}
                        />
                    </div>
                }
            />
        </>
    )
}

export default ImagePreviewPopup