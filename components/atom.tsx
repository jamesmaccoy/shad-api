import Link from 'next/link'

import { cn } from '../lib/utils'
import { getProductsByAtomId, getAtomById } from '@/lib/atoms'
import { notFound } from 'next/navigation'
import Atoms from './atoms'

import { useEffect, useState } from "react";
import { Dino } from "@/app/types";

type RouteParams = { params: Promise<{ dinosaur: string }> };

export default async function  Atom({ slug }: { slug: string[] }) {
  // Check if slug is being passed correctly
  console.log({ slug }) // Added log for slug






  const atomId = slug[0]
  const productId = slug[2]
  const { atom, error } = await getAtomById(atomId)
  if (!atom || error) {
    notFound()
  }

  const { products } = await getProductsByAtomId(atomId)
  const product = products?.find(product => product.id === productId)
  console.log({ atomId })
  console.log({ products })
  console.log({ product  })
  console.log({ Atoms })
  return (
    <section className='grow columns-2 min-h-screen '>
      <div className='p-8 flex-col'>
        <div className='flex items-center gap-3'>
         
          <div>
            <h2 className='font-semibold text-3xl'>{atom.name}</h2>
            <p className='text-sm text-gray-500'>{atom.createdAt}</p>
            <p className='text-sm text-gray-500'>{atom.description}</p>
            <br />
            <h4 className='font-semibold text-sg'>Body</h4>
            <p className='text-sm text-gray-500'>{atom.body}</p>
            <h4 className='font-semibold'>Snippet</h4>
            <p className='text-sm text-gray-500'>{atom.snippet}</p>
            <p className='text-sm text-gray-500'>{atom.description}</p>
      
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-12 lg:flex-row'>
          <ul className='flex list-disc flex-col gap-1 p-8 text-sm'>
            <h3 className='mb-3 border-b pb-3 text-lg font-semibold'>Cases</h3>
            {products?.map(product => (
              <li key={product.id} className='list-item list-inside'>
                <Link
                  href={`/atoms/${atomId}/products/${product.id}`}
                  className={cn(
                    product.id === productId &&
                      'underline decoration-sky-500 underline-offset-4'
                  )}
                >
                  {product.title}
                </Link>
              </li>
            ))}
          </ul>
          {product && (
            <div className='grow rounded-lg p-8 shadow dark:shadow-gray-700'>
              <h3 className='mb-3 border-b pb-3 text-lg font-semibold'>
                Details
              </h3>
              <div className='mt-4 flex items-start justify-between text-sm'>
                <div>
                  <h4 className=''>{product.title}</h4>
                  <p className='text-sm text-gray-500'>{product.createdAt}</p>
                </div>
                <p
                  className={cn(
                    'text-sm',
                    product.isCompleted ? 'text-emerald-500' : 'text-rose-500'
                  )}
                >
                  {product.isCompleted ? 'Completed' : 'Not completed'}
                </p>
              </div>
            </div>
            
          )}
          
        </div>
        
        <div className='flex flex-col gap-4 items-left justify-items-start sm:p-16 p-4 border float-left'>
          <div className='border'>
            <p>Total monthly payment</p>
          <h2 className='font-semibold text-3xl justify-items-start'>Price: {atom?.name}</h2>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-items-start'>Top up my cover</button>
          </div>
        </div>

      </div>
      
    </section>
  )
}
