import React from 'react'
import useSchoolInstructorStore from '../../../App/Stores/schoolInstructorStore'
import CommonModal from '../../../Components/Modal/CommonModal';
import { useTranslation } from 'react-i18next';
import CommonInput from '../../../Components/Input/CommonInput';
import SelectInput from '../../../Components/Input/SelectInput';
import CommonButton from '../../../Components/Button/CommonButton';

const ScheduleFilterModal = () => {

    const { showScheduleFilterModal, setShowScheduleFilterModal } = useSchoolInstructorStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showScheduleFilterModal}
                setShowModal={setShowScheduleFilterModal}
                modalSpace={true}
                modalTitle={t("Filter")}
                mainContent={
                    <>
                        <div className="space-y-5 mt-s20">
                            <div className="flex w-full space-x-5">
                                <div className='w-full'>
                                    <SelectInput
                                        // disabled={classAddForm?.school_category_id === "" ? true : false}
                                        // withStar={false}
                                        required={true}
                                        // dataArray={classroom}
                                        selectOptionOnChange={(e) => {
                                        }}
                                        label={t("Lesson type")}
                                        placeholder={t("Choose a lesson type")}
                                    />
                                </div>

                                <div className='w-full'>
                                    <SelectInput
                                        // disabled={classAddForm?.school_category_id === "" ? true : false}
                                        // withStar={false}
                                        required={true}
                                        // dataArray={classroom}
                                        selectOptionOnChange={(e) => {
                                        }}
                                        label={t("Category")}
                                        placeholder={t("Choose a Category")}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-x-5">
                                <CommonInput
                                    withStar={false}
                                    required={true}
                                    value=""
                                    onChange={(e) => { }}
                                    type='date'
                                    label={t("Start date")}
                                    placeholder={t("Select date")}
                                />

                                <CommonInput
                                    withStar={false}
                                    required={true}
                                    value={""}
                                    onChange={(e) => { }}
                                    allowPastDates={true}
                                    type='date'
                                    label={t("End date")}
                                    placeholder={t("Select date")}
                                />
                            </div>

                            <SelectInput
                                // disabled={classAddForm?.school_category_id === "" ? true : false}
                                // withStar={false}
                                required={true}
                                // dataArray={classroom}
                                selectOptionOnChange={(e) => {
                                }}
                                label={t("Status")}
                                placeholder={t("Choose a Status")}
                            />

                            <div className='flex items-center justify-center'>
                                <CommonButton
                                    width="w-[120px]"
                                    roundedFull={false}
                                    type="submit"
                                    btnLabel={t('Apply')}
                                />
                            </div>
                        </div>
                    </>
                }
            />
        </div>
    )
}

export default ScheduleFilterModal