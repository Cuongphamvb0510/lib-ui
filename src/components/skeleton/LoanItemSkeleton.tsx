import { View } from "@vnxjs/components";
import React from "react";
import BShimmer from "../shimmer/BShimmer";
import "./LoanItemSkeleton.scss";

const LoanItemSkeleton: React.FC = () => {
  return (
    <View className="loan-item-skeleton rounded-16 mb-4">
      {/* Header */}
      <View className="flex items-center justify-between p-4">
        <div className="skeleton-title shimmer">
          <BShimmer />
        </div>
      </View>

      <View className="divider-line mx-4" />

      {/* Content */}
      <View className="p-4">
        {/* Field rows */}
        {[1, 2, 3, 4, 5].map((index) => (
          <View
            key={index}
            className={`flex items-center justify-between ${
              index < 5 ? "mb-4" : ""
            }`}
          >
            <div className="skeleton-label shimmer">
              <BShimmer />
            </div>
            <div className="skeleton-value shimmer">
              <BShimmer />
            </div>
          </View>
        ))}
      </View>
    </View>
  );
};

export default LoanItemSkeleton;
