import moment from "moment/moment.js";

export const getCurrentTime = (form = "DD-MM-YYYY HH:mm:ss") =>
  moment().format(form);
