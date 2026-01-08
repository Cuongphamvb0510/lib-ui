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
