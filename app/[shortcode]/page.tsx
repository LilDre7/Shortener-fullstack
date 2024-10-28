import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { NextPage } from "next"; // Asegúrate de que esto esté importado

interface RedirectPageProps {
  params: {
    shortcode: string;
  };
}

// Cambiar el componente para que use NextPage sin parámetros asíncronos
const RedirectPage: NextPage<RedirectPageProps> = async ({ params }) => {
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

  redirect(url.original); // Realiza la redirección

  return null; // No es necesario renderizar nada más
};

export default RedirectPage;
