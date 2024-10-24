import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex justify-center flex-col items-center min-h-[60vh] gap-y-3">
      <h2 className="text-4xl font-semibold text-primary_color">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="bg-primary_color px-4 py-3 rounded-md text-white">
          Back To Shopping
        </Link>
    </div>
  )
}