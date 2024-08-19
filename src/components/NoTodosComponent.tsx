import Image from 'next/image'
import React from 'react'

function NoTodosComponent() {
  return (
    <div className="min-h-[60svh] w-full flex flex-col gap-4 items-center justify-center px-6">
      <Image src="/images/no-todos.png" width={2000} height={2000} alt="no todos"/>
      <p className="text-xl text-muted-foreground text-center">No active todos were found! start by creating some.</p>
    </div>
  )
}

export default NoTodosComponent