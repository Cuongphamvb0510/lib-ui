# VBA UI

Thư viện UI components và styles cho React được xây dựng với TypeScript và Vite.

## 📦 Cài đặt

```bash
npm install vba-ui
# hoặc
yarn add vba-ui
# hoặc
pnpm add vba-ui
```

## 🚀 Sử dụng

### Import Components

```tsx
import { Button } from "vba-ui";

function App() {
  return (
    <div>
      <Button />
    </div>
  );
}
```

### Icon Component

Component `IconComponent` cho phép bạn sử dụng các icon SVG có sẵn trong thư viện.

#### Cách sử dụng cơ bản

```tsx
import { IconComponent } from "vba-ui";

function App() {
  return (
    <div>
      <IconComponent name="icTick" />
      <IconComponent name="icArrowRight" />
      <IconComponent name="icSearch" />
    </div>
  );
}
```

#### Props

- **`name`** (bắt buộc): Tên của icon (ví dụ: `"icTick"`, `"icArrowRight"`, `"icSearch"`)
- **`size`** (tùy chọn): Kích thước icon, mặc định là `24` (có thể là số hoặc string)
- **`color`** (tùy chọn): Màu sắc của icon, mặc định là `"currentColor"` (sẽ kế thừa màu từ parent)
- **Các props khác**: Component hỗ trợ tất cả các props của SVG element (như `className`, `style`, `onClick`, v.v.)

#### Ví dụ sử dụng

```tsx
import { IconComponent } from "vba-ui";

function App() {
  return (
    <div>
      {/* Icon với kích thước mặc định */}
      <IconComponent name="icTick" />

      {/* Icon với kích thước tùy chỉnh */}
      <IconComponent name="icArrowRight" size={32} />

      {/* Icon với màu tùy chỉnh */}
      <IconComponent name="icSearch" color="#ff6b6b" />

      {/* Icon với className và style */}
      <IconComponent
        name="icCalendar"
        size={20}
        className="my-icon"
        style={{ marginRight: "8px" }}
      />

      {/* Icon có thể click được */}
      <IconComponent
        name="icClose"
        onClick={() => console.log("Clicked!")}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
```

#### Danh sách các icon có sẵn

**Lưu ý**: Nếu bạn sử dụng một tên icon không tồn tại, component sẽ hiển thị cảnh báo trong console và không render gì.

## 📦 Components

### BText Component

Component text với nhiều tùy chọn về kiểu, màu sắc, và căn chỉnh.

#### Cách sử dụng cơ bản

```tsx
import {
  BText,
  TEXT_TYPES,
  TEXT_WEIGHTS,
  TEXT_COLORS,
  TEXT_ALIGN,
} from "vba-ui";

function App() {
  return (
    <div>
      <BText type={TEXT_TYPES.HEADLINE}>Headline Text</BText>
      <BText type={TEXT_TYPES.TITLE}>Title Text</BText>
      <BText type={TEXT_TYPES.BODY}>Body Text</BText>
      <BText type={TEXT_TYPES.CAPTION}>Caption Text</BText>
    </div>
  );
}
```

#### Props

- **`children`** (tùy chọn): Nội dung text
- **`type`** (tùy chọn): Kiểu text - `TEXT_TYPES.HEADLINE`, `TEXT_TYPES.TITLE`, `TEXT_TYPES.BODY`, `TEXT_TYPES.CAPTION` (mặc định: `BODY`)
- **`weight`** (tùy chọn): Độ đậm - `TEXT_WEIGHTS.LIGHT` (200), `TEXT_WEIGHTS.NORMAL` (400), `TEXT_WEIGHTS.SEMIBOLD` (600), `TEXT_WEIGHTS.BOLD` (700)
- **`color`** (tùy chọn): Màu sắc - `TEXT_COLORS.PRIMARY_MAIN`, `TEXT_COLORS.GRAY_500`, `TEXT_COLORS.DANGER`, v.v.
- **`align`** (tùy chọn): Căn chỉnh - `TEXT_ALIGN.LEFT`, `TEXT_ALIGN.CENTER`, `TEXT_ALIGN.RIGHT` (mặc định: `LEFT`)
- **`truncate`** (tùy chọn): Cắt text dài với ellipsis (mặc định: `false`)
- **`onClick`** (tùy chọn): Callback khi click vào text
- **`as`** (tùy chọn): HTML element - `TEXT_ELEMENTS.DIV`, `TEXT_ELEMENTS.SPAN` (mặc định: `DIV`)
- **`className`** (tùy chọn): CSS class tùy chỉnh
- **`dangerouslySetInnerHTML`** (tùy chọn): Render HTML trực tiếp

#### Ví dụ sử dụng

```tsx
import {
  BText,
  TEXT_TYPES,
  TEXT_WEIGHTS,
  TEXT_COLORS,
  TEXT_ALIGN,
} from "vba-ui";

function App() {
  return (
    <div>
      {/* Text với các style khác nhau */}
      <BText type={TEXT_TYPES.HEADLINE} weight={TEXT_WEIGHTS.BOLD}>
        Headline Bold
      </BText>

      <BText
        type={TEXT_TYPES.TITLE}
        color={TEXT_COLORS.PRIMARY_MAIN}
        align={TEXT_ALIGN.CENTER}
      >
        Centered Title
      </BText>

      {/* Text có thể click */}
      <BText type={TEXT_TYPES.BODY} onClick={() => console.log("Clicked!")}>
        Clickable Text
      </BText>

      {/* Text bị cắt với ellipsis */}
      <BText type={TEXT_TYPES.BODY} truncate={true} style={{ width: "200px" }}>
        Very long text that will be truncated with ellipsis
      </BText>

      {/* Text dạng span */}
      <BText as={TEXT_ELEMENTS.SPAN} type={TEXT_TYPES.CAPTION}>
        Inline text
      </BText>
    </div>
  );
}
```

### BButton Component

Component button với nhiều kiểu và tùy chọn.

#### Cách sử dụng cơ bản

```tsx
import { BButton, BUTTON_TYPES, BUTTON_WIDTHS } from "vba-ui";

function App() {
  return (
    <div>
      <BButton type={BUTTON_TYPES.FULL} onClick={() => console.log("Clicked!")}>
        Click Me
      </BButton>
    </div>
  );
}
```

#### Props

- **`children`** (bắt buộc): Text hiển thị trên button (string)
- **`type`** (tùy chọn): Kiểu button - `BUTTON_TYPES.FULL`, `BUTTON_TYPES.BORDER`, `BUTTON_TYPES.LIGHT` (mặc định: `FULL`)
- **`disabled`** (tùy chọn): Vô hiệu hóa button (mặc định: `false`)
- **`onClick`** (tùy chọn): Callback khi click (có throttle 1000ms)
- **`styleWidth`** (tùy chọn): Độ rộng - `BUTTON_WIDTHS.FULL`, `BUTTON_WIDTHS.FIT_CONTENT` (mặc định: `FULL`)
- **`leftIcon`** (tùy chọn): Icon bên trái (ReactNode)
- **`rightIcon`** (tùy chọn): Icon bên phải (ReactNode)
- **`className`** (tùy chọn): CSS class tùy chỉnh

#### Ví dụ sử dụng

```tsx
import { BButton, BUTTON_TYPES, BUTTON_WIDTHS, IconComponent } from "vba-ui";

function App() {
  return (
    <div>
      {/* Button đầy màu */}
      <BButton type={BUTTON_TYPES.FULL} onClick={() => alert("Full button")}>
        Full Button
      </BButton>

      {/* Button chỉ viền */}
      <BButton
        type={BUTTON_TYPES.BORDER}
        onClick={() => alert("Border button")}
      >
        Border Button
      </BButton>

      {/* Button nền nhạt */}
      <BButton type={BUTTON_TYPES.LIGHT} onClick={() => alert("Light button")}>
        Light Button
      </BButton>

      {/* Button với icon */}
      <BButton
        type={BUTTON_TYPES.FULL}
        leftIcon={<IconComponent name="icTick" size={16} />}
        rightIcon={<IconComponent name="icArrowRight" size={16} />}
      >
        Button with Icons
      </BButton>

      {/* Button fit content */}
      <BButton type={BUTTON_TYPES.FULL} styleWidth={BUTTON_WIDTHS.FIT_CONTENT}>
        Fit Content
      </BButton>

      {/* Button disabled */}
      <BButton type={BUTTON_TYPES.FULL} disabled>
        Disabled Button
      </BButton>
    </div>
  );
}
```

### BRadio Component

Component radio button với hỗ trợ label và nhiều style.

#### Cách sử dụng cơ bản

```tsx
import { BRadio, RADIO_STYLES } from "vba-ui";
import { useState } from "react";

function App() {
  const [selected, setSelected] = useState(false);

  return (
    <BRadio checked={selected} onChange={setSelected}>
      Radio Option
    </BRadio>
  );
}
```

#### Props

- **`checked`** (bắt buộc): Trạng thái được chọn (boolean)
- **`onChange`** (tùy chọn): Callback khi thay đổi trạng thái `(checked: boolean) => void`
- **`disabled`** (tùy chọn): Vô hiệu hóa radio (mặc định: `false`)
- **`children`** (tùy chọn): Label text hoặc ReactNode
- **`mainText`** (tùy chọn): Text chính (nếu không dùng children)
- **`subText`** (tùy chọn): Text phụ (nếu không dùng children)
- **`style`** (tùy chọn): Kiểu hiển thị - `RADIO_STYLES.DEFAULT`, `RADIO_STYLES.POPUP` (mặc định: `DEFAULT`)
- **`className`** (tùy chọn): CSS class tùy chỉnh

#### Ví dụ sử dụng

```tsx
import { BRadio, RADIO_STYLES } from "vba-ui";
import { useState } from "react";

function App() {
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(true);

  return (
    <div>
      {/* Radio với children */}
      <BRadio checked={option1} onChange={setOption1}>
        Option 1
      </BRadio>

      {/* Radio với mainText và subText */}
      <BRadio
        checked={option2}
        onChange={setOption2}
        mainText="Main Text"
        subText="Sub text description"
      />

      {/* Radio popup style (label trái, radio phải) */}
      <BRadio
        checked={option1}
        onChange={setOption1}
        style={RADIO_STYLES.POPUP}
        mainText="Popup Style"
      />

      {/* Radio disabled */}
      <BRadio checked={true} disabled>
        Disabled Radio
      </BRadio>
    </div>
  );
}
```

### BCheckbox Component

Component checkbox với hỗ trợ label.

#### Cách sử dụng cơ bản

```tsx
import { BCheckbox } from "vba-ui";
import { useState } from "react";

function App() {
  const [checked, setChecked] = useState(false);

  return (
    <BCheckbox checked={checked} onChange={setChecked}>
      Checkbox Label
    </BCheckbox>
  );
}
```

#### Props

- **`checked`** (bắt buộc): Trạng thái được chọn (boolean)
- **`onChange`** (tùy chọn): Callback khi thay đổi trạng thái `(checked: boolean) => void`
- **`disabled`** (tùy chọn): Vô hiệu hóa checkbox (mặc định: `false`)
- **`children`** (tùy chọn): Label text hoặc ReactNode
- **`className`** (tùy chọn): CSS class tùy chỉnh

#### Ví dụ sử dụng

```tsx
import { BCheckbox } from "vba-ui";
import { useState } from "react";

function App() {
  const [agree, setAgree] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div>
      <BCheckbox checked={agree} onChange={setAgree}>
        I agree to the terms and conditions
      </BCheckbox>

      <BCheckbox checked={newsletter} onChange={setNewsletter}>
        Subscribe to newsletter
      </BCheckbox>

      <BCheckbox checked={true} disabled>
        Disabled Checkbox
      </BCheckbox>
    </div>
  );
}
```

### BEmptyState Component

Component hiển thị trạng thái rỗng với icon, text và button tùy chọn.

#### Cách sử dụng cơ bản

```tsx
import { BEmptyState, EMPTY_STATE_TYPES } from "vba-ui";

function App() {
  return (
    <BEmptyState
      type={EMPTY_STATE_TYPES.LIST_EMPTY}
      subText="Danh sách trống"
      mainText="Không có dữ liệu"
      buttonText="Tải lại"
      onButtonClick={() => console.log("Reload")}
    />
  );
}
```

#### Props

- **`type`** (bắt buộc): Loại empty state - `EMPTY_STATE_TYPES.LIST_EMPTY`, `EMPTY_STATE_TYPES.SEARCH_EMPTY`, `EMPTY_STATE_TYPES.NOTIFI_EMPTY`, `EMPTY_STATE_TYPES.LINK_EMPTY`
- **`subText`** (bắt buộc): Text mô tả chính
- **`mainText`** (tùy chọn): Text tiêu đề
- **`buttonText`** (tùy chọn): Text trên button
- **`onButtonClick`** (tùy chọn): Callback khi click button
- **`className`** (tùy chọn): CSS class tùy chỉnh

#### Ví dụ sử dụng

```tsx
import { BEmptyState, EMPTY_STATE_TYPES } from "vba-ui";

function App() {
  return (
    <div>
      {/* Empty state cho danh sách */}
      <BEmptyState
        type={EMPTY_STATE_TYPES.LIST_EMPTY}
        mainText="Không có dữ liệu"
        subText="Hiện tại chưa có mục nào trong danh sách"
        buttonText="Tải lại"
        onButtonClick={() => window.location.reload()}
      />

      {/* Empty state cho tìm kiếm */}
      <BEmptyState
        type={EMPTY_STATE_TYPES.SEARCH_EMPTY}
        subText="Không tìm thấy kết quả phù hợp"
      />

      {/* Empty state cho thông báo */}
      <BEmptyState
        type={EMPTY_STATE_TYPES.NOTIFI_EMPTY}
        mainText="Chưa có thông báo"
        subText="Bạn sẽ nhận được thông báo tại đây"
      />

      {/* Empty state cho link */}
      <BEmptyState
        type={EMPTY_STATE_TYPES.LINK_EMPTY}
        subText="Không có liên kết nào"
        buttonText="Thêm liên kết"
        onButtonClick={() => console.log("Add link")}
      />
    </div>
  );
}
```

## 🎨 Constants

### COLORS

Thư viện cung cấp các constants màu sắc để sử dụng trong TypeScript/JavaScript code. Tất cả màu sắc đều sử dụng CSS custom properties (CSS variables) để hỗ trợ theme và dark mode.

#### Import

```tsx
import {
  COLORS,
  TEXT_COLORS,
  CSS_COLOR_VARS,
  getColorValue,
  getCssVarName,
} from "vba-ui";
```

#### COLORS Object

Object chứa tất cả các màu sắc dưới dạng CSS variable values (ví dụ: `var(--Primary-Brand-color-500---Main)`).

**Các nhóm màu:**

- **Primary Brand Colors**: `PrimaryBrandColor600`, `PrimaryBrandColor500`, `PrimaryBrandColor100`, `PrimaryBrandColor50`, `PrimaryBrandColor25`
- **Neutral Gray Colors**: `NeutralGray500`, `NeutralGray400`, `NeutralGray300`, `NeutralGray200`, `NeutralGray100`, `NeutralGray50`, `NeutralGray25`, `NeutralGray5`
- **White**: `NeutralWhite500`
- **Semantic Dangerous Red**: `SematicDangerousRed500`, `SematicDangerousRed50`, `SematicDangerousRed25`
- **Semantic Success Green**: `SematicSuccessGreen500`, `SematicSuccessGreen50`, `SematicSuccessGreen25`
- **Semantic Information Blue**: `SematicInformationBlue500`, `SematicInformationBlue600`, `SematicInformationBlue50`, `SematicInformationBlue25`
- **Semantic Warning Orange**: `SematicWarningOrange500`, `SematicWarningOrange50`, `SematicWarningOrange25`

**Ví dụ sử dụng:**

```tsx
import { COLORS } from "vba-ui";

function MyComponent() {
  return (
    <div
      style={{
        backgroundColor: COLORS.PrimaryBrandColor500,
        color: COLORS.NeutralWhite500,
        borderColor: COLORS.NeutralGray300,
      }}
    >
      Styled Component
    </div>
  );
}
```

#### TEXT_COLORS Object

Object chứa các màu sắc được sử dụng cho text components (BText).

**Các màu có sẵn:**

- `PRIMARY_MAIN`: Màu chính của brand
- `PRIMARY_50`: Màu brand nhạt
- `GRAY_500`, `GRAY_400`, `GRAY_300`, `GRAY_100`, `GRAY_50`: Các sắc thái xám
- `WHITE`: Màu trắng
- `DANGER`: Màu đỏ cảnh báo
- `SUCCESS`: Màu xanh thành công
- `INFO_BLUE`: Màu xanh thông tin
- `INFO_BLUE_600`: Màu xanh thông tin đậm hơn

**Ví dụ sử dụng:**

```tsx
import { BText, TEXT_COLORS } from "vba-ui";

function App() {
  return (
    <div>
      <BText color={TEXT_COLORS.PRIMARY_MAIN}>Primary Text</BText>
      <BText color={TEXT_COLORS.DANGER}>Error Text</BText>
      <BText color={TEXT_COLORS.SUCCESS}>Success Text</BText>
    </div>
  );
}
```

#### CSS_COLOR_VARS Object

Object chứa tên các CSS custom properties (không có prefix `var()`).

**Ví dụ sử dụng:**

```tsx
import { CSS_COLOR_VARS } from "vba-ui";

// Sử dụng trong CSS-in-JS hoặc inline styles
const style = {
  [`--custom-color`]: CSS_COLOR_VARS.PrimaryBrandColor500,
};
```

#### Helper Functions

##### `getColorValue(cssVar: string): string`

Lấy giá trị màu thực tế từ CSS variable (resolve giá trị từ CSS custom property).

**Tham số:**

- `cssVar`: CSS variable string (có thể là `var(--color-name)` hoặc `--color-name` hoặc hex color `#ffffff`)

**Trả về:** Giá trị màu thực tế (ví dụ: `#ff6b6b`) hoặc giá trị gốc nếu không resolve được

**Ví dụ:**

```tsx
import { COLORS, getColorValue } from "vba-ui";

function MyComponent() {
  // Lấy giá trị màu thực tế từ CSS variable
  const actualColor = getColorValue(COLORS.PrimaryBrandColor500);
  console.log(actualColor); // "#ff6b6b" (giá trị thực tế)

  // Có thể dùng với hex color trực tiếp
  const hexColor = getColorValue("#ff6b6b");
  console.log(hexColor); // "#ff6b6b"

  return <div style={{ color: actualColor }}>Colored Text</div>;
}
```

**Lưu ý:**

- Function này sử dụng cache để tối ưu performance
- Chỉ hoạt động trong browser environment (không hoạt động trong SSR nếu chưa có DOM)

##### `getCssVarName(colorKey: keyof typeof COLORS): string`

Lấy tên CSS variable từ key của COLORS object.

**Tham số:**

- `colorKey`: Key của COLORS object (ví dụ: `"PrimaryBrandColor500"`)

**Trả về:** Tên CSS variable (ví dụ: `"--Primary-Brand-color-500---Main"`)

**Ví dụ:**

```tsx
import { getCssVarName } from "vba-ui";

const varName = getCssVarName("PrimaryBrandColor500");
console.log(varName); // "--Primary-Brand-color-500---Main"

// Sử dụng trong CSS-in-JS
const style = {
  [varName]: "#ff6b6b",
};
```

#### Ví dụ sử dụng tổng hợp

```tsx
import {
  COLORS,
  TEXT_COLORS,
  getColorValue,
  getCssVarName,
  BText,
} from "vba-ui";

function ColorExamples() {
  return (
    <div>
      {/* Sử dụng COLORS trong inline styles */}
      <div
        style={{
          backgroundColor: COLORS.PrimaryBrandColor500,
          color: COLORS.NeutralWhite500,
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        Primary Background
      </div>

      {/* Sử dụng TEXT_COLORS với BText */}
      <BText color={TEXT_COLORS.PRIMARY_MAIN}>Primary Text</BText>
      <BText color={TEXT_COLORS.DANGER}>Error Message</BText>

      {/* Lấy giá trị màu thực tế */}
      <div
        style={{
          color: getColorValue(COLORS.SematicDangerousRed500),
        }}
      >
        Actual Color Value
      </div>

      {/* Sử dụng với CSS variables động */}
      <div
        style={{
          [getCssVarName("PrimaryBrandColor500")]: "#ff6b6b",
        }}
      >
        Dynamic CSS Variable
      </div>
    </div>
  );
}
```

### Import Styles

#### Cách 1: Import tất cả styles

```scss
// Trong file SCSS của bạn (ví dụ: main.scss hoặc App.scss)
@import "vba-ui/styles";
```

#### Cách 2: Import từng module riêng lẻ

```scss
// Import chỉ những gì bạn cần
@import "vba-ui/styles/colors";
@import "vba-ui/styles/flexbox";
@import "vba-ui/styles/space";
@import "vba-ui/styles/border-radius";
@import "vba-ui/styles/gradient-border";
@import "vba-ui/styles/screen-container";
@import "vba-ui/styles/fixed-bottom-buttons";
```

#### Cách 3: Import trong JavaScript/TypeScript

```tsx
// Trong file .tsx hoặc .ts
import "vba-ui/styles";
// hoặc
import "vba-ui/styles/colors";
```

## 🎨 Các Style Modules

### Colors (`colors.scss`)

Định nghĩa các CSS custom properties cho màu sắc:

- **Primary Brand Colors**: `--Primary-Brand-color-600`, `--Primary-Brand-color-500---Main`, v.v.
- **Neutral Gray Colors**: `--Neutral-Gray-500`, `--Neutral-Gray-400`, v.v.
- **Semantic Colors**: Danger (Red), Success (Green), Information (Blue), Warning (Orange)

Hỗ trợ cả light mode và dark mode.

**Ví dụ sử dụng:**

```scss
.my-element {
  background-color: var(--Primary-Brand-color-500---Main);
  color: var(--Neutral-White-500);
}
```

### Flexbox (`flexbox.scss`)

Các utility classes cho flexbox layout:

- `.flex`, `.inline-flex`
- `.flex-row`, `.flex-col`, `.flex-row-reverse`, `.flex-col-reverse`
- `.justify-start`, `.justify-end`, `.justify-center`, `.justify-between`, `.justify-around`, `.justify-evenly`
- `.items-start`, `.items-end`, `.items-center`, `.items-stretch`, `.items-baseline`
- `.flex-wrap`, `.flex-nowrap`, `.flex-wrap-reverse`
- `.grow`, `.grow-0`, `.shrink`, `.shrink-0`
- `.flex-1`, `.flex-auto`, `.flex-initial`, `.flex-none`
- `.basis-0`, `.basis-full`, `.basis-1_2`, `.basis-1_3`, `.basis-2_3`, v.v.

**Ví dụ sử dụng:**

```tsx
<div className="flex flex-col items-center justify-between">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Space (`space.scss`)

Các utility classes cho margin và padding:

- **Directional**: `mt-1`, `mr-2`, `mb-3`, `ml-4` (margin/padding theo hướng)
- **All sides**: `m-1`, `p-2` (margin/padding tất cả các cạnh)
- **Horizontal/Vertical**: `mx-1`, `my-2`, `px-3`, `py-4`
- **Two values**: `m-2-4` (margin: 8px 16px)
- **Values**: 0-20 (mỗi giá trị = 4px)

**Ví dụ sử dụng:**

```tsx
<div className="m-4 p-2 mt-8 mb-4">Content with spacing</div>
```

### Border Radius (`border-radius.scss`)

Các utility classes cho border radius:

- **Pixel values**: `.rounded-4`, `.rounded-8`, `.rounded-12`, `.rounded-16`, `.rounded-20`, v.v. (4-48px)
- **Directional**: `.rounded-t-8`, `.rounded-b-16`, `.rounded-l-12`, `.rounded-r-20`
- **Corner specific**: `.rounded-tl-8`, `.rounded-tr-12`, `.rounded-bl-16`, `.rounded-br-20`
- **Percentage**: `.rounded-25p`, `.rounded-50p`, `.rounded-75p`, `.rounded-100p`
- **Directional percentage**: `.rounded-t-25p`, `.rounded-br-75p`, v.v.

**Ví dụ sử dụng:**

```tsx
<div className="rounded-16 rounded-tl-8">Rounded corners</div>
```

### Gradient Border (`gradient-border.scss`)

Mixin để tạo border với gradient:

```scss
@import "vba-ui/styles/gradient-border";

.my-card {
  @include gradient-border(
    $border-radius: 16px,
    $inner-border-radius: 15px,
    $gradient: linear-gradient(135deg, #fc6f20, #ffe867),
    $background: var(--Neutral-White-500)
  );
}
```

### Screen Container (`screen-container.scss`)

Mixin cho container với scroll:

```scss
@import "vba-ui/styles/screen-container";

.my-container {
  @include screen-container(
    $height-offset: 60px,
    $background-color: var(--Neutral-White-500)
  );
}
```

### Fixed Bottom Buttons (`fixed-bottom-buttons.scss`)

Mixin cho fixed bottom button container:

```scss
@import "vba-ui/styles/fixed-bottom-buttons";

.button-container {
  @include fixed-bottom-buttons(
    $border-color: var(--Neutral-Gray-100),
    $z-index: 100,
    $padding: 16px,
    $bottom: 0,
    $padding-bottom: 16px
  );
}
```

## 🛠️ Development

### Build

```bash
npm run build
```

Build sẽ tạo ra:

- `dist/index.cjs` - CommonJS format
- `dist/index.esm.js` - ES Module format
- `dist/index.d.ts` - TypeScript declarations
- `dist/styles/*.scss` - Tất cả SCSS files

### Development Server

```bash
npm run dev
```

### Icon Gallery Demo

Chạy trang demo để xem tất cả các icon có sẵn và cách sử dụng:

```bash
npm run dev:demo
```

Trang demo sẽ mở tại `http://localhost:5173` với các tính năng:

### Lint

```bash
npm run lint
```

## 📝 Yêu cầu

- React >= 18
- Node.js >= 18

## 📄 License

MIT
