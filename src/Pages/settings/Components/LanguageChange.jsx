import React from "react";
import { useTranslation } from "react-i18next";
import LanguageItem from "./LanguageItem";
import Settings from "../Settings";
import { useEffect } from "react";
import useSettingsStore, { schoolLanguageIndex, schoolLanguageSet } from "../../../App/Stores/SettingsStore";

const LanguageChange = () => {

  const { appLanguage, setActiveLanguage } = useSettingsStore();

  const { t } = useTranslation();

  useEffect(() => {
    schoolLanguageIndex()
  }, [])

  return (
    <Settings>
      <div>
        <h1 className="font-fw600 text-fs24 mb-s16">{t("Language change")}</h1>
      </div>
      <div className="bg-white p-s20 md:p-5 shadow rounded-br8">
        <ul className="list-none space-y-4">
          {appLanguage.map((lang, index) => {
            return (
              <LanguageItem
                key={index}
                onClick={() => {
                  if (lang?.id) {
                    schoolLanguageSet(lang?.id, lang?.langCode);
                  }
                }}
                label={lang?.langName}
                isActive={lang?.is_set}
              />
            );
          })}
        </ul>
      </div>
    </Settings>
  );
};

export default LanguageChange;
