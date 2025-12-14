import { FaGithub, FaLinkedin, FaInstagram, FaHeart } from 'react-icons/fa'

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
}

export default function Footer({ data }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-dark-800">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-dark-500 text-sm flex items-center gap-1">
            <span>&copy; {currentYear}</span>
            <span>{data?.name || 'Portfolio'}</span>
            <span className="mx-1">·</span>
            <span className="flex items-center gap-1">
              Built with <FaHeart className="w-3 h-3 text-red-500" />
            </span>
          </div>

          {/* Social Links */}
          {data?.social && (
            <div className="flex items-center gap-4">
              {Object.entries(data.social).map(([platform, url]) => {
                const Icon = socialIcons[platform]
                if (!Icon || !url) return null
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-500 hover:text-primary-400 transition-colors"
                    aria-label={platform}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          )}

          {/* Back to top */}
          <a
            href="#"
            className="text-dark-500 hover:text-primary-400 text-sm transition-colors"
          >
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  )
}
