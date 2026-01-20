import type { Meta, StoryObj } from "@storybook/react";
import BLoanStatus from "./BLoanStatus";
import { LOAN_STATUS } from "../../constants";

const meta = {
  title: "Components/LoanStatus",
  component: BLoanStatus,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: Object.values(LOAN_STATUS),
      description: "Trạng thái của khoản vay",
    },
    text: {
      control: "text",
      description: "Text tùy chỉnh (nếu không có sẽ dùng text mặc định theo status)",
    },
    className: {
      control: "text",
      description: "CSS class tùy chỉnh",
    },
  },
} satisfies Meta<typeof BLoanStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initiated: Story = {
  args: {
    status: LOAN_STATUS.INITIATED,
  },
};

export const Pending: Story = {
  args: {
    status: LOAN_STATUS.PENDING,
  },
};

export const Approved: Story = {
  args: {
    status: LOAN_STATUS.APPROVED,
  },
};

export const Rejected: Story = {
  args: {
    status: LOAN_STATUS.REJECTED,
  },
};

export const Disbursed: Story = {
  args: {
    status: LOAN_STATUS.DISBURSED,
  },
};

export const WithCustomText: Story = {
  args: {
    status: LOAN_STATUS.APPROVED,
    text: "Đã duyệt",
  },
};

const AllStatusesComponent = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      alignItems: "flex-start",
    }}
  >
    <BLoanStatus status={LOAN_STATUS.INITIATED} />
    <BLoanStatus status={LOAN_STATUS.PENDING} />
    <BLoanStatus status={LOAN_STATUS.APPROVED} />
    <BLoanStatus status={LOAN_STATUS.REJECTED} />
    <BLoanStatus status={LOAN_STATUS.DISBURSED} />
  </div>
);

export const AllStatuses: Story = {
  render: () => <AllStatusesComponent />,
  args: {
    status: LOAN_STATUS.INITIATED,
  },
};
