const kintoneService = (eventName, callBack) => {
  kintone.events.on(eventName, callBack);
};

const APP_RECORD = "app.record";

const APP_EVENTS_NAME = {
  ONLOAD_EVENT: `${APP_RECORD}.detail.show`,
};

const getSpaceField = (name) => {
  const mySpaceField = kintone.app.record.getSpaceElement(name);
  return mySpaceField;
};

const setWidthParent = (params) => {
  const { element, width } = params;

  if (width) {
    element.parentNode.style.width = width;
  }
};

const getUpdateDatetimeValue = () => {
  let updatedAt = "";
  const currentRecord = kintone.app.record.get();
  updatedAt = currentRecord.record.Updated_datetime.value;

  return updatedAt;
};

const setSpaceFieldVal = (params) => {
  const { elementSpaceField, spaceFieldValue } = params;
  elementSpaceField.innerHTML = spaceFieldValue;
};

const handleClickMenuButton = () => {
  const spaceFieldElement = getSpaceField("my_space_field");
  setWidthParent({ element: spaceFieldElement, width: "400px" });

  const updatedAt = getUpdateDatetimeValue();
  setSpaceFieldVal({
    elementSpaceField: spaceFieldElement,
    spaceFieldValue: updatedAt,
  });
};

const createMenuButton = () => {
  var myMenuButton = document.createElement("button");
  myMenuButton.id = "my_menu_button";
  myMenuButton.innerHTML = "Button";
  myMenuButton.onclick = handleClickMenuButton;

  kintone.app.record.getHeaderMenuSpaceElement().appendChild(myMenuButton);
};

const { ONLOAD_EVENT } = APP_EVENTS_NAME;

kintoneService(ONLOAD_EVENT, createMenuButton);
