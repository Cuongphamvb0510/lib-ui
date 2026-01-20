import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import { BButton } from "../Button";
import { BUTTON_TYPES, BUTTON_WIDTHS } from "../../constants";
import { BAlert, type SDKAlertRef } from "./index";

const meta = {
  title: "Components/Alert",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Story cơ bản - Success
const SuccessComponent = () => {
  const alertRef = useRef<SDKAlertRef>(null);

  const handleShowSuccess = () => {
    alertRef.current?.show({
      message: "Thao tác của bạn đã được thực hiện thành công!",
      mainTitle: "Thành công",
      iconType: "success",
      typeButton: "1",
      titleRightBtn: "Đóng",
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleShowSuccess}
      >
        Hiển thị Alert Success
      </BButton>
      <BAlert ref={alertRef} />
    </div>
  );
};

export const Success: Story = {
  render: () => <SuccessComponent />,
};

// Story - Warning
const WarningComponent = () => {
  const alertRef = useRef<SDKAlertRef>(null);

  const handleShowWarning = () => {
    alertRef.current?.show({
      message: "Bạn có chắc chắn muốn thực hiện thao tác này không?",
      mainTitle: "Cảnh báo",
      iconType: "warning",
      typeButton: "1",
      titleRightBtn: "Xác nhận",
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleShowWarning}
      >
        Hiển thị Alert Warning
      </BButton>
      <BAlert ref={alertRef} />
    </div>
  );
};

export const Warning: Story = {
  render: () => <WarningComponent />,
};

// Story - Error
const ErrorComponent = () => {
  const alertRef = useRef<SDKAlertRef>(null);

  const handleShowError = () => {
    alertRef.current?.show({
      message: "Đã xảy ra lỗi. Vui lòng thử lại sau!",
      mainTitle: "Lỗi",
      iconType: "error",
      typeButton: "1",
      titleRightBtn: "Đóng",
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleShowError}
      >
        Hiển thị Alert Error
      </BButton>
      <BAlert ref={alertRef} />
    </div>
  );
};

export const Error: Story = {
  render: () => <ErrorComponent />,
};

// Story - Two Buttons
const TwoButtonsComponent = () => {
  const alertRef = useRef<SDKAlertRef>(null);

  const handleShowTwoButtons = () => {
    alertRef.current?.show({
      message: "Bạn có muốn xóa mục này không?",
      mainTitle: "Xác nhận",
      iconType: "warning",
      typeButton: "2",
      titleLeftBtn: "Hủy",
      titleRightBtn: "Xóa",
      onLeft: () => {
        console.log("Hủy clicked");
      },
      onRight: () => {
        console.log("Xóa clicked");
      },
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleShowTwoButtons}
      >
        Hiển thị Alert 2 nút
      </BButton>
      <BAlert ref={alertRef} />
    </div>
  );
};

export const TwoButtons: Story = {
  render: () => <TwoButtonsComponent />,
};

// Story - Copy Alert
const CopyComponent = () => {
  const alertRef = useRef<SDKAlertRef>(null);

  const handleShowCopy = () => {
    alertRef.current?.show({
      message: "Đã sao chép!",
      typeAlert: "copy",
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleShowCopy}
      >
        Hiển thị Copy Alert (tự đóng sau 3s)
      </BButton>
      <BAlert ref={alertRef} />
    </div>
  );
};

export const Copy: Story = {
  render: () => <CopyComponent />,
};

// Story - Custom Icon
const CustomIconComponent = () => {
  const alertRef = useRef<SDKAlertRef>(null);

  const handleShowCustom = () => {
    alertRef.current?.show({
      message: "Alert với icon tùy chỉnh",
      mainTitle: "Custom Icon",
      iconType: "custom",
      icon: "icSettingOutline",
      typeButton: "1",
      titleRightBtn: "Đóng",
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleShowCustom}
      >
        Hiển thị Alert Custom Icon
      </BButton>
      <BAlert ref={alertRef} />
    </div>
  );
};

export const CustomIcon: Story = {
  render: () => <CustomIconComponent />,
};

// Story - Long Message
const LongMessageComponent = () => {
  const alertRef = useRef<SDKAlertRef>(null);

  const handleShowLongMessage = () => {
    alertRef.current?.show({
      message: "Đây là một thông báo rất dài để test khả năng hiển thị của alert khi có nội dung dài. Alert sẽ tự động scroll nếu nội dung vượt quá chiều cao tối đa.",
      mainTitle: "Thông báo dài",
      iconType: "success",
      typeButton: "1",
      titleRightBtn: "Đóng",
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleShowLongMessage}
      >
        Hiển thị Alert với nội dung dài
      </BButton>
      <BAlert ref={alertRef} />
    </div>
  );
};

export const LongMessage: Story = {
  render: () => <LongMessageComponent />,
};

// Story - No Touch Outside
const NoTouchOutsideComponent = () => {
  const alertRef = useRef<SDKAlertRef>(null);

  const handleShowNoTouchOutside = () => {
    alertRef.current?.show({
      message: "Alert này không thể đóng bằng cách click ra ngoài. Bạn phải click nút Đóng.",
      mainTitle: "Không cho đóng ngoài",
      iconType: "warning",
      typeButton: "1",
      titleRightBtn: "Đóng",
      touchOutside: false,
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleShowNoTouchOutside}
      >
        Hiển thị Alert (không đóng khi click ngoài)
      </BButton>
      <BAlert ref={alertRef} />
    </div>
  );
};

export const NoTouchOutside: Story = {
  render: () => <NoTouchOutsideComponent />,
};
