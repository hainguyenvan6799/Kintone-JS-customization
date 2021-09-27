const createTable = (tableId) => {
  const myListTable = document.createElement("table");
  myListTable.id = tableId;
  myListTable.style.border = "1px solid";
  myListTable.style.width = "600px";

  return myListTable;
};

const setElementsOfTable = (myListTable, records) => {
  for (let i = 0; i < records.length; i++) {
    let record = records[i];

    // record number
    const myRecordTableDataFirst = setTableData({
      recordDataId: `my_record_td_${i}_1`,
      borderStyle: "1px solid",
      recordDataValue: record.Record_number.value,
    });

    // Fruit
    const myRecordTableDataSecond = setTableData({
      recordDataId: `my_record_td_${i}_2`,
      borderStyle: "1px solid",
      recordDataValue: record.Fruit.value,
    });

    // Created_datetime
    const myRecordTableDataThird = setTableData({
      recordDataId: `my_record_td_${i}_3`,
      borderStyle: "1px solid",
      recordDataValue: record.Created_datetime.value,
    });

    const recordDataList = [
      myRecordTableDataFirst,
      myRecordTableDataSecond,
      myRecordTableDataThird,
    ];
    var myRecordTableRow = setTableRow(recordDataList, "my_record_tr_" + i);

    myListTable.appendChild(myRecordTableRow);
  }
};

const setTableData = (params) => {
  const { recordDataId, borderStyle, recordDataValue } = params;
  const myRecordTableData = document.createElement("td");
  myRecordTableData.id = recordDataId;
  myRecordTableData.style.border = borderStyle;
  myRecordTableData.innerHTML = recordDataValue;

  return myRecordTableData;
};

const setTableRow = (recordDataList, recordTableRowId) => {
  const myRecordTableRow = document.createElement("tr");
  myRecordTableRow.id = recordTableRowId;
  recordDataList.map((recordData) => {
    myRecordTableRow.appendChild(recordData);
  });

  return myRecordTableRow;
};

const setContentToSpaceHeader = (myContent) => {
  const myHeaderSpace = kintone.app.getHeaderSpaceElement();
  myHeaderSpace.innerHTML = "";
  myHeaderSpace.appendChild(myContent);
};

const setAppleStyle = (fruitElement) => {
  fruitElement.style.fontWeight = "bold";
  fruitElement.style.color = "#ffffff";
  fruitElement.style.backgroundColor = "#ff0040";
};

const setBananaStyle = (fruitElement) => {
  fruitElement.style.fontWeight = "bold";
  fruitElement.style.color = "#ffffff";
  fruitElement.style.backgroundColor = "#f5da81";
};

const setAvocadoStyle = (fruitElement) => {
  fruitElement.style.fontWeight = "bold";
  fruitElement.style.color = "#ffffff";
  fruitElement.style.backgroundColor = "#38610b";
};

const setColorForFruitData = (records) => {
  const signalColorParts = kintone.app.getFieldElements("Fruit");
  for (var i = 0; i < records.length; i++) {
    // Retrieve value
    var fruit = records[i].Fruit.value;

    // Retrieve DOM element
    var part = signalColorParts[i];

    // Coloring
    if (fruit == "Apple") {
      setAppleStyle(part);
    } else if (fruit == "Banana") {
      setBananaStyle(part);
    } else if (fruit == "Avocado") {
      setAvocadoStyle(part);
    }
  }
};

(function () {
  "use strict";

  kintone.events.on("app.record.index.show", function (event) {
    const myListTable = createTable("my_list_table");

    const records = event.records;
    // loop in records retrieved

    setElementsOfTable(myListTable, records);

    setContentToSpaceHeader(myListTable);

    setColorForFruitData(records);
  });
})();
