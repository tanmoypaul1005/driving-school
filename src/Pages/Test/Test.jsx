import React, { useEffect } from "react";
import { PageTitle } from "../../App/Utility/UtilityFunctions";
import CommonTable2 from "../../Components/Table/CommonTable2";
import Dashboard from "../dashboard/Dashboard";
import NewInstructor from "../Instructor/components/newInstructor/NewInstructor";


const Test = () => {

  const tableColumns = [
    { index: 1, name: "#" },
    { index: 2, name: "Brand Name" },
    { index: 3, name: "Model Name" },
    { index: 4, name: "Color" },
    { index: 5, name: "Price" },
  ]

  const tableData = {
    data: [
      {
        id: 1,
        brand_name: "Audi",
        model_name: "A3",
        color: "Black",
        price: "60106062",
      },
      {
        id: 2,
        brand_name: "BMW",
        model_name: "X5",
        color: "White",
        price: "163378095",
      },
      {
        id: 3,
        brand_name: "Honda",
        model_name: "Civic",
        color: "Red",
        price: "212706096",
      },
      {
        id: 4,
        brand_name: "Toyota",
        model_name: "Corolla",
        color: "Magenta",
        price: "307653366",
      },
      {
        id: 5,
        brand_name: "Ford",
        model_name: "Fiesta",
        color: "Silver",
        price: "247855480",
      },

    ]
  }

  useEffect(() => {
    PageTitle("Play Ground");
  }, []);

  return (
    <>
      {/* <div
        onClick={() => { console.log("mainObject"); }}
        className="flex flex-col justify-center items-center py-10 w-full h-[15vh] text-4xl font-thin shadow-lg text-cTextBlack bg-slate-300 rounded-br10">
        TEST - PAGE
      </div>
      <div className="mt-s20"></div>
       <Dashboard/>  */}
      <NewInstructor />

      {/* <div className="px-10 py-10 h-[85vh] bg-cyan-400">
        <CommonTable2

          headers={tableColumns}

          showSearchBox={true}
          showTakeOption={true}
          showTopRightFilter={true}

          items={
            tableData?.data?.length > 0 ? tableData?.data?.map((item, index) =>
              <GenTableRow data={item} />
            )
              : ""
          }
        />
      </div> */}

    </>
  );
};

export default Test;

const GenTableRow = ({ data }) => {
  return (
    <tr className="border border-collapse">
      <td className="py-2 text-center border-l">{data?.id}</td>
      <td className="py-2 pl-2 text-left border-l">{data?.brand_name}</td>
      <td className="py-2 pl-2 text-left border-l">{data?.model_name}</td>
      <td className="py-2 pl-2 text-left border-l">{data?.color}</td>
      <td className="py-2 pl-2 text-left border-l">{data?.price}</td>
    </tr>
  )
}