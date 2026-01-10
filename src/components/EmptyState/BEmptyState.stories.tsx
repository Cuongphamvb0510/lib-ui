import type { Meta, StoryObj } from "@storybook/react";
import { BEmptyState } from "./BEmptyState";
import { EMPTY_STATE_TYPES } from "../../constants";

const meta = {
  title: "Components/EmptyState",
  component: BEmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: Object.values(EMPTY_STATE_TYPES),
      description: "Loại empty state",
    },
    mainText: {
      control: "text",
      description: "Text chính",
    },
    subText: {
      control: "text",
      description: "Text phụ (bắt buộc)",
    },
    buttonText: {
      control: "text",
      description: "Text của button",
    },
    onButtonClick: {
      action: "button clicked",
      description: "Hàm xử lý khi click button",
    },
  },
} satisfies Meta<typeof BEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListEmpty: Story = {
  args: {
    type: EMPTY_STATE_TYPES.LIST_EMPTY,
    mainText: "Không có dữ liệu",
    subText: "Hiện tại chưa có mục nào trong danh sách",
    buttonText: "Tải lại",
  },
};

export const ListEmptyWithoutButton: Story = {
  args: {
    type: EMPTY_STATE_TYPES.LIST_EMPTY,
    mainText: "Không có dữ liệu",
    subText: "Hiện tại chưa có mục nào trong danh sách",
  },
};

export const SearchEmpty: Story = {
  args: {
    type: EMPTY_STATE_TYPES.SEARCH_EMPTY,
    subText: "Không tìm thấy kết quả phù hợp",
  },
};

export const NotificationEmpty: Story = {
  args: {
    type: EMPTY_STATE_TYPES.NOTIFI_EMPTY,
    mainText: "Chưa có thông báo",
    subText: "Bạn sẽ nhận được thông báo tại đây",
  },
};

export const LinkEmpty: Story = {
  args: {
    type: EMPTY_STATE_TYPES.LINK_EMPTY,
    subText: "Không có liên kết nào",
    buttonText: "Thêm liên kết",
  },
};

export const AllTypes: Story = {
  args: {
    type: EMPTY_STATE_TYPES.LIST_EMPTY,
    subText: "Hiện tại chưa có mục nào trong danh sách",
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "48px",
        padding: "24px",
      }}
    >
      <div>
        <h3 style={{ marginBottom: "16px" }}>List Empty</h3>
        <BEmptyState
          type={EMPTY_STATE_TYPES.LIST_EMPTY}
          mainText="Không có dữ liệu"
          subText="Hiện tại chưa có mục nào trong danh sách"
          buttonText="Tải lại"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "16px" }}>Search Empty</h3>
        <BEmptyState
          type={EMPTY_STATE_TYPES.SEARCH_EMPTY}
          subText="Không tìm thấy kết quả phù hợp"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "16px" }}>Notification Empty</h3>
        <BEmptyState
          type={EMPTY_STATE_TYPES.NOTIFI_EMPTY}
          mainText="Chưa có thông báo"
          subText="Bạn sẽ nhận được thông báo tại đây"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "16px" }}>Link Empty</h3>
        <BEmptyState
          type={EMPTY_STATE_TYPES.LINK_EMPTY}
          subText="Không có liên kết nào"
          buttonText="Thêm liên kết"
        />
      </div>
    </div>
  ),
};
