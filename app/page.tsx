"use client"
import { useEffect, useState } from "react";
import { Dino } from "./types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [components, setComponents] = useState<Dino[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<Dino[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/opinions`);
      const allComponents = await response.json() as Dino[];
      setComponents(allComponents);
      setFilteredComponents(allComponents); // Initially, show all components
    })();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter components based on search term
    const filtered = components.filter((dinosaur) =>
      dinosaur.name.toLowerCase().includes(value)
    );
    setFilteredComponents(filtered);
  };

  return (
    <main>
      <section className="py-24">
        <div>
        <Link href="/estimate">
          <Button variant="outline" size="lg">Add Molecule</Button>
          </Link>
        </div>
        <div className="container">
          <h1 className="text-3xl font-bold">
            Component library called 🔭Vision
          </h1>
          <h3>Consuming an API, saving & actioning to a database</h3>

          {/* Input for filtering dinosaurs */}
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded p-2 mt-4"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {filteredComponents.map((dinosaur: Dino) => (
            <Card key={dinosaur.name}>
              <CardHeader>
                <CardTitle>{dinosaur.name}</CardTitle>
                <Link href={`/${dinosaur.name.toLowerCase()}`}>
              {dinosaur.name}
            </Link>
                <CardDescription>{dinosaur.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
