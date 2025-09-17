import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/client";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const data = await request.json();
  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        password: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        gender: true,
        birthDate: true,
        turkish_identity_number: true,
        image: true,
      }
    });

    if (!user) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    
    if (!passwordMatch) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json({ 
      success: true, 
      user: { ...userWithoutPassword, userId: user.id }
    });
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
