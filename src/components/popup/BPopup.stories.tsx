import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import BPopup, { type BPopupRef } from "./BPopup";
import { BButton } from "../Button";
import { BUTTON_TYPES, BUTTON_WIDTHS } from "../../constants";
import { BText } from "../Text";
import { TEXT_TYPES } from "../../constants";

const meta = {
  title: "Components/Popup",
  component: BPopup,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    visible: {
      control: "boolean",
      description: "Hiển thị/ẩn popup",
    },
    title: {
      control: "text",
      description: "Tiêu đề popup",
    },
    iconClose: {
      control: "boolean",
      description: "Hiển thị icon đóng (true) hoặc text đóng (false)",
    },
    closeOnClickOverlay: {
      control: "boolean",
      description: "Đóng popup khi click vào overlay",
    },
    fixedHeight: {
      control: "boolean",
      description: "Popup có chiều cao cố định",
    },
    onHide: {
      action: "closed",
      description: "Callback khi popup đóng",
    },
  },
} satisfies Meta<typeof BPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story sử dụng props.visible
const WithVisiblePropsComponent = (args: React.ComponentProps<typeof BPopup>) => {
  const [visible, setVisible] = useState(args.visible || false);

  return (
    <div style={{ padding: "20px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={() => setVisible(true)}
      >
        Mở Popup
      </BButton>
      <BPopup
        {...args}
        visible={visible}
        onHide={() => {
          setVisible(false);
          args.onHide?.();
        }}
      >
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Đây là nội dung popup. Bạn có thể click vào overlay hoặc nút đóng để
            đóng popup.
          </BText>
        </div>
      </BPopup>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <WithVisiblePropsComponent {...args} />,
  args: {
    visible: false,
    title: "Tiêu đề Popup",
    iconClose: true,
    closeOnClickOverlay: true,
    fixedHeight: false,
    onHide: () => {},
  },
};

// Story sử dụng ref.show()
const WithRefComponent = () => {
  const popupRef = useRef<BPopupRef>(null);
  const [message, setMessage] = useState("");

  const handleOpenPopup = () => {
    popupRef.current?.show({
      title: "Popup từ Ref",
      children: (
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Popup này được mở bằng ref.show(). Bạn có thể truyền title và
            children động.
          </BText>
        </div>
      ),
      onHide: () => {
        setMessage("Popup đã đóng");
      },
    });
  };

  const handleOpenWithCustomContent = () => {
    popupRef.current?.show({
      title: "Popup với nội dung tùy chỉnh",
      children: (
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Đây là popup với nội dung được tạo động.
          </BText>
          <div style={{ marginTop: "16px" }}>
            <BButton
              type={BUTTON_TYPES.FULL}
              styleWidth={BUTTON_WIDTHS.FULL}
              onClick={() => popupRef.current?.hide()}
            >
              Đóng Popup
            </BButton>
          </div>
        </div>
      ),
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleOpenPopup}
      >
        Mở Popup (Ref)
      </BButton>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleOpenWithCustomContent}
      >
        Mở Popup với nội dung tùy chỉnh
      </BButton>
      {message && <BText type={TEXT_TYPES.BODY}>{message}</BText>}
      <BPopup ref={popupRef} visible={false} onHide={() => {}} />
    </div>
  );
};

export const WithRef: Story = {
  render: () => <WithRefComponent />,
  args: {
    visible: false,
    onHide: () => {},
  },
};

// Story với iconClose = false (hiển thị text "Đóng")
const WithTextCloseComponent = (args: React.ComponentProps<typeof BPopup>) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={() => setVisible(true)}
      >
        Mở Popup (Text Close)
      </BButton>
      <BPopup
        {...args}
        visible={visible}
        onHide={() => {
          setVisible(false);
          args.onHide?.();
        }}
      >
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Popup này hiển thị text "Đóng" thay vì icon đóng.
          </BText>
        </div>
      </BPopup>
    </div>
  );
};

export const WithTextClose: Story = {
  render: (args) => <WithTextCloseComponent {...args} />,
  args: {
    visible: false,
    title: "Popup với Text Close",
    iconClose: false,
    closeOnClickOverlay: true,
    onHide: () => {},
  },
};

// Story với fixedHeight
const WithFixedHeightComponent = (args: React.ComponentProps<typeof BPopup>) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={() => setVisible(true)}
      >
        Mở Popup (Fixed Height)
      </BButton>
      <BPopup
        {...args}
        visible={visible}
        onHide={() => {
          setVisible(false);
          args.onHide?.();
        }}
      >
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Popup này có chiều cao cố định. Nội dung dài sẽ scroll được.
          </BText>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{ marginTop: "8px" }}>
              <BText type={TEXT_TYPES.BODY}>
                Dòng {i + 1}: Đây là nội dung dài để demo scroll trong popup có
                fixed height.
              </BText>
            </div>
          ))}
        </div>
      </BPopup>
    </div>
  );
};

export const WithFixedHeight: Story = {
  render: (args) => <WithFixedHeightComponent {...args} />,
  args: {
    visible: false,
    title: "Popup với Fixed Height",
    fixedHeight: true,
    iconClose: true,
    onHide: () => {},
  },
};

// Story không đóng khi click overlay
const WithoutOverlayCloseComponent = (args: React.ComponentProps<typeof BPopup>) => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={() => setVisible(true)}
      >
        Mở Popup (Không đóng khi click overlay)
      </BButton>
      <BPopup
        {...args}
        visible={visible}
        onHide={() => {
          setVisible(false);
          args.onHide?.();
        }}
      >
        <div style={{ padding: "20px" }}>
          <BText type={TEXT_TYPES.BODY}>
            Popup này không đóng khi click vào overlay. Chỉ có thể đóng bằng nút
            đóng.
          </BText>
        </div>
      </BPopup>
    </div>
  );
};

export const WithoutOverlayClose: Story = {
  render: (args) => <WithoutOverlayCloseComponent {...args} />,
  args: {
    visible: false,
    title: "Popup không đóng khi click overlay",
    closeOnClickOverlay: false,
    iconClose: true,
    onHide: () => {},
  },
};
