import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import BOptionPopup, { type LoanCategoryValue } from "./BOptionPopup";
import { BButton } from "../Button";
import { BUTTON_TYPES, BUTTON_WIDTHS } from "../../constants";
import { BText } from "../Text";
import { TEXT_TYPES } from "../../constants";
import BPopup, { type BPopupRef } from "../popup/BPopup";

const meta = {
  title: "Components/OptionPopup",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data
const mockOptions: LoanCategoryValue[] = [
  { name: "Vay tiêu dùng", type: "consumer" },
  { name: "Vay mua nhà", type: "house" },
  { name: "Vay mua xe", type: "car" },
  { name: "Vay kinh doanh", type: "business" },
  { name: "Vay giáo dục", type: "education" },
  { name: "Vay y tế", type: "medical" },
  { name: "Vay du lịch", type: "travel" },
  { name: "Vay khác", type: "other" },
];

const manyOptions: LoanCategoryValue[] = Array.from({ length: 20 }, (_, i) => ({
  name: `Tùy chọn ${i + 1}`,
  type: `option_${i + 1}`,
}));

// Story cơ bản
const DefaultComponent = () => {
  const popupRef = useRef<BPopupRef>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleOpenPopup = () => {
    BOptionPopup.show({
      title: "Chọn loại vay",
      options: mockOptions,
      currentValue: selectedValue,
      onSelect: (value) => {
        setSelectedValue(value.type);
        console.log("Selected:", value);
      },
      popupRef,
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleOpenPopup}
      >
        Mở Option Popup
      </BButton>
      {selectedValue && (
        <BText type={TEXT_TYPES.BODY}>
          Đã chọn: {mockOptions.find((opt) => opt.type === selectedValue)?.name || selectedValue}
        </BText>
      )}
      <BPopup ref={popupRef} visible={false} onHide={() => {}} children={null} />
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
};

// Story với nhiều options (tự động hiển thị search)
const WithManyOptionsComponent = () => {
  const popupRef = useRef<BPopupRef>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleOpenPopup = () => {
    BOptionPopup.show({
      title: "Chọn từ danh sách dài",
      options: manyOptions,
      currentValue: selectedValue,
      onSelect: (value) => {
        setSelectedValue(value.type);
      },
      popupRef,
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleOpenPopup}
      >
        Mở Popup (Nhiều options - tự động search)
      </BButton>
      {selectedValue && (
        <BText type={TEXT_TYPES.BODY}>
          Đã chọn: {manyOptions.find((opt) => opt.type === selectedValue)?.name || selectedValue}
        </BText>
      )}
      <BPopup ref={popupRef} visible={false} onHide={() => {}} children={null} />
    </div>
  );
};

export const WithManyOptions: Story = {
  render: () => <WithManyOptionsComponent />,
};

// Story với search enabled
const WithSearchComponent = () => {
  const popupRef = useRef<BPopupRef>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleOpenPopup = () => {
    BOptionPopup.show({
      title: "Chọn loại vay (Có search)",
      options: mockOptions,
      currentValue: selectedValue,
      onSelect: (value) => {
        setSelectedValue(value.type);
      },
      isSearch: true,
      popupRef,
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleOpenPopup}
      >
        Mở Popup (Có search)
      </BButton>
      {selectedValue && (
        <BText type={TEXT_TYPES.BODY}>
          Đã chọn: {mockOptions.find((opt) => opt.type === selectedValue)?.name || selectedValue}
        </BText>
      )}
      <BPopup ref={popupRef} visible={false} onHide={() => {}} children={null} />
    </div>
  );
};

export const WithSearch: Story = {
  render: () => <WithSearchComponent />,
};

// Story với loading state
const WithLoadingComponent = () => {
  const popupRef = useRef<BPopupRef>(null);

  const handleOpenPopup = () => {
    BOptionPopup.show({
      title: "Đang tải dữ liệu",
      options: mockOptions,
      currentValue: null,
      onSelect: () => {},
      isLoading: true,
      popupRef,
    });

    // Simulate loading
    setTimeout(() => {
      popupRef.current?.hide();
      BOptionPopup.show({
        title: "Chọn loại vay",
        options: mockOptions,
        currentValue: null,
        onSelect: () => {},
        popupRef,
      });
    }, 2000);
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleOpenPopup}
      >
        Mở Popup (Loading state)
      </BButton>
      <BPopup ref={popupRef} visible={false} onHide={() => {}} children={null} />
    </div>
  );
};

export const WithLoading: Story = {
  render: () => <WithLoadingComponent />,
};

// Story với currentValue là string
const WithStringValueComponent = () => {
  const popupRef = useRef<BPopupRef>(null);
  const [selectedValue, setSelectedValue] = useState<string>("consumer");

  const handleOpenPopup = () => {
    BOptionPopup.show({
      title: "Chọn loại vay",
      options: mockOptions,
      currentValue: selectedValue,
      onSelect: (value) => {
        setSelectedValue(value.type);
      },
      popupRef,
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleOpenPopup}
      >
        Mở Popup (Có giá trị mặc định)
      </BButton>
      <BText type={TEXT_TYPES.BODY}>
        Giá trị hiện tại: {mockOptions.find((opt) => opt.type === selectedValue)?.name || selectedValue}
      </BText>
      <BPopup ref={popupRef} visible={false} onHide={() => {}} children={null} />
    </div>
  );
};

export const WithStringValue: Story = {
  render: () => <WithStringValueComponent />,
};

// Story với currentValue là object
const WithObjectValueComponent = () => {
  const popupRef = useRef<BPopupRef>(null);
  const [selectedValue, setSelectedValue] = useState<{ name: string; type: string } | null>({
    name: "Vay mua nhà",
    type: "house",
  });

  const handleOpenPopup = () => {
    BOptionPopup.show({
      title: "Chọn loại vay",
      options: mockOptions,
      currentValue: selectedValue,
      onSelect: (value) => {
        setSelectedValue(value);
      },
      popupRef,
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleOpenPopup}
      >
        Mở Popup (Object value)
      </BButton>
      {selectedValue && (
        <BText type={TEXT_TYPES.BODY}>
          Đã chọn: {selectedValue.name} ({selectedValue.type})
        </BText>
      )}
      <BPopup ref={popupRef} visible={false} onHide={() => {}} children={null} />
    </div>
  );
};

export const WithObjectValue: Story = {
  render: () => <WithObjectValueComponent />,
};

// Story với empty state
const WithEmptyStateComponent = () => {
  const popupRef = useRef<BPopupRef>(null);

  const handleOpenPopup = () => {
    BOptionPopup.show({
      title: "Chọn loại vay",
      options: [],
      currentValue: null,
      onSelect: () => {},
      popupRef,
    });
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <BButton
        type={BUTTON_TYPES.FULL}
        styleWidth={BUTTON_WIDTHS.FIT_CONTENT}
        onClick={handleOpenPopup}
      >
        Mở Popup (Không có options)
      </BButton>
      <BPopup ref={popupRef} visible={false} onHide={() => {}} children={null} />
    </div>
  );
};

export const WithEmptyState: Story = {
  render: () => <WithEmptyStateComponent />,
};
