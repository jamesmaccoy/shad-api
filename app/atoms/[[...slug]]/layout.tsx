import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'


import { getAtoms } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export const metadata: Metadata = {
  title: 'Atoms',
  description: 'Generated by create next app',
}

export default async function AtomsLayout({
  params,
  children,
}: {
  params: { slug?: string[] }
  children: React.ReactNode
}) {
  const { atoms, error } = await getAtoms()
  if (!atoms || error) {
    notFound()
  }

  const { slug } = await params // Await params here
  const atomId = slug?.[0]
  console.log({ atomId })
  return (
    <section className='py-12'>
<div className="container">
  <div className="flex items-center justify-between border-b pb-4 mb-4">
    <h1 className="text-2xl font-semibold">
      Choose what's included in the design system
    </h1>

    <div className="space-x-4">
     
        <Sheet>
        <SheetTrigger>
          <Button variant="outline">Upgrade</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>R40</SheetTitle>
            <SheetDescription><p>Total monthly payment</p>
              
              <Button>Confirm</Button><p><Link href={'/terms'}>terms and conditions</Link></p></SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
          
            


            <Sheet>
        <SheetTrigger>
          <Button variant="secondary">
            <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
            Export the vision
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Export Options</SheetTitle>
            {/* Add relevant content here */}
          </SheetHeader>
        </SheetContent>
      </Sheet>
      </div>
  
      <div className='border'>
</div>

            
          
        </div>



        <div className='mt-6 flex overflow-hidden rounded-lg shadow dark:shadow-gray-700'>
          <ul className='flex flex-col gap-2 bg-gray-100 p-8 text-sm dark:bg-gray-800'>
            {atoms?.map(atom => (
              <li key={atom.id}>
                <Link
                  href={`/atoms/${atom.id}`}
                  className={cn(
                    atom.id === atomId &&
                      'underline decoration-sky-500 underline-offset-4'
                  )}
                >
                  {atom.name}
                </Link>
              </li>
            ))}
          </ul>

          {children}
        </div>
      </div>
    </section>
  )
}
