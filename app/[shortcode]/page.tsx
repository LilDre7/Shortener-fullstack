import React from "react";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

// interface Props {
//   params: { shortcode: string };
// }

type Alias = {
  params: Promise<{
    shortcode: string
  }>  
}

// You might need to define your function as a server component
export default async function RedirectPage(props: Alias) {

  const params = await props.params

  const { shortcode } = params;

  const url = await prisma.url.findUnique({
    where: { shortCode: shortcode },
  });

  if (!url) {
    return <div>ERROR 666 💀</div>;
  }

  await prisma.url.update({
    where: {
      id: url.id,
    },
    data: { visits: { increment: 1 } },
  });

  // Use redirect here without returning a React element
  redirect(url.original);
}


