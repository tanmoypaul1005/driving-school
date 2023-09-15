/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import CommonModal from '../../../Components/Modal/CommonModal'
import useSchoolInstructorStore, { getActiveCategories, instructorUpdate } from '../../../App/Stores/schoolInstructorStore'
import ProfileImageUploader from '../../../Components/Image/ProfileImageUploader';
import CommonInput from '../../../Components/Input/CommonInput';
import { useTranslation } from 'react-i18next'
import CommonButton from '../../../Components/Button/CommonButton';
import Carousel from 'react-grid-carousel'
import InstructorCard from '../../../Components/Card/InstructorCard';
import useSchoolCategoryStore, { schoolCategoryIndex } from '../../../App/Stores/schoolCategoryStore';

const AddInstructorModal = () => {

    const { setInstructorImage,resetAddInstructorFormData, setAddInstructorFormData, addInstructorFormData, setShowAddInstructorModal, showAddInstructorModal, categoryList } = useSchoolInstructorStore();

    const { schoolCategoryListAll } = useSchoolCategoryStore();

    const { t } = useTranslation();

    const submitProfileData = async (event) => {
        event.preventDefault();

        console.log("addInstructorFormData", addInstructorFormData)

        const success = await instructorUpdate();
        if (success) {
            await localStorage.setItem("instructor_is_updated","");
            setShowAddInstructorModal(false);
            resetAddInstructorFormData();
        }
    }

    const applyForList = schoolCategoryListAll?.data?.filter(item => item.is_active === true);

    useEffect(() => {
        fetchInstructor();
    }, [showAddInstructorModal === true])

    const fetchInstructor = async () => {
        // if (showAddInstructorModal === true) {
            await schoolCategoryIndex("");
            await getActiveCategories();

            await setAddInstructorFormData({
                ...addInstructorFormData,
                expertise: categoryList?.map(item => {
                    return {
                        category_id: item?.id,
                        category_name: item?.name,
                        classroom: 0, driving: 0, external: 0
                }
                }),
                apply_category: applyForList?.map(item => {
                    return {
                        school_category_id: item?.id,
                        category_id: item?.category_id,
                        category_name: item?.category_name,
                        classroom: 0, driving: 0, external: 0
                    }
                })
            });
        // }
    }

     // console.log("applyForList",applyForList);
     // console.log("categoryList",categoryList);

    return (
        <div>
            <CommonModal
                showModal={showAddInstructorModal}
                setShowModal={setShowAddInstructorModal}
                modalSpace={true}
                modalTitle={t("Add Information")}
                mainContent={
                    <div>
                        <div className='flex justify-center mt-s20 mb-s8'>
                            <ProfileImageUploader
                                iImage={""}
                                imageName="image"
                                imageUploader={setInstructorImage}
                                categoryImg={false} />
                        </div>

                        <form onSubmit={submitProfileData}>
                            <div className='space-y-4'>
                                <CommonInput
                                    required={true}
                                    max_input={50}
                                    type="text"
                                    label={t("Name")}
                                    placeholder={t("Name")}
                                    value={addInstructorFormData?.name}
                                    onChange={(e) => { setAddInstructorFormData({ ...addInstructorFormData, name: e.target.value }) }}
                                />

                                <div className="grid grid-cols-2 gap-x-5">
                                    <CommonInput
                                        type="email"
                                        label={t("Email")}
                                        placeholder={t("Email")}
                                        // disabled={true}
                                        value={addInstructorFormData?.email}
                                        onChange={(e) => { setAddInstructorFormData({ ...addInstructorFormData, email: e.target.value }) }}
                                    />

                                    <CommonInput
                                        unnecessaryCharacters={true}
                                        type="number"
                                        max_input={'15'}
                                        min_input={"0"}
                                        label={t("Phone number")}
                                        placeholder={t("Phone number")}
                                        value={addInstructorFormData?.phone_number}
                                        onChange={(e) => { setAddInstructorFormData({ ...addInstructorFormData, phone_number: e.target.value }) }}
                                    />
                                </div>
                                {/* Expertise area start */}
                                <div>
                                    <span className='sub_title text-cBlack'>
                                        {t("Expertise area")}
                                    </span>

                                    <div className='grid grid-cols-3 gap-y-5 gap-x-12 mt-s16'>
                                        {
                                            categoryList?.length > 0 ?
                                                categoryList?.map((item, index) => (
                                                    <Carousel.Item>
                                                        <InstructorCard
                                                            click={true}
                                                            title={item?.name}
                                                            data={item}
                                                            key={index}
                                                            classRoomSelect={addInstructorFormData?.expertise?.find(i => i?.category_id === item?.id)?.classroom === 1 ? true : false}
                                                            drivingSelect={addInstructorFormData?.expertise?.find(i => i?.category_id === item?.id)?.driving === 1 ? true : false}
                                                            externalSelect={addInstructorFormData?.expertise?.find(i => i?.category_id === item?.id)?.external === 1 ? true : false}

                                                            onSelectClassRoom={() => {
                                                                const area = addInstructorFormData?.expertise?.find(i => i?.category_id === item?.id);
                                                                if (area?.classroom === 1) {
                                                                    addInstructorFormData?.apply_category?.map(obj => {
                                                                        if (obj?.category_id === item?.id && area?.classroom === 1) {
                                                                            obj.classroom = 0
                                                                        }
                                                                        setAddInstructorFormData({ ...addInstructorFormData, apply_category: addInstructorFormData?.apply_category });
                                                                    })
                                                                }
                                                                addInstructorFormData?.expertise?.map(obj => {
                                                                    if (obj?.category_id === item?.id) { obj.classroom = obj.classroom === 1 ? 0 : 1 }
                                                                    setAddInstructorFormData({ ...addInstructorFormData, expertise: addInstructorFormData?.expertise });
                                                                })
                                                            }}

                                                            onSelectDriving={() => {
                                                                const area = addInstructorFormData?.expertise?.find(i => i?.category_id === item?.id);
                                                                if (area?.driving === 1) {
                                                                    addInstructorFormData?.apply_category?.map(obj => {
                                                                        if (obj?.category_id === item?.id && area?.driving === 1) {
                                                                            obj.driving = 0
                                                                        }
                                                                        setAddInstructorFormData({ ...addInstructorFormData, apply_category: addInstructorFormData?.apply_category });
                                                                    })
                                                                }
                                                                addInstructorFormData?.expertise.map(obj => {
                                                                    if (obj?.category_id === item?.id) { obj.driving = obj.driving === 1 ? 0 : 1 }
                                                                    setAddInstructorFormData({ ...addInstructorFormData, expertise: addInstructorFormData?.expertise });
                                                                })
                                                            }}

                                                            onSelectExternal={() => {
                                                                const area = addInstructorFormData?.expertise?.find(i => i?.category_id === item?.id);
                                                                if (area?.external === 1) {
                                                                    addInstructorFormData?.apply_category?.map(obj => {
                                                                        if (obj?.category_id === item?.id && area?.external === 1) {
                                                                            obj.external = 0
                                                                        }
                                                                        setAddInstructorFormData({ ...addInstructorFormData, apply_category: addInstructorFormData?.apply_category });
                                                                    })
                                                                }
                                                                addInstructorFormData?.expertise.map(obj => {
                                                                    if (obj?.category_id === item?.id) { obj.external = obj.external === 1 ? 0 : 1 }
                                                                    setAddInstructorFormData({ ...addInstructorFormData, expertise: addInstructorFormData?.expertise });
                                                                })
                                                            }}
                                                        />

                                                    </Carousel.Item>
                                                )) : <div className=''>No Expertise area </div>
                                        }
                                    </div>
                                </div>
                                {/* Expertise area end */}

                                {/* Apply For start */}
                                <div>
                                    <span className='sub_title text-cBlack'>
                                        {t("Apply for")}
                                    </span>

                                    <div className='grid grid-cols-3 gap-y-5 gap-x-12 mt-s16'>
                                        {
                                            applyForList?.length > 0 ?
                                                applyForList?.map((item, index) => (
                                                    <Carousel.Item>
                                                        <InstructorCard
                                                            title={item?.category_name}
                                                            click={true}
                                                            data={item}
                                                            key={index}
                                                            classRoomSelect={addInstructorFormData?.apply_category?.find(i => i?.category_id === item?.category_id)?.classroom === 1 ? true : false}
                                                            drivingSelect={addInstructorFormData?.apply_category?.find(i => i?.category_id === item?.category_id)?.driving === 1 ? true : false}
                                                            externalSelect={addInstructorFormData?.apply_category?.find(i => i?.category_id === item?.category_id)?.external === 1 ? true : false}

                                                            onSelectClassRoom={() => {
                                                                const area = addInstructorFormData?.expertise?.find(i => i?.category_id === item?.category_id)
                                                                if (area?.category_id === item?.category_id) {
                                                                    addInstructorFormData?.apply_category?.map(obj => {
                                                                        if (obj?.category_id === item?.category_id && area?.classroom === 1) {
                                                                            obj.classroom = obj.classroom === 1 ? 0 : 1
                                                                        }
                                                                        setAddInstructorFormData({ ...addInstructorFormData, apply_category: addInstructorFormData?.apply_category });
                                                                    })
                                                                } else {
                                                                    addInstructorFormData?.apply_category?.map(obj => {
                                                                        if (obj?.category_id === item?.category_id) {
                                                                            obj.classroom = obj.classroom === 1 ? 0 : 1
                                                                        }
                                                                        setAddInstructorFormData({ ...addInstructorFormData, apply_category: addInstructorFormData?.apply_category });
                                                                    })
                                                                }
                                                            }}

                                                            onSelectDriving={() => {
                                                                const area = addInstructorFormData?.expertise?.find(i => i?.category_id === item?.category_id)
                                                                if (area?.category_id === item?.category_id) {
                                                                    addInstructorFormData?.apply_category?.map(obj => {
                                                                        if (obj?.category_id === item?.category_id && area?.driving === 1) {
                                                                            obj.driving = obj.driving === 1 ? 0 : 1
                                                                        }
                                                                        setAddInstructorFormData({ ...addInstructorFormData, apply_category: addInstructorFormData?.apply_category });
                                                                    })
                                                                } else {
                                                                    addInstructorFormData?.apply_category?.map(obj => {
                                                                        if (obj?.category_id === item?.id) {
                                                                            obj.driving = obj.driving === 1 ? 0 : 1
                                                                        }
                                                                        setAddInstructorFormData({ ...addInstructorFormData, apply_category: addInstructorFormData?.apply_category });
                                                                    })
                                                                }
                                                            }}

                                                            onSelectExternal={() => {
                                                                const area = addInstructorFormData?.expertise?.find(i => i?.category_id === item?.category_id)
                                                                if (area?.category_id === item?.category_id) {
                                                                    addInstructorFormData?.apply_category?.map(obj => {
                                                                        if (obj?.category_id === item?.category_id && area?.external === 1) {
                                                                            obj.external = obj.external === 1 ? 0 : 1
                                                                        }
                                                                        setAddInstructorFormData({ ...addInstructorFormData, apply_category: addInstructorFormData?.apply_category });
                                                                    })
                                                                } else {
                                                                    addInstructorFormData?.apply_category?.map(obj => {
                                                                        if (obj?.category_id === item?.id) {
                                                                            obj.external = obj.external === 1 ? 0 : 1
                                                                        }
                                                                        setAddInstructorFormData({ ...addInstructorFormData, apply_category: addInstructorFormData?.apply_category });
                                                                    })
                                                                }
                                                            }}
                                                        />
                                                    </Carousel.Item>
                                                )) : <div className='body-text'>No Active Category</div>
                                        }
                                    </div>
                                </div>
                                {/* Apply For end start */}

                                <CommonInput
                                    textarea={true}
                                    type="text"
                                    max_input={'250'}
                                    label={t("Description")}
                                    value={addInstructorFormData?.about}
                                    onChange={(e) => { setAddInstructorFormData({ ...addInstructorFormData, about: e.target.value }) }}
                                    placeholder={t("Description")}
                                />


                                <div className='flex items-center justify-center '>
                                    <CommonButton type="submit" btnLabel={t("Save")} colorType="primary" roundedFull={false} />
                                </div>
                            </div>
                        </form>
                    </div>
                }
            />
        </div>
    )
}

export default AddInstructorModal