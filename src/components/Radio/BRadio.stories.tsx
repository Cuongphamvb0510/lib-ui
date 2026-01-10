import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BRadio } from "./BRadio";
import type { BRadioProps } from "./BRadio";
import { RADIO_STYLES } from "../../constants";

const meta = {
  title: "Components/Radio",
  component: BRadio,
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
    style: {
      control: "select",
      options: Object.values(RADIO_STYLES),
      description: "Style của radio",
    },
    onChange: {
      action: "changed",
      description: "Hàm xử lý khi thay đổi",
    },
    children: {
      control: "text",
      description: "Label của radio",
    },
    mainText: {
      control: "text",
      description: "Text chính (khi không dùng children)",
    },
    subText: {
      control: "text",
      description: "Text phụ (khi không dùng children)",
    },
  },
} satisfies Meta<typeof BRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

const RadioWithState = (args: BRadioProps) => {
  const [checked, setChecked] = useState(args.checked || false);
  return (
    <BRadio
      {...args}
      checked={checked}
      onChange={(newChecked) => setChecked(newChecked)}
    />
  );
};

export const Default: Story = {
  render: RadioWithState,
  args: {
    checked: false,
    disabled: false,
    style: RADIO_STYLES.DEFAULT,
    children: "Radio option",
  },
};

export const Checked: Story = {
  render: RadioWithState,
  args: {
    checked: true,
    disabled: false,
    style: RADIO_STYLES.DEFAULT,
    children: "Checked radio",
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    style: RADIO_STYLES.DEFAULT,
    children: "Disabled radio",
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    style: RADIO_STYLES.DEFAULT,
    children: "Disabled checked radio",
  },
};

export const PopupStyle: Story = {
  render: RadioWithState,
  args: {
    checked: false,
    disabled: false,
    style: RADIO_STYLES.POPUP,
    children: "Popup style radio",
  },
};

export const PopupStyleChecked: Story = {
  render: RadioWithState,
  args: {
    checked: true,
    disabled: false,
    style: RADIO_STYLES.POPUP,
    children: "Popup style checked",
  },
};

export const WithMainAndSubText: Story = {
  render: RadioWithState,
  args: {
    checked: false,
    disabled: false,
    style: RADIO_STYLES.DEFAULT,
    mainText: "Main Text",
    subText: "Sub text mô tả thêm",
  },
};

const RadioGroupComponent = () => {
  const [selected, setSelected] = useState("option1");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <BRadio
        checked={selected === "option1"}
        onChange={() => setSelected("option1")}
      >
        Option 1
      </BRadio>
      <BRadio
        checked={selected === "option2"}
        onChange={() => setSelected("option2")}
      >
        Option 2
      </BRadio>
      <BRadio
        checked={selected === "option3"}
        onChange={() => setSelected("option3")}
      >
        Option 3
      </BRadio>
      <BRadio checked={false} onChange={() => {}} disabled>
        Option 4 (disabled)
      </BRadio>
    </div>
  );
};

export const RadioGroup: Story = {
  args: {
    checked: false,
    disabled: false,
    style: RADIO_STYLES.DEFAULT,
  },
  render: () => <RadioGroupComponent />,
};

const PopupStyleGroupComponent = () => {
  const [selected, setSelected] = useState("option1");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "300px",
      }}
    >
      <BRadio
        checked={selected === "option1"}
        onChange={() => setSelected("option1")}
        style={RADIO_STYLES.POPUP}
        mainText="Option 1"
        subText="Mô tả cho option 1"
      />
      <BRadio
        checked={selected === "option2"}
        onChange={() => setSelected("option2")}
        style={RADIO_STYLES.POPUP}
        mainText="Option 2"
        subText="Mô tả cho option 2"
      />
      <BRadio
        checked={selected === "option3"}
        onChange={() => setSelected("option3")}
        style={RADIO_STYLES.POPUP}
        mainText="Option 3"
        subText="Mô tả cho option 3"
      />
    </div>
  );
};

export const PopupStyleGroup: Story = {
  args: {
    checked: false,
    disabled: false,
    style: RADIO_STYLES.POPUP,
  },
  render: () => <PopupStyleGroupComponent />,
};
