import { useState, useRef } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { HiFolder, HiStar, HiCode } from 'react-icons/hi'

function ProjectCard({ project, index, featured = false }) {
  const [transform, setTransform] = useState('')
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlowPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setTransform('')
  }

  return (
    <article
      ref={cardRef}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.1s ease-out',
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Card glow effect */}
      <div
        className="absolute w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
          left: glowPosition.x - 80,
          top: glowPosition.y - 80,
        }}
      />

      <div className={`relative h-full overflow-hidden rounded-xl border border-dark-800 bg-gradient-to-br from-dark-900 to-dark-950 transition-all duration-500 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10 ${featured ? 'p-6' : 'p-5'}`}>
        {/* Animated gradient border */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-[-1px] bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 rounded-xl opacity-20 animate-gradient" />
        </div>

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-400 text-xs">
            <HiStar className="w-3 h-3" />
            Featured
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl text-primary-400 group-hover:from-primary-500/30 group-hover:to-purple-500/30 transition-all duration-300">
              <HiFolder className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-all duration-300"
                  aria-label="View on GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-dark-400 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-all duration-300"
                  aria-label="View live demo"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <h3 className={`font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-purple-400 transition-all duration-300 ${featured ? 'text-xl' : 'text-lg'}`}>
            {project.title}
          </h3>

          <p className={`text-dark-400 leading-relaxed mb-4 flex-grow ${featured ? 'text-sm' : 'text-sm'}`}>
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-dark-800/50">
            {project.tech.slice(0, featured ? 5 : 4).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-dark-400 bg-dark-800/50 rounded-md hover:text-primary-400 hover:bg-dark-700/50 transition-colors cursor-default"
              >
                <HiCode className="w-3 h-3 opacity-50" />
                {tech}
              </span>
            ))}
            {project.tech.length > (featured ? 5 : 4) && (
              <span className="px-2 py-1 text-xs font-mono text-dark-500">
                +{project.tech.length - (featured ? 5 : 4)}
              </span>
            )}
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </article>
  )
}

export default function Projects({ data }) {
  if (!data || data.length === 0) return null

  const featuredProjects = data.filter((p) => p.featured)
  const otherProjects = data.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/30 to-transparent" />
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-mono mb-4">
            <HiFolder className="w-4 h-4" />
            <span>Portfolio</span>
          </div>

          <h2 className="section-title">
            Featured Projects<span className="text-primary-500">.</span>
          </h2>

          <p className="section-subtitle mx-auto">
            Here are some of the projects I've built that showcase my skills and experience.
          </p>

          <div className="mt-6 flex justify-center">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full" />
          </div>
        </div>

        {/* Featured Projects - Larger cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} featured />
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px flex-1 max-w-[100px] bg-dark-800" />
              <h3 className="text-lg font-semibold text-white">Other Noteworthy Projects</h3>
              <div className="h-px flex-1 max-w-[100px] bg-dark-800" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index + featuredProjects.length} />
              ))}
            </div>
          </>
        )}

        {/* View more link */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 text-dark-300 hover:text-primary-400 font-medium transition-colors group"
          >
            <span>View All Projects</span>
            <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
