import moment from 'moment-timezone';
import { dateTimeFormat } from '../constant/DateTimeFormat';

const convertDateTimeToTimezone = ({
  datetime,
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  format = dateTimeFormat.API_DATE_TIME_FORMAT,
  outputFormat = dateTimeFormat.API_DATE_TIME_FORMAT
}) => {
  return moment.utc(datetime, format).tz(timezone).format(outputFormat);
};

const convertDateTimeToUTC = ({
  datetime,
  format = dateTimeFormat.API_DATE_TIME_FORMAT,
  outputFormat = dateTimeFormat.API_DATE_TIME_FORMAT
}) => {
  return moment(datetime, format).utc().format(outputFormat);
};

const formatDate = ({
  date,
  format = dateTimeFormat.API_DATE_FORMAT,
  outputFormat = dateTimeFormat.DATE_FORMAT
}) => {
  return moment(date, format).format(outputFormat);
};

const formatTime = ({
  time,
  format = dateTimeFormat.API_DATE_TIME_FORMAT,
  outputFormat = dateTimeFormat.TIME_FORMAT
}) => moment(time, format).format(outputFormat);

const convertDatetimePickerFormat = (datetime) => {
  return moment(datetime).format(dateTimeFormat.API_DATE_TIME_FORMAT);
};
export {
  convertDateTimeToTimezone,
  convertDateTimeToUTC,
  formatDate,
  formatTime,
  convertDatetimePickerFormat
};
