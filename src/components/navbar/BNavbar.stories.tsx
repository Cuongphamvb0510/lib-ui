import type { Meta, StoryObj } from "@storybook/react";
import BNavbar from "./BNavbar";

const meta = {
  title: "Components/Navbar",
  component: BNavbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Tiêu đề navbar",
    },
    showBack: {
      control: "boolean",
      description: "Hiển thị nút back",
    },
    showRefresh: {
      control: "boolean",
      description: "Hiển thị nút refresh",
    },
    showHomeBack: {
      control: "boolean",
      description: "Hiển thị nút home back",
    },
    fixed: {
      control: "boolean",
      description: "Navbar cố định ở top",
    },
    rightIcon: {
      control: "text",
      description: "Tên icon bên phải (IconComponent name)",
    },
    onBack: {
      action: "back clicked",
      description: "Callback khi click nút back",
    },
    onRefresh: {
      action: "refresh clicked",
      description: "Callback khi click nút refresh",
    },
    onHomeBack: {
      action: "home back clicked",
      description: "Callback khi click nút home back",
    },
    onRightIconClick: {
      action: "right icon clicked",
      description: "Callback khi click icon bên phải",
    },
  },
} satisfies Meta<typeof BNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Tiêu đề Navbar",
    showBack: true,
    showRefresh: false,
    showHomeBack: true,
    fixed: false,
  },
};

export const WithRefresh: Story = {
  args: {
    title: "Navbar với Refresh",
    showBack: true,
    showRefresh: true,
    showHomeBack: false,
    fixed: false,
  },
};

export const WithHomeBack: Story = {
  args: {
    title: "Navbar với Home Back",
    showBack: true,
    showRefresh: false,
    showHomeBack: true,
    fixed: false,
  },
};

export const WithRightIcon: Story = {
  args: {
    title: "Navbar với Icon bên phải",
    showBack: true,
    showRefresh: false,
    showHomeBack: false,
    rightIcon: "icSettingOutline",
    fixed: false,
  },
};

export const Fixed: Story = {
  args: {
    title: "Navbar cố định",
    showBack: true,
    showRefresh: false,
    showHomeBack: false,
    fixed: true,
  },
  render: (args) => (
    <div>
      <BNavbar {...args} />
      <div style={{ padding: "20px", height: "200vh" }}>
        <p>Scroll xuống để thấy navbar cố định ở top</p>
        <p style={{ marginTop: "100vh" }}>Nội dung trang...</p>
      </div>
    </div>
  ),
};

export const WithoutBack: Story = {
  args: {
    title: "Navbar không có nút back",
    showBack: false,
    showRefresh: false,
    showHomeBack: false,
    fixed: false,
  },
};

export const AllFeatures: Story = {
  args: {
    title: "Navbar đầy đủ tính năng",
    showBack: true,
    showRefresh: true,
    showHomeBack: true,
    fixed: false,
  },
};

export const LongTitle: Story = {
  args: {
    title: "Navbar với tiêu đề rất dài để test truncate",
    showBack: true,
    showRefresh: false,
    showHomeBack: false,
    fixed: false,
  },
};
