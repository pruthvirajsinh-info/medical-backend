# Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

enum Role {
  PATIENT
  DOCTOR
}

model User {
  id               String           @id @default(uuid())
  email            String           @unique
  password         String // bcrypt hashed
  role             Role
  patient          Patient?
  doctor           Doctor?
  sentMessages     Message[]        @relation("SentMessages")
  receivedMessages Message[]        @relation("ReceivedMessages")
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
}

model OnboardingDraft {
  id        String   @id @default(uuid())
  userId    String   @unique
  step      Int      @default(1)
  data      Json // Stores transient step1Data, step2Data
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Patient {
  id               String   @id @default(uuid())
  userId           String   @unique
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  firstName        String
  lastName         String
  dateOfBirth      DateTime
  gender           String
  phone            String   @unique
  address          String?
  city             String?
  state            String?
  zipCode          String?
  bloodGroup       String?
  allergies        String?
  chronicDiseases  String?
  currentMeds      String?
  emergencyContact String
  emergencyPhone   String
  insuranceId      String?
  assignedDoctorId String?
  assignedDoctor   Doctor?  @relation(fields: [assignedDoctorId], references: [id])
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model Doctor {
  id               String    @id @default(uuid())
  userId           String    @unique
  user             User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  firstName        String
  lastName         String
  specialty        String
  licenseNumber    String    @unique
  phone            String    @unique
  bio              String?
  consultationFee  Float     @default(0)
  assignedPatients Patient[]
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
}

model Message {
  id         String   @id @default(uuid())
  content    String
  senderId   String
  receiverId String
  roomId     String // Deterministic hash: [senderId, receiverId].sort().join("_")
  sender     User     @relation("SentMessages", fields: [senderId], references: [id])
  receiver   User     @relation("ReceivedMessages", fields: [receiverId], references: [id])
  createdAt  DateTime @default(now())
}
```
