const kintoneService = (eventName, callBack) => {
  kintone.events.on(eventName, callBack);
};

const APP_RECORD = "app.record";

const APP_EVENTS_NAME = {
  ONLOAD_EVENT: `${APP_RECORD}.detail.show`,
  ONLOAD_RECORD_EDIT: `${APP_RECORD}.edit.show`,
  ONLOAD_RECORD_CREATE: `${APP_RECORD}.create.show`,
  ONLOAD_RECORD_LIST: `${APP_RECORD}.index.show`,
};

const showDetailMessage = (event) => {
  const {
    record: { Task, DeadLine },
  } = event;
  const taskVal = Task.value;
  const deadLine = DeadLine.value;
  const detailMessage = `Deadline of task ${taskVal} is ${deadLine}`;
  window.alert(detailMessage);

  return event;
};

const getRecord = (event) => {
  console.log(event);
};

const {
  ONLOAD_EVENT,
  ONLOAD_RECORD_EDIT,
  ONLOAD_RECORD_CREATE,
  ONLOAD_RECORD_LIST,
} = APP_EVENTS_NAME;

kintoneService(ONLOAD_EVENT, showDetailMessage);
kintoneService(ONLOAD_RECORD_EDIT, getRecord);
kintoneService(ONLOAD_RECORD_CREATE, getRecord);
kintoneService(ONLOAD_RECORD_LIST, getRecord);
