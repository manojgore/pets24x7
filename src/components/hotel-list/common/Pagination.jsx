// import { useState } from "react";

// const Pagination = ({setSearchParams,totalPages}) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     setSearchParams((prev) => ({ ...prev, page:pageNumber }));
//   };

//   const renderPage = (pageNumber, isActive = false) => {
//     const className = `size-40 flex-center rounded-full cursor-pointer ${
//       isActive ? "bg-dark-1 text-white" : ""
//     }`;
//     return (
//       <div key={pageNumber} className="col-auto">
//         <div className={className} onClick={() => handlePageClick(pageNumber)}>
//           {pageNumber}
//         </div>
//       </div>
//     );
//   };

//   const renderPages = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }
//     const pages = pageNumbers.map((pageNumber) =>
//       renderPage(pageNumber, pageNumber === currentPage),
//     );
//     return pages;
//   };

//   const decreasePage = () => {
//     if (totalPages === 1) {
//     }
//     else if (currentPage === 1) {
//       setCurrentPage(totalPages);
//       setSearchParams((prev) => ({ ...prev, page: totalPages}));
//     } else {
//       setCurrentPage(currentPage-1);
//       setSearchParams((prev) => ({ ...prev, page:currentPage-1 }));
//     }
//   }

//   const increasePage = () =>{
//     if (totalPages === 1) {
//     }
//     if (currentPage === totalPages) {
//       setCurrentPage(1);
//       setSearchParams((prev) => ({ ...prev, page:1 }));
//     } else {
//       setCurrentPage(currentPage+1);
//       setSearchParams((prev) => ({ ...prev, page:currentPage+1 }));
//     }
//   }
//   return (
//     <div className="border-top-light mt-30 pt-30">
//       <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
//         <div className="col-auto md:order-1">
//           <button className="button -blue-1 size-40 rounded-full border-light" onClick={decreasePage}>
//             <i className="icon-chevron-left text-12" />
//           </button>
//         </div>

//         <div className="col-md-auto md:order-3">
//           <div className="row x-gap-20 y-gap-20 items-center md:d-none">
//             {renderPages()}
//           </div>

//           <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
//             {renderPages()}
//           </div>

//           {/* <div className="text-center mt-30 md:mt-10">
//             <div className="text-14 text-light-1">
//               1 – 20 of 300+ properties found
//             </div>
//           </div> */}
//         </div>

//         <div className="col-auto md:order-2">
//           <button className="button -blue-1 size-40 rounded-full border-light" onClick={increasePage}>
//             <i className="icon-chevron-right text-12" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
import { useState } from "react";

const Pagination = ({ setSearchParams, totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams((prev) => ({ ...prev, page: pageNumber }));
  };

  const generatePageNumbers = () => {
    const current = currentPage;
    const total = totalPages;
    const delta = 2;
    const range = new Set();

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.add(i);
      }
    }

    const sortedRange = Array.from(range).sort((a, b) => a - b);
    let rangeWithDots = [];
    let prev = 0;

    sortedRange.forEach((i) => {
      if (prev) {
        if (i - prev === 2) {
          rangeWithDots.push(prev + 1);
        } else if (i - prev !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      prev = i;
    });

    return rangeWithDots;
  };

  const renderPage = (pageNumber, isActive = false) => {
    const className = `size-40 flex-center rounded-full cursor-pointer ${isActive ? "bg-dark-1 text-white" : ""
      }`;
    return (
      <div key={pageNumber} className="col-auto">
        <div className={className} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </div>
      </div>
    );
  };

  const renderPages = () => {
    const pageNumbers = generatePageNumbers();

    return pageNumbers.map((pageNumber, index) => {
      if (pageNumber === "...") {
        return (
          <div key={`ellipsis-${index}`} className="col-auto">
            <div className="size-40 flex-center rounded-full">...</div>
          </div>
        );
      } else {
        return renderPage(pageNumber, pageNumber === currentPage);
      }
    });
  };

  const decreasePage = () => {
    const newPage = currentPage === 1 ? totalPages : currentPage - 1;
    setCurrentPage(newPage);
    setSearchParams((prev) => ({ ...prev, page: newPage }));
  };

  const increasePage = () => {
    const newPage = currentPage === totalPages ? 1 : currentPage + 1;
    setCurrentPage(newPage);
    setSearchParams((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="border-top-light mt-30 pt-30">
      <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
        <div className="col-auto md:order-1">
          <button
            className="button -blue-1 size-40 rounded-full border-light"
            onClick={decreasePage}
          >
            <i className="icon-chevron-left text-12" />
          </button>
        </div>

        <div className="col-md-auto md:order-3">
          <div className="row x-gap-20 y-gap-20 items-center md:d-none">
            {renderPages()}
          </div>

          <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
            {renderPages()}
          </div>
        </div>

        <div className="col-auto md:order-2">
          <button
            className="button -blue-1 size-40 rounded-full border-light"
            onClick={increasePage}
          >
            <i className="icon-chevron-right text-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;