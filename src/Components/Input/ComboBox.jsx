import React, { Fragment, useEffect, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox, Transition } from "@headlessui/react";

export default function ComboBox({
  data = [
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
  ],
  placeholder = "Type ID",
  onSelectItem,
  required = false,
  disabled = false,
  value,
  onChange,
  noDataMessage = "No item available to select."
}) {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [valuePrimary, setValuePrimary] = useState(value);

  const filteredPeople =
    query === ""
      ? data
      : data.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  useEffect(() => {
    // console.log("data:::", data);
  }, [data]);

  return (
    <div className="top-16 w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-visible rounded-br5 text-left ring-cNmSelect ring-[1px]">
            <Combobox.Input
              className="w-full py-s6 pl-3 pr-10 focus:ring-1 rounded-br5 text-cMainBlack "
              displayValue={(item) =>
                valuePrimary ? valuePrimary : item?.name
              }
              onChange={(event) => {
                setQuery(event.target.value)
                onChange(event.target.value)
              }}
              placeholder={placeholder}
              autoFocus={false}
              required={required}
              disabled={disabled}
            // value={value}
            // onFocusCapture={log}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-cMainBlack"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-s200 bg-white w-full overflow-auto rounded-md py-1 text-base shadow-lg">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  {noDataMessage}
                </div>
              ) : (
                filteredPeople.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 z-50 ${active ? "bg-cBrand text-white" : "text-gray-900 bg-white"
                      }`
                    }
                    // onKeyDown={() => {
                    //   onSelectItem(item);
                    //   console.log(item);
                    //   setValuePrimary(item?.name);
                    // }}
                    // tabIndex="0"
                    onClick={() => {
                      onSelectItem(item);
                      setValuePrimary(item?.name);
                    }}
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-cBrand"
                              }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
