import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import BPopupSlide from "./BPopupSlide";
import { BButton } from "../Button";
import { BUTTON_TYPES, BUTTON_WIDTHS } from "../../constants";
import { BText } from "../Text";
import { TEXT_TYPES } from "../../constants";

const meta = {
  title: "Components/PopupSlide",
  component: BPopupSlide,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    visible: {
      control: "boolean",
      description: "Hiển thị/ẩn popup slide",
    },
    title: {
      control: "text",
      description: "Tiêu đề popup",
    },
    showCloseButton: {
      control: "boolean",
      description: "Hiển thị nút đóng",
    },
    animationDuration: {
      control: "number",
      description: "Thời gian animation (ms)",
    },
    slideFrom: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
      description: "Hướng slide vào",
    },
    rightIcon: {
      control: "text",
      description: "Tên icon bên phải (IconComponent name)",
    },
    headerBackgroundColor: {
      control: "select",
      options: ["red", "white"],
      description: "Màu nền header",
    },
    onClose: {
      action: "closed",
      description: "Callback khi popup đóng",
    },
  },
} satisfies Meta<typeof BPopupSlide>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story cơ bản
const DefaultComponent = (args: React.ComponentProps<typeof BPopupSlide>) => {
  const [visible, setVisible] = useState(args.visible || false);

  return (
    <div style={{ padding: "20px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={() => setVisible(true)}
      >
        Mở Popup Slide
      </BButton>
      <BPopupSlide
        {...args}
        visible={visible}
        onClose={() => {
          setVisible(false);
          args.onClose?.();
        }}
      >
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Đây là nội dung popup slide. Bạn có thể click vào overlay hoặc nút
            đóng để đóng popup.
          </BText>
        </div>
      </BPopupSlide>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DefaultComponent {...args} />,
  args: {
    visible: false,
    title: "Tiêu đề Popup Slide",
    showCloseButton: true,
    slideFrom: "right",
    headerBackgroundColor: "white",
    onClose: () => {},
    children: null,
  },
};

// Story slide từ trái
const SlideFromLeftComponent = (
  args: React.ComponentProps<typeof BPopupSlide>
) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={() => setVisible(true)}
      >
        Mở Popup Slide (Từ trái)
      </BButton>
      <BPopupSlide
        {...args}
        visible={visible}
        onClose={() => {
          setVisible(false);
          args.onClose?.();
        }}
      >
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Popup này slide từ bên trái vào.
          </BText>
        </div>
      </BPopupSlide>
    </div>
  );
};

export const SlideFromLeft: Story = {
  render: (args) => <SlideFromLeftComponent {...args} />,
  args: {
    visible: false,
    title: "Popup Slide từ trái",
    slideFrom: "left",
    showCloseButton: true,
    onClose: () => {},
    children: null,
  },
};

// Story slide từ trên
const SlideFromTopComponent = (
  args: React.ComponentProps<typeof BPopupSlide>
) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={() => setVisible(true)}
      >
        Mở Popup Slide (Từ trên)
      </BButton>
      <BPopupSlide
        {...args}
        visible={visible}
        onClose={() => {
          setVisible(false);
          args.onClose?.();
        }}
      >
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Popup này slide từ trên xuống.
          </BText>
        </div>
      </BPopupSlide>
    </div>
  );
};

export const SlideFromTop: Story = {
  render: (args) => <SlideFromTopComponent {...args} />,
  args: {
    visible: false,
    title: "Popup Slide từ trên",
    slideFrom: "top",
    showCloseButton: true,
    onClose: () => {},
    children: null,
  },
};

// Story với header màu đỏ
const WithRedHeaderComponent = (
  args: React.ComponentProps<typeof BPopupSlide>
) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={() => setVisible(true)}
      >
        Mở Popup Slide (Header đỏ)
      </BButton>
      <BPopupSlide
        {...args}
        visible={visible}
        onClose={() => {
          setVisible(false);
          args.onClose?.();
        }}
      >
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Popup này có header màu đỏ với text màu trắng.
          </BText>
        </div>
      </BPopupSlide>
    </div>
  );
};

export const WithRedHeader: Story = {
  render: (args) => <WithRedHeaderComponent {...args} />,
  args: {
    visible: false,
    title: "Popup với Header đỏ",
    headerBackgroundColor: "red",
    showCloseButton: true,
    onClose: () => {},
    children: null,
  },
};

// Story với right icon
const WithRightIconComponent = (
  args: React.ComponentProps<typeof BPopupSlide>
) => {
  const [visible, setVisible] = useState(false);

  const handleRightIconClick = () => {
    alert("Right icon clicked!");
    args.onClickRightIcon?.();
  };

  return (
    <div style={{ padding: "20px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={() => setVisible(true)}
      >
        Mở Popup Slide (Có Right Icon)
      </BButton>
      <BPopupSlide
        {...args}
        visible={visible}
        onClose={() => {
          setVisible(false);
          args.onClose?.();
        }}
        onClickRightIcon={handleRightIconClick}
      >
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Popup này có icon bên phải header. Click vào icon để xem action.
          </BText>
        </div>
      </BPopupSlide>
    </div>
  );
};

export const WithRightIcon: Story = {
  render: (args) => <WithRightIconComponent {...args} />,
  args: {
    visible: false,
    title: "Popup với Right Icon",
    rightIcon: "icTrashOutline",
    showCloseButton: true,
    onClose: () => {},
    children: null,
  },
};

// Story không có close button
const WithoutCloseButtonComponent = (
  args: React.ComponentProps<typeof BPopupSlide>
) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={() => setVisible(true)}
      >
        Mở Popup Slide (Không có nút đóng)
      </BButton>
      <BPopupSlide
        {...args}
        visible={visible}
        onClose={() => {
          setVisible(false);
          args.onClose?.();
        }}
      >
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Popup này không có nút đóng. Chỉ có thể đóng bằng cách click vào
            overlay.
          </BText>
        </div>
      </BPopupSlide>
    </div>
  );
};

export const WithoutCloseButton: Story = {
  render: (args) => <WithoutCloseButtonComponent {...args} />,
  args: {
    visible: false,
    title: "Popup không có nút đóng",
    showCloseButton: false,
    onClose: () => {},
    children: null,
  },
};

// Story với title dài
const WithLongTitleComponent = (
  args: React.ComponentProps<typeof BPopupSlide>
) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={() => setVisible(true)}
      >
        Mở Popup Slide (Title dài)
      </BButton>
      <BPopupSlide
        {...args}
        visible={visible}
        onClose={() => {
          setVisible(false);
          args.onClose?.();
        }}
      >
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Popup này có title rất dài để demo tính năng format title tự động.
          </BText>
        </div>
      </BPopupSlide>
    </div>
  );
};

export const WithLongTitle: Story = {
  render: (args) => <WithLongTitleComponent {...args} />,
  args: {
    visible: false,
    title: "Đây là một tiêu đề rất dài để kiểm tra tính năng format title tự động (file.pdf)",
    showCloseButton: true,
    onClose: () => {},
    children: null,
  },
};

// Story với nội dung dài để demo scroll
const WithLongContentComponent = (
  args: React.ComponentProps<typeof BPopupSlide>
) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={() => setVisible(true)}
      >
        Mở Popup Slide (Nội dung dài)
      </BButton>
      <BPopupSlide
        {...args}
        visible={visible}
        onClose={() => {
          setVisible(false);
          args.onClose?.();
        }}
      >
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Đây là nội dung đầu tiên của popup.
          </BText>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} style={{ marginTop: "16px" }}>
              <BText type={TEXT_TYPES.BODY}>
                Dòng {i + 2}: Đây là nội dung dài để demo scroll trong popup
                slide. Nội dung này sẽ scroll được khi vượt quá chiều cao của
                popup.
              </BText>
            </div>
          ))}
        </div>
      </BPopupSlide>
    </div>
  );
};

export const WithLongContent: Story = {
  render: (args) => <WithLongContentComponent {...args} />,
  args: {
    visible: false,
    title: "Popup với nội dung dài",
    showCloseButton: true,
    onClose: () => {},
    children: null,
  },
};
