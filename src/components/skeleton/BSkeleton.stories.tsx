import type { Meta, StoryObj } from "@storybook/react";
import BSkeleton from "./BSkeleton";

const meta = {
  title: "Components/Skeleton",
  component: BSkeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: "text",
      description: "Chiều rộng (px, %, hoặc số)",
    },
    height: {
      control: "text",
      description: "Chiều cao (px, %, hoặc số)",
    },
    radius: {
      control: "text",
      description: "Border radius (px hoặc số)",
    },
    variant: {
      control: "select",
      options: ["circle", "rectangle"],
      description: "Loại skeleton",
    },
  },
} satisfies Meta<typeof BSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rectangle: Story = {
  args: {
    width: 200,
    height: 20,
    radius: 4,
    variant: "rectangle",
  },
};

export const Circle: Story = {
  args: {
    width: 40,
    height: 40,
    variant: "circle",
  },
};

export const LargeCircle: Story = {
  args: {
    width: 80,
    height: 80,
    variant: "circle",
  },
};

export const RoundedRectangle: Story = {
  args: {
    width: 300,
    height: 40,
    radius: 20,
    variant: "rectangle",
  },
};

export const SmallRectangle: Story = {
  args: {
    width: 100,
    height: 16,
    radius: 4,
    variant: "rectangle",
  },
};

export const CustomSize: Story = {
  args: {
    width: "50%",
    height: 30,
    radius: 8,
    variant: "rectangle",
  },
};

// Example: Ghép nhiều skeleton lại
export const Combined: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "400px" }}>
      {/* Avatar + Title row */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <BSkeleton variant="circle" width={50} height={50} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <BSkeleton width="60%" height={16} radius={4} />
          <BSkeleton width="40%" height={14} radius={4} />
        </div>
      </div>

      {/* Content lines */}
      <BSkeleton width="100%" height={20} radius={4} />
      <BSkeleton width="90%" height={20} radius={4} />
      <BSkeleton width="95%" height={20} radius={4} />

      {/* Image placeholder */}
      <BSkeleton width="100%" height={200} radius={8} />

      {/* Tags */}
      <div style={{ display: "flex", gap: "8px" }}>
        <BSkeleton width={60} height={24} radius={12} />
        <BSkeleton width={80} height={24} radius={12} />
        <BSkeleton width={70} height={24} radius={12} />
      </div>
    </div>
  ),
};

// Example: Card skeleton
export const CardSkeleton: Story = {
  render: () => (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "16px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <BSkeleton variant="circle" width={40} height={40} />
        <div style={{ flex: 1 }}>
          <BSkeleton width="70%" height={16} radius={4} />
        </div>
      </div>
      <BSkeleton width="100%" height={120} radius={8} />
      <BSkeleton width="100%" height={14} radius={4} />
      <BSkeleton width="80%" height={14} radius={4} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
        <BSkeleton width={80} height={32} radius={16} />
        <BSkeleton width={80} height={32} radius={16} />
      </div>
    </div>
  ),
};

// Example: List skeleton
export const ListSkeleton: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "400px" }}>
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <BSkeleton variant="circle" width={48} height={48} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            <BSkeleton width="60%" height={16} radius={4} />
            <BSkeleton width="40%" height={14} radius={4} />
          </div>
          <BSkeleton width={60} height={24} radius={12} />
        </div>
      ))}
    </div>
  ),
};
