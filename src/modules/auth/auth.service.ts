import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import type { RegisterInput, LoginInput } from "./auth.schema";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export class AuthService {
  static async register(data: RegisterInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role as any,
      },
    });

    return user;
  }

  static async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { user, token };
  }

  static async getMe(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        patient: {
          include: {
            assignedDoctor: {
              include: {
                user: true,
              },
            },
          },
        },
        doctor: {
          include: {
            assignedPatients: true,
          },
        },
      },
    });
  }
}
