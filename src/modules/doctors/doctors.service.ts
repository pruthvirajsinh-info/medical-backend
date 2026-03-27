import prisma from "../../lib/prisma";

export class DoctorService {
  static async listDoctors() {
    return prisma.doctor.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });
  }
}
