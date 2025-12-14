import { useState, useRef, useEffect } from 'react'
import {
  SiDotnet,
  SiPython,
  SiNodedotjs,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiAmazonwebservices,
  SiGit,
  SiGraphql,
  SiRabbitmq,
  SiApachekafka,
  SiTerraform,
  SiElasticsearch,
  SiNginx,
  SiGithubactions,
} from 'react-icons/si'
import { HiCode, HiServer, HiCog, HiDatabase, HiCloud, HiCube, HiLightningBolt } from 'react-icons/hi'

const skillIcons = {
  '.NET Core': SiDotnet,
  '.NET': SiDotnet,
  'C#': SiDotnet,
  Python: SiPython,
  'Node.js': SiNodedotjs,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  K8s: SiKubernetes,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  AWS: SiAmazonwebservices,
  Git: SiGit,
  GraphQL: SiGraphql,
  RabbitMQ: SiRabbitmq,
  Kafka: SiApachekafka,
  Terraform: SiTerraform,
  Elasticsearch: SiElasticsearch,
  Nginx: SiNginx,
  'GitHub Actions': SiGithubactions,
}

const categoryIcons = {
  'Backend Development': HiCode,
  'Distributed Systems': HiServer,
  'Automation & DevOps': HiCog,
  Databases: HiDatabase,
  'Cloud & Infrastructure': HiCloud,
  'Tools & Practices': HiCube,
}

const categoryColors = {
  'Backend Development': 'from-blue-500 to-cyan-500',
  'Distributed Systems': 'from-purple-500 to-pink-500',
  'Automation & DevOps': 'from-orange-500 to-amber-500',
  Databases: 'from-green-500 to-emerald-500',
  'Cloud & Infrastructure': 'from-indigo-500 to-violet-500',
  'Tools & Practices': 'from-rose-500 to-red-500',
}

function SkillCard({ category, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const CategoryIcon = categoryIcons[category.category] || HiCube
  const gradientColor = categoryColors[category.category] || 'from-primary-500 to-purple-500'

  return (
    <div
      ref={cardRef}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Glow effect following cursor */}
      {isHovered && (
        <div
          className="absolute w-32 h-32 rounded-full pointer-events-none transition-opacity duration-300 blur-xl"
          style={{
            background: `radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)`,
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
          }}
        />
      )}

      <div className="card relative overflow-hidden hover:border-primary-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10">
        {/* Animated border gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-[-1px] bg-gradient-to-r ${gradientColor} rounded-xl opacity-20`} />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className={`relative p-3 bg-gradient-to-br ${gradientColor} rounded-xl text-white shadow-lg`}>
              <CategoryIcon className="w-5 h-5" />
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                {category.category}
              </h3>
              <p className="text-xs text-dark-500">{category.items.length} technologies</p>
            </div>
          </div>

          {/* Skills grid */}
          <div className="flex flex-wrap gap-2">
            {category.items.map((skill, skillIndex) => {
              const SkillIcon = skillIcons[skill]
              return (
                <span
                  key={skillIndex}
                  className="group/skill relative inline-flex items-center gap-1.5 px-3 py-2 bg-dark-800/80 text-dark-300 text-sm rounded-lg border border-dark-700/50 hover:border-primary-500/50 hover:bg-dark-700/50 hover:text-white transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${skillIndex * 50}ms` }}
                >
                  {SkillIcon && (
                    <SkillIcon className="w-4 h-4 text-dark-400 group-hover/skill:text-primary-400 transition-colors" />
                  )}
                  <span>{skill}</span>
                  {/* Tooltip glow */}
                  <span className="absolute inset-0 rounded-lg bg-primary-500/10 opacity-0 group-hover/skill:opacity-100 transition-opacity blur-sm -z-10" />
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Skills({ data }) {
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
    <section id="skills" className="py-20 sm:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-transparent to-dark-900/50" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-mono mb-4">
            <HiLightningBolt className="w-4 h-4" />
            <span>Tech Stack</span>
          </div>

          <h2 className="section-title">
            Technologies I work with<span className="text-primary-500">.</span>
          </h2>

          <p className="section-subtitle mx-auto">
            Here are the technologies and tools I use to build robust, scalable applications.
          </p>

          {/* Animated underline */}
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full" />
          </div>
        </div>

        {/* Skills grid */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {data.map((category, index) => (
            <SkillCard key={index} category={category} index={index} />
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4 text-dark-500 text-sm">
            <div className="h-px w-12 bg-dark-700" />
            <span>Always learning, always growing</span>
            <div className="h-px w-12 bg-dark-700" />
          </div>
        </div>
      </div>
    </section>
  )
}
