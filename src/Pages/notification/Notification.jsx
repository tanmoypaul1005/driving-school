/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import CommonTitle from "../../Components/Title/CommonTitle.jsx";
import useNotificationStore, { getNotification } from "../../App/Stores/notificationStore.js";
import CommonTable2 from "../../Components/Table/CommonTable2.jsx";
import NotificationTableRow from "./table/NotificationTableRow.jsx";
import { useDebounce } from "use-debounce";
import { useTranslation } from "react-i18next";
import useLayoutStore from "../../App/Stores/LayoutStore.js";
import { PageTitle } from "../../Utility/UtilityFunctions.js";

function Notification() {

    const { setBarTitle } = useLayoutStore();

    const { t } = useTranslation()

    const { setNotification_page_url, notificationSearch, setNotificationSearch, notification_take, setNotification_take, notificationList } = useNotificationStore()

    const notificationHeaders = [
        { index: 1, name: t("#") },
        { index: 2, name: t("Title") },
        { index: 3, name: t("Details") },
        { index: 4, name: t("Date & time") },
        // { index: 5, name: t("Status") }
    ];

    const [searchValue] = useDebounce(notificationSearch, 500);

    useEffect(() => {
        setNotification_take(10)
        if (notificationSearch === "") {
            getNotification("")
        } else {
            getNotification("", searchValue)
        }
    }, [searchValue])

    useEffect(() => {
        window.scrollTo(0, 0);
        PageTitle(t("Notification"));
        setBarTitle(t("Notification"));
    }, [t])


    return (
        <>
            <CommonTitle title={t("Notification")} />
            <div className='overflow-hidden bg-cBrandColor2 rounded-br8'>
                <CommonTable2
                    headers={notificationHeaders}
                    tableTitle=""
                    paginationObject={notificationList}
                    totalResult={true}

                    showPageCountText={true}
                    showPagination={true}

                    paginationOnClick={async (url) => {
                        await setNotification_page_url(url)
                        if (notificationSearch === "") {
                            await getNotification(url)
                        } else {
                            await getNotification(url, searchValue)
                        }
                    }}

                    showTopRightFilter={false}

                    showTakeOption={true}
                    currentTakeAmount={notification_take}
                    takeOptionOnChange={async (e) => {
                        await setNotification_take(e);
                        getNotification("",notificationSearch);
                    }}
                    showSearchBox={true}
                    withClearSearch={true}
                    searchValue={notificationSearch}
                    onSearchClear={() => setNotificationSearch("")}
                    searchOnChange={(e) => setNotificationSearch(e.target.value)}

                    autoManageRow={true}
                    TableRowComponent={NotificationTableRow}
                />
            </div>

        </>
    );
}

export default Notification;
