import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import BCalendar, { type BCalendarRef } from "./BCalendar";
import { BButton } from "../Button";
import {
  BUTTON_TYPES,
  BUTTON_WIDTHS,
  LOCALES,
  TEXT_TYPES,
} from "../../constants";
import { BText } from "../Text";

const meta = {
  title: "Components/Calendar",
  component: BCalendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    locale: {
      control: "select",
      options: [LOCALES.EN, LOCALES.VI],
      description: "Ngôn ngữ hiển thị (en/vi)",
    },
    onApplyDate: {
      action: "date-selected",
      description: "Hàm xử lý khi chọn ngày",
    },
    textNote: {
      control: "text",
      description: "Ghi chú hiển thị",
    },
  },
} satisfies Meta<typeof BCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component để có thể mở calendar bằng button
const CalendarWrapper = (args: {
  locale?: typeof LOCALES.EN | typeof LOCALES.VI;
  onApplyDate?: (start: Date, end: Date) => void;
}) => {
  const calendarRef = useRef<BCalendarRef>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleOpenCalendar = () => {
    calendarRef.current?._open();
  };

  const handleDateSelect = (start: Date, end: Date) => {
    const dateStr = calendarRef.current?._getDate();
    setSelectedDate(dateStr ? `${dateStr.start} - ${dateStr.end}` : "");
    args.onApplyDate?.(start, end);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
      }}
    >
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleOpenCalendar}
      >
        Mở Calendar
      </BButton>
      {selectedDate && (
        <BText type={TEXT_TYPES.BODY}>Ngày đã chọn: {selectedDate}</BText>
      )}
      <BCalendar
        ref={calendarRef}
        locale={args.locale}
        onApplyDate={handleDateSelect}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <CalendarWrapper {...args} />,
  args: {
    locale: LOCALES.VI,
  },
};

export const Vietnamese: Story = {
  render: (args) => <CalendarWrapper {...args} />,
  args: {
    locale: LOCALES.VI,
  },
};

export const English: Story = {
  render: (args) => <CalendarWrapper {...args} />,
  args: {
    locale: LOCALES.EN,
  },
};

// Component cho WithDateSelection story
const WithDateSelectionComponent = (args: {
  locale?: typeof LOCALES.EN | typeof LOCALES.VI;
  onApplyDate?: (start: Date, end: Date) => void;
}) => {
  const calendarRef = useRef<BCalendarRef>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDates, setSelectedDates] = useState<[Date, Date] | null>(null);

  const handleOpenCalendar = () => {
    calendarRef.current?._open();
  };

  const handleDateSelect = (start: Date, end: Date) => {
    const dateStr = calendarRef.current?._getDate();
    setSelectedDate(dateStr ? `${dateStr.start} - ${dateStr.end}` : "");
    setSelectedDates([start, end]);
    args.onApplyDate?.(start, end);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        minWidth: "300px",
      }}
    >
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleOpenCalendar}
      >
        Chọn ngày
      </BButton>
      {selectedDate && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <BText type={TEXT_TYPES.BODY}>Ngày đã chọn: {selectedDate}</BText>
          {selectedDates && (
            <BText type={TEXT_TYPES.CAPTION}>
              Start: {selectedDates[0]?.toLocaleDateString("vi-VN")} | End:{" "}
              {selectedDates[1]?.toLocaleDateString("vi-VN")}
            </BText>
          )}
        </div>
      )}
      <BCalendar
        ref={calendarRef}
        locale={args.locale || LOCALES.VI}
        onApplyDate={handleDateSelect}
      />
    </div>
  );
};

export const WithDateSelection: Story = {
  render: (args) => <WithDateSelectionComponent {...args} />,
  args: {
    locale: LOCALES.VI,
  },
};

// Component cho LocaleComparison story
const LocaleComparisonComponent = () => {
  const calendarRefVi = useRef<BCalendarRef>(null);
  const calendarRefEn = useRef<BCalendarRef>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <BText type={TEXT_TYPES.TITLE}>Tiếng Việt</BText>
        <BButton
          type={BUTTON_TYPES.FULL}
          styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
          onClick={() => calendarRefVi.current?._open()}
        >
          Mở Calendar (VI)
        </BButton>
        <BCalendar ref={calendarRefVi} locale={LOCALES.VI} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <BText type={TEXT_TYPES.TITLE}>English</BText>
        <BButton
          type={BUTTON_TYPES.FULL}
          styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
          onClick={() => calendarRefEn.current?._open()}
        >
          Open Calendar (EN)
        </BButton>
        <BCalendar ref={calendarRefEn} locale={LOCALES.EN} />
      </div>
    </div>
  );
};

export const LocaleComparison: Story = {
  render: () => <LocaleComparisonComponent />,
};
