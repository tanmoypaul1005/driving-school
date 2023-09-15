import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CommonEmptyStatus from '../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import CommonButton from '../../../Components/Button/CommonButton';
import useSchoolCategoryStore from '../../../App/Stores/schoolCategoryStore';
import { iDrivingCard, iExternalCard, iSchoolClassroomLesson } from '../../../App/Utility/source';
import { useTranslation } from 'react-i18next';

const SchoolDraggableList = ({ onSubmit = () => { } }) => {

    const { schoolCategoryLessonList } = useSchoolCategoryStore();

    const { t } = useTranslation();

    //e React state to track order of items
    const [itemList, setItemList] = useState(schoolCategoryLessonList);
    const [draggableAreaHeight, setDraggableAreaHeight] = useState(0);

    //l Function to update list on drop
    const handleDrop = (droppedItem) => {
        //y Ignore drop outside droppable container
        if (!droppedItem.destination) return;

        var updatedList = [...itemList];

        // Remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);

        // Add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

        // Update State
        setItemList(updatedList);
    };

    useEffect(() => {
        setItemList(schoolCategoryLessonList);
        setDraggableAreaHeight((schoolCategoryLessonList?.length + 1) * 58);
    }, [schoolCategoryLessonList]);

    return (
        <div>
            <div className={` border rounded-br10 border-collapse overflow-hidden h-[${draggableAreaHeight}px]`}>

                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="list-container">
                        {(provided) => (
                            <div
                                className={`list-container`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {/* g headers start */}
                                <div className={`cursor-default w-full border border-collapse border-cNmSelect flex items-center text-cMainBlack font-semibold`} >

                                    <div className='text-center py-[10px] w-[5%]'>
                                        {"#"}
                                    </div>

                                    <div className='text-fs16 font-fw700 border-x-[1px]  text-center p-s10 w-[40%] space-x-2.5'>
                                        {t("Name")}
                                    </div>

                                    <div className='p-s10 border-collapse  border-r-[1px] text-fs16 font-fw700 text-center w-[25%]'>
                                        {t("Duration")}
                                    </div>

                                    <div className={` text-center text-fs16 font-fw700  w-[30%] p-s10`}>
                                    {t("Price")}
                                    </div>
                                </div>

                                {/* r       headers start */}



                                {itemList?.length ? itemList?.map((item, index) => (
                                    <Draggable key={item?.lesson_name} draggableId={item?.lesson_name} index={index}>
                                        {(provided) => (
                                            <div className="item-container" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} >
                                                <div className={`w-full border cursor-pointer border-collapse border-cNmSelect flex items-center`} >

                                                    {/* b       index */}
                                                    <div className='font-normal text-center  w-[5%]'>
                                                        {index + 1}
                                                    </div>

                                                    {/* e       image + name */}
                                                    <div className='border-x-[1px] border-collapse text-left p-s10  w-[40%] flex items-center  space-x-2.5'>
                                                        <div className='max-w-[38px] min-w-[38px]'>
                                                            <img className='w-s38 h-s38 grow-0 '
                                                                src={(item?.lesson_type === 'driving' && iDrivingCard) || (item?.lesson_type
                                                                    === 'external' && iExternalCard) || (item?.lesson_type
                                                                    === 'classroom' && iSchoolClassroomLesson)} alt=""
                                                            />
                                                        </div>

                                                        <div className='capitalize truncate body_text text-cGray'>
                                                            {item?.lesson_name ? item?.lesson_name : <CommonEmptyStatus />}
                                                        </div>
                                                    </div>

                                                    {/*l       duration */}
                                                    <div className='text-center border-r-[1px] border-collapse body_text text-cGray w-[25%] p-s10'>
                                                        {item?.duration_title ? item?.duration_title : <CommonEmptyStatus />}
                                                    </div>


                                                    <div className='text-center border-r-[1px] border-collapse body_text text-cGray w-[30%] p-s10'>
                                                    {item?.price ? `DKK ${item?.price?.toLocaleString("da-DK")}` : <CommonEmptyStatus />}
                                                    </div>

                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )) : ""}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            <div className="pt-5">
                <CommonButton onClick={() => {
                    let t_array = []
                    itemList?.map((item, index) => t_array.push(
                        {
                            lesson_id: item?.id,
                            order_index: index
                        }
                    ))
                    onSubmit(t_array);
                }}
                    roundedFull={false}
                    width='w-[155px]'
                    btnLabel={t('Save Changes')}
                />
            </div>
        </div>
    )
}

export default SchoolDraggableList