"use client";

import { useEffect, useState } from "react";
import { use } from 'react';
import { Dino } from "../types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { db } from '@/firebase'; // Assuming you have Firebase initialized
import { doc, updateDoc } from "firebase/firestore"; 

type RouteParams = { params: Promise<{ opinion: string }> };

export default function Opinion({ params }: RouteParams) {
  const { opinion } = use(params);

  const [opinionData, setOpinion] = useState<Dino>({
    name: "",
    description: "",
  });

  const [isOpinionEnabled, setIsOpinionEnabled] = useState(false); // State for the switch

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/api/opinions/${opinion}`);
      const opinionData = await resp.json() as Dino;
      setOpinion(opinionData);
    })();
  }, [opinion]);

  // Function to handle switch change
  const handleSwitchChange = async (checked: boolean) => {
    setIsOpinionEnabled(checked);

    try {
      // Assuming you have a way to get the product ID, replace 'productId'
      const productRef = doc(db, 'Product', 'productId'); 
      await updateDoc(productRef, {
        opinion: checked, 
      });
      console.log('Opinion updated successfully!');
    } catch (error) {
      console.error('Error updating opinion:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <main>
      <h1>{opinionData.name}</h1>
      <p>{opinionData.description}</p>

      <Switch 
        checked={isOpinionEnabled} 
        onCheckedChange={handleSwitchChange} 
      />

      <Link href="/add">
        <Button variant="outline" size="lg">Add component</Button>
      </Link>
      <Link href="/">🠠 Back to all components</Link>
    </main>
  );
}
