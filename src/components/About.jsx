import { useState, useEffect, useRef } from 'react'
import { HiCheckCircle, HiTerminal } from 'react-icons/hi'

const terminalLines = [
  { type: 'comment', text: '// About me' },
  { type: 'keyword', text: 'const ', value: 'developer', operator: ' = {' },
  { type: 'property', indent: 1, key: 'name', value: '"Dani Matar"' },
  { type: 'property', indent: 1, key: 'title', value: '"Software Engineer"' },
  { type: 'property', indent: 1, key: 'experience', value: '"5+ years"' },
  { type: 'property', indent: 1, key: 'skills', value: '[".NET", "Python", "Distributed Systems"]' },
  { type: 'property', indent: 1, key: 'passion', value: '"Building scalable solutions"' },
  { type: 'property', indent: 1, key: 'available', value: 'true', isBoolean: true },
  { type: 'close', text: '};' },
]

function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState(0)
  const terminalRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(() => {
            setVisibleLines((prev) => {
              if (prev >= terminalLines.length) {
                clearInterval(interval)
                return prev
              }
              return prev + 1
            })
          }, 150)
          return () => clearInterval(interval)
        }
      },
      { threshold: 0.5 }
    )

    if (terminalRef.current) {
      observer.observe(terminalRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={terminalRef} className="code-block overflow-hidden rounded-xl shadow-2xl">
      {/* Terminal header */}
      <div className="code-block-header">
        <div className="code-block-dot bg-red-500" />
        <div className="code-block-dot bg-yellow-500" />
        <div className="code-block-dot bg-green-500" />
        <span className="ml-2 text-dark-500 text-sm font-mono">about.js</span>
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-sm sm:text-base min-h-[280px]">
        {terminalLines.slice(0, visibleLines).map((line, index) => (
          <div
            key={index}
            className="animate-fade-in"
            style={{ paddingLeft: (line.indent || 0) * 20 }}
          >
            {line.type === 'comment' && (
              <span className="text-dark-500">{line.text}</span>
            )}
            {line.type === 'keyword' && (
              <>
                <span className="text-purple-400">{line.text}</span>
                <span className="text-cyan-400">{line.value}</span>
                <span className="text-dark-400">{line.operator}</span>
              </>
            )}
            {line.type === 'property' && (
              <>
                <span className="text-dark-300">{line.key}</span>
                <span className="text-dark-500">: </span>
                <span className={line.isBoolean ? 'text-orange-400' : 'text-green-400'}>
                  {line.value}
                </span>
                <span className="text-dark-500">,</span>
              </>
            )}
            {line.type === 'close' && (
              <span className="text-dark-400">{line.text}</span>
            )}
          </div>
        ))}
        {visibleLines < terminalLines.length && (
          <span className="inline-block w-2 h-4 bg-primary-400 animate-blink ml-1" />
        )}
        {visibleLines >= terminalLines.length && (
          <div className="mt-2 flex items-center gap-2 text-dark-500">
            <span className="text-green-400">$</span>
            <span className="inline-block w-2 h-4 bg-primary-400 animate-blink" />
          </div>
        )}
      </div>
    </div>
  )
}

export default function About({ data }) {
  if (!data) return null

  return (
    <section id="about" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px]" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-mono mb-4">
              <HiTerminal className="w-4 h-4" />
              <span>whoami</span>
            </div>

            <h2 className="section-title">
              Get to know me<span className="text-primary-500">.</span>
            </h2>

            <p className="text-dark-300 text-lg leading-relaxed mb-8">
              {data.bio}
            </p>

            {/* Highlights with staggered animation */}
            {data.highlights && data.highlights.length > 0 && (
              <ul className="space-y-3">
                {data.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative">
                      <HiCheckCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0 relative z-10" />
                      <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-dark-300 group-hover:text-dark-200 transition-colors">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tech stack quick view */}
            <div className="mt-8 flex flex-wrap gap-2">
              {['.NET', 'Python', 'Docker', 'PostgreSQL', "Redis", 'ELK'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-dark-800 text-dark-300 text-sm rounded-lg border border-dark-700 hover:border-primary-500/50 hover:text-primary-400 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Animated Terminal */}
          <div className="relative">
            <AnimatedTerminal />

            {/* Floating decorations */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border border-primary-500/20 rounded-xl animate-float hidden lg:block" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-lg animate-float-delayed hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
