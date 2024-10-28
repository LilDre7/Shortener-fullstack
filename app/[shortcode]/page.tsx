import prisma from "@/lib/db";
import { redirect } from "next/navigation";

interface RedirectPageProps {
  params: { shortcode: string };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  // Elimina Promise.resolve y desestructura directamente
  const { shortcode } = params;

  const url = await prisma.url.findUnique({
    where: { shortCode: shortcode },
  });

  if (!url) {
    return <div>404 - NOT FOUND</div>;
  }

  await prisma.url.update({
    where: {
      id: url.id,
    },
    data: { visits: { increment: 1 } },
  });

  redirect(url.original);
}