import type { Meta, StoryObj } from "@storybook/react";
import { BText } from "./BText";
import {
  TEXT_TYPES,
  TEXT_WEIGHTS,
  TEXT_ALIGN,
  TEXT_COLORS,
  TEXT_ELEMENTS,
} from "../../constants";

const meta = {
  title: "Components/Text",
  component: BText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: Object.values(TEXT_TYPES),
      description: "Loại text",
    },
    weight: {
      control: "select",
      options: Object.values(TEXT_WEIGHTS),
      description: "Độ đậm của text",
    },
    color: {
      control: "select",
      options: Object.values(TEXT_COLORS),
      description: "Màu sắc của text",
    },
    align: {
      control: "select",
      options: Object.values(TEXT_ALIGN),
      description: "Căn lề của text",
    },
    truncate: {
      control: "boolean",
      description: "Cắt text khi quá dài",
    },
    as: {
      control: "select",
      options: Object.values(TEXT_ELEMENTS),
      description: "HTML element được sử dụng",
    },
    children: {
      control: "text",
      description: "Nội dung text",
    },
  },
} satisfies Meta<typeof BText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Text mặc định",
    type: TEXT_TYPES.BODY,
  },
};

export const Title: Story = {
  args: {
    children: "Text Title",
    type: TEXT_TYPES.TITLE,
  },
};

export const Headline: Story = {
  args: {
    children: "Text Headline",
    type: TEXT_TYPES.HEADLINE,
  },
};

export const Caption: Story = {
  args: {
    children: "Text Caption",
    type: TEXT_TYPES.CAPTION,
  },
};

export const Body: Story = {
  args: {
    children: "Text Body",
    type: TEXT_TYPES.BODY,
  },
};

export const AllWeights: Story = {
  args: {
    children: "Text mặc định",
    type: TEXT_TYPES.TITLE,
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <BText type={TEXT_TYPES.TITLE} weight={TEXT_WEIGHTS.LIGHT}>
        Light Weight (200)
      </BText>
      <BText type={TEXT_TYPES.TITLE} weight={TEXT_WEIGHTS.NORMAL}>
        Normal Weight (400)
      </BText>
      <BText type={TEXT_TYPES.TITLE} weight={TEXT_WEIGHTS.SEMIBOLD}>
        Semibold Weight (600)
      </BText>
      <BText type={TEXT_TYPES.TITLE} weight={TEXT_WEIGHTS.BOLD}>
        Bold Weight (700)
      </BText>
    </div>
  ),
};

export const AllColors: Story = {
  args: {
    children: "Text mặc định",
    type: TEXT_TYPES.TITLE,
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <BText type={TEXT_TYPES.TITLE} color={TEXT_COLORS.PRIMARY_MAIN}>
        Primary Main
      </BText>
      <BText type={TEXT_TYPES.TITLE} color={TEXT_COLORS.GRAY_500}>
        Gray 500
      </BText>
      <BText type={TEXT_TYPES.TITLE} color={TEXT_COLORS.GRAY_400}>
        Gray 400
      </BText>
      <BText type={TEXT_TYPES.TITLE} color={TEXT_COLORS.DANGER}>
        Danger
      </BText>
      <BText type={TEXT_TYPES.TITLE} color={TEXT_COLORS.SUCCESS}>
        Success
      </BText>
      <BText type={TEXT_TYPES.TITLE} color={TEXT_COLORS.INFO_BLUE}>
        Info Blue
      </BText>
    </div>
  ),
};

export const AllAlignments: Story = {
  args: {
    children: "Text mặc định",
    type: TEXT_TYPES.TITLE,
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
      <BText type={TEXT_TYPES.TITLE} align={TEXT_ALIGN.LEFT}>
        Left Aligned Text
      </BText>
      <BText type={TEXT_TYPES.TITLE} align={TEXT_ALIGN.CENTER}>
        Center Aligned Text
      </BText>
      <BText type={TEXT_TYPES.TITLE} align={TEXT_ALIGN.RIGHT}>
        Right Aligned Text
      </BText>
    </div>
  ),
};

export const Truncate: Story = {
  args: {
    children: "Text mặc định",
    type: TEXT_TYPES.BODY,
    truncate: false,
  },
  render: () => (
    <div style={{ width: "200px" }}>
      <BText type={TEXT_TYPES.BODY} truncate>
        Đây là một đoạn text rất dài sẽ bị cắt khi vượt quá chiều rộng của
        container
      </BText>
    </div>
  ),
};

export const AsSpan: Story = {
  args: {
    children: "Text as span element",
    type: TEXT_TYPES.BODY,
    as: TEXT_ELEMENTS.SPAN,
  },
};

export const Clickable: Story = {
  args: {
    children: "Clickable Text",
    type: TEXT_TYPES.BODY,
    onClick: () => alert("Text clicked!"),
  },
};

export const WithHTML: Story = {
  args: {
    type: TEXT_TYPES.BODY,
    dangerouslySetInnerHTML: {
      __html: "Text với <strong>HTML</strong> và <em>formatting</em>",
    },
  },
};
