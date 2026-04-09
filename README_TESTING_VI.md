# Huong Dan Test API

Tai lieu nay gom toan bo cach test cac API da lam trong project, tap trung vao:
- Auth: `register`, `login`, `refresh`, `logout`
- Users CRUD: `create`, `find all`, `find by id`, `delete`

## 1. Chuan bi

### Chay project

```bash
npm run start:dev
```

Server hien tai doc `.env` va mac dinh dang chay voi:

```env
PORT=6969
JWT__ACCESS_EXPIRED=300s
JWT_REFRESH_EXPIRED=6000s
```

Base URL de test:

```text
http://localhost:6969/api/v1
```

### Goi y tao Environment trong Postman

Tao cac bien sau:

```text
BASE_URL = http://localhost:6969/api/v1
ACCESS_TOKEN =
REFRESH_TOKEN =
USER_ID =
```

## 2. Luu y quan trong

- API `login` hien tai nhan field `username`, nhung gia tri cua no chinh la `email`
- API `register` khong can JWT
- API `create user` va `delete user` can JWT
- API `get user by id` hien tai la public, khong can JWT
- Password duoc hash truoc khi luu DB
- Refresh token duoc luu dang hash trong DB
- Khi `logout`, refresh token da luu se bi xoa

## 3. Auth APIs

### 3.1 Dang ky tai khoan client

`POST {{BASE_URL}}/auth/register`

Body:

```json
{
  "name": "Lyn",
  "email": "lyn123@gmail.com",
  "password": "1234",
  "age": 20,
  "gender": "male",
  "address": "hcm"
}
```

Response mong doi:

```json
{
  "statusCode": 201,
  "message": "Register a new user",
  "data": {
    "_id": "680...",
    "createdAt": "2026-04-10T..."
  }
}
```

Neu dang ky thanh cong, user duoc tao voi:
- `role = USER`
- khong can JWT
- khong can `createdBy`

### 3.2 Dang nhap

`POST {{BASE_URL}}/auth/login`

Body:

```json
{
  "username": "lyn123@gmail.com",
  "password": "1234"
}
```

Luu y:
- Khong gui field `email` trong login
- Phai gui field `username`
- Gia tri `username` chinh la email da dang ky

Response mong doi:

```json
{
  "statusCode": 201,
  "message": "User Login",
  "data": {
    "access_token": "...",
    "refresh_token": "...",
    "access_token_expires_in": 300,
    "refresh_token_expires_in": 6000,
    "user": {
      "_id": "...",
      "name": "Lyn",
      "email": "lyn123@gmail.com",
      "role": "USER"
    }
  }
}
```

Test script Postman:

```javascript
pm.environment.set("ACCESS_TOKEN", pm.response.json().data.access_token);
pm.environment.set("REFRESH_TOKEN", pm.response.json().data.refresh_token);
pm.environment.set("USER_ID", pm.response.json().data.user._id);
```

### 3.3 Refresh token

`POST {{BASE_URL}}/auth/refresh`

Body:

```json
{
  "refreshToken": "{{REFRESH_TOKEN}}"
}
```

Response mong doi:

```json
{
  "statusCode": 201,
  "message": "Get new access token by refresh token",
  "data": {
    "access_token": "...",
    "refresh_token": "...",
    "access_token_expires_in": 300,
    "refresh_token_expires_in": 6000,
    "user": {
      "_id": "...",
      "name": "Lyn",
      "email": "lyn123@gmail.com",
      "role": "USER"
    }
  }
}
```

Nen cap nhat lai token moi vao environment:

```javascript
pm.environment.set("ACCESS_TOKEN", pm.response.json().data.access_token);
pm.environment.set("REFRESH_TOKEN", pm.response.json().data.refresh_token);
```

### 3.4 Logout

`POST {{BASE_URL}}/auth/logout`

Headers:

```text
Authorization: Bearer {{ACCESS_TOKEN}}
```

Khong can body.

Response mong doi:

```json
{
  "statusCode": 201,
  "message": "User Logout",
  "data": {
    "success": true
  }
}
```

### 3.5 Refresh fail sau logout

Sau khi goi logout, test lai:

`POST {{BASE_URL}}/auth/refresh`

Body:

```json
{
  "refreshToken": "{{REFRESH_TOKEN}}"
}
```

Response mong doi:

```json
{
  "statusCode": 401,
  "message": "Refresh token khong hop le",
  "error": "Unauthorized"
}
```

## 4. Users APIs

## 4.1 Tao user boi admin

`POST {{BASE_URL}}/users`

Headers:

```text
Authorization: Bearer {{ACCESS_TOKEN}}
```

Body:

```json
{
  "name": "hoi dan it",
  "email": "abc@gmail.com",
  "password": "123456",
  "age": 25,
  "gender": "male",
  "address": "vietnam",
  "role": "ADMIN",
  "company": {
    "_id": "647b51974d59e754db118e95",
    "name": "eric"
  }
}
```

Response mong doi:

```json
{
  "statusCode": 201,
  "message": "Create a new User",
  "data": {
    "_id": "...",
    "createdAt": "..."
  }
}
```

Backend tu dong:
- hash password
- luu `createdBy` tu user dang dang nhap

## 4.2 Lay danh sach users

`GET {{BASE_URL}}/users`

Headers:

```text
Authorization: Bearer {{ACCESS_TOKEN}}
```

Response:
- Tra danh sach user
- Khong tra field `password`

## 4.3 Lay user theo id

`GET {{BASE_URL}}/users/{{USER_ID}}`

Khong can JWT.

Response mong doi:

```json
{
  "statusCode": 200,
  "message": "Fetch user by id",
  "data": {
    "_id": "...",
    "name": "Lyn",
    "email": "lyn123@gmail.com",
    "age": 20,
    "gender": "male",
    "address": "hcm",
    "role": "USER",
    "createdBy": null,
    "updatedBy": null,
    "deletedBy": null,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

Luu y:
- API nay khong tra `password`

## 4.4 Xoa user

`DELETE {{BASE_URL}}/users/{{USER_ID}}`

Headers:

```text
Authorization: Bearer {{ACCESS_TOKEN}}
```

Response mong doi:

```json
{
  "statusCode": 200,
  "message": "Delete a User",
  "data": {
    "deleted": 1
  }
}
```

Backend tu dong:
- cap nhat `deletedBy`
- soft delete record

## 5. Thu tu test de de thanh cong nhat

Nen test theo thu tu nay:

1. `POST /auth/register`
2. `POST /auth/login`
3. `POST /auth/refresh`
4. `POST /users`
5. `GET /users/:id`
6. `DELETE /users/:id`
7. `POST /auth/logout`
8. `POST /auth/refresh` de kiem tra refresh fail

## 6. Cac loi thuong gap

### Login bao `UserName/PassWord khong hop le !`

Nguyen nhan thuong gap:
- Chua dang ky user truoc
- Gui sai field login, dung `email` thay vi `username`
- Password sai
- Dang login vao DB khac

Body login dung:

```json
{
  "username": "lyn123@gmail.com",
  "password": "1234"
}
```

### Log backend hien:

```text
[Auth] validateUser {
  username: 'lyn123@gmail.com',
  foundUser: false,
  isPasswordValid: false
}
```

Y nghia:
- Backend khong tim thay user theo email do
- Can kiem tra lai API register co tao user thanh cong chua

### Refresh token khong hop le

Nguyen nhan thuong gap:
- Da logout roi moi refresh
- Dung refresh token cu sau khi da refresh lan moi
- Refresh token het han
- Sai secret hoac sai environment

## 7. Ghi chu ky thuat

- Access token duoc ky bang `JWT__ACCESS_SECRET`
- Access token het han theo `JWT__ACCESS_EXPIRED`
- Refresh token duoc ky bang `JWT_REFRESH_TOKEN`
- Refresh token het han theo `JWT_REFRESH_EXPIRED`
- Thoi gian tra ve cho FE dang la giay, vi du:
  - `300` = 300 giay
  - `6000` = 6000 giay
- Refresh token trong DB duoc luu dang hash, khong luu plain text

## 8. Trang thai hien tai

Da lam xong:
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /users`
- `GET /users`
- `GET /users/:id`
- `DELETE /users/:id`

Chua hoan thien theo spec day du:
- `PATCH /users/:id`
- phan test Jest full project van con vuong module ESM cua `api-query-params`
