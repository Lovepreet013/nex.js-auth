import Link from "next/link"

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100 z-0"></div>
      <header className="px-4 lg:px-6 h-14 flex items-center z-10">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <FeatherIcon className="h-6 w-6" />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium px-6 py-2 bg-black rounded-full text-white hover:bg-primary/90" prefetch={false}>
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1 z-10">
        <section className="w-full py-20 md:py-36 lg:py-22 xl:py-40">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none bg-gradient-to-br from-black to-stone-500 bg-clip-text text-transparent">
                    Elevate Your Productivity with AI Journal
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                    Unlock the power of intelligent note-taking, automatic summarization, and personalized insights to
                    boost your productivity and creativity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center items-center">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 rounded-full"
                    prefetch={false}
                  >
                    Try AI Journal
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-full border border-gray-300 bg-accent bg-opacity-10 px-8 text-sm font-medium text-gray-600 shadow-2xl hover:border-gray-800"
                    prefetch={false}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


function FeatherIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
      <path d="M16 8 2 22" />
      <path d="M17.5 15H9" />
    </svg>
  )
}

