"use client";

import { useEffect, useState } from "react";
import { use } from 'react'; // Import 'use' from 'react'
import { Dino } from "../types";
import Link from "next/link";

type RouteParams = { params: Promise<{ opinion: string }> };

export default function Opinion({ params }: RouteParams) {
  const { opinion } = use(params); // Unwrap 'params' with React.use()

  const [opinionData, setOpinion] = useState<Dino>({
    name: "",
    description: "",
  });

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/opinions/${opinion}`);
      const opinionData = await resp.json() as Dino;
      setOpinion(opinionData);
    })();
  }, [opinion]);

  return (
    <main>
      <h1>{opinionData.name}</h1>
      <p>{opinionData.description}</p>
      <Link href="/">🠠 Back to all components</Link>
    </main>
  );
}
