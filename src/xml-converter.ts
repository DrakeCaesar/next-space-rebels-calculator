import * as fs from "fs";
import * as xml2js from "xml2js";

interface TableCell {
  value: unknown;
  type: string;
}

interface TableRow {
  cells: TableCell[];
}

interface Table {
  name: string;
  rows: TableRow[];
}

interface TextSpan {
  _: string;
  $: {
    "text:style-name": string;
  };
}

interface InputObject {
  _: string;
  "text:span": TextSpan[];
  type: string;
}

const jsonPath = "tags.json";

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
        styleName === "ce48" ||
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

const convertToString = (input: InputObject): string => {
  let result = "";

  // Concatenate the text from "text:span"
  input["text:span"].forEach((span) => {
    result += span._;
  });

  // Append the main text
  result += input._;

  return result;
};

const convertToStringSpecial = (input: InputObject): string => {
  let result = "";
  
  input["text:span"].forEach((span) => {
    result += span._;
  });
  
  return result;
};

const main = async () => {
  const xmlData = await parseXML("Tags.xml");
  const jsonData = convertToJSON(xmlData);

  // Modify rows where the first cell is empty, keeping only the second cell
  jsonData.rows.forEach((row) => {
    if (row.cells.length > 0 && row.cells[0].value === "") {
      row.cells =
        row.cells.length > 1 && row.cells[1].value !== "" ? [row.cells[1]] : [];
    }
  });

  // Filter and modify rows based on the 4th value
  const finalFilteredRows = jsonData.rows.filter((row) => {
    if (row.cells.length === 0) return false;
    if (row.cells.every((cell) => cell.value === "")) return false;

    if (row.cells.length >= 4) {
      if (row.cells[3].value !== "") {
        // Keep only the first 4 values
        row.cells = row.cells.slice(0, 4);
      } else {
        // Modify the values as specified
        row.cells[3].value = row.cells[2].value;
        row.cells[3].type = row.cells[2].type;
        row.cells[2].value = row.cells[1].value;
        row.cells[2].type = row.cells[1].type;
        row.cells[1].value = row.cells[0].value;
        row.cells[1].type = row.cells[0].type;
        // Keep only the new first 4 values
        row.cells = row.cells.slice(0, 4);
      }
    }

    return row.cells;
  });

  // fs.writeFileSync(
  //   "tags-debug.json",
  //   JSON.stringify(finalFilteredRows, null, 2),
  //   "utf-8",
  // );

  interface Tag {
    name: string;
    description: string;
    combos: string[];
  }
  const tags: Tag[] = [];
  //for ech 2 rows, combine them into one row
  for (let i = 0; i < finalFilteredRows.length; i += 2) {
    const row1 = finalFilteredRows[i];
    const row2 = finalFilteredRows[i + 1];
    if (row1 && row2) {
      let description = "";
      if ((row2.cells[0].value as InputObject)._ !== undefined) {
        description = convertToString(row2.cells[0].value as InputObject);
      } else if (
        (row2.cells[0].value as InputObject)["text:span"] !== undefined
      ) {
        description = convertToStringSpecial(
          row2.cells[0].value as InputObject,
        );
      } else {
        description = row2.cells[0].value as string;
      }

      const combos = (row1.cells[3].value as string)
        .split(", ")
        .map((combo: string) => combo.trim());

      const newTag: Tag = {
        name: row1.cells[1].value as string,
        description,
        combos,
      };

      tags.push(newTag);
    }
  }

  fs.writeFileSync("tags.json", JSON.stringify(tags, null, 2), "utf-8");

  console.log("Filtered data written to separate JSON file.");
};

main();
