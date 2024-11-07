import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAtoms } from '@/lib/atoms'
import { cn } from '@/lib/utils'


export default async function AtomsLayout({
  params,
  children
}: {
  params: { slug?: string[] }
  children: React.ReactNode
}) {
  const { atoms, error } = await getAtoms()
  if (!atoms || error) {
    notFound()
  }

  const { slug } = params
  const atomId = slug?.[0]
console.log({atomId})
  return (
    <section className='py-12'>
      <div className='container'>
        <h1 className='text-2xl font-semibold'>Top up your income protection</h1>

        <div className='p-4 border'>
          <div className='border'>
            <h1 className='text-2xl font-semibold float-left justify-items-start'>All Cases</h1>
            <Link href='/add' className='font-bold justify-items-stretch float-right '>
              Open a case
            </Link>
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
