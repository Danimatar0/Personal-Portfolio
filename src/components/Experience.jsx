import { useState, useRef, useEffect } from 'react'
import { HiBriefcase, HiChevronRight, HiCalendar, HiOfficeBuilding } from 'react-icons/hi'

function ExperienceCard({ job, index, isActive, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative pl-8 sm:pl-12 cursor-pointer transition-all duration-500 ${
        isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80'
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline dot with pulse */}
      <div className="absolute left-0 sm:left-0 -translate-x-1/2 flex items-center justify-center">
        <div
          className={`w-4 h-4 rounded-full border-4 transition-all duration-300 ${
            isActive
              ? 'bg-primary-500 border-dark-950 scale-125'
              : 'bg-dark-700 border-dark-950'
          }`}
        />
        {isActive && (
          <div className="absolute w-8 h-8 bg-primary-500/30 rounded-full animate-ping" />
        )}
      </div>

      {/* Card */}
      <div
        className={`relative overflow-hidden rounded-xl border transition-all duration-500 ${
          isActive
            ? 'bg-gradient-to-br from-dark-900 to-dark-950 border-primary-500/50 shadow-xl shadow-primary-500/10'
            : 'bg-dark-900/50 border-dark-800 hover:border-dark-700'
        }`}
      >
        {/* Glow effect */}
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-purple-500/5" />
        )}

        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className={`text-xl font-semibold transition-colors ${isActive ? 'text-white' : 'text-dark-200'}`}>
                {job.role}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <HiOfficeBuilding className={`w-4 h-4 ${isActive ? 'text-primary-400' : 'text-dark-500'}`} />
                <span className={`${isActive ? 'text-primary-400' : 'text-dark-400'}`}>
                  {job.company}
                </span>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-mono ${
              isActive
                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                : 'bg-dark-800 text-dark-400'
            }`}>
              <HiCalendar className="w-3.5 h-3.5" />
              {job.period}
            </div>
          </div>

          <p className={`mb-4 transition-colors ${isActive ? 'text-dark-300' : 'text-dark-400'}`}>
            {job.description}
          </p>

          {/* Highlights - only show when active */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              isActive ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {job.highlights && job.highlights.length > 0 && (
              <ul className="space-y-2 pt-4 border-t border-dark-800">
                {job.highlights.map((highlight, hIndex) => (
                  <li
                    key={hIndex}
                    className="flex items-start gap-2 text-dark-400 text-sm group/item"
                    style={{ animationDelay: `${hIndex * 100}ms` }}
                  >
                    <HiChevronRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0 group-hover/item:translate-x-1 transition-transform" />
                    <span className="group-hover/item:text-dark-300 transition-colors">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Click to expand hint */}
          {!isActive && (
            <div className="flex items-center gap-1 text-xs text-dark-500 mt-2">
              <span>Click to expand</span>
              <HiChevronRight className="w-3 h-3" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Experience({ data }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (!data || data.length === 0) return null

  return (
    <section id="experience" className="py-20 sm:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/30 to-transparent" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-mono mb-4">
            <HiBriefcase className="w-4 h-4" />
            <span>Career</span>
          </div>

          <h2 className="section-title">
            Work Experience<span className="text-primary-500">.</span>
          </h2>

          <p className="section-subtitle mx-auto">
            My professional journey building software that makes a difference.
          </p>

          <div className="mt-6 flex justify-center">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full" />
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 sm:left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-dark-700 to-dark-800" />

            {/* Experience cards */}
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {data.map((job, index) => (
                <ExperienceCard
                  key={index}
                  job={job}
                  index={index}
                  isActive={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Years of experience badge */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-dark-900/50 border border-dark-800 rounded-full">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5+</div>
              <div className="text-xs text-dark-500">Years</div>
            </div>
            <div className="w-px h-8 bg-dark-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-xs text-dark-500">Companies</div>
            </div>
            <div className="w-px h-8 bg-dark-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-xs text-dark-500">Projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
