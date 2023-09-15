import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { BsSearch } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import useUtilityStore from "../../App/Stores/UtilityStore";
import { iSearchCross } from "../../App/Utility/source";

export default function CommonSearchBox({
  value,
  onChange,
  search_loading = false,
  fullWidth = false,
  onSearchClear = () => { },
  withClearSearch = false,
  roundedFull = true,
}) {
  const { t } = useTranslation();
  const { isLoadingSearch } = useUtilityStore();

  const searchRef = useRef();
  const handleClick = () => {
    searchRef.current.value = "";
    onSearchClear();
  }
  return (
    // w-full flex items-center
    <div className={`relative ${fullWidth ? "w-full" : "w-[300px]"}`}>
      {search_loading || isLoadingSearch ? (
        <div className="absolute right-4 pl-3 border-l">
          <ImSpinner2 className="animate-spin duration-150 text-gray-500 border-gray-400 w-5 h-[35px]" />
        </div>
      ) : (
        <div className="absolute right-4 pl-3 border-l mt-s8">
          <BsSearch className="text-gray-500 border-gray-400 w-5 h-[60%]" />
        </div>
      )}

      <input
        ref={searchRef}
        value={value}
        onChange={onChange}
        // type="search"
        className={`ring-1 ring-cNmSelect ${roundedFull ? 'rounded-full' : 'rounded-br4'} h-s36 px-p15 text-sm ${fullWidth ? "w-full" : "w-[300px]"} pr-[75px]`}
        placeholder={t("Search")}
      />
      {(value && withClearSearch) ?
        <img
          src={iSearchCross}
          onClick={() => { handleClick() }}
          alt="clear-search"
          className="absolute right-[60px] top-[12px] w-s12 h-s12 cursor-pointer"
        /> : ""}

    </div>
  );
}
