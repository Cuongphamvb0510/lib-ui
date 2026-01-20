import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import BInput, { type BInputRef } from "./BInput";
import { TEXT_COLORS } from "../../constants";
import { BText } from "../Text";

const meta = {
  title: "Components/Input",
  component: BInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Nhãn hiển thị phía trên input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    value: {
      control: "text",
      description: "Giá trị của input",
    },
    type: {
      control: "select",
      options: [
        "none",
        "search",
        "text",
        "tel",
        "url",
        "email",
        "numeric",
        "decimal",
        "calendar",
        "integer",
      ],
      description: "Loại input",
    },
    typeCheck: {
      control: "select",
      options: [
        "fullname",
        "phone",
        "email",
        "default",
        "no-space",
        "money",
        "base-rule",
        "no-vietnamese",
        "integer",
      ],
      description: "Kiểm tra định dạng input",
    },
    disable: {
      control: "boolean",
      description: "Trạng thái disabled",
    },
    readOnly: {
      control: "boolean",
      description: "Trạng thái read-only",
    },
    error: {
      control: "text",
      description: "Thông báo lỗi",
    },
    onChange: {
      action: "changed",
      description: "Hàm xử lý khi giá trị thay đổi",
    },
  },
} satisfies Meta<typeof BInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Component wrappers
const DefaultComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      placeholder="Nhập text..."
    />
  );
};

export const Default: Story = {
  render: (args) => <DefaultComponent {...args} />,
};

const WithLabelComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Tên người dùng"
      placeholder="Nhập tên của bạn"
    />
  );
};

export const WithLabel: Story = {
  render: (args) => <WithLabelComponent {...args} />,
};

const WithSubtitleComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Email"
      subtitle="(Bắt buộc)"
      placeholder="example@email.com"
    />
  );
};

export const WithSubtitle: Story = {
  render: (args) => <WithSubtitleComponent {...args} />,
};

const WithDescriptionComponent = (
  args: React.ComponentProps<typeof BInput>
) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Mật khẩu"
      description="Mật khẩu phải có ít nhất 8 ký tự"
      placeholder="Nhập mật khẩu"
      type="text"
    />
  );
};

export const WithDescription: Story = {
  render: (args) => <WithDescriptionComponent {...args} />,
};

const WithTooltipComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Số điện thoại"
      tooltipContent={
        <BText color={TEXT_COLORS.WHITE}>
          Nhập số điện thoại 10 chữ số, bắt đầu bằng số 0
        </BText>
      }
      placeholder="0123456789"
      typeCheck="phone"
    />
  );
};

export const WithTooltip: Story = {
  render: (args) => <WithTooltipComponent {...args} />,
};

const WithErrorComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("invalid-email");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Email"
      placeholder="example@email.com"
      error="Email không hợp lệ"
    />
  );
};

export const WithError: Story = {
  render: (args) => <WithErrorComponent {...args} />,
};

const WithLeftIconComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Tìm kiếm"
      placeholder="Tìm kiếm..."
      leftIcon="icSearchOutline"
    />
  );
};

export const WithLeftIcon: Story = {
  render: (args) => <WithLeftIconComponent {...args} />,
};

const WithRightIconComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Tìm kiếm"
      placeholder="Tìm kiếm..."
      rightIcon="icSearchOutline"
    />
  );
};

export const WithRightIcon: Story = {
  render: (args) => <WithRightIconComponent {...args} />,
};

const WithLeftTextComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Số tiền"
      placeholder="0"
      leftText="VNĐ"
      typeCheck="integer"
    />
  );
};

export const WithLeftText: Story = {
  render: (args) => <WithLeftTextComponent {...args} />,
};

const WithRightTextComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Số tiền"
      placeholder="0"
      rightText="VNĐ"
      typeCheck="integer"
    />
  );
};

export const WithRightText: Story = {
  render: (args) => <WithRightTextComponent {...args} />,
};

const CalendarInputComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Ngày sinh"
      placeholder="dd/mm/yyyy"
      type="calendar"
    />
  );
};

export const CalendarInput: Story = {
  render: (args) => <CalendarInputComponent {...args} />,
};

const PhoneInputComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Số điện thoại"
      placeholder="0123456789"
      typeCheck="phone"
    />
  );
};

export const PhoneInput: Story = {
  render: (args) => <PhoneInputComponent {...args} />,
};

const EmailInputComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Email"
      placeholder="example@email.com"
      type="email"
      typeCheck="email"
    />
  );
};

export const EmailInput: Story = {
  render: (args) => <EmailInputComponent {...args} />,
};

const FullnameInputComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Họ và tên"
      placeholder="Nguyễn Văn A"
      typeCheck="fullname"
    />
  );
};

export const FullnameInput: Story = {
  render: (args) => <FullnameInputComponent {...args} />,
};

const IntegerInputComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Số lượng"
      placeholder="0"
      type="integer"
      typeCheck="integer"
    />
  );
};

export const IntegerInput: Story = {
  render: (args) => <IntegerInputComponent {...args} />,
};

export const Disabled: Story = {
  args: {
    label: "Input Disabled",
    placeholder: "Không thể nhập",
    value: "Giá trị cố định",
    disable: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Input Read Only",
    placeholder: "Chỉ đọc",
    value: "Giá trị chỉ đọc",
    readOnly: true,
  },
};

const WithMaxLengthComponent = (args: React.ComponentProps<typeof BInput>) => {
  const [value, setValue] = useState("");
  return (
    <BInput
      {...args}
      value={value}
      onChange={(val) => setValue(val)}
      label="Mã xác nhận"
      placeholder="Nhập mã 6 số"
      maxLength={6}
      typeCheck="integer"
    />
  );
};

export const WithMaxLength: Story = {
  render: (args) => <WithMaxLengthComponent {...args} />,
};

// Story với ref để demo setError
const WithRefComponent = () => {
  const inputRef = useRef<BInputRef>(null);
  const [value, setValue] = useState("");

  const handleSetError = () => {
    inputRef.current?.setError("Lỗi được set từ ref");
  };

  const handleClearError = () => {
    inputRef.current?.setError("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <BInput
        ref={inputRef}
        label="Input với Ref"
        placeholder="Nhập text..."
        value={value}
        onChange={(val) => setValue(val)}
      />
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={handleSetError}>Set Error</button>
        <button onClick={handleClearError}>Clear Error</button>
      </div>
    </div>
  );
};

export const WithRef: Story = {
  render: () => <WithRefComponent />,
};

// Story so sánh các loại input
const InputTypesComparisonComponent = () => {
  const [textValue, setTextValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [fullnameValue, setFullnameValue] = useState("");
  const [integerValue, setIntegerValue] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "400px",
      }}
    >
      <BInput
        label="Text Input"
        placeholder="Nhập text..."
        type="text"
        value={textValue}
        onChange={(val) => setTextValue(val)}
      />
      <BInput
        label="Email Input"
        placeholder="example@email.com"
        type="email"
        value={emailValue}
        onChange={(val) => setEmailValue(val)}
      />
      <BInput
        label="Phone Input"
        placeholder="0123456789"
        typeCheck="phone"
        value={phoneValue}
        onChange={(val) => setPhoneValue(val)}
      />
      <BInput
        label="Fullname Input"
        placeholder="Nguyễn Văn A"
        typeCheck="fullname"
        value={fullnameValue}
        onChange={(val) => setFullnameValue(val)}
      />
      <BInput
        label="Integer Input"
        placeholder="0"
        type="integer"
        typeCheck="integer"
        value={integerValue}
        onChange={(val) => setIntegerValue(val)}
      />
    </div>
  );
};

export const InputTypesComparison: Story = {
  render: () => <InputTypesComparisonComponent />,
};
