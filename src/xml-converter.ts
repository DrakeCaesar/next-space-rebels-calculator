import * as fs from "fs";
import * as xml2js from "xml2js";

interface TableCell {
  value: string | number;
  type: string;
}

interface TableRow {
  cells: TableCell[];
}

interface Table {
  name: string;
  rows: TableRow[];
}

const jsonFilePath = "tags.json";
const filteredJsonFilePath = "filtered_tags.json";
const countSpecificJsonFilePath = "count_specific_tags.json";

const parseXML = async (filePath: string): Promise<any> => {
  const xmlContent = fs.readFileSync(filePath, "utf-8");
  const parser = new xml2js.Parser();
  return parser.parseStringPromise(xmlContent);
};

const convertToJSON = (xmlData: any): Table => {
  const table: Table = {
    name: xmlData["office:document"]["office:body"][0]["office:spreadsheet"][0][
      "table:table"
    ][0]["$"]["table:name"],
    rows: [],
  };

  const rows =
    xmlData["office:document"]["office:body"][0]["office:spreadsheet"][0][
      "table:table"
    ][0]["table:table-row"];
  for (const row of rows) {
    const tableRow: TableRow = { cells: [] };
    const cells = row["table:table-cell"];
    for (const cell of cells) {
      const styleName = cell["$"]?.["table:style-name"];
      if (
        styleName === "ce45" ||
        styleName === "ce49" ||
        styleName === "ce59"
      ) {
        continue; // Skip cells with the specified styles
      }

      const valueType = cell["$"]?.["office:value-type"];
      let value: string | number = "";
      if (valueType === "string") {
        value = cell["text:p"] ? cell["text:p"][0] : "";
      } else if (valueType === "float") {
        value = parseFloat(cell["$"]["office:value"]);
      }
      tableRow.cells.push({ value, type: valueType });
    }
    table.rows.push(tableRow);
  }

  return table;
};

const writeJSON = (data: Table, filePath: string) => {
  const jsonContent = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonContent, "utf-8");
};

const main = async () => {
  try {
    const xmlData = await parseXML("Tags.xml");
    const jsonData = convertToJSON(xmlData);
    writeJSON(jsonData, jsonFilePath);
    console.log("Conversion completed successfully.");

    // Modify rows where the first cell is empty, keeping only the second cell
    jsonData.rows.forEach((row) => {
      if (row.cells.length > 0 && row.cells[0].value === "") {
        row.cells =
          row.cells.length > 1 && row.cells[1].value !== ""
            ? [row.cells[1]]
            : [];
      }
    });

    // Count items in cells
    let totalItems = 0;
    const countOccurrences = new Map<number, number>();

    jsonData.rows.forEach((row) => {
      const cellCount = row.cells.length;
      totalItems += cellCount;
      countOccurrences.set(
        cellCount,
        (countOccurrences.get(cellCount) || 0) + 1,
      );
    });

    console.log(`Total items in cells: ${totalItems}`);
    console.log(`Number of different counts: ${countOccurrences.size}`);
    countOccurrences.forEach((occurrence, count) => {
      console.log(`Count: ${count}, Occurrence: ${occurrence}`);
    });

    // Filter rows that don't have a cell count of 10 or 1
    const filteredRows = jsonData.rows.filter(
      (row) => row.cells.length !== 10 && row.cells.length !== 1,
    );

    // Further filter rows to omit those with 0 cells or where all values are empty strings
    const finalFilteredRows = filteredRows.filter((row) => {
      if (row.cells.length === 0) return false;
      if (row.cells.every((cell) => cell.value === "")) return false;
      return true;
    });

    const filteredData: Table = { ...jsonData, rows: finalFilteredRows };
    writeJSON(filteredData, filteredJsonFilePath);
    console.log("Filtered data written to separate JSON file.");

    // Filter rows that have a cell count of 10 or 1
    const countSpecificRows = jsonData.rows.filter(
      (row) => row.cells.length === 10 || row.cells.length === 1,
    );

    const countSpecificData: Table = { ...jsonData, rows: countSpecificRows };
    writeJSON(countSpecificData, countSpecificJsonFilePath);
    console.log("Count-specific data written to separate JSON file.");
  } catch (error) {
    console.error("Error during conversion:", error);
  }
};

main();
