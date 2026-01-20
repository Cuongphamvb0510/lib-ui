import React, { useState } from "react";
import "./BOptionPopup.scss";
import { BRadio } from "../Radio";
import { BInput } from "../Input";
import { BEmptyState } from "../EmptyState";
import { EMPTY_STATE_TYPES } from "../../constants";
import strings from "../../res/strings";
import type { BPopupRef } from "../Popup";

export interface LoanCategoryValue {
  name: string;
  type: string;
}

export interface OptionPopupProps {
  title: string;
  options: LoanCategoryValue[];
  currentValue: string | { name: string; type: string } | null;
  onSelect: (value: LoanCategoryValue) => void;
  iconClose?: boolean;
  isSearch?: boolean;
  isLoading?: boolean;
  popupRef?: React.RefObject<BPopupRef | null>;
}

// Hàm loại bỏ dấu tiếng Việt
const removeVietnameseTones = (str: string): string => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
};

function OptionPopupDialog({
  options,
  currentValue,
  onSelect,
  isSearch = false,
  isLoading = false,
  popupRef,
}: OptionPopupProps) {
  const [searchValue, setSearchValue] = useState("");
  const shouldShowSearch = isSearch || options.length >= 8;
  const filteredOptions = shouldShowSearch
    ? options.filter((option) => {
        if (!searchValue.trim()) return true;
        const searchTerms = searchValue
          .toLowerCase()
          .split(/\s+/)
          .filter((term) => term.length > 0)
          .map((term) => removeVietnameseTones(term));
        const optionName = removeVietnameseTones(option.name);
        return searchTerms.some((term) => optionName.includes(term));
      })
    : options;

  // Hiển thị skeleton khi đang loading
  if (isLoading) {
    return (
      <div className="option-popup-container">
        <div className="option-popup-options">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index}>
              <div className="py-4 flex items-center">
                <div
                  className="option-skeleton-item shimmer"
                  style={{ width: "80%", height: "20px" }}
                />
              </div>
              {index < 5 && <div className="divider-line" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="option-popup-container">
      {shouldShowSearch && (
        <div className="option-popup-search">
          <BInput
            type="text"
            leftIcon="icSearchOutline"
            placeholder={strings().search}
            value={searchValue}
            onChange={setSearchValue}
            className="mb-3"
          />
        </div>
      )}
      <div className="option-popup-options">
        {filteredOptions.length === 0 ? (
          <BEmptyState
            subText={strings().no_data}
            type={EMPTY_STATE_TYPES.LIST_EMPTY}
          />
        ) : (
          filteredOptions.map((option, index) => {
            const isSelected = currentValue
              ? typeof currentValue === "string"
                ? currentValue === option.type
                : currentValue.type === option.type
              : false;

            return (
              <div key={option.type}>
                <BRadio
                  checked={isSelected}
                  onChange={() => {
                    onSelect(option);
                    popupRef?.current?.hide();
                  }}
                  style="popup"
                  className="py-4"
                >
                  {option.name}
                </BRadio>
                {index < filteredOptions.length - 1 && (
                  <div className="divider-line" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export interface BOptionPopupShowParams extends Omit<OptionPopupProps, "popupRef"> {
  popupRef: React.RefObject<BPopupRef | null>;
}

const BOptionPopup = {
  show: (params: BOptionPopupShowParams) => {
    params.popupRef.current?.show({
      title: params.title,
      iconClose: params.iconClose,
      fixedHeight: params.isSearch || params.options.length >= 8,
      children: <OptionPopupDialog key={Math.random()} {...params} />,
    });
  },
};

export default BOptionPopup;
