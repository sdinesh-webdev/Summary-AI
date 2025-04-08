import { SignIn } from '@clerk/nextjs'
import {BackgroundGradientAnimation }from '@/components/ui/background-gradient-animation'

export default function Page() {
  return (
    <section className="flex min-h-screen justify-center items-center">
       <div className="fixed inset-0 w-full h-full">
              <BackgroundGradientAnimation />
            </div>
      <div className="w-full max-w-[450px] px-4">
        <SignIn />
      </div>
    </section>
  )
}