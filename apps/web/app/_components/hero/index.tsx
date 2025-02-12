export function Hero() {
  return (
    <div className="hero-section min-h-[600px] flex items-center">
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight">
            Track Your Team&apos;s Leave
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-xl">
            Streamline your leave management process with our intuitive and efficient tracking system
          </p>
          <div className="mt-10 responsive-flex justify-start">
            <button 
              className="btn-primary bg-white !text-[var(--accent)] hover:!bg-white/90 w-full sm:w-auto"
              aria-label="Get started with Leave Tracker"
            >
              Get Started
            </button>
            <button 
              className="btn-secondary !bg-black/20 !text-white hover:!bg-black/30 w-full sm:w-auto"
              aria-label="Learn more about Leave Tracker"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 