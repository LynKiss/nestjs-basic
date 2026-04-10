# Huong Dan Su Dung CRUD Jobs

Tai lieu nay mo ta module `jobs` vua duoc tao trong project, bao gom:

- Schema MongoDB cho job
- Cac endpoint CRUD
- Cach gui JWT trong header
- Body mau de test bang Postman
- Giai thich cac field audit nhu `createdBy`, `updatedBy`, `deletedBy`

## 1. Duong dan endpoint

Project dang dung:

- Global prefix: `api`
- URI versioning: `v1`

Vi vay resource jobs co base url:

```txt
/api/v1/jobs
```

## 2. Yeu cau xac thuc

Module nay dang duoc bao ve boi JWT guard global, vi vay khi goi API can gui access token trong header:

```http
Authorization: Bearer <your_access_token>
```

Neu khong gui token hop le, request se bi tu choi.

## 3. Cac endpoint CRUD

### 3.1. Create a job

- Method: `POST`
- URL: `/api/v1/jobs`

Khi tao moi job:

- Du lieu gui len la JSON raw
- Backend tu dong them `createdBy` dua tren user dang dang nhap

Body mau:

```json
{
  "name": "Tuyen NestJS cong ty Product Nhat Ban",
  "skills": ["Node.js", "NestJS", "MongoDB"],
  "company": {
    "_id": "647b65a7464dc26d92730e4c",
    "name": "Hoi Dan IT"
  },
  "location": "Ho Chi Minh",
  "salary": 15000000,
  "quantity": 10,
  "level": "FRESHER",
  "description": "<p>Lam viec voi NestJS, MongoDB va REST API</p>",
  "startDate": "2026-04-11T00:00:00.000Z",
  "endDate": "2026-04-30T23:59:59.000Z",
  "isActive": true
}
```

Response thuong thay:

```json
{
  "statusCode": 201,
  "message": "Tao job thanh cong",
  "data": {
    "_id": "...",
    "name": "Tuyen NestJS cong ty Product Nhat Ban",
    "skills": ["Node.js", "NestJS", "MongoDB"],
    "company": {
      "_id": "647b65a7464dc26d92730e4c",
      "name": "Hoi Dan IT"
    },
    "location": "Ho Chi Minh",
    "salary": 15000000,
    "quantity": 10,
    "level": "FRESHER",
    "description": "<p>Lam viec voi NestJS, MongoDB va REST API</p>",
    "startDate": "2026-04-11T00:00:00.000Z",
    "endDate": "2026-04-30T23:59:59.000Z",
    "isActive": true,
    "createdBy": {
      "_id": "...",
      "email": "user@example.com"
    },
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### 3.2. Get all jobs

- Method: `GET`
- URL: `/api/v1/jobs`

API nay ho tro:

- Phan trang bang `current` va `pageSize`
- Filter/sort thong qua query string, vi service dang dung `api-query-params`

Vi du:

```txt
/api/v1/jobs?current=1&pageSize=10
```

Vi du co filter:

```txt
/api/v1/jobs?current=1&pageSize=10&isActive=true
```

Response thuong thay:

```json
{
  "statusCode": 200,
  "message": "Lay danh sach job thanh cong",
  "data": {
    "meta": {
      "current": 1,
      "pageSize": 10,
      "pages": 1,
      "total": 1
    },
    "result": [
      {
        "_id": "...",
        "name": "Tuyen NestJS cong ty Product Nhat Ban"
      }
    ]
  }
}
```

### 3.3. Get job detail

- Method: `GET`
- URL: `/api/v1/jobs/:id`

Vi du:

```txt
/api/v1/jobs/67f7c8c8d111111111111111
```

Neu id khong dung dinh dang:

- Backend tra `BadRequestException`

Neu khong tim thay job:

- Backend tra `NotFoundException`

### 3.4. Update a job

- Method: `PATCH`
- URL: `/api/v1/jobs/:id`

Khi cap nhat:

- Chi can gui cac field muon sua
- Backend tu dong them `updatedBy` dua tren user dang dang nhap

Body mau:

```json
{
  "salary": 18000000,
  "quantity": 5,
  "level": "JUNIOR",
  "isActive": true
}
```

### 3.5. Delete a job

- Method: `DELETE`
- URL: `/api/v1/jobs/:id`

Khi xoa:

- Backend cap nhat `deletedBy`
- Sau do thuc hien soft delete, khong xoa cung document ngay lap tuc

Response thuong la ket qua tu soft delete plugin.

## 4. Y nghia cac field trong schema

Job hien tai gom cac field chinh:

- `name`: ten vi tri tuyen dung
- `skills`: mang ky nang yeu cau
- `company`: object gom `_id` va `name` cua cong ty
- `location`: dia diem lam viec
- `salary`: muc luong
- `quantity`: so luong can tuyen
- `level`: cap do ung vien
- `description`: mo ta cong viec, co the la HTML string
- `startDate`: ngay bat dau dang job
- `endDate`: ngay het han job
- `isActive`: job con hien thi/hoat dong hay khong

Ngoai ra con co cac field phuc vu theo doi lich su:

- `createdBy`: ai tao job
- `updatedBy`: ai sua job lan gan nhat
- `deletedBy`: ai da xoa mem job
- `createdAt`, `updatedAt`: mongoose tu dong quan ly
- `isDeleted`, `deletedAt`: duoc soft delete plugin su dung

## 5. File code lien quan

- [src/jobs/jobs.controller.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/jobs/jobs.controller.ts)
- [src/jobs/jobs.service.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/jobs/jobs.service.ts)
- [src/jobs/jobs.module.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/jobs/jobs.module.ts)
- [src/jobs/schemas/job.schema.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/jobs/schemas/job.schema.ts)
- [src/jobs/dto/create-job.dto.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/jobs/dto/create-job.dto.ts)
- [src/jobs/dto/update-job.dto.ts](d:/BE_update/NestJs_basic/nestjs-basic/src/jobs/dto/update-job.dto.ts)

## 6. Kiem tra lai

Da kiem tra bang lenh:

```bash
npx tsc --noEmit
```

Ket qua:

- TypeScript pass

## 7. Ghi chu

CRUD jobs hien tai da hoan thanh cac thao tac co ban:

- Tao job
- Lay danh sach jobs
- Lay chi tiet job
- Cap nhat job
- Xoa mem job

Neu muon mo rong them, co the lam tiep:

- Validate `endDate` lon hon `startDate`
- Them endpoint restore job sau khi soft delete
- Them filter nang cao theo `skills`, `salary`, `level`
- Them swagger hoac postman collection cho jobs
