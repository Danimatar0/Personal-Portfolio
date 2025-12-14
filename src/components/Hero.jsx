import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { HiArrowDown, HiMail, HiSparkles } from 'react-icons/hi'
import { useTypingEffect } from '../hooks/useTypingEffect'

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
}

const roles = [
  'Software Engineer',
  'SaaS Hunter',
  'Automation Specialist',
  'Problem Solver',
  'System Architect',
]

export default function Hero({ data }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const typedRole = useTypingEffect(roles, 80, 40, 2000)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (!data) return null

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/30 rounded-full blur-[100px] animate-blob"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />
        <div
          className="absolute -bottom-40 right-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="section-container relative z-10 text-center py-20">
        <div className="animate-fade-in">
          {/* Sparkle badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6 animate-pulse-slow">
            <HiSparkles className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 font-mono text-sm">Available for opportunities</span>
          </div>

          <p className="text-primary-400 font-mono text-sm sm:text-base mb-4">
            Hi, my name is
          </p>

          {/* Glowing name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 relative">
            <span className="relative">
              {data.name}
              <span className="absolute -inset-1 bg-primary-500/20 blur-2xl rounded-lg -z-10" />
            </span>
            <span className="text-primary-500 animate-pulse">.</span>
          </h1>

          {/* Typing effect role */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-dark-400 mb-6 h-12 sm:h-14">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-purple-400 to-cyan-400">
              {typedRole}
            </span>
            <span className="animate-blink text-primary-400">|</span>
          </h2>

          <p className="text-dark-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            {data.tagline}
          </p>

          {/* Animated stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
            <div className="text-center group">
              <div className="text-3xl font-bold text-white group-hover:text-primary-400 transition-colors">
                5+
              </div>
              <div className="text-sm text-dark-500">Years Experience</div>
            </div>
            <div className="w-px h-10 bg-dark-700" />
            <div className="text-center group">
              <div className="text-3xl font-bold text-white group-hover:text-primary-400 transition-colors">
                50+
              </div>
              <div className="text-sm text-dark-500">Projects Delivered</div>
            </div>
            <div className="w-px h-10 bg-dark-700" />
            <div className="text-center group">
              <div className="text-3xl font-bold text-white group-hover:text-primary-400 transition-colors">
                10M+
              </div>
              <div className="text-sm text-dark-500">Requests Handled</div>
            </div>
          </div>

          {/* Social Links with hover effects */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {data.social &&
              Object.entries(data.social).map(([platform, url]) => {
                const Icon = socialIcons[platform]
                if (!Icon || !url) return null
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 text-dark-400 hover:text-white rounded-lg transition-all duration-300"
                    aria-label={platform}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute inset-[1px] bg-dark-900 rounded-lg group-hover:bg-dark-800 transition-colors" />
                    <Icon className="w-6 h-6 relative z-10" />
                  </a>
                )
              })}
          </div>

          {/* CTA Buttons with glow */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                View My Work
                <HiArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </span>
            </a>
            <a
              href={`mailto:${data.email}`}
              className="group relative inline-flex items-center gap-2 px-8 py-4 border border-dark-700 hover:border-primary-500/50 text-dark-200 hover:text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <HiMail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-dark-500 hover:text-primary-400 transition-colors group"
          aria-label="Scroll down"
        >
          <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            scroll
          </span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-current rounded-full animate-scroll-down" />
          </div>
        </a>
      </div>
    </section>
  )
}
