import prisma from "../../lib/prisma";
import type { personalInfoSchema, medicalInfoSchema, insuranceInfoSchema } from "./onboarding.schema";

export class OnboardingService {
  static async getDraft(userId: string) {
    return prisma.onboardingDraft.findUnique({
      where: { userId },
    });
  }

  static async updateDraft(userId: string, step: number, data: any) {
    const field = `step${step}Data`;
    return prisma.onboardingDraft.upsert({
      where: { userId },
      update: {
        [field]: data,
        currentStep: step,
      },
      create: {
        userId,
        [field]: data,
        currentStep: step,
      },
    });
  }

  static async submit(userId: string) {
    const draft = await prisma.onboardingDraft.findUnique({
      where: { userId },
    });

    if (!draft || !draft.step1Data || !draft.step2Data || !draft.step3Data) {
      throw new Error("Onboarding incomplete");
    }

    const s1 = draft.step1Data as any;
    const s2 = draft.step2Data as any;
    const s3 = draft.step3Data as any;

    const patient = await prisma.patient.create({
      data: {
        userId,
        fullName: s1.fullName,
        dob: new Date(s1.dob),
        gender: s1.gender,
        phone: s1.phone,
        emergencyContactName: s1.emergencyContactName,
        emergencyContactPhone: s1.emergencyContactPhone,
        
        bloodType: s2.bloodType,
        currentMedications: s2.currentMedications,
        knownAllergies: s2.knownAllergies,
        chronicConditions: s2.chronicConditions,
        previousSurgeries: s2.previousSurgeries,
        familyMedicalHistory: s2.familyMedicalHistory,

        insuranceProvider: s3.insuranceProvider,
        insuranceId: s3.insuranceId,
        policyHolderName: s3.policyHolderName,
        preferredTimeSlot: s3.preferredTimeSlot,
        referralSource: s3.referralSource,
        additionalNotes: s3.additionalNotes,
        assignedDoctorId: s3.preferredDoctorId,
      },
    });

    await prisma.onboardingDraft.update({
      where: { userId },
      data: { status: "COMPLETED" },
    });

    return patient;
  }
}
