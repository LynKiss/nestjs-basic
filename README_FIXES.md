# Fix Notes

Tai lieu nay ghi lai nhung thay doi da duoc sua trong project va ly do sua.

## 1. Sua loi VS Code/ESLint bao do do line ending

### Van de

Nhieu file TypeScript bi bao loi `prettier/prettier` voi noi dung nhu:

- `Delete ␍`
- `Insert ␍`

Loi nay xay ra do project dang mo tren Windows, trong khi Prettier/ESLint khong dong nhat cach xu ly line ending.

### Da sua gi

- Cap nhat [`/.prettierrc`](/d:/BE_update/NestJs_basic/nestjs-basic/.prettierrc) de dung:
  - `"endOfLine": "crlf"`
- Cap nhat [`/.eslintrc.js`](/d:/BE_update/NestJs_basic/nestjs-basic/.eslintrc.js) de rule `prettier/prettier` dung `crlf`
- Format lai cac file chinh:
  - [`/src/main.ts`](/d:/BE_update/NestJs_basic/nestjs-basic/src/main.ts)
  - [`/src/app.controller.ts`](/d:/BE_update/NestJs_basic/nestjs-basic/src/app.controller.ts)
  - [`/src/app.module.ts`](/d:/BE_update/NestJs_basic/nestjs-basic/src/app.module.ts)

### Tai sao

Muc tieu la de VS Code, ESLint va Prettier cung hieu mot kieu xuong dong tren Windows, tranh tinh trang file khong sai code nhung van bi gach do.

## 2. Tat canh bao `no-unused-vars` gay nhieu bao do gia trong NestJS

### Van de

Decorator cua NestJS nhu `@Controller()`, `@Get()`, `@Render()` co the lam ESLint hien canh bao import "khong duoc dung", du code van dung.

### Da sua gi

- Cap nhat [`/.eslintrc.js`](/d:/BE_update/NestJs_basic/nestjs-basic/.eslintrc.js):
  - tat `@typescript-eslint/no-unused-vars`

### Tai sao

Dieu nay giup giam bao do gia trong project NestJS co su dung decorator.

## 3. Sua `app.controller.ts`

### Van de

Controller trang chu dang co method rong, nen bi ESLint bao loi `no-empty-function`.

### Da sua gi

- Cap nhat [`/src/app.controller.ts`](/d:/BE_update/NestJs_basic/nestjs-basic/src/app.controller.ts)
- Them `@Render('home')`
- Tra ve object:

```ts
return { message: this.appService.getHello() };
```

### Tai sao

Khi dung `@Render('home')`, controller can tra ve du lieu cho view EJS. Neu method rong, vua sai lint vua khong render duoc du lieu mong muon.

## 4. Sua `main.ts` de dung EJS/static assets

### Da sua gi

- Trong [`/src/main.ts`](/d:/BE_update/NestJs_basic/nestjs-basic/src/main.ts):
  - dung `NestExpressApplication`
  - them `app.useStaticAssets(...)`
  - them `app.setBaseViewsDir(...)`

### Tai sao

Project dang dung EJS view (`home.ejs`), nen can cau hinh Express/Nest de:

- phuc vu file static trong `public`
- tim duoc thu muc `views`

## 5. Sua `app.module.ts` de ket noi MongoDB

### Da sua gi

- Cap nhat [`/src/app.module.ts`](/d:/BE_update/NestJs_basic/nestjs-basic/src/app.module.ts)
- Them `MongooseModule.forRoot(...)`

### Tai sao

Project dang duoc cau hinh de lam viec voi MongoDB qua Mongoose.

Luu y:

- Truoc do co loi DNS voi `mongodb+srv`
- Sau khi doi DNS may, viec resolve SRV da tot hon
- Sau do xuat hien loi `bad auth`, nghia la code da cham duoc MongoDB nhung thong tin dang nhap chua dung

## 6. Sua dependency bi lech version

### Van de

Khi dung `nest g resource` va mot so lenh `npm i`, project bi vo dependency do npm keo nham ban moi hon cua package Nest.

### Da sua gi

- Cap nhat [`/package.json`](/d:/BE_update/NestJs_basic/nestjs-basic/package.json)
- Khoa:

```json
"@nestjs/mapped-types": "1.2.2"
```

### Tai sao

Project dang dung Nest 9, nen can dung package cung major version hoac version tuong thich. Neu de `*`, npm co the keo ban cho Nest 10/11 va gay `ERESOLVE`.

## 7. Ket qua verify

Da kiem tra lai bang:

```bash
npx eslint src/main.ts src/app.controller.ts src/app.module.ts
npx tsc --noEmit
```

Ket qua:

- ESLint sach
- TypeScript sach

## 8. Neu VS Code van con gach do

Do la do cache editor, khong phai code hien tai.

Hay chay:

1. `Ctrl + Shift + P` -> `ESLint: Restart ESLint Server`
2. `Ctrl + Shift + P` -> `TypeScript: Restart TS Server`

Neu can, dong VS Code va mo lai project.
