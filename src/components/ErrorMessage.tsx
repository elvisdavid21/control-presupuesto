import { PropsWithChildren } from "react"

function ErrorMessage({children} : PropsWithChildren) {
  return (
    <p className='text-sm text-white bg-red-500 uppercase text-center p-2 font-bold'>{children}</p>
  )
}

export default ErrorMessage