import type { Meta, StoryObj } from "@storybook/react";
import { BButton } from "./BButton";
import { BUTTON_TYPES, BUTTON_WIDTHS } from "../../constants";
import { IconComponent } from "../Icon";

const meta = {
  title: "Components/Button",
  component: BButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: Object.values(BUTTON_TYPES),
      description: "Loại button",
    },
    styleWidth: {
      control: "select",
      options: Object.values(BUTTON_WIDTHS),
      description: "Chiều rộng của button",
    },
    disabled: {
      control: "boolean",
      description: "Trạng thái disabled",
    },
    children: {
      control: "text",
      description: "Nội dung button",
    },
    onClick: {
      action: "clicked",
      description: "Hàm xử lý khi click",
    },
  },
} satisfies Meta<typeof BButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    type: BUTTON_TYPES.FULL,
    styleWidth: BUTTON_WIDTHS.FULL,
    disabled: false,
  },
};

export const Border: Story = {
  args: {
    children: "Button Border",
    type: BUTTON_TYPES.BORDER,
    styleWidth: BUTTON_WIDTHS.FULL,
    disabled: false,
  },
};

export const Light: Story = {
  args: {
    children: "Button Light",
    type: BUTTON_TYPES.LIGHT,
    styleWidth: BUTTON_WIDTHS.FULL,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    children: "Button Disabled",
    type: BUTTON_TYPES.FULL,
    styleWidth: BUTTON_WIDTHS.FULL,
    disabled: true,
  },
};

export const FitContent: Story = {
  args: {
    children: "Button Fit Content",
    type: BUTTON_TYPES.FULL,
    styleWidth: BUTTON_WIDTHS.FIT_CONTENT,
    disabled: false,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: "Button với Icon trái",
    type: BUTTON_TYPES.FULL,
    styleWidth: BUTTON_WIDTHS.FULL,
    disabled: false,
    leftIcon: <IconComponent name="icArrowRight" size={20} />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Button với Icon phải",
    type: BUTTON_TYPES.FULL,
    styleWidth: BUTTON_WIDTHS.FULL,
    disabled: false,
    rightIcon: <IconComponent name="icArrowRight" size={20} />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: "Button với cả 2 Icon",
    type: BUTTON_TYPES.FULL,
    styleWidth: BUTTON_WIDTHS.FULL,
    disabled: false,
    leftIcon: <IconComponent name="icBack" size={20} />,
    rightIcon: <IconComponent name="icArrowRight" size={20} />,
  },
};

export const AllTypes: Story = {
  args: {
    children: "Button",
    type: BUTTON_TYPES.FULL,
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "300px",
      }}
    >
      <BButton type={BUTTON_TYPES.FULL}>Full Button</BButton>
      <BButton type={BUTTON_TYPES.BORDER}>Border Button</BButton>
      <BButton type={BUTTON_TYPES.LIGHT}>Light Button</BButton>
    </div>
  ),
};

export const AllWidths: Story = {
  args: {
    children: "Button",
    type: BUTTON_TYPES.FULL,
    styleWidth: BUTTON_WIDTHS.FULL,
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "300px",
      }}
    >
      <BButton type={BUTTON_TYPES.FULL} styleWidth={BUTTON_WIDTHS.FULL}>
        Full Width
      </BButton>
      <BButton type={BUTTON_TYPES.FULL} styleWidth={BUTTON_WIDTHS.FIT_CONTENT}>
        Fit Content
      </BButton>
    </div>
  ),
};
