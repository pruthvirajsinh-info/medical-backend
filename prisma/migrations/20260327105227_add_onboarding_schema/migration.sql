/*
  Warnings:

  - Added the required column `updatedAt` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodType` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContactName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContactPhone` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `insuranceId` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `insuranceProvider` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `policyHolderName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferredTimeSlot` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referralSource` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "additionalNotes" TEXT,
ADD COLUMN     "assignedDoctorId" TEXT,
ADD COLUMN     "bloodType" TEXT NOT NULL,
ADD COLUMN     "chronicConditions" TEXT[],
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentMedications" TEXT,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "emergencyContactName" TEXT NOT NULL,
ADD COLUMN     "emergencyContactPhone" TEXT NOT NULL,
ADD COLUMN     "familyMedicalHistory" TEXT,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "insuranceId" TEXT NOT NULL,
ADD COLUMN     "insuranceProvider" TEXT NOT NULL,
ADD COLUMN     "knownAllergies" TEXT[],
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "policyHolderName" TEXT NOT NULL,
ADD COLUMN     "preferredTimeSlot" TEXT NOT NULL,
ADD COLUMN     "previousSurgeries" TEXT,
ADD COLUMN     "referralSource" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "OnboardingDraft" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "step1Data" JSONB,
    "step2Data" JSONB,
    "step3Data" JSONB,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "status" "OnboardingStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingDraft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingDraft_userId_key" ON "OnboardingDraft"("userId");

-- AddForeignKey
ALTER TABLE "OnboardingDraft" ADD CONSTRAINT "OnboardingDraft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_assignedDoctorId_fkey" FOREIGN KEY ("assignedDoctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
