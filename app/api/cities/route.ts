import { PrismaClient } from "@/lib/generated/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const cities = await prisma.city.findMany();
    return NextResponse.json({ success: true, data: cities });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, data: null, message: 'Internal Server Error' }, { status: 500 });
  }
}
