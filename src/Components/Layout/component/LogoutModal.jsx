import { t } from 'i18next';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CommonButton from '../../Button/CommonButton'
import CommonModal from '../../Modal/CommonModal'

export default function LogoutModal({ showLogoutModal, setShowLogoutModal, handleUserLogout }) {

  const navigate = useNavigate();

  return (
    <>
      <CommonModal
        showModal={showLogoutModal}
        setShowModal={setShowLogoutModal}
        widthClass="w-[450px]"
        modalTitle={t("Log Out")}
        mainContent={
          <div className="flex justify-center py-5">
            <div>{t("Do you want to Log out?")}</div>
          </div>
        }
        primaryActionButton={
          <>
            <CommonButton
              roundedFull={false}
              onClick={async () => {
                await handleUserLogout();
                  navigate('/login')
              }}
              btnLabel={t("Yes")}
              colorType="danger"
              width="w-[100px]"
            />
          </>
        }
        secondaryActionButton={
          <>
            <CommonButton width="w-[100px]" roundedFull={false} btnLabel={t("No")} colorType="basic" />
          </>
        }
      />
    </>
  )
}
