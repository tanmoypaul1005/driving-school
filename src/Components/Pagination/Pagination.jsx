import { useState } from "react";
import { useEffect } from "react";

export default function Pagination({
  pagesArray = [],
  currentPageNumber,
  prevPageUrl,
  nextPageUrl,
  paginationOnClick,
}) {
  const [mainPaginationArray, setMainPaginationArray] = useState(pagesArray);
  const [firstItem, setFirstItem] = useState({});
  const [lastItem, setLastItem] = useState({});

  const HandleCalculate = (data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) => {
    // console.log("YES===================================");
    data = data.splice(1, data.length - 2);
    let cIndex = 0;
    const size = data.length;
    // console.log("data:::", data);

    data.map((item) => {
      // eslint-disable-next-line eqeqeq
      if (item.label == currentPageNumber) {
        return (cIndex = data.indexOf(item));
      } else {
        return null;
      }
    });

    let res = [];
    // console.log("cIndex:::", cIndex);

    if (cIndex < 2) {
      cIndex = 2;
    }

    if (cIndex + 2 > size - 2) {
      cIndex = size - 3;
    }
    // console.log("FINAL cIndex:::", cIndex);

    for (let step = cIndex - 2; step <= cIndex + 2; step++) {
      res.push(data[step]);
    }
    // console.log("res:::", res);

    if (!res.includes(data[0])) {
      // console.log(data[0], ",First ... , ");
      setFirstItem(data[0]);
    } else {
      setFirstItem("");
    }

    if (!res.includes(data[size - 1])) {
      // console.log("...Last", data[size - 1]);
      setLastItem(data[size - 1]);
    } else {
      setLastItem("");
    }

    setMainPaginationArray(res);
    // console.log("===================================OK");
  };
  useEffect(() => {
    console.log("PAGINATION => pagesArray:: ", pagesArray);
    console.log("currentPageNumber:: ", currentPageNumber);

    // console.log("currentIndex:: ", currentIndex);
    console.log("mainPaginationArray:: ", mainPaginationArray);
    console.log("firstItem:: ", firstItem);
    console.log("lastItem:: ", lastItem);

    // pagesArray.length > 5 ??
    if (pagesArray.length > 7) {
      HandleCalculate(pagesArray);
    } else {
      setMainPaginationArray(pagesArray.splice(1, pagesArray.length - 2));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesArray]);

  console.log("=================================================");
  console.log("PAGINATION => pagesArray:: ", pagesArray);
  console.log("currentPageNumber:: ", currentPageNumber);
  console.log("mainPaginationArray:: ", mainPaginationArray);
  console.log("=================================================");
  return (
    <>
      <nav aria-label="Page navigation example float-right">
        <ul className="inline-flex -space-x-px float-right">
          <li>
            <div
              onClick={() => {
                if (prevPageUrl) {
                  paginationOnClick(prevPageUrl);
                }
              }}
              className={`py-s10 px-s12 text-cIconColor bg-cWhite rounded-l-br6 border border-cNmSelect 
            ${prevPageUrl
                  ? "cursor-pointer hover:bg-cGridView hover:text-cTextShopDetails"
                  : "cursor-not-allowed"
                }
            `}
            >
              Previous
            </div>
          </li>

          {firstItem.url ? (
            <>
              <li>
                <div
                  onClick={() => paginationOnClick(firstItem.url)}
                  className={`py-s10 px-s12 ${"text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails"}   border border-cNmSelect cursor-pointer`}
                >
                  {firstItem.label}
                </div>
              </li>

              <li>
                <div
                  // onClick={() => paginationOnClick(firstItem.url)}
                  className={`py-s10 px-s12 ${"text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails"}   border border-cNmSelect cursor-default`}
                >
                  ...
                </div>
              </li>
            </>
          ) : (
            ""
          )}

          {mainPaginationArray?.map((item, index) => (
            <li key={index}>
              <div
                onClick={() => paginationOnClick(item?.url)}
                className={`py-s10 px-s12 ${item?.active === true
                  ? "text-cChartBg1 hover:bg-cBorderBottom bg-cSelectedBar hover:text-cChartBg2"
                  : "text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails"
                  }   border border-cNmSelect cursor-pointer`}
              >
                {item?.label}
              </div>
            </li>
          ))}

          {lastItem.url ? (
            <>
              <li>
                <div
                  // onClick={() => paginationOnClick(firstItem.url)}
                  className={`py-s10 px-s12 ${"text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails"}   border border-cNmSelect cursor-default`}
                >
                  ...
                </div>
              </li>

              <li>
                <div
                  onClick={() => paginationOnClick(lastItem.url)}
                  className={`py-s10 px-s12 ${"text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails"}   border border-cNmSelect cursor-pointer`}
                >
                  {lastItem.label}
                </div>
              </li>
            </>
          ) : (
            ""
          )}

          <li>
            <div
              onClick={() => {
                if (nextPageUrl) {
                  paginationOnClick(nextPageUrl);
                }
              }}
              className={`py-s10 px-s12 text-cIconColor bg-cWhite rounded-r-br6 border border-cNmSelect
            ${nextPageUrl
                  ? "cursor-pointer hover:bg-cGridView hover:text-cTextShopDetails"
                  : "cursor-not-allowed"
                }
            `}
            >
              Next
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
