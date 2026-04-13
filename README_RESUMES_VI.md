# Huong Dan Su Dung Module Resumes

Tai lieu nay ghi lai cach dung module `resumes` theo dung flow bai hoc:

- Tao moi resume
- Lay danh sach resume co phan trang
- Lay chi tiet resume theo id
- Doi trang thai resume
- Xoa mem resume
- Lay danh sach resume cua user dang dang nhap

## 1. Base URL

Project dang dung:

- Global prefix: `api`
- URI versioning: `v1`

Vi vay base url cua module la:

```txt
/api/v1/resumes
```

## 2. Xac thuc

Tat ca API trong module nay deu can JWT trong header:

```http
Authorization: Bearer <your_access_token>
```

## 3. Model Resume

Schema resume hien tai gom:

- `email`
- `userId`
- `url`
- `status`
- `companyId`
- `jobId`
- `history`
- `createdBy`
- `updatedBy`
- `deletedBy`
- `createdAt`
- `updatedAt`
- `deletedAt`
- `isDeleted`

Gia tri `status` hop le:

- `PENDING`
- `REVIEWING`
- `APPROVED`
- `REJECTED`

## 4. Tao moi resume

- Method: `POST`
- URL: `/api/v1/resumes`

Body gui len:

```json
{
  "url": "cv-eric.pdf",
  "companyId": "647b65a7464dc26d92730e4c",
  "jobId": "67f7c8c8d111111111111111"
}
```

Backend tu dong set:

- `email` tu `req.user.email`
- `userId` tu `req.user._id`
- `status = "PENDING"`
- `history = [{ status: "PENDING", updatedAt, updatedBy }]`
- `createdBy` tu `req.user`

Response message:

```txt
Create a new resume
```

## 5. Lay danh sach resume co phan trang

- Method: `GET`
- URL: `/api/v1/resumes?current=1&pageSize=10`

Response dang:

```json
{
  "statusCode": 200,
  "message": "Lay danh sach resume thanh cong",
  "data": {
    "meta": {
      "current": 1,
      "pageSize": 10,
      "pages": 1,
      "total": 1
    },
    "result": []
  }
}
```

## 6. Lay chi tiet resume theo id

- Method: `GET`
- URL: `/api/v1/resumes/:id`

Vi du:

```txt
/api/v1/resumes/648968cf5d0db8ac3fc14dab
```

Response message:

```txt
Lay chi tiet resume thanh cong
```

## 7. Doi trang thai resume

- Method: `PATCH`
- URL: `/api/v1/resumes/:id`

Body:

```json
{
  "status": "REVIEWING"
}
```

Hoac:

```json
{
  "status": "APPROVED"
}
```

Backend xu ly:

- update `status`
- update `updatedBy`
- push them mot object moi vao `history`

Response message:

```txt
Update status resume
```

## 8. Xoa mem resume

- Method: `DELETE`
- URL: `/api/v1/resumes/:id`

Backend xu ly:

- luu `deletedBy`
- goi soft delete plugin

## 9. Lay resume theo user dang dang nhap

- Method: `POST`
- URL: `/api/v1/resumes/by-user`

API nay phuc vu frontend sau khi user apply job co the xem lai lich su CV cua chinh minh.

Khong can body, chi can JWT trong header.

Response dang:

```json
{
  "statusCode": 201,
  "message": "Get Resumes by User",
  "data": []
}
```

## 10. Cac file code lien quan

- [src/resumes/schemas/resume.schema.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/resumes/schemas/resume.schema.ts)
- [src/resumes/dto/create-resume.dto.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/resumes/dto/create-resume.dto.ts)
- [src/resumes/dto/update-resume.dto.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/resumes/dto/update-resume.dto.ts)
- [src/resumes/resumes.service.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/resumes/resumes.service.ts)
- [src/resumes/resumes.controller.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/resumes/resumes.controller.ts)
- [src/resumes/resumes.module.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/resumes/resumes.module.ts)

## 11. Kiem tra lai

Da kiem tra bang:

```bash
npx tsc --noEmit
```

Ket qua:

- TypeScript pass
