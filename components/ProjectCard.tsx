import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Play, Code, Globe } from "lucide-react"

interface ProjectCardProps {
  name: string
  detail: string
  image: string
  buttonName?: string
  link1?: string
  buttonName2?: string
  link2?: string
}

export function ProjectCard({ name, detail, image, buttonName, link1, buttonName2, link2 }: ProjectCardProps) {
  const getButtonIcon = (buttonName: string) => {
    switch (buttonName?.toLowerCase()) {
      case "visit":
        return <ExternalLink className="w-3 h-3" />
      case "code":
        return <Code className="w-3 h-3" />
      case "video":
        return <Play className="w-3 h-3" />
      case "org":
        return <Github className="w-3 h-3" />
      default:
        return <ExternalLink className="w-3 h-3" />
    }
  }

  const extractDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return domain.replace("www.", "")
    } catch {
      return "project"
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-zinc-800 group">
      {/* Browser Header */}
      <div className="flex items-center bg-white justify-between px-2 py-3 bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800 ">
        <div className="flex items-center gap-2">
          
            <span className="text-xs items-center text-gray-500 flex gap-1 px-2 py-1 bg-gray-400/10 rounded-full truncate text-clamp-1 dark:text-gray-400 font-mono">
                <Globe size={12} />
              {link1 ? extractDomain(link1) : "localhost"}
            </span>
          
        </div>
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-32">{name}</div>
        {link1 && (
          <Link href={link1} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" />
          </Link>
        )}
      </div>

      {/* Project Image */}
      <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-zinc-800">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=300&width=400&text=" + encodeURIComponent(name)
          }}
        />
      </div>

      {/* Project Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 truncate">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{detail}</p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {link1 && buttonName && (
            <Link
              href={link1}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 dark:from-zinc-900 dark:text-white dark:border-zinc-800 dark:to-zinc-800 px-3 py-1.5 bg-gradient-to-b from-white to-gray-100 hover:bg-blue-700 text-black border border-gray-200 text-xs font-medium rounded-lg transition-colors"
            >
              {getButtonIcon(buttonName)}
              {buttonName}
            </Link>
          )}
          {link2 && buttonName2 && (
            <Link
              href={link2}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-b dark:from-black/0 dark:border dark:border-zinc-800 dark:to-black/0 to-gray-800 from-gray-600 hover:bg-gray-700 text-white text-xs font-medium rounded-lg transition-colors"
            >
              {getButtonIcon(buttonName2)}
              {buttonName2}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
