import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BCheckbox } from "./BCheckbox";
import type { BCheckboxProps } from "./BCheckbox";

const meta = {
  title: "Components/Checkbox",
  component: BCheckbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Trạng thái checked",
    },
    disabled: {
      control: "boolean",
      description: "Trạng thái disabled",
    },
    onChange: {
      action: "changed",
      description: "Hàm xử lý khi thay đổi",
    },
    children: {
      control: "text",
      description: "Label của checkbox",
    },
  },
} satisfies Meta<typeof BCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const CheckboxWithState = (args: BCheckboxProps) => {
  const [checked, setChecked] = useState(args.checked || false);
  return (
    <BCheckbox
      {...args}
      checked={checked}
      onChange={(newChecked) => setChecked(newChecked)}
    />
  );
};

export const Default: Story = {
  render: CheckboxWithState,
  args: {
    checked: false,
    disabled: false,
    children: "Checkbox label",
  },
};

export const Checked: Story = {
  render: CheckboxWithState,
  args: {
    checked: true,
    disabled: false,
    children: "Checked checkbox",
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    children: "Disabled checkbox",
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    children: "Disabled checked checkbox",
  },
};

export const WithoutLabel: Story = {
  render: CheckboxWithState,
  args: {
    checked: false,
    disabled: false,
  },
};

const MultipleCheckboxesComponent = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <BCheckbox checked={checked1} onChange={setChecked1}>
        Option 1
      </BCheckbox>
      <BCheckbox checked={checked2} onChange={setChecked2}>
        Option 2 (pre-checked)
      </BCheckbox>
      <BCheckbox checked={checked3} onChange={setChecked3} disabled>
        Option 3 (disabled)
      </BCheckbox>
    </div>
  );
};

export const MultipleCheckboxes: Story = {
  args: {
    checked: false,
    disabled: false,
  },
  render: () => <MultipleCheckboxesComponent />,
};

export const LongLabel: Story = {
  render: CheckboxWithState,
  args: {
    checked: false,
    disabled: false,
    children:
      "Đây là một label rất dài để kiểm tra cách hiển thị của checkbox khi có nội dung dài",
  },
};
