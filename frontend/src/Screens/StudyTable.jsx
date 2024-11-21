// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import UploadButton from "../Components/UploadButton";

// const StudyTableRow = ({ tableRow, index }) => {
//   const [tableRowData, setTableRowData] = useState(tableRow);
//   // console.log()
//   return (
//     <>
//       <tr
//         className={`border-black/30 border-b-2 text-md ${
//           index % 2 ? "" : "bg-gray-200"
//         }`}
//       >
//         <td className="border-r-2 border-dashed border-black/30 py-2 px-1">
//           {tableRowData.patientId}
//         </td>
//         <td className="border-r-2 border-dashed border-black/30 py-2 px-1">
//           {tableRowData.bleedSubCategory}
//         </td>
//         <td className="border-r-2 border-dashed border-black/30 py-2 px-1">
//           {tableRowData.newStudyId}
//         </td>
//         <td className="border-r-2 border-dashed border-black/30 py-2 px-1">
//           {tableRowData.newStudyName}
//         </td>
//         <td className="border-r-2 border-dashed border-black/30 py-2 px-1">
//           {tableRowData.bleed ? "Bleed" : ""}
//         </td>
//         <td className="border-r-2 border-dashed border-black/30 py-2 px-1 text-center">
//           {tableRowData.uploaded ? (
//             "Uploaded"
//           ) : (
//             <UploadButton
//               tableRowData={tableRowData}
//               setTableRowData={setTableRowData}
//             />
//           )}
//         </td>
//       </tr>
//     </>
//   );
// };

// StudyTableRow.propTypes = {
//   tableRow: PropTypes.any.isRequired,
// };

// const StudyTable = ({ pageNo }) => {
//   const [tableData, setTableData] = useState([]);
//   useEffect(() => {
//     const getTable = async () => {
//       try {
//         const response = await axios.get("/api/studies?limit=15",);
//         setTableData(response?.data?.findStudies);
//         console.log(response.data.findStudies);
//       } catch (error) {
//         if (error instanceof Error) {
//           console.error(error.message);
//         } else console.log("Something went Wrong while getting the studies !");
//       }
//     };
//     getTable();
//   }, [pageNo]);
//   return (
//     <>
//       <table className="rounded-t-lg overflow-hidden gap-4 w-full mt-8">
//         <tr className="bg-green-500 text-white rounded-t-lg overflow-hidden text-xl font-normal font-mono">
//           <th className="text-left p-2 border-r-2 border-dashed border-black/30 ">
//             Patient UUID
//           </th>
//           <th className="p-2 border-r-2 border-dashed border-black/30">
//             Bleed SubCategory
//           </th>
//           <th className="p-2 border-r-2 border-dashed border-black/30">
//             New StudyID
//           </th>
//           <th className="p-2 border-r-2 border-dashed border-black/30">
//             New Study Name
//           </th>
//           <th className="p-2 border-r-2 border-dashed border-black/30">
//             Bleed
//           </th>
//           <th className="p-2 border-r-2 border-dashed border-black/30">
//             Uploaded
//           </th>
//         </tr>
//         {tableData.map((tableRow, index) => (
//           <StudyTableRow key={index} tableRow={tableRow} index={index} />
//         ))}
//       </table>
//     </>
//   );
// };

// StudyTable.propTypes = {
//   pageNo: PropTypes.number.isRequired,
//   index: PropTypes.number.isRequired,
// };

// export default StudyTable;
