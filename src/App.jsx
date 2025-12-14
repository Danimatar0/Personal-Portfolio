import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import portfolioData from './data/portfolio.json'

// Custom cursor component
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsPointer(isClickable)
    }

    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  if (isHidden) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          transform: isPointer ? 'scale(2)' : 'scale(1)',
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>

      {/* Cursor trail/glow */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          left: position.x - 20,
          top: position.y - 20,
          transform: isPointer ? 'scale(1.5)' : 'scale(1)',
        }}
      >
        <div className="w-10 h-10 border border-primary-500/50 rounded-full" />
      </div>
    </>
  )
}

// Loading screen component
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 20)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-dark-950 z-[10000] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <span className="text-4xl font-bold text-white">
            Dani<span className="text-primary-500">.</span>
          </span>
        </div>

        <div className="w-48 h-1 bg-dark-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 text-dark-500 font-mono text-sm">{progress}%</div>
      </div>
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth < 768)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Scroll animation observer
  useEffect(() => {
    if (isLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [isLoading])

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="min-h-screen bg-dark-950 relative">
      {/* Custom cursor - only on desktop */}
      {!isMobile && <CustomCursor />}

      {/* Particle background */}
      <ParticleBackground />

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] noise-overlay" />

      <Navbar data={portfolioData.personal} />

      <main className="relative z-10">
        <Hero data={portfolioData.personal} />
        <About data={portfolioData.about} />
        <Skills data={portfolioData.skills} />
        <Experience data={portfolioData.experience} />
        <Projects data={portfolioData.projects} />
        <Contact data={portfolioData.contact} personal={portfolioData.personal} />
      </main>

      <Footer data={portfolioData.personal} />
    </div>
  )
}

export default App
