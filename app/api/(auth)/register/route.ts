import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/client";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();

  const prisma = new PrismaClient();

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (findUser) {
      return NextResponse.json({ success: false, data: null, message: 'User already exists' }, { status: 409 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, data: null, message: 'Internal Server Error' }, { status: 500 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        birthDate: body.birthDate,
        gender: body.gender,
        phone: body.phone,
        turkish_identity_number: body.turkish_identity_number,
        password: hashedPassword,
        email: body.email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        gender: true,
        birthDate: true,
        turkish_identity_number: true,
        image: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (e) {
    return NextResponse.json({ success: false, data: null, message: 'Internal Server Error' }, { status: 500 });
  }
}
