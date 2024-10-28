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
