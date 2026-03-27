import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters and 2 words").refine(val => val.trim().split(" ").length >= 2, "Must include at least 2 words"),
  dob: z.string().refine((val) => {
    const birthDate = new Date(val);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  }, "Must be at least 18 years old"),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
  phone: z.string().regex(/^\+?[\d\s-]{10,15}$/, "Invalid phone number"),
  emergencyContactName: z.string().min(2),
  emergencyContactPhone: z.string().regex(/^\+?[\d\s-]{10,15}$/, "Invalid phone number"),
});

export const medicalInfoSchema = z.object({
  bloodType: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "Unknown"]),
  currentMedications: z.string().max(500).optional(),
  knownAllergies: z.array(z.string()),
  chronicConditions: z.array(z.string()),
  previousSurgeries: z.string().optional(),
  familyMedicalHistory: z.string().max(300).optional(),
});

export const insuranceInfoSchema = z.object({
  insuranceProvider: z.string().min(2),
  insuranceId: z.string().min(2),
  policyHolderName: z.string().min(2),
  preferredDoctorId: z.string().uuid(),
  preferredTimeSlot: z.enum(["Morning", "Afternoon", "Evening"]),
  referralSource: z.enum(["Google", "Friend", "Doctor Referral", "Ad", "Other"]),
  additionalNotes: z.string().max(200).optional(),
});

export const onboardingDraftSchema = z.object({
  step: z.number().min(1).max(3),
  data: z.record(z.string(), z.any()),
});
