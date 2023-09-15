/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import useSchoolCategoryStore, { editLessonFn } from '../../../App/Stores/schoolCategoryStore';
import CommonModal from '../../../Components/Modal/CommonModal';
import CommonInput from '../../../Components/Input/CommonInput';
import CommonButton from '../../../Components/Button/CommonButton';
import SelectInput from '../../../Components/Input/SelectInput';
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import CommonTimePicker from '../../../Components/CommonTimePicker';
import { MinToHour, Toastr } from '../../../Utility/UtilityFunctions';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CommonButtonOutlined from '../../../Components/Button/CommonButtonOutlined';
import { useTranslation } from 'react-i18next';

const EditLessonModal = () => {

    const { setSchoolCategoryLessonDeleteId, setShowDeleteCategoryListLessonModal, schoolCategoryLessonDetails, showEditCategoryListLessonModal, setShowEditCategoryListLessonModal, setLessonsEditFromData, lessonsEditFromData } = useSchoolCategoryStore();

    const { category_id } = useParams();

    const { t } = useTranslation();

    const lessonType = [
        {
            title: t("Driving"),
            value: "driving",
            selected: schoolCategoryLessonDetails?.lesson_type === 'driving'
        }, {
            title: t("External"),
            value: "external",
            selected: schoolCategoryLessonDetails?.lesson_type === 'external',
        }, {
            title: t("Classroom"),
            value: "classroom",
            selected: schoolCategoryLessonDetails?.lesson_type === 'classroom',
        }]

    const submitSchoolCategory = async (e) => {
        e.preventDefault();
        if (lessonsEditFromData.id === "" &&
            lessonsEditFromData.name === "" && lessonsEditFromData.type === "" &&
            lessonsEditFromData.price === ""
        ) {
            Toastr({ message: "Item is required", type: "error" });
        }
        else {
            if (lessonsEditFromData.duration === "00:00") {
                Toastr({ message: "Duration is required", type: "error" });
            } else {
                const value = await editLessonFn(category_id);
                if (value) {
                    setLessonsEditFromData({
                        id: lessonsEditFromData?.id,
                        school_category_id: lessonsEditFromData?.school_category_id,
                        name: "",
                        type: "",
                        duration: "00:00",
                        is_mandatory: false,
                        price: "",
                        description: "",
                        requirement: ""
                    })
                    setShowEditCategoryListLessonModal(false)
                }
            }
        }
    }

    useEffect(() => {
        setLessonsEditFromData({
            id: schoolCategoryLessonDetails?.id,
            school_category_id: schoolCategoryLessonDetails?.school_category_id,
            name: schoolCategoryLessonDetails?.lesson_name,
            type: schoolCategoryLessonDetails?.lesson_type,
            duration: MinToHour(schoolCategoryLessonDetails?.duration_time),
            is_mandatory: schoolCategoryLessonDetails?.is_mandatory,
            is_moms: schoolCategoryLessonDetails?.is_moms === 1 ? true : false,
            price: schoolCategoryLessonDetails?.price,
            description: schoolCategoryLessonDetails?.lesson_description === 'null'
                || schoolCategoryLessonDetails?.lesson_description === null ? "" :
                schoolCategoryLessonDetails?.lesson_description,
            requirements: schoolCategoryLessonDetails?.lesson_requirements === 'null' ||
                schoolCategoryLessonDetails?.lesson_requirements === null ? "" :
                schoolCategoryLessonDetails?.lesson_requirements
        })
    }, [schoolCategoryLessonDetails])

    return (
        <div>
            <CommonModal
                modalSpace={true}
                showModal={showEditCategoryListLessonModal}
                setShowModal={setShowEditCategoryListLessonModal}
                modalTitle={t("Edit lesson details")}
                mainContent={
                    <>
                        <form onSubmit={submitSchoolCategory}>
                            <div className='space-y-4 mt-s20'>
                                <SelectInput
                                    dataArray={lessonType}
                                    value={lessonsEditFromData?.type}
                                    label={t("Choose lesson type")}
                                    placeholder={t("Choose lesson type")}
                                    required={true}
                                    selectOptionOnChange={(e) => setLessonsEditFromData({ ...lessonsEditFromData, type: e })}
                                />

                                <CommonInput
                                    max_input={50}
                                    value={lessonsEditFromData?.name}
                                    label={t("Lesson name")}
                                    placeholder={t("Lesson name")}
                                    required={true}
                                    onChange={(e) => {
                                        setLessonsEditFromData({ ...lessonsEditFromData, name: e.target.value })
                                    }}
                                />

                                <div className=''>
                                    <div className={`text-start text-cHighlighted important_text mb-s8 w-full `}>{t("Duration")}</div>
                                    <CommonTimePicker
                                        required={true}
                                        label={t("Duration")}
                                        showExtendedTimeUi={false}
                                        show_asterisk={false}
                                        size='large'
                                        init_time={lessonsEditFromData?.duration}
                                        onChange={(value) => {
                                            // const timeString = moment(value).format("HH:mm");
                                            setLessonsEditFromData({ ...lessonsEditFromData, duration: value })
                                        }}
                                    />
                                </div>

                                <CommonInput
                                    label={t('Amount (Without MOMS)')}
                                    type={'number'}
                                    unnecessaryCharacters={true}
                                    max_input={6}
                                    min_input={0}
                                    placeholder="Price"
                                    value={lessonsEditFromData?.price}
                                    onChange={(e) => {
                                        setLessonsEditFromData({ ...lessonsEditFromData, price: e.target.value })
                                    }}
                                    required={true}
                                />

                                <CommonInput
                                    max_input={255}
                                    label={t('Description')}
                                    placeholder={t("Description")}
                                    textarea={true}
                                    value={lessonsEditFromData?.description}
                                    onChange={(e) => {
                                        setLessonsEditFromData({ ...lessonsEditFromData, description: e.target.value })
                                    }}
                                />

                                <CommonInput
                                    max_input={255}
                                    label={t('Requirement')}
                                    placeholder={t('Requirement')}
                                    value={lessonsEditFromData?.requirements}
                                    textarea={true}
                                    onChange={(e) => {
                                        setLessonsEditFromData({ ...lessonsEditFromData, requirements: e.target.value })
                                    }}
                                />
                                {/* 
                                <FormControl className="w-full">
                                    <h1 className="w-full text-cHighlighted important_text">
                                        {t("Is lesson mandatory for package?")} <span className="text-cWarning">*</span>
                                    </h1>
                                    <RadioGroup
                                        className="w-full"
                                        required={true}
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <div className="flex w-full">
                                            <div className="flex justify-center ">
                                                <FormControlLabel
                                                    value="yes"
                                                    control={<Radio required={true} />}
                                                    label={t("Yes")}
                                                    checked={lessonsEditFromData?.is_mandatory === true ? true : false}
                                                    onChange={(e) => {
                                                        setLessonsEditFromData({ ...lessonsEditFromData, is_mandatory: true })
                                                    }}
                                                />
                                            </div>

                                            <div className="flex justify-center">
                                                <FormControlLabel
                                                    value="false"
                                                    control={<Radio required={true} />}
                                                    label={t("No")}
                                                    checked={lessonsEditFromData?.is_mandatory === true ? false : true}
                                                    onChange={(e) => {
                                                        setLessonsEditFromData({ ...lessonsEditFromData, is_mandatory: false })
                                                    }}
                                                />
                                            </div>

                                        </div>
                                    </RadioGroup>
                                </FormControl> */}

                                <FormControl className="w-full">
                                    <h1 className="w-full text-cHighlighted important_text">
                                        {t("Is moms calculate?")} <span className="text-cWarning">*</span>
                                    </h1>
                                    <RadioGroup
                                        className="w-full"
                                        required={true}
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <div className="flex w-full">
                                            <div className="flex justify-center ">
                                                <FormControlLabel
                                                    value="yes"
                                                    control={<Radio required={true} />}
                                                    label={t("Yes")}
                                                    checked={lessonsEditFromData?.is_moms === true ? true : false}
                                                    onChange={(e) => {
                                                        setLessonsEditFromData({ ...lessonsEditFromData, is_moms: true })
                                                    }}
                                                />
                                            </div>

                                            <div className="flex justify-center">
                                                <FormControlLabel
                                                    value="false"
                                                    control={<Radio required={true} />}
                                                    label={t("No")}
                                                    checked={lessonsEditFromData?.is_moms === true ? false : true}
                                                    onChange={(e) => {
                                                        setLessonsEditFromData({ ...lessonsEditFromData, is_moms: false })
                                                    }}
                                                />
                                            </div>

                                        </div>
                                    </RadioGroup>
                                </FormControl>

                                <div className='flex justify-between'>
                                    <CommonButtonOutlined
                                        width="w-[120px]"
                                        isFullRounded={false}
                                        onClick={() => {
                                            setSchoolCategoryLessonDeleteId(schoolCategoryLessonDetails?.id)
                                            setShowDeleteCategoryListLessonModal(true)
                                        }}
                                        colorType='danger'
                                        btnLabel={t('Delete')}
                                        type='submit' />
                                    <CommonButton width="w-[120px]" roundedFull={false} btnLabel={t('Update')} type='submit' />
                                </div>

                            </div>
                        </form>
                    </>
                }
            />
        </div>
    );
};

export default EditLessonModal;