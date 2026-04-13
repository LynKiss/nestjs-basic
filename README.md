# NestJS Basic

Du an NestJS basic cho cac module auth, company, job, user, resume va upload file.

## Chay du an

1. Cai dependencies:

```bash
npm install
```

2. Chay development:

```bash
npm run dev
```

3. Kiem tra TypeScript:

```bash
npx tsc --noEmit
```

## Ghi chu module resume

API lay danh sach resume trong `GET /api/v1/resumes` ho tro:

- `current`: trang hien tai
- `pageSize`: so phan tu moi trang
- `populate`: cac truong tham chieu can populate, vi du `companyId,jobId`
- `fields`: cac field can tra ve sau khi populate

Vi du:

```text
/api/v1/resumes?current=1&pageSize=10&populate=companyId,jobId&fields=companyId._id,companyId.name,companyId.logo,jobId._id,jobId.name
```

Ket qua mong muon:

- `companyId` duoc populate thanh object company
- `jobId` duoc populate thanh object job
- chi tra ve cac field duoc liet ke trong `fields`

## Test bang Postman

Truoc khi test, can dang nhap de lay `access_token` va them header:

```text
Authorization: Bearer <access_token>
```

### 1. Tao permission

Method: `POST`

```text
http://localhost:8000/api/v1/permissions
```

Body JSON:

```json
{
  "name": "Get users",
  "apiPath": "/api/v1/users",
  "method": "GET",
  "module": "USERS"
}
```

Ket qua mong doi:

- tao thanh cong 1 permission moi
- backend tu check cap `apiPath + method` da ton tai hay chua
- backend tu luu them thong tin `createdBy`
- response co dang:

```json
{
  "statusCode": 201,
  "message": "Create a new permission",
  "data": {
    "_id": "...",
    "createdAt": "..."
  }
}
```

### 2. Cap nhat permission

Method: `PATCH`

```text
http://localhost:8000/api/v1/permissions/<permission_id>
```

Body JSON:

```json
{
  "name": "fetch user",
  "apiPath": "/users",
  "method": "POST",
  "module": "BLA BLA"
}
```

Yeu cau:

- truyen JWT o header
- truyen dung `permission_id` tren URL

Ket qua mong doi:

- response co dang ket qua update:

```json
{
  "statusCode": 200,
  "message": "Update a permission",
  "data": {
    "acknowledged": true,
    "matchedCount": 1,
    "modifiedCount": 1,
    "upsertedCount": 0,
    "upsertedId": null
  }
}
```

### 3. Lay danh sach permission

Method: `GET`

```text
http://localhost:8000/api/v1/permissions?current=1&pageSize=10
```

Yeu cau:

- truyen JWT o header
- truyen dong params de phan trang: `current`, `pageSize`

Ket qua mong doi:

- response co `meta` va `result`
- `result` la danh sach permission da tao

### 4. Lay chi tiet permission

Method: `GET`

```text
http://localhost:8000/api/v1/permissions/<permission_id>
```

Yeu cau:

- truyen JWT o header
- truyen dung `permission_id` tren URL

Ket qua mong doi:

- response tra ve chi tiet 1 permission
- co day du cac field `name`, `apiPath`, `method`, `module`

### 5. Xoa permission

Method: `DELETE`

```text
http://localhost:8000/api/v1/permissions/<permission_id>
```

Yeu cau:

- truyen JWT o header
- truyen dung `permission_id` tren URL

Ket qua mong doi:

- response xoa mem thanh cong
- du lieu tra ve co `deleted: 1` hoac thong tin xoa tu soft delete plugin

### 6. Tao role

Method: `POST`

```text
http://localhost:8000/api/v1/roles
```

Body JSON:

```json
{
  "name": "HR",
  "description": "Role quan ly module nguoi dung va CV",
  "isActive": true,
  "permissions": ["PUT_PERMISSION_ID_HERE"]
}
```

Luu y:

- thay `PUT_PERMISSION_ID_HERE` bang `_id` that cua permission da tao o buoc 1

Ket qua mong doi:

- role duoc tao thanh cong
- backend check khong cho trung `name`
- response co dang:

```json
{
  "statusCode": 201,
  "message": "Create a new role",
  "data": {
    "_id": "...",
    "createdAt": "..."
  }
}
```

### 7. Lay danh sach role va populate permissions

Method: `GET`

```text
http://localhost:8000/api/v1/roles?current=1&pageSize=10&populate=permissions&fields=name,description,isActive,permissions
```

Ket qua mong doi:

- role tra ve co day du thong tin co ban
- `permissions` duoc populate thanh object thay vi chi la ObjectId

### 8. Lay role theo id

Method: `GET`

```text
http://localhost:8000/api/v1/roles/<role_id>
```

Yeu cau:

- truyen JWT o header
- truyen dung `role_id` tren URL

Ket qua mong doi:

- response tra ve thong tin chi tiet 1 role
- `permissions` duoc populate
- moi permission co cac field `_id`, `apiPath`, `name`, `method`, `module`

### 9. Cap nhat role

Method: `PATCH`

```text
http://localhost:8000/api/v1/roles/<role_id>
```

Body JSON:

```json
{
  "name": "Group Admin",
  "description": "Admin thi full quyen :v",
  "isActive": true,
  "permissions": ["PUT_PERMISSION_ID_HERE"]
}
```

Yeu cau:

- truyen JWT o header
- truyen body dang raw/JSON
- truyen dung `role_id` tren URL

Ket qua mong doi:

- response co dang ket qua update:

```json
{
  "statusCode": 200,
  "message": "Update a role",
  "data": {
    "acknowledged": true,
    "matchedCount": 1,
    "modifiedCount": 1,
    "upsertedCount": 0,
    "upsertedId": null
  }
}
```

Luu y:

- backend co check trung `name` khi update

### 10. Xoa role

Method: `DELETE`

```text
http://localhost:8000/api/v1/roles/<role_id>
```

Yeu cau:

- truyen JWT o header
- truyen dung `role_id` tren URL

Ket qua mong doi:

- response xoa mem thanh cong

### 11. Test API resume by user

Method: `POST`

```text
http://localhost:8000/api/v1/resumes/by-user
```

Yeu cau:

- truyen JWT o header

Ket qua mong doi:

- danh sach resume sap xep giam dan theo `createdAt`
- `companyId` duoc populate va tra ve `name`
- `jobId` duoc populate va tra ve `name`

### 12. Test API resume voi populate company va job

Method: `GET`

```text
http://localhost:8000/api/v1/resumes?current=1&pageSize=10&populate=companyId,jobId&fields=companyId._id,companyId.name,companyId.logo,jobId._id,jobId.name
```

Ket qua mong doi:

- status `200 OK`
- trong `result`, `companyId` va `jobId` da duoc populate
- chi cac field khai bao trong `fields` duoc tra ve

## Luu y

- Project dang dung CommonJS, vi vay `cookie-parser` can import theo kieu `import * as cookieParser from 'cookie-parser';`
- Neu `npm run build` bao loi `EPERM` trong thu muc `dist`, hay dung process Node/Nest dang chay roi build lai.

## Tham khao

- Website: https://hoidanit.com.vn/
- YouTube: https://www.youtube.com/@hoidanit
- TikTok: https://www.tiktok.com/@hoidanit
- Fanpage: https://www.facebook.com/askITwithERIC/
- Udemy: https://www.udemy.com/user/eric-7039/
