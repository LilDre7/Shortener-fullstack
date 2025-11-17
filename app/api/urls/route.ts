import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.log("Conectando a la base de datos...");

    // Intentar realizar una consulta simple para probar la conexión
    await prisma.$connect();

    const urls = await prisma.url.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    console.log("URLs obtenidas:", urls); // Para ver los datos devueltos
    return NextResponse.json(urls);
  } catch (error) {
    console.error("Error fetching URLs 💀 ", error || error); // Detalles del error
    return NextResponse.json(
      { error: error || "Internal Server Error 💀 " },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Asegúrate de desconectar
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.$connect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    // Verificar si la URL existe
    const existingUrl = await prisma.url.findUnique({
      where: { id }
    });

    if (!existingUrl) {
      return NextResponse.json(
        { error: "URL not found" },
        { status: 404 }
      );
    }

    // Eliminar la URL
    await prisma.url.delete({
      where: { id }
    });

    console.log(`URL con ID ${id} eliminada correctamente`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting URL 💀 ", error);
    return NextResponse.json(
      { error: "Internal Server Error 💀 " },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
