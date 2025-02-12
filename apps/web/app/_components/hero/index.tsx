export function Hero() {
  return (
    <div className="hero-section min-h-[500px] flex items-center">
      <div className="container-width relative z-10 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight">
            Track Your Team's Leave
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed">
            Streamline your leave management process with our intuitive and efficient tracking system
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="bg-white text-[var(--accent)] px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
              Get Started
            </button>
            <button className="bg-black/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-black/30 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 