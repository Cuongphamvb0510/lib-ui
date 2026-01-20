import moment from "moment";
import { forwardRef, useImperativeHandle, useState } from "react";
import type { ForwardedRef } from "react";
import {
  LOCALES,
  TEXT_COLORS,
  TEXT_TYPES,
  TEXT_WEIGHTS,
  type Locale,
} from "../../constants";
import strings from "../../res/strings";
import { IconComponent } from "../Icon/IconComponent";
import { BText } from "../Text";
import "./BCalendar.scss";

interface BCalendarProps {
  onApplyDate?: (start: Date, end: Date) => void;
  textNote?: string;
  locale?: Locale;
}

export type BCalendarRef = {
  _open: () => void;
  _getDate: () => {
    start: string;
    end: string;
  };
};

const BCalendar = (props: BCalendarProps, ref: ForwardedRef<BCalendarRef>) => {
  const { locale = LOCALES.VI } = props;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMonthYearPickerOpen, setIsMonthYearPickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());

  // Calendar functions
  const _getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const _getFirstDayOfMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const _formatMonthYear = (date: Date) => {
    const calendarStrings = strings(locale);
    const months = [
      calendarStrings.month_1,
      calendarStrings.month_2,
      calendarStrings.month_3,
      calendarStrings.month_4,
      calendarStrings.month_5,
      calendarStrings.month_6,
      calendarStrings.month_7,
      calendarStrings.month_8,
      calendarStrings.month_9,
      calendarStrings.month_10,
      calendarStrings.month_11,
      calendarStrings.month_12,
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} - ${year}`;
  };

  const _navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const _handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Đợi animation hoàn thành (300ms)
  };

  const _handleDateSelect = (day: number, monthOffset: number = 0) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + monthOffset,
      day
    );

    // Kiểm tra nếu ngày được chọn là ngày tương lai thì không cho chọn
    if (moment(selectedDate).isAfter(moment(), "day")) {
      return;
    }

    setSelectedDate(selectedDate);

    // Nếu chọn ngày từ tháng trước hoặc tháng sau, cập nhật currentMonth
    if (monthOffset !== 0) {
      setCurrentMonth(
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + monthOffset,
          1
        )
      );
    }

    // Gọi callback với start và end date giống nhau (single date selection)
    if (props.onApplyDate) {
      props.onApplyDate(selectedDate, selectedDate);
    }

    _handleClose();
  };

  const _isSameDate = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const _handleOpenMonthYearPicker = () => {
    setPickerYear(currentMonth.getFullYear());
    setIsMonthYearPickerOpen(true);
  };

  const _handleCloseMonthYearPicker = () => {
    setIsMonthYearPickerOpen(false);
  };

  const _handleYearChange = (direction: "prev" | "next") => {
    setPickerYear((prev) => (direction === "prev" ? prev - 1 : prev + 1));
  };

  const _handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(new Date(pickerYear, monthIndex, 1));
    setIsMonthYearPickerOpen(false);
  };

  useImperativeHandle(ref, () => ({
    _getDate() {
      if (selectedDate) {
        const formatDate = (date: Date) => {
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        };
        return {
          start: formatDate(selectedDate),
          end: formatDate(selectedDate),
        };
      }
      return { start: "", end: "" };
    },
    _open() {
      setIsOpen(true);
    },
  }));

  const calendarStrings = strings(locale);

  return (
    <div className="date-picker">
      {isOpen && (
        <div
          className={`calendar-overlay ${isClosing ? "closing" : ""}`}
          onClick={_handleClose}
        >
          <div
            className={`calendar-container ${isClosing ? "closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Calendar Header */}
            <div className="calendar-header">
              <IconComponent
                name="arrowLeft01"
                size={24}
                onClick={() => _navigateMonth("prev")}
              />
              <BText
                className="month-year clickable"
                type={TEXT_TYPES.TITLE}
                weight={TEXT_WEIGHTS.SEMIBOLD}
                onClick={_handleOpenMonthYearPicker}
              >
                {_formatMonthYear(currentMonth)}
              </BText>
              <IconComponent
                name="arrowRight01"
                size={24}
                onClick={() => _navigateMonth("next")}
              />
            </div>

            {/* Weekday Headers */}
            <div className="weekdays mt-3">
              {[
                calendarStrings.weekday_mon,
                calendarStrings.weekday_tue,
                calendarStrings.weekday_wed,
                calendarStrings.weekday_thu,
                calendarStrings.weekday_fri,
                calendarStrings.weekday_sat,
                calendarStrings.weekday_sun,
              ].map((day) => (
                <BText
                  key={day}
                  className="weekday"
                  type={TEXT_TYPES.CAPTION}
                  weight={TEXT_WEIGHTS.SEMIBOLD}
                  color={TEXT_COLORS.GRAY_500}
                >
                  {day}
                </BText>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="days">
              {/* Previous month days */}
              {(() => {
                const firstDayOfMonth = _getFirstDayOfMonth(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth()
                );
                const prevMonth = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                  1
                );
                const daysInPrevMonth = _getDaysInMonth(
                  prevMonth.getFullYear(),
                  prevMonth.getMonth()
                );

                return Array(firstDayOfMonth)
                  .fill(null)
                  .map((_, i) => {
                    const dayNumber = daysInPrevMonth - firstDayOfMonth + i + 1;
                    const dayDate = new Date(
                      prevMonth.getFullYear(),
                      prevMonth.getMonth(),
                      dayNumber
                    );
                    const isFuture = moment(dayDate).isAfter(moment(), "day");

                    return (
                      <div
                        key={`prev-${i}`}
                        className={`day prev-month ${isFuture ? "future" : ""}`}
                        onClick={() =>
                          !isFuture && _handleDateSelect(dayNumber, -1)
                        }
                      >
                        <BText
                          type={TEXT_TYPES.BODY}
                          color={TEXT_COLORS.GRAY_300}
                          weight={TEXT_WEIGHTS.NORMAL}
                        >
                          {dayNumber}
                        </BText>
                      </div>
                    );
                  });
              })()}

              {Array(
                _getDaysInMonth(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth()
                )
              )
                .fill(null)
                .map((_, day) => {
                  const dayDate = new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    day + 1
                  );

                  const isToday = moment(dayDate).isSame(moment(), "day");
                  const isSelected = _isSameDate(dayDate, selectedDate);
                  const isFuture = moment(dayDate).isAfter(moment(), "day");

                  return (
                    <div
                      key={day}
                      className={`day current-month ${
                        isSelected ? "selected" : ""
                      } ${isToday ? "today" : ""} ${isFuture ? "future" : ""}`}
                      onClick={() => !isFuture && _handleDateSelect(day + 1)}
                    >
                      <BText
                        type={TEXT_TYPES.BODY}
                        weight={
                          isSelected
                            ? TEXT_WEIGHTS.SEMIBOLD
                            : TEXT_WEIGHTS.NORMAL
                        }
                        color={
                          isSelected
                            ? TEXT_COLORS.WHITE
                            : isToday
                            ? TEXT_COLORS.PRIMARY_MAIN
                            : isFuture
                            ? TEXT_COLORS.GRAY_300
                            : TEXT_COLORS.GRAY_500
                        }
                      >
                        {day + 1}
                      </BText>
                    </div>
                  );
                })}

              {/* Next month days - chỉ lấp đầy hàng cuối cùng */}
              {(() => {
                const currentMonthDays = _getDaysInMonth(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth()
                );
                const firstDayOfMonth = _getFirstDayOfMonth(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth()
                );

                const totalDaysShown = firstDayOfMonth + currentMonthDays;

                const remainder = totalDaysShown % 7;
                const remainingCells = remainder === 0 ? 0 : 7 - remainder;

                return Array(remainingCells)
                  .fill(null)
                  .map((_, i) => {
                    const dayNumber = i + 1;
                    const nextMonth = new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1,
                      dayNumber
                    );
                    const isFuture = moment(nextMonth).isAfter(moment(), "day");

                    return (
                      <div
                        key={`next-${i}`}
                        className={`day next-month ${isFuture ? "future" : ""}`}
                        onClick={() =>
                          !isFuture && _handleDateSelect(dayNumber, 1)
                        }
                      >
                        <BText
                          type={TEXT_TYPES.BODY}
                          color={TEXT_COLORS.GRAY_300}
                          weight={TEXT_WEIGHTS.NORMAL}
                        >
                          {dayNumber}
                        </BText>
                      </div>
                    );
                  });
              })()}
            </div>

            {/* Month Year Picker Popup */}
            {isMonthYearPickerOpen && (
              <div
                className="month-year-picker-overlay"
                onClick={_handleCloseMonthYearPicker}
              >
                <div
                  className="month-year-picker"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Year Navigation */}
                  <div className="year-navigation">
                    <IconComponent
                      name="arrowLeft01"
                      size={24}
                      onClick={() => _handleYearChange("prev")}
                    />
                    <BText
                      type={TEXT_TYPES.TITLE}
                      weight={TEXT_WEIGHTS.SEMIBOLD}
                    >
                      {pickerYear}
                    </BText>
                    <IconComponent
                      name="arrowRight01"
                      size={24}
                      onClick={() => _handleYearChange("next")}
                    />
                  </div>

                  {/* Months Grid */}
                  <div className="months-grid">
                    {[
                      calendarStrings.month_1,
                      calendarStrings.month_2,
                      calendarStrings.month_3,
                      calendarStrings.month_4,
                      calendarStrings.month_5,
                      calendarStrings.month_6,
                      calendarStrings.month_7,
                      calendarStrings.month_8,
                      calendarStrings.month_9,
                      calendarStrings.month_10,
                      calendarStrings.month_11,
                      calendarStrings.month_12,
                    ].map((month, index) => {
                      const isSelected =
                        currentMonth.getMonth() === index &&
                        currentMonth.getFullYear() === pickerYear;
                      return (
                        <div
                          key={index}
                          className={`month-item ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() => _handleMonthSelect(index)}
                        >
                          <BText
                            type={TEXT_TYPES.BODY}
                            weight={
                              isSelected
                                ? TEXT_WEIGHTS.SEMIBOLD
                                : TEXT_WEIGHTS.NORMAL
                            }
                            color={
                              isSelected
                                ? TEXT_COLORS.WHITE
                                : TEXT_COLORS.GRAY_500
                            }
                          >
                            {month}
                          </BText>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default forwardRef(BCalendar);
