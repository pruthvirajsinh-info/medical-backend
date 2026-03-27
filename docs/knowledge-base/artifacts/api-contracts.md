# API Contracts

## 1. Authentication Module (`/auth`)

### `POST /auth/register`
**Request Payload**:
```json
{
  "email": "user@example.com",
  "password": "strongPassword123!",
  "role": "PATIENT" // or "DOCTOR"
}
```
**Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "PATIENT"
  }
}
```

### `POST /auth/login`
**Request Payload**:
```json
{
  "email": "user@example.com",
  "password": "strongPassword123!"
}
```
**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "token": "jwt.string.here",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "PATIENT"
    }
  }
}
```

### `GET /auth/me`
*Requires `Authorization: Bearer <token>`*
**Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "PATIENT",
    "patient": {
      "id": "patient_id",
      "firstName": "John",
      "lastName": "Doe",
      // ...all patient demographic fields
      "assignedDoctor": {
        "id": "doctor_id",
        "user": { "id": "doctor_user_id" } // Crucial for Chat Room Identity
      }
    }
  }
}
```

---

## 2. Onboarding Module (`/onboarding`)

### `POST /onboarding/draft`
*Requires Auth*
**Request Payload**:
```json
{
  "step": 2, // The upcoming step
  "step1Data": { "firstName": "John" } 
}
```
**Response (200 OK)**:
```json
{
  "success": true,
  "data": { "message": "Draft saved successfully" }
}
```

### `POST /onboarding/finalize`
*Requires Auth*
**Request Payload**:
```json
{
  "step3Data": { "insuranceId": "INS123", "assignedDoctorId": "uuid" } 
}
```
**Response (200 OK)**:
```json
{
  "success": true,
  "data": { "patientId": "uuid" }
}
```

---

## 3. Doctors Module (`/doctors`)

### `GET /doctors`
**Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "firstName": "Jane",
      "lastName": "Smith",
      "specialty": "Cardiology"
    }
  ]
}
```

---

## 4. Socket.io Events

### `send_message` (Client -> Server)
```javascript
socket.emit("send_message", {
  receiverId: "target_user_id",
  content: "Hello Doctor!"
});
```

### `receive_message` (Server -> Client)
```javascript
socket.on("receive_message", (message) => {
  // message: { id, content, senderId, receiverId, createdAt }
});
```
