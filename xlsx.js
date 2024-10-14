// const XLSX = require("xlsx");
// const fs = require("fs");

// function createPackingList() {
//   // Create a new workbook and worksheet
//   const wb = XLSX.utils.book_new();
//   const ws = [];

//   // Helper function to add merged cells in a worksheet
//   const addMergeCell = (worksheet, s, e) => {
//     if (!worksheet["!merges"]) worksheet["!merges"] = [];
//     worksheet["!merges"].push({ s, e });
//   };

//   // Header rows and merged cells
//   const data = [
//     [
//       "Olivia Garden Inc.",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "CLIENT NAME : Jack And Jones\nCLIENT ID : JJ0001",
//     ],
//     ["Packing list (pg# 1 of 4)", "", "", "", "", "", "", "", "615 WEST BRANDON BLVD"],
//     ["PO#:", "PO1235", "", "", "", "", "INVOICE#: INV123", "DATE: 9/14/2024"],
//     ["Total Box(s): 10 Total Pallet(s): 2", "", "", "", "", "", "", "Prepared By: John"],
//     ["SKU#", "UPC", "OG REF", "", "", "", "", "Box#", "Qty#", "CHECK"],
//   ];

//   // Adding some rows for SKU data (pallet #1)
//   data.push(["SKU 04", "UPC 04", "OG 04", "", "", "", "Customer Product 04", "9", "5"]);
//   data.push(["SKU 05", "UPC 05", "OG 05", "", "", "", "Customer Product 05", "9", "5"]);
//   data.push(["SKU 04", "UPC 04", "OG 04", "", "", "", "Customer Product 04", "10", "10"]);
//   data.push(["SKU 05", "UPC 05", "OG 05", "", "", "", "Customer Product 05", "10", "5"]);

//   // Adding an empty row to separate pallet sections
//   data.push(["Pallet# 2 Total box(s): 8"]);

//   // Adding more SKU data (pallet #2)
//   data.push(["SKU 04", "UPC 04", "OG 04", "", "", "", "Customer Product 04", "1", "5"]);
//   data.push(["SKU 05", "UPC 05", "OG 05", "", "", "", "Customer Product 05", "1", "5"]);

//   // Adding the footer
//   data.push([]);
//   data.push([
//     "Olivia Garden Inc. 2805 Verne Roberts Circle, CA 94509 USA | www.oliviagarden.com | 925 431 3636 phone | 925 431 3641 fax",
//   ]);

//   // Converting data to sheet
//   const ws_data = XLSX.utils.aoa_to_sheet(data);

//   // Merge cells (based on the image layout)
//   addMergeCell(ws_data, { r: 0, c: 0 }, { r: 0, c: 4 });
//   addMergeCell(ws_data, { r: 0, c: 5 }, { r: 0, c: 8 });
//   addMergeCell(ws_data, { r: 1, c: 0 }, { r: 1, c: 4 });
//   addMergeCell(ws_data, { r: 1, c: 5 }, { r: 1, c: 8 });
//   addMergeCell(ws_data, { r: 2, c: 0 }, { r: 2, c: 1 });
//   addMergeCell(ws_data, { r: 3, c: 0 }, { r: 3, c: 1 });
//   addMergeCell(ws_data, { r: 4, c: 0 }, { r: 4, c: 6 });
//   addMergeCell(ws_data, { r: 9, c: 0 }, { r: 9, c: 6 });
//   addMergeCell(ws_data, { r: 11, c: 0 }, { r: 11, c: 8 });

//   // Adding the sheet to the workbook
//   XLSX.utils.book_append_sheet(wb, ws_data, "Packing List");

//   // Writing the file to disk
//   const exportFileName = "packing_list_xlsx_package.xlsx";
//   XLSX.writeFile(wb, exportFileName);
//   console.log("Packing list created successfully! Check the file: " + exportFileName);
// }

// createPackingList();

const XLSX = require("xlsx");
const fs = require("fs");

function createPackingList() {
  // Create a new workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws_data = [];

  // Helper function to add merged cells in a worksheet
  const addMergeCell = (worksheet, s, e) => {
    if (!worksheet["!merges"]) worksheet["!merges"] = [];
    worksheet["!merges"].push({ s, e });
  };

  // Add content to worksheet (headers, product rows, etc.)
  const data = [
    // Header Section
    [
      "Olivia Garden Inc.",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "CLIENT NAME : Jack And Jones\nCLIENT ID : JJ0001",
    ],
    ["Packing list (pg# 1 of 4)", "", "", "", "", "", "", "", "615 WEST BRANDON BLVD"],
    ["PO#:", "PO1235", "", "", "", "", "INVOICE#: INV123", "DATE: 9/14/2024"],
    ["Total Box(s): 10 Total Pallet(s): 2", "", "", "", "", "", "", "Prepared By: John"],

    // Column Headers
    ["SKU#", "UPC", "OG REF", "", "", "", "", "Box#", "Qty#", "CHECK"],

    // Pallet #1 Data
    ["SKU 04", "UPC 04", "OG 04", "", "", "", "Customer Product 04", "9", "5"],
    ["SKU 05", "UPC 05", "OG 05", "", "", "", "Customer Product 05", "9", "5"],
    ["SKU 04", "UPC 04", "OG 04", "", "", "", "Customer Product 04", "10", "10"],
    ["SKU 05", "UPC 05", "OG 05", "", "", "", "Customer Product 05", "10", "5"],

    // Separate Pallet #2
    ["Pallet# 2 Total box(s): 8"],

    // Pallet #2 Data
    ["SKU 04", "UPC 04", "OG 04", "", "", "", "Customer Product 04", "1", "5"],
    ["SKU 05", "UPC 05", "OG 05", "", "", "", "Customer Product 05", "1", "5"],

    // Footer
    [""],
    [
      "Olivia Garden Inc. 2805 Verne Roberts Circle, CA 94509 USA | www.oliviagarden.com | 925 431 3636 phone | 925 431 3641 fax",
    ],
  ];

  // Populate worksheet with data
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Merging Cells to Create Layout
  addMergeCell(ws, { r: 0, c: 0 }, { r: 0, c: 4 }); // "Olivia Garden Inc."
  addMergeCell(ws, { r: 0, c: 5 }, { r: 0, c: 8 }); // "CLIENT NAME: ..."

  addMergeCell(ws, { r: 1, c: 0 }, { r: 1, c: 4 }); // "Packing list (pg# 1 of 4)"
  addMergeCell(ws, { r: 1, c: 5 }, { r: 1, c: 8 }); // "615 WEST BRANDON BLVD"

  addMergeCell(ws, { r: 2, c: 0 }, { r: 2, c: 1 }); // "PO#:"
  addMergeCell(ws, { r: 3, c: 0 }, { r: 3, c: 6 }); // "Total Box(s) : 10..."

  addMergeCell(ws, { r: 5, c: 0 }, { r: 5, c: 2 }); // Header "SKU# UPC OG REF"
  addMergeCell(ws, { r: 9, c: 0 }, { r: 9, c: 6 }); // "Pallet# 2 Total box(s): 8"

  // Set column widths for better layout
  ws["!cols"] = [
    { wch: 15 }, // Column A
    { wch: 10 }, // Column B
    { wch: 10 }, // Column C
    { wch: 15 }, // Column D
    { wch: 15 }, // Column E
    { wch: 20 }, // Column F
    { wch: 20 }, // Column G
    { wch: 10 }, // Column H
    { wch: 10 }, // Column I
  ];

  // Apply custom styling (bold for header, text wrap, etc.)
  const headerCellStyle = {
    font: { bold: true },
    alignment: { horizontal: "center", vertical: "middle", wrapText: true },
  };

  const footerCellStyle = {
    font: { italic: true },
    alignment: { horizontal: "center" },
  };

  // Apply header styling
  for (let i = 0; i <= 4; i++) {
    const cell = ws[XLSX.utils.encode_cell({ r: i, c: 0 })];
    if (cell) cell.s = headerCellStyle;
  }

  // Apply footer styling
  ws["A14"].s = footerCellStyle;

  // Add borders around data
  const borderStyle = {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };

  for (let R = 0; R <= data.length; R++) {
    for (let C = 0; C < data[0].length; C++) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
      if (ws[cellAddress]) ws[cellAddress].s = { border: borderStyle };
    }
  }

  // Add the sheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Packing List");

  // Write the workbook to an Excel file
  XLSX.writeFile(wb, "packing_list_improved.xlsx");
  console.log("Packing list created successfully!");
}

createPackingList();
