import type { Meta, StoryObj } from "@storybook/react";
import { IconComponent } from "./IconComponent";
import { iconsData } from "./icons-data";

const meta = {
  title: "Components/Icon",
  component: IconComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: Object.keys(iconsData),
      description: "Tên của icon",
    },
    size: {
      control: { type: "number", min: 8, max: 200, step: 4 },
      description: "Kích thước của icon",
    },
    color: {
      control: "color",
      description: "Màu sắc của icon",
    },
  },
} satisfies Meta<typeof IconComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "icArrowRight",
    size: 24,
    color: "currentColor",
  },
};

export const Small: Story = {
  args: {
    name: "icArrowRight",
    size: 16,
    color: "currentColor",
  },
};

export const Medium: Story = {
  args: {
    name: "icArrowRight",
    size: 24,
    color: "currentColor",
  },
};

export const Large: Story = {
  args: {
    name: "icArrowRight",
    size: 48,
    color: "currentColor",
  },
};

export const CustomColor: Story = {
  args: {
    name: "icArrowRight",
    size: 24,
    color: "#AF1237",
  },
};

export const AllIcons: Story = {
  args: {
    name: "icArrowRight",
    size: 24,
  },
  render: () => {
    const iconNames = Object.keys(iconsData);
    const colors = [
      "#AF1237",
      "#333333",
      "#4F4F4F",
      "#0084FF",
      "#3EC161",
      "#E11E1E",
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "24px",
          padding: "24px",
          maxWidth: "800px",
        }}
      >
        {iconNames.map((name, index) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "16px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
            }}
          >
            <IconComponent
              name={name}
              size={32}
              color={colors[index % colors.length]}
            />
            <span
              style={{
                fontSize: "12px",
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

export const IconSizes: Story = {
  args: {
    name: "icArrowRight",
    size: 24,
  },
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="icArrowRight" size={16} />
        <span>16px</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="icArrowRight" size={24} />
        <span>24px</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="icArrowRight" size={32} />
        <span>32px</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="icArrowRight" size={48} />
        <span>48px</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="icArrowRight" size={64} />
        <span>64px</span>
      </div>
    </div>
  ),
};

export const IconColors: Story = {
  args: {
    name: "icArrowRight",
    size: 24,
  },
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="icArrowRight" size={32} color="#AF1237" />
        <span>Primary</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="icArrowRight" size={32} color="#333333" />
        <span>Dark</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="icArrowRight" size={32} color="#0084FF" />
        <span>Blue</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="icArrowRight" size={32} color="#3EC161" />
        <span>Green</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent name="icArrowRight" size={32} color="#E11E1E" />
        <span>Red</span>
      </div>
    </div>
  ),
};

export const CommonIcons: Story = {
  args: {
    name: "icArrowRight",
    size: 24,
  },
  render: () => {
    const commonIcons = [
      "icArrowRight",
      "icArrowDown",
      "icBack",
      "icCalendar",
      "icCamera",
      "icCheckDone",
      "icChevronLeft",
      "icChevronRight",
      "icClose",
      "icDelete",
      "icError",
      "icFile",
      "icInfo",
      "icSearch",
      "icSuccess",
      "icTick",
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          gap: "16px",
          padding: "24px",
          maxWidth: "600px",
        }}
      >
        {commonIcons.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "12px",
            }}
          >
            <IconComponent name={name} size={32} />
            <span style={{ fontSize: "11px", textAlign: "center" }}>
              {name.replace("ic", "")}
            </span>
          </div>
        ))}
      </div>
    );
  },
};
