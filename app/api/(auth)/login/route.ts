import { PrismaClient } from "@/lib/generated/client";

export async function POST(request: Request) {
  const data = await request.json();
  const prisma = new PrismaClient();

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        password: true,
      }
    });

    
  } catch (e) {}
}
