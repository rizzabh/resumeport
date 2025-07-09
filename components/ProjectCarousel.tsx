"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProjectCard } from "./ProjectCard"

interface Project {
  name: string
  detail: string
  image: string
  "button-name"?: string
  link1?: string
  "button-name2"?: string
  link2?: string
}

interface ProjectCarouselProps {
  projects: Project[]
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768)
    checkDesktop()
    window.addEventListener("resize", checkDesktop)
    return () => window.removeEventListener("resize", checkDesktop)
  }, [])

  const itemsPerView = isDesktop ? 2 : 1
  const maxIndex = Math.max(0, projects.length - itemsPerView)

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current
    if (!container) return

    const child = container.children[index] as HTMLElement
    child?.scrollIntoView({ behavior: "smooth", inline: "start" })
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    const newIndex = Math.max(currentIndex - 1, 0)
    scrollToIndex(newIndex)
  }

  const goToNext = () => {
    const newIndex = Math.min(currentIndex + 1, maxIndex)
    scrollToIndex(newIndex)
  }

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700">
        <p className="text-gray-500 dark:text-gray-400">No projects available</p>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {/* Carousel Container with Native Scroll */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full md:w-1/2 px-2 snap-start"
          >
            <ProjectCard
              name={project.name}
              detail={project.detail}
              image={project.image}
              buttonName={project["button-name"]}
              link1={project.link1}
              buttonName2={project["button-name2"]}
              link2={project.link2}
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      {projects.length > itemsPerView && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-sm text-gray-600 dark:text-gray-300">
            {currentIndex + 1} of {maxIndex + 1}
          </span>

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Optional: Hide scroll bar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
