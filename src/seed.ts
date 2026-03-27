import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const doctorPassword = await bcrypt.hash("doctor123", 10);
  const patientPassword = await bcrypt.hash("password123", 10);
  
  const doctors = [
    { email: "dr.smith@example.com", spec: "Cardiology" },
    { email: "dr.jones@example.com", spec: "Pediatrics" },
    { email: "dr.wilson@example.com", spec: "General Medicine" },
  ];

  for (const doc of doctors) {
    await prisma.user.upsert({
      where: { email: doc.email },
      update: {
        password: doctorPassword,
        role: "DOCTOR",
      },
      create: {
        email: doc.email,
        password: doctorPassword,
        role: "DOCTOR",
        doctor: {
          create: {
            specialization: doc.spec,
            bio: `Experienced specialist in ${doc.spec}`,
          },
        },
      },
    });
  }

  // Seed a test patient user
  await prisma.user.upsert({
    where: { email: "patient1@example.com" },
    update: {
      password: patientPassword,
    },
    create: {
      email: "patient1@example.com",
      password: patientPassword,
      role: "PATIENT",
    },
  });

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
