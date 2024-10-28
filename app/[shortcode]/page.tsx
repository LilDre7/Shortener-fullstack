import prisma from "@/lib/db";
import { redirect } from "next/navigation";

interface RedirectPageProps {
  params: { shortcode: string };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortcode } = params;

  const url = await prisma.url.findUnique({
    where: { shortCode: shortcode },
  });

  if (!url) {
    return <div>404 - NO ENCONTRADO</div>;
  }

  await prisma.url.update({
    where: {
      id: url.id,
    },
    data: { visits: { increment: 1 } },
  });

  // Realiza la redirección
  redirect(url.original);

  // Devuelve null o nada ya que la redirección detendrá el renderizado adicional
  return null;
}
