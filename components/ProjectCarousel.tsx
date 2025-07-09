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
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function ProjectCarousel({
  projects,
  autoPlay = false,
  autoPlayInterval = 5000,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const itemsPerView = isDesktop ? 2 : 1
  const clonedHead = projects.slice(0, itemsPerView)
  const clonedTail = projects.slice(-itemsPerView)
  const extendedProjects = [...clonedTail, ...projects, ...clonedHead]
  const totalSlides = extendedProjects.length
  const realStartIndex = clonedTail.length

  // Desktop Check
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768)
    checkDesktop()
    window.addEventListener("resize", checkDesktop)
    return () => window.removeEventListener("resize", checkDesktop)
  }, [])

  // Set initial index after itemsPerView is determined
  useEffect(() => {
    setCurrentIndex(realStartIndex)
  }, [itemsPerView])

  // Autoplay
  useEffect(() => {
    if (!autoPlay || projects.length <= itemsPerView) return
    const interval = setInterval(() => {
      goToNext()
    }, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, currentIndex, itemsPerView, projects.length])

  const goToPrevious = () => {
    if (transitioning) return
    setTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
  }

  const goToNext = () => {
    if (transitioning) return
    setTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }

  // Loop Reset Logic
  useEffect(() => {
    if (!trackRef.current) return

    const handleTransitionEnd = () => {
      setTransitioning(false)
      if (currentIndex === extendedProjects.length - itemsPerView) {
        // Reached clone head → reset to real start
        trackRef.current.style.transition = "none"
        setCurrentIndex(realStartIndex)
        requestAnimationFrame(() => {
          trackRef.current!.style.transition = "transform 0.5s ease-in-out"
        })
      } else if (currentIndex === 0) {
        // Reached clone tail → reset to real end
        trackRef.current.style.transition = "none"
        setCurrentIndex(extendedProjects.length - itemsPerView * 2)
        requestAnimationFrame(() => {
          trackRef.current!.style.transition = "transform 0.5s ease-in-out"
        })
      }
    }

    const el = trackRef.current
    el.addEventListener("transitionend", handleTransitionEnd)
    return () => el.removeEventListener("transitionend", handleTransitionEnd)
  }, [currentIndex, itemsPerView, extendedProjects.length])

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel Track */}
      <div
        ref={trackRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(100 / extendedProjects.length) * currentIndex}%)`,
          width: `${(100 / itemsPerView) * extendedProjects.length}%`,
        }}
      >
        {extendedProjects.map((project, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-2"
            style={{ width: `${100 / extendedProjects.length}%`, scrollSnapAlign: "start" }}
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

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button onClick={goToPrevious} className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={goToNext} className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Scroll Snapping (Tailwind-based) */}
      <style jsx>{`
        .scroll-snap {
          scroll-snap-type: x mandatory;
          overflow-x: auto;
        }
      `}</style>
    </div>
  )
}
