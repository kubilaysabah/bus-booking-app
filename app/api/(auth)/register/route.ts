import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/client";

export async function POST(request: Request) {
  const body = await request.body;
  console.log("request", request.body);
  console.log("awaited request", body);
//   const prisma = new PrismaClient();

//   prisma.user.create({
//     data: {
//       firstName: body.firstName,
//       lastName: "",
//       birthDate: "",
//       gender: "",
//       phone: "",
//       turkish_identity_number: "",
//       password: "",
//       email: "",
//     },
//   });

  return NextResponse.json({ success: true }, { status: 200 })
}
