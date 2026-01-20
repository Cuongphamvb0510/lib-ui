import React from "react";
import {
  LOAN_STATUS,
  type LoanStatusType,
} from "../../constants";
import "./BLoanStatus.scss";

export interface BLoanStatusProps {
  status: LoanStatusType;
  text?: string;
  className?: string;
}

const STATUS_CONFIG: Record<
  LoanStatusType,
  {
    text: string;
    color: string;
  }
> = {
  [LOAN_STATUS.INITIATED]: {
    text: "Khởi tạo",
    color: "blue",
  },
  [LOAN_STATUS.PENDING]: {
    text: "Chờ xử lý",
    color: "orange",
  },
  [LOAN_STATUS.APPROVED]: {
    text: "Đồng ý cho vay",
    color: "green",
  },
  [LOAN_STATUS.REJECTED]: {
    text: "Từ chối",
    color: "red",
  },
  [LOAN_STATUS.DISBURSED]: {
    text: "Đã giải ngân",
    color: "gray",
  },
};

const BLoanStatus: React.FC<BLoanStatusProps> = ({
  status,
  text,
  className,
}) => {
  const config = STATUS_CONFIG[status];
  const displayText = text || config.text;

  const containerClassName = [
    "b-loan-status",
    `status-${config.color}`,
    "px-3 py-1 rounded-16",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName}>
      <div className="status-text">{displayText}</div>
    </div>
  );
};

export default BLoanStatus;
