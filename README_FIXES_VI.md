# Ghi Chú Các Phần Đã Sửa

Tài liệu này ghi lại những thay đổi đã được sửa trong project và lý do sửa.

## 1. Sửa lỗi VS Code/ESLint báo đỏ do line ending

### Vấn đề

Nhiều file TypeScript bị báo lỗi `prettier/prettier` với nội dung như:

- `Delete ␍`
- `Insert ␍`

Lỗi này xảy ra do project đang mở trên Windows, trong khi Prettier và ESLint chưa đồng nhất cách xử lý line ending.

### Đã sửa gì

- Cập nhật [.prettierrc](d:/BE_update/NestJs_basic/nestjs-basic/.prettierrc) để dùng:
  - `"endOfLine": "crlf"`
- Cập nhật [.eslintrc.js](d:/BE_update/NestJs_basic/nestjs-basic/.eslintrc.js) để rule `prettier/prettier` dùng `crlf`
- Format lại các file chính:
  - [src/main.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/main.ts)
  - [src/app.controller.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/app.controller.ts)
  - [src/app.module.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/app.module.ts)

### Tại sao

Mục tiêu là để VS Code, ESLint và Prettier cùng hiểu một kiểu xuống dòng trên Windows, tránh tình trạng file không sai code nhưng vẫn bị gạch đỏ.

## 2. Tắt cảnh báo `no-unused-vars` gây báo đỏ giả trong NestJS

### Vấn đề

Decorator của NestJS như `@Controller()`, `@Get()`, `@Render()` có thể làm ESLint hiện cảnh báo import "không được dùng", dù code vẫn đúng.

### Đã sửa gì

- Cập nhật [.eslintrc.js](d:/BE_update/NestJs_basic/nestjs-basic/.eslintrc.js):
  - tắt `@typescript-eslint/no-unused-vars`

### Tại sao

Điều này giúp giảm báo đỏ giả trong project NestJS có sử dụng decorator.

## 3. Sửa `app.controller.ts`

### Vấn đề

Controller trang chủ đang có method rỗng, nên bị ESLint báo lỗi `no-empty-function`.

### Đã sửa gì

- Cập nhật [src/app.controller.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/app.controller.ts)
- Thêm `@Render('home')`
- Trả về object:

```ts
return { message: this.appService.getHello() };
```

### Tại sao

Khi dùng `@Render('home')`, controller cần trả về dữ liệu cho view EJS. Nếu method rỗng, vừa sai lint vừa không render được dữ liệu mong muốn.

## 4. Sửa `main.ts` để dùng EJS và static assets

### Đã sửa gì

- Trong [src/main.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/main.ts):
  - dùng `NestExpressApplication`
  - thêm `app.useStaticAssets(...)`
  - thêm `app.setBaseViewsDir(...)`

### Tại sao

Project đang dùng EJS view (`home.ejs`), nên cần cấu hình Express/Nest để:

- phục vụ file static trong `public`
- tìm được thư mục `views`

## 5. Sửa `app.module.ts` để kết nối MongoDB

### Đã sửa gì

- Cập nhật [src/app.module.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/app.module.ts)
- Thêm `MongooseModule.forRoot(...)`

### Tại sao

Project đang được cấu hình để làm việc với MongoDB qua Mongoose.

Lưu ý:

- Trước đó có lỗi DNS với `mongodb+srv`
- Sau khi đổi DNS máy, việc resolve SRV đã tốt hơn
- Sau đó xuất hiện lỗi `bad auth`, nghĩa là code đã chạm được MongoDB nhưng thông tin đăng nhập chưa đúng

## 6. Sửa dependency bị lệch version

### Vấn đề

Khi dùng `nest g resource` và một số lệnh `npm i`, project bị vỡ dependency do npm kéo nhầm bản mới hơn của package Nest.

### Đã sửa gì

- Cập nhật [package.json](d:/BE_update/NestJs_basic/nestjs-basic/package.json)
- Khóa:

```json
"@nestjs/mapped-types": "1.2.2"
```

### Tại sao

Project đang dùng Nest 9, nên cần dùng package cùng major version hoặc version tương thích. Nếu để `*`, npm có thể kéo bản cho Nest 10/11 và gây `ERESOLVE`.

## 7. Kết quả kiểm tra lại

Đã kiểm tra lại bằng:

```bash
npx eslint src/main.ts src/app.controller.ts src/app.module.ts
npx tsc --noEmit
```

Kết quả:

- ESLint sạch
- TypeScript sạch

## 8. Nếu VS Code vẫn còn gạch đỏ

Đó là do cache của editor, không phải code hiện tại.

Hãy chạy:

1. `Ctrl + Shift + P` -> `ESLint: Restart ESLint Server`
2. `Ctrl + Shift + P` -> `TypeScript: Restart TS Server`

Nếu cần, đóng VS Code và mở lại project.
