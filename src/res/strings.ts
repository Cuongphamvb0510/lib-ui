import { LOCALES, type Locale } from "../constants";

interface CalendarStrings {
  month_1: string;
  month_2: string;
  month_3: string;
  month_4: string;
  month_5: string;
  month_6: string;
  month_7: string;
  month_8: string;
  month_9: string;
  month_10: string;
  month_11: string;
  month_12: string;
  weekday_mon: string;
  weekday_tue: string;
  weekday_wed: string;
  weekday_thu: string;
  weekday_fri: string;
  weekday_sat: string;
  weekday_sun: string;
  close: string;
  search: string;
  no_data: string;
}

const stringsData: Record<Locale, CalendarStrings> = {
  [LOCALES.VI]: {
    month_1: "Tháng 1",
    month_2: "Tháng 2",
    month_3: "Tháng 3",
    month_4: "Tháng 4",
    month_5: "Tháng 5",
    month_6: "Tháng 6",
    month_7: "Tháng 7",
    month_8: "Tháng 8",
    month_9: "Tháng 9",
    month_10: "Tháng 10",
    month_11: "Tháng 11",
    month_12: "Tháng 12",
    weekday_mon: "T2",
    weekday_tue: "T3",
    weekday_wed: "T4",
    weekday_thu: "T5",
    weekday_fri: "T6",
    weekday_sat: "T7",
    weekday_sun: "CN",
    close: "Đóng",
    search: "Tìm kiếm",
    no_data: "Không có dữ liệu",
  },
  [LOCALES.EN]: {
    month_1: "January",
    month_2: "February",
    month_3: "March",
    month_4: "April",
    month_5: "May",
    month_6: "June",
    month_7: "July",
    month_8: "August",
    month_9: "September",
    month_10: "October",
    month_11: "November",
    month_12: "December",
    weekday_mon: "Mon",
    weekday_tue: "Tue",
    weekday_wed: "Wed",
    weekday_thu: "Thu",
    weekday_fri: "Fri",
    weekday_sat: "Sat",
    weekday_sun: "Sun",
    close: "Close",
    search: "Search",
    no_data: "No data",
  },
};

let currentLocale: Locale = LOCALES.VI;

const strings = (locale?: Locale): CalendarStrings => {
  const localeToUse = locale || currentLocale;
  return stringsData[localeToUse];
};

export const setLocale = (locale: Locale) => {
  currentLocale = locale;
};

export const getLocale = (): Locale => {
  return currentLocale;
};

export default strings;
