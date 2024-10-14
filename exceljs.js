const ExcelJS = require("exceljs");

async function createPackingList() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Packing List", {
    pageSetup: { paperSize: 9, orientation: "landscape" },
  });

  // Row heights
  worksheet.getRow(1).height = 20;
  worksheet.getRow(2).height = 25;

  // Header Row (Olivia Garden and Client Info)
  worksheet.mergeCells("A1:E1");
  worksheet.getCell("A1").value = "Olivia Garden Inc.";
  worksheet.getCell("A1").font = { bold: true, size: 16 };
  worksheet.getCell("A1").alignment = { vertical: "middle", horizontal: "left" };

  worksheet.mergeCells("F1:H1");
  worksheet.getCell("F1").value = "CLIENT NAME : Jack And Jones\nCLIENT ID : JJ0001";
  worksheet.getCell("F1").alignment = { wrapText: true, horizontal: "center", vertical: "middle" };
  worksheet.getCell("F1").font = { size: 12 };

  worksheet.mergeCells("A2:E2");
  worksheet.getCell("A2").value = "Packing list (pg# 1 of 4)";
  worksheet.getCell("A2").alignment = { vertical: "middle", horizontal: "left" };

  worksheet.mergeCells("F2:H2");
  worksheet.getCell("F2").value = "615 WEST BRANDON BLVD";
  worksheet.getCell("F2").alignment = { vertical: "middle", horizontal: "center" };

  // Second Header Row (PO#, Invoice, Date)
  worksheet.mergeCells("A3:B3");
  worksheet.getCell("A3").value = "PO#:";
  worksheet.getCell("A3").alignment = { vertical: "middle", horizontal: "left" };

  worksheet.getCell("C3").value = "PO1235";

  worksheet.mergeCells("F3:G3");
  worksheet.getCell("F3").value = "INVOICE#: INV123";
  worksheet.getCell("F3").alignment = { vertical: "middle", horizontal: "center" };

  worksheet.getCell("H3").value = "DATE: 9/14/2024";

  worksheet.mergeCells("A4:B4");
  worksheet.getCell("A4").value = "Total Box(s) : 10 Total Pallet(s) : 2";

  worksheet.getCell("H4").value = "Prepared By: John";

  // Table Headers (SKU#, UPC, OG REF, etc.)
  const tableHeader = ["SKU#", "UPC", "OG REF", "", "", "", "", "Box#", "Qty#", "CHECK"];
  worksheet.addRow(tableHeader);
  worksheet.getRow(5).font = { bold: true };
  worksheet.getRow(5).alignment = { vertical: "middle", horizontal: "center" };

  // Product Rows for Pallet #1 (with borders and values)
  const productData = [
    ["SKU 04", "UPC 04", "OG 04", "", "", "", "Customer Product 04", "9", "5"],
    ["SKU 05", "UPC 05", "OG 05", "", "", "", "Customer Product 05", "9", "5"],
    ["SKU 04", "UPC 04", "OG 04", "", "", "", "Customer Product 04", "10", "10"],
    ["SKU 05", "UPC 05", "OG 05", "", "", "", "Customer Product 05", "10", "5"],
  ];

  productData.forEach((data) => {
    worksheet.addRow(data);
  });

  // Space between pallet sections
  worksheet.addRow([]);

  // Pallet #2
  const palletHeader2 = ["Pallet# 2 Total box(s): 8"];
  worksheet.addRow(palletHeader2).font = { bold: true };
  worksheet.getRow(11).alignment = { vertical: "middle", horizontal: "left" };

  const productData2 = [
    ["SKU 04", "UPC 04", "OG 04", "", "", "", "Customer Product 04", "1", "5"],
    ["SKU 05", "UPC 05", "OG 05", "", "", "", "Customer Product 05", "1", "5"],
  ];

  productData2.forEach((data) => {
    worksheet.addRow(data);
  });

  // Footer
  worksheet.addRow([]);
  worksheet.addRow([
    "Olivia Garden Inc. 2805 Verne Roberts Circle, CA 94509 USA | www.oliviagarden.com | 925 431 3636 phone | 925 431 3641 fax",
  ]);
  worksheet.getRow(15).alignment = { horizontal: "center" };

  // Apply borders
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // Column width adjustments
  worksheet.getColumn(1).width = 10;
  worksheet.getColumn(2).width = 10;
  worksheet.getColumn(3).width = 10;
  worksheet.getColumn(7).width = 25;
  worksheet.getColumn(8).width = 8;
  worksheet.getColumn(9).width = 8;

  // Save the workbook
  await workbook.xlsx.writeFile("Packing_List_Styled.xlsx");
  console.log("Packing list created successfully with the desired design!");
}

createPackingList();
