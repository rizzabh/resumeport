"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Moon, Sun, Github, Terminal, Palette } from "lucide-react"
import { AnimatedSection } from "@/components/AnimatedSection"
import { ProjectCarousel } from "@/components/ProjectCarousel"
import Link from "next/link"
import Lenis from "@studio-freight/lenis"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("DEV")

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
    DEV: [
      {
        name: "Solana Rewind",
        detail: "Wallet Roaster for Solana",
        image: "./rewind.webp",
        "button-name": "Visit",
        link1: "https://solanarewind.fun/",
      },
      {
        name: "S.I.C.K",
        detail: "SIP for Web3",
        image: "./image.webp",
        "button-name": "Visit",
        link1: "https://sickfreak.club/",
        "button-name2": "Org",
        link2: "https://github.com/SICK-Solana",
      },
      {
        name: "Flowpro",
        detail: "Low Code Backend Tool",
        image: "./flowpro.webp",
        "button-name": "Visit",
        link1: "https://flow-pro.vercel.app/",
      },
      {
        name: "Yen.fyi",
        detail: "Website for Yen token",
        image: "./yen.webp",
        "button-name": "Visit",
        link1: "https://yen.fyi/",
      },
      {
        name: "Hem LLP",
        detail: "Freelance Client",
        image: "./hem.webp",
        "button-name": "Visit",
        link1: "https://hemcontracts.com/",
      },
      {
        name: "ThinQ:Classroom",
        detail: "Revolutionizing digital Education",
        image: "./Screenshot 2024-04-17 223635.webp",
        "button-name": "Visit",
        link1: "https://maam-coders.vercel.app/",
        "button-name2": "Code",
        link2: "https://github.com/arnitdo/ThinQ",
      },
      {
        name: "DealDex",
        detail: "Online Price comparison",
        image: "./Screenshot 2024-04-17 223735.webp",
        "button-name": "Video",
        link1: "https://www.youtube.com/watch?v=L-poYUOLeUQ",
        "button-name2": "Code",
        link2: "https://github.com/vaxad/DealDex",
      },
      {
        name: "Nutrisnap",
        detail: "Think of Health, Think of Nutrisnap",
        image: "./nutrisnap.webp",
        "button-name": "Visit",
        link1: "https://nutrisnap.vercel.app/",
      },
      {
        name: "HookWithMe",
        detail: "Implementing hooks",
        image: "./Screenshot 2024-05-16 223242.webp",
        "button-name2": "Code",
        link2: "https://github.com/rizzabh/react-hooks",
        "button-name": "Visit",
        link1: "https://hookswithme.netlify.app/",
      },
      {
        name: "Platformer Game",
        detail: "Mario Typa Beat",
        image: "./Screenshot 2024-04-26 224149.webp",
        "button-name": "Code",
        link1: "https://github.com/rizzabh/grp-pygame",
      },
      {
        name: "Github Searcher",
        detail: "Made using nextjs",
        image: "./gitsearch.webp",
        "button-name": "Visit",
        link1: "https://githubsearch-six.vercel.app/",
      },
      {
        name: "LingoSafari",
        detail: "Frontend Layout",
        image: "./Screenshot 2024-03-08 144807.webp",
        "button-name": "Visit",
        link1: "https://lingo-safari.vercel.app/",
      },
      {
        name: "GDSC Website",
        detail: "Opensource contribution to GDSC TCET",
        image: "./gdscjet.webp",
        "button-name": "Visit",
        link1: "https://gdsc-tcet-compose-camp.vercel.app/",
        link2: "https://github.com/Yadav106/gdsc-compose-camp",
        "button-name2": "Code",
      },
      {
        name: "Therapy Bot",
        detail: "Made a bot using Node, Discord.js",
        image: "./therapy.webp",
        link1: "https://github.com/rizzabh/TherapyBot",
        "button-name": "Code",
        link2:
          "https://www.linkedin.com/posts/rizzabh_project-therapy-discord-bot-github-repo-activity-7134113357837578240-30uM?utm_source=share&utm_medium=member_desktop",
        "button-name2": "Video",
      },
      {
        name: "Threedee",
        detail: "Showcasing 3d models using spline",
        image: "./threedee.webp",
        link1: "https://github.com/rizzabh/threedee",
        "button-name": "Code",
      },
      {
        name: "Cument (CRUD)",
        detail: "A site where you can share your thoughts",
        image: "./cument.webp",
        link1: "https://github.com/rizzabh/cument",
        "button-name": "Code",
      },
      {
        name: "Realtime Weather",
        detail: "Used Python",
        image: "./Screenshot 2023-07-22 195226.webp",
        link1: "https://github.com/rizzabh/weatherpython",
        link2:
          "https://www.linkedin.com/posts/rizzabh_python-weatherapp-memes-activity-7087829259175534593-WTpi?utm_source=share&utm_medium=member_desktop",
        "button-name": "Code",
        "button-name2": "Video",
      },
      {
        name: "Flutter-App",
        detail: "A to-do-List App",
        image: "./WhatsApp Image 2023-07-22 at 21.53.59.jpg",
        "button-name": "Code",
        link1: "https://github.com/rizzabh/Learningflutter",
      },
    ],
    DES: [
      {
        name: "UI/UX Projects",
        detail: "Design Portfolio",
        image: "./Framer.webp",
        "button-name": "Visit",
        link1: "https://rizzabh.framer.website/",
      },
      {
        name: "Mobile App Design",
        detail: "iOS and Android app interface design",
        image: "/placeholder.svg?height=300&width=400&text=Mobile+Design",
        "button-name": "View",
        link1: "#",
      },
      {
        name: "Dashboard UI",
        detail: "Analytics dashboard user interface",
        image: "/placeholder.svg?height=300&width=400&text=Dashboard+UI",
        "button-name": "View",
        link1: "#",
      },
      {
        name: "Brand Identity",
        detail: "Complete brand identity and guidelines",
        image: "/placeholder.svg?height=300&width=400&text=Brand+Identity",
        "button-name": "View",
        link1: "#",
      },
    ],
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative ${
        darkMode
          ? `
     text-white
     before:content-[''] 
     before:absolute
     before:inset-0 
     before:bg-[url('/dark-sky-background.png')] 
     before:bg-contain 
     before:bg-no-repeat 
     xl:before:bg-[center_-600px]
     lg:before:bg-[center_-400px]
     md:before:bg-[center_-200px]
     sm:before:bg-[center_-200px]

     
     max-sm:before:bg-[center_-400px]
     max-sm:before:bg-[length:1200px_auto] 
     before:opacity-90 
     before:pointer-events-none 
     before:-z-10`
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
      <div className={`max-w-4xl mx-auto ${darkMode ? "" : "border-white/0"} px-4 py-8 sm:px-6 lg:px-8`}>
        {/* Header */}
        <AnimatedSection delay={100}>
          <header className="flex flex-row justify-between items-center sm:items-center mb-12 gap-4">
            <div className="flex items-center gap-2 text-sm text-white dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>BOM ✈️ BLR, INDIA</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full text-white hover:bg-white/10 hover:text-white"
              >
                {darkMode ? <Sun className="w-4 h-4 " /> : <Moon className="w-4 h-4" />}
              </Button>
              <Link
                href="https://www.figma.com/deck/Y6NhRAjAgVSP757S6Ei4A5/Rishabh's-Work?node-id=1-34&t=IomQ7qC2Bed0Kq6Z-1"
                className=" bg-opacity-20 dark:border-zinc-800 bg-white hover:bg-zinc-200/70 dark:bg-gradient-to-b dark:from-zinc-900 dark:to-zinc-950  dark:text-zinc-50 dark:hover:bg-zinc-300 text-zinc-50 px-6 py-2 dark:border rounded-xl dark:border-gray-800"
              >
                HIRE ME
              </Link>
            </div>
          </header>
        </AnimatedSection>

        {/* Profile Section */}
        <AnimatedSection delay={200}>
          <section className="text-center mb-16">
            <div className="relative w-24 h-24 mx-auto mb-6 ">
              <Image
                src="/profile-avatar.png"
                alt="Rishabh Pandey"
                width={96}
                height={96}
                className={`rounded-xl border-4  ${darkMode ? "border-gray-100/10" : "border-gray-100" } font-bold mb-2`}
              />
            </div>
            <h1 className={`text-3xl sm:text-4xl ${darkMode ? "text-white" : "text-black"} font-bold mb-2`}>
              Rishabh Pandey
            </h1>
            <p className="text-lg text-black/60 dark:text-gray-300">Product Designer & Developer</p>
          </section>
        </AnimatedSection>

        <div className=" border-dashed border-gray-300 dark:border-gray-700 mb-16"></div>

        {/* About Section */}
        <AnimatedSection delay={200}>
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
        <AnimatedSection delay={200}>
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
        <AnimatedSection delay={200}>
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
                <div
                  key={skill}
                  variant="secondary"
                  className="px-4 py-2 text-sm bg-gradient-to-b from-white to-gray-100 border border-gray-200 rounded-xl dark:from-zinc-900 dark:to-black text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 dark:border-zinc-800 transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection delay={200}>
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold tracking-wide">PROJECTS</h2>

              {/* Tab Switch */}
              <div className="flex bg-zinc-400/10 border border-gray-200 dark:bg-zinc-700/50 backdrop-blur-sm rounded-xl p-1 dark:border-zinc-800">
                <button
                  onClick={() => setActiveTab("DEV")}
                  className={`px-2 flex gap-1 items-center py-1 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === "DEV"
                      ? "bg-white dark:bg-zinc-950 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  {activeTab === "DEV" && <Terminal size={16} />} DEV
                </button>
                <button
                  onClick={() => setActiveTab("DES")}
                  className={`px-2 py-1 flex gap-1 items-center text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === "DES"
                      ? "bg-white dark:bg-zinc-950 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  {activeTab === "DES" && <Palette size={16} />} DES
                </button>
              </div>
            </div>

            {/* Project Carousel */}
            <ProjectCarousel projects={projectData[activeTab]} autoPlay={false} autoPlayInterval={6000} />
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
              <Link
                href="https://linkedin.com/in/rizzabh"
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center transition-all duration-300 hover:translate-x-2"
              >
                <span className="font-medium">LinkedIn</span>
                <span className="text-gray-600 dark:text-gray-300 hover:underline">/in/rizzabh</span>
              </Link>
              <Link
                href="https://x.com/rizz_abh"
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center transition-all duration-300 hover:translate-x-2"
              >
                <span className="font-medium">X/Twitter</span>
                <span className="text-gray-600 dark:text-gray-300 hover:underline">@rizz_abh</span>
              </Link>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  )
}
