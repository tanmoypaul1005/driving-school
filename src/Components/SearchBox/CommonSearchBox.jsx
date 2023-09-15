import React from "react";
import { useTranslation } from "react-i18next";
import SearchLoader from "./SearchLoader";

export default function CommonSearchBox({ value, onChange, isLoading = false,rounded="rounded-br8" }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center relative">
      <input
        value={value}
        onChange={onChange}
        type="search"
        className={`ring-1 ring-cNmSelect rounded-br8 h-s36 px-p15 pr-s35 text-sm min-w-w200`}
        // className="ring-1 ring-cNmSelect rounded-br5 h-s36 px-p15 text-sm min-w-w200"
        placeholder={t("Search..")}
      />
      <div className="absolute right-2">
        {isLoading ? <SearchLoader /> : <SearchIcon />}
      </div>
    </div>
  );
}

const SearchIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#767676" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}