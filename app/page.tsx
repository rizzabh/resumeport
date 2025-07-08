"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Moon, Sun, Github, ArrowUpRight } from "lucide-react"
import { AnimatedSection } from "@/components/AnimatedSection"
import { Carousel } from "@/components/Carousel"
import Link from 'next/link'
import Lenis from "@studio-freight/lenis"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Sample project data with carousel items
  const projectData = {
    aboutUs: [
      {
        id: "1",
        image: "/placeholder.svg?height=300&width=300&text=About+Us+1",
        title: "About Us - Landing",
        description: "Modern landing page design",
      },
      {
        id: "2",
        image: "/placeholder.svg?height=300&width=300&text=About+Us+2",
        title: "About Us - Team",
        description: "Team showcase section",
      },
      {
        id: "3",
        image: "/placeholder.svg?height=300&width=300&text=About+Us+3",
        title: "About Us - Contact",
        description: "Contact form design",
      },
    ],
    uiProject: [
      {
        id: "1",
        image: "/placeholder.svg?height=300&width=300&text=UI+Project+1",
        title: "Dashboard UI",
        description: "Analytics dashboard interface",
      },
      {
        id: "2",
        image: "/placeholder.svg?height=300&width=300&text=UI+Project+2",
        title: "Mobile App",
        description: "Mobile application design",
      },
      {
        id: "3",
        image: "/placeholder.svg?height=300&width=300&text=UI+Project+3",
        title: "Web Components",
        description: "Reusable UI components",
      },
    ],
  }

  return (
    <div
  className={`min-h-screen transition-colors duration-300 relative ${
    darkMode
      ? "dark bg-zinc-950 text-white"
      : `
          text-gray-900 
          before:content-[''] 
          before:absolute

          before:inset-0 
          before:bg-[url('/sky-background.png')] 
          before:bg-contain 
          before:bg-no-repeat 
          max-md:before:before:bg-[center_-400px]
          max-md:before:bg-[length:1200px_auto] 
          before:opacity-90 
          before:pointer-events-none 
          before:-z-10
        `
  }`}
>
      <div
        className={`max-w-4xl mx-auto border-l border-r ${darkMode ? "border-zinc-800" : "border-white/0"} px-4 py-8 sm:px-6 lg:px-8`}
      >
        {/* Header */}
        <AnimatedSection>
          <header className="flex flex-row justify-between items-center sm:items-center mb-12 gap-4">
            <div className="flex items-center gap-2 text-sm text-white dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>BOM ✈️ BLR, INDIA</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full text-white hover:bg-white/10 hover:text-white">
                {darkMode ? <Sun className="w-4 h-4 "/> : <Moon className="w-4 h-4" />}
              </Button>
              <Link href="https://www.figma.com/deck/Y6NhRAjAgVSP757S6Ei4A5/Rishabh's-Work?node-id=1-34&t=IomQ7qC2Bed0Kq6Z-1" className=" bg-opacity-20 dark:border-zinc-800 bg-white hover:bg-zinc-200/70 dark:bg-gradient-to-b dark:from-zinc-900 dark:to-zinc-950  dark:text-zinc-50 dark:hover:bg-zinc-300 text-zinc-50 px-6 py-2 dark:border rounded-xl dark:border-gray-800">
                HIRE ME
              </Link>
            </div>
          </header>
        </AnimatedSection>

        <div className=" border-dashed border-gray-300 dark:border-gray-700 mb-12"></div>

        {/* Profile Section */}
        <AnimatedSection delay={100}>
          <section className="text-center mb-16">
            <div className="relative w-24 h-24 mx-auto mb-6 ">
              <Image src="/profile-avatar.png" alt="Rishabh Pandey" width={96} height={96} className="rounded-xl border-4 border-gray-100" />
            </div>
            <h1 className={`text-3xl sm:text-4xl ${darkMode ? "text-white" : "text-black"} font-bold mb-2`}>Rishabh Pandey</h1>
            <p className="text-lg text-black/60 dark:text-gray-300">Product Designer & Developer</p>
          </section>
        </AnimatedSection>

        <div className=" border-dashed border-gray-300 dark:border-gray-700 mb-16"></div>

        {/* About Section */}
        <AnimatedSection delay={100}>
          <section className="mb-16">
            <h2 className="text-lg font-semibold mb-4 tracking-wide">ABOUT</h2>
            <p className="text-zinc-800 dark:text-gray-300 leading-relaxed max-w-3xl">
              I'm a Design Engineer crafting intuitive, scalable digital experiences at the intersection of design and
              code. With a strong foundation in front-end development and UX design, I bring ideas to life from concept
              to deployment by building robust UI systems and shaping user-centered products.
            </p>
          </section>
        </AnimatedSection>

        <div className="border-dashed border-gray-300 dark:border-gray-700 mb-16"></div>

        {/* Experience Section */}
        <AnimatedSection delay={100}>
          <section className="mb-16">
            <h2 className="text-lg font-semibold mb-6 tracking-wide">EXPERIENCE</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 transition-all duration-500 hover:translate-x-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Image src="/juspay_logo.png" alt="Juspay" width={40} height={40} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Product Designer Intern</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    JUSPAY • JUNE 2025 - PRESENT
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 transition-all duration-500 hover:translate-x-2">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">RG</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Product Designer Intern</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    REDDY GAMES • AUG 2024 - NOV 2024
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 transition-all duration-500 hover:translate-x-2">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">V</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">SDE Frontend Intern</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    VIGMOTECH • JUNE 2024 - AUG 2024
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>


        {/* Skills Section */}
        <AnimatedSection delay={100}>
          <section className="mb-16">
            <h2 className="text-lg font-semibold mb-6 tracking-wide">SKILLS / STACK</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "UX",
                "Product Design",
                "User Interface",
                "Prototyping",
                "React",
                "Typescript",
                "Next.js",
                "Tailwind CSS",
                "Express",
                "Nodejs",
                "C++",
                "Data Structures & Algo",
                "Web3",
              ].map((skill, index) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection delay={100}>
          <section className="mb-16">
            <h2 className="text-lg font-semibold mb-6 tracking-wide">PROJECTS</h2>
            <div className="grid grid-cols-1 gap-6">
              {/* About Us Project with Carousel - Takes 2 columns */}
              <Card className="overflow-hidden hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square md:aspect-[2/1] relative">
                    <Carousel items={projectData.aboutUs} autoPlay={true} autoPlayInterval={4000} />
                  </div>
                </CardContent>
              </Card>

              {/* Right column container for the other two cards */}

              {/* View Projects Card */}
              
            </div>
          </section>
        </AnimatedSection>

        {/* GitHub Section */}
        <AnimatedSection delay={100}>
          <section className="mb-16">
            <Link href="https://github.com/rizzabh" className="flex justify-start">
              <Github className="w-8 h-8 text-gray-700 dark:text-gray-300 transition-transform duration-300 hover:scale-110" />
            </Link>
          </section>
        </AnimatedSection>

        <div className=" border-dashed border-gray-300 dark:border-gray-700 mb-16"></div>

        {/* Contact Section */}
        <AnimatedSection delay={100}>
          <section>
            <h2 className="text-lg font-semibold mb-6 tracking-wide">CONTACT</h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center transition-all duration-300 hover:translate-x-2">
                <span className="font-medium">Email</span>
                <span className="text-gray-600 dark:text-gray-300">pandeyrishabh966@gmail.com</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center transition-all duration-300 hover:translate-x-2">
                <span className="font-medium">LinkedIn</span>
                <span className="text-gray-600 dark:text-gray-300">/in/rizzabh</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center transition-all duration-300 hover:translate-x-2">
                <span className="font-medium">X/Twitter</span>
                <span className="text-gray-600 dark:text-gray-300">@rizz_abh</span>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  )
}
