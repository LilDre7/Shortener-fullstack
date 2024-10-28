import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    // Validar que 'url' esté presente
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const shortCode = nanoid(8);
    const shortenedUrl = await prisma.url.create({
      data: {
        original: url,
        shortCode,
      },
    });

    return NextResponse.json({ shortCode: shortenedUrl.shortCode });
  } catch (error) {
    console.error("Error shortening URL 💀 ", error);
    return NextResponse.json(
      { error: "Internal Server Error 💀 " },
      { status: 500 }
    );
  }
}
