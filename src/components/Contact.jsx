import { useState } from 'react'
import { HiMail, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
}

const socialLabels = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
}

export default function Contact({ data, personal }) {
  const [isHovered, setIsHovered] = useState(false)

  if (!data) return null

  return (
    <section id="contact" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-mono mb-4">
              <HiMail className="w-4 h-4" />
              <span>Contact</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {data.heading || "Let's Connect"}
              <span className="text-primary-500">.</span>
            </h2>

            <p className="text-dark-300 text-lg max-w-xl mx-auto">
              {data.message ||
                "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
            </p>
          </div>

          {/* Contact card */}
          <div
            className="relative p-8 sm:p-12 rounded-2xl border border-dark-800 bg-gradient-to-br from-dark-900/80 to-dark-950/80 backdrop-blur-sm overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated border gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-[-1px] bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 rounded-2xl opacity-20" />
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 bg-primary-500/30 rounded-full ${isHovered ? 'animate-float' : ''}`}
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              {/* Contact info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                {personal?.email && (
                  <a
                    href={`mailto:${personal.email}`}
                    className="flex items-center gap-3 text-dark-300 hover:text-primary-400 transition-colors group/item"
                  >
                    <div className="p-3 bg-dark-800 rounded-xl group-hover/item:bg-primary-500/20 transition-colors">
                      <HiMail className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{personal.email}</span>
                  </a>
                )}
                {personal?.location && (
                  <div className="flex items-center gap-3 text-dark-400">
                    <div className="p-3 bg-dark-800 rounded-xl">
                      <HiLocationMarker className="w-5 h-5" />
                    </div>
                    <span>{personal.location}</span>
                  </div>
                )}
              </div>

              {/* Social links */}
              {personal?.social && (
                <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                  {Object.entries(personal.social).map(([platform, url]) => {
                    const Icon = socialIcons[platform]
                    if (!Icon || !url) return null
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/social flex items-center gap-3 px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-xl hover:border-primary-500/50 hover:bg-dark-800 transition-all duration-300"
                        aria-label={platform}
                      >
                        <Icon className="w-5 h-5 text-dark-400 group-hover/social:text-primary-400 transition-colors" />
                        <span className="text-dark-300 group-hover/social:text-white transition-colors">
                          {socialLabels[platform]}
                        </span>
                      </a>
                    )
                  })}
                </div>
              )}

              {/* CTA Button */}
              <div className="text-center">
                <a
                  href={personal?.email ? `mailto:${personal.email}` : '#'}
                  className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Button glow */}
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

                  <span className="relative flex items-center gap-3">
                    <HiPaperAirplane className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    <span>Send Me a Message</span>
                  </span>
                </a>

                <p className="mt-4 text-dark-500 text-sm">
                  I typically respond within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-3 text-dark-600 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Currently available for new opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
