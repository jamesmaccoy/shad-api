import Link from "next/link";

import { cn } from "../lib/utils";
import { getProductsByAtomId, getAtomById } from "@/lib/atoms";
import { notFound } from "next/navigation";
import Atoms from "./atoms";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";



import { useEffect, useState } from "react";
import { Dino } from "@/app/types";

type RouteParams = { params: Promise<{ dinosaur: string }> };

export default async function Atom({ slug }: { slug: string[] }) {
    // Check if slug is being passed correctly
    console.log({ slug }); // Added log for slug

    const atomId = slug[0];
    const productId = slug[2];
    const { atom, error } = await getAtomById(atomId);
    if (!atom || error) {
        notFound();
    }

    const { products } = await getProductsByAtomId(atomId);
    const product = products?.find((product) => product.id === productId);
    console.log({ atomId });
    console.log({ products });
    console.log({ product });
    console.log({ Atoms });
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 max-h-screen">

        


            <Card>
                <CardHeader>
                    <CardTitle>{atom.name}</CardTitle>
                    <CardDescription>{atom.createdAt}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{atom.description}</p>
                    <p>{atom.snippet}</p>
                </CardContent>
                <CardFooter>
                    <p>{atom.body}</p>
                </CardFooter>
            </Card>

            <div className="mt-10 flex flex-col gap-12 lg:flex-row">
                <ul className="flex list-disc flex-col gap-1 p-8 text-sm">
                    <h3 className="mb-3 border-b pb-3 text-lg font-semibold">Also used by</h3>
                    {products?.map((product) => (
    <Card key={`card-${product.id}`}> 
        <CardHeader>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>{product.createdAt}</CardDescription>
        </CardHeader>

        <CardFooter>
            <li key={`li-${product.id}`} className="list-item list-inside"> 
                <Link href={`/atoms/${atomId}/products/${product.id}`} className={cn(product.id === productId && "underline decoration-sky-500 underline-offset-4")}>
                    Read more
                </Link>
            </li>
        </CardFooter>
    </Card>
))}

                </ul>
                {product && (
                  <Card>
                  <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription>{product.createdAt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <p className={cn("text-sm", product.isCompleted ? "text-emerald-500" : "text-rose-500")}>{product.isCompleted ? "Completed" : "Not completed"}</p>
                  </CardContent>
                  <CardFooter>
                    <p>Copy</p>
                  </CardFooter>
                </Card>
                
                   
                )}
            </div>

        </section>
    );
}
