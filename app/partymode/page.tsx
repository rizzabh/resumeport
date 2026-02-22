"use client"

import { useRef, useState, useEffect } from "react"

// Lyrics with timestamps (in seconds) for No Surprises by Radiohead
const lyricsData = [
    { time: 0, text: "" },

    { time: 5.9, text: "A heart that's full up like a landfill" },
    { time: 15, text: "A job that slowly kills you" },
    { time: 21, text: "Bruises that won't heal" },

    { time: 30.5, text: "You look so tired, unhappy" },
    { time: 36, text: "Bring down the government" },
    { time: 42.6, text: "They don't, they don't speak for us" },

    { time: 54.9, text: "I'll take a quiet life" },
    { time: 61, text: "A handshake of carbon monoxide" },

    { time: 68, text: "And no alarms and no surprises" },
    { time: 73, text: "No alarms and no surprises" },

    { time: 80, text: "This is my final fit" },
    { time: 85, text: "My final bellyache with" },
 
    { time: 92, text: "No alarms and no surprises" },
    { time: 98, text: "No alarms and no surprises" },
    { time: 104, text: "No alarms and no surprises please" },

  ];

function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [pressedButton, setPressedButton] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [currentLyric, setCurrentLyric] = useState("")
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0)

  useEffect(() => {
    const audio = new Audio("/nosurprises.mp3")
    audio.volume = volume
    audioRef.current = audio

    audio.addEventListener('timeupdate', () => {
      const time = audio.currentTime
      setCurrentTime(time)
      // Find current lyric
      const currentIndex = lyricsData.findLastIndex(l => time >= l.time)
      if (currentIndex !== -1) {
        setCurrentLyricIndex(currentIndex)
        setCurrentLyric(lyricsData[currentIndex].text)
      }
    })
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', () => {})
      audio.removeEventListener('loadedmetadata', () => {})
      audio.removeEventListener('ended', () => {})
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const playClickSound = () => {
    const clickSound = new Audio("/buttonclick.mp3")
    clickSound.currentTime = 0
    clickSound.play().catch(() => {})
  }

  const togglePlay = () => {
    playClickSound()
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
    setPressedButton('pause')
    setTimeout(() => setPressedButton(null), 150)
  }

  const skipForward = () => {
    playClickSound()
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 5, duration)
    setPressedButton('next')
    setTimeout(() => setPressedButton(null), 150)
  }

  const skipBackward = () => {
    playClickSound()
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 5, 0)
    setPressedButton('prev')
    setTimeout(() => setPressedButton(null), 150)
  }

  return { isPlaying, pressedButton, togglePlay, skipForward, skipBackward, currentTime, duration, volume, setVolume, currentLyric, currentLyricIndex }
}

function Group({ volume, setVolume }: { volume: number; setVolume: (v: number) => void }) {
  const [isDragging, setIsDragging] = useState(false)
  const knobRef = useRef<SVGSVGElement>(null)

  // Update rotation based on mouse position
  const updateRotation = (clientX: number, clientY: number) => {
    if (!knobRef.current) return
    const rect = knobRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate angle from center to mouse (in radians)
    const angleRad = Math.atan2(clientY - centerY, clientX - centerX)
    // Convert to degrees and adjust so top is 0
    let angleDeg = angleRad * (180 / Math.PI) + 90

    // Normalize to -180 to 180 range
    if (angleDeg > 180) angleDeg -= 360
    if (angleDeg < -180) angleDeg += 360

    // Clamp to -135 to +135 degrees (270 degree range)
    const clampedAngle = Math.max(-135, Math.min(135, angleDeg))

    // Convert to volume (0 to 1)
    const newVolume = (clampedAngle + 135) / 270
    setVolume(Math.max(0, Math.min(1, newVolume)))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateRotation(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    updateRotation(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Global mouse events for smoother dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      updateRotation(e.clientX, e.clientY)
    }

    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove)
      window.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging])

  // Calculate rotation from volume
  const rotation = volume * 270 - 135

  return (
    <div className="absolute left-[17px] size-[192px] top-[16px]">
      <div className="absolute inset-[-6.25%_-75.52%_-77.6%_-6.25%]">
        <svg
          ref={knobRef}
          className="block size-full cursor-pointer"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 349 353"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <g id="Group 1321318309">
            <g filter="url(#filter0_dddd_1_99)" id="Ellipse 11490">
              <circle cx="108" cy="108" fill="url(#paint0_linear_1_99)" r="96" />
              <circle cx="108" cy="108" r="95.75" stroke="var(--stroke-0, black)" strokeOpacity="0.09" strokeWidth="0.5" />
            </g>
            <g
              filter="url(#filter1_dddd_1_99)"
              id="Rectangle 161125040"
              style={{
                transformOrigin: '108px 108px',
                transform: `rotate(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out'
              }}
            >
              <rect fill="var(--fill-0, #454545)" height="26" rx="2.5" width="5" x="106" y="25" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="353" id="filter0_dddd_1_99" width="349" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="6" dy="6" />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_99" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="23" dy="24" />
              <feGaussianBlur stdDeviation="16.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0" />
              <feBlend in2="effect1_dropShadow_1_99" mode="normal" result="effect2_dropShadow_1_99" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="52" dy="54" />
              <feGaussianBlur stdDeviation="22.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
              <feBlend in2="effect2_dropShadow_1_99" mode="normal" result="effect3_dropShadow_1_99" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="92" dy="96" />
              <feGaussianBlur stdDeviation="26.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0" />
              <feBlend in2="effect3_dropShadow_1_99" mode="normal" result="effect4_dropShadow_1_99" />
              <feBlend in="SourceGraphic" in2="effect4_dropShadow_1_99" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="44" id="filter1_dddd_1_99" width="27" x="105" y="23">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_99" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="4" dy="2" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0" />
              <feBlend in2="effect1_dropShadow_1_99" mode="normal" result="effect2_dropShadow_1_99" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="8" dy="5" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="effect2_dropShadow_1_99" mode="normal" result="effect3_dropShadow_1_99" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="14" dy="9" />
              <feGaussianBlur stdDeviation="3.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
              <feBlend in2="effect3_dropShadow_1_99" mode="normal" result="effect4_dropShadow_1_99" />
              <feBlend in="SourceGraphic" in2="effect4_dropShadow_1_99" mode="normal" result="shape" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_99" x1="12" x2="204" y1="12" y2="204">
              <stop stopColor="#FDF6EC" />
              <stop offset="1" stopColor="#E1DAD0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame1({ volume, setVolume }: { volume: number; setVolume: (v: number) => void }) {
  return (
    <div className="absolute bg-[#f1eae0] border border-[#e0d9cf] border-solid h-[225px] left-[509px] rounded-[999px] top-[624px] w-[232px]">
      <Group volume={volume} setVolume={setVolume} />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_1px_3px_4px_0px_rgba(0,0,0,0.11)]" />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[655px] top-[121px]">
      <div className="absolute bg-[#aba49a] left-[655px] rounded-[13px] size-[3px] top-[121px]" />
      <div className="absolute bg-[#aba49a] left-[655px] rounded-[13px] size-[3px] top-[134px]" />
      <div className="absolute bg-[#aba49a] left-[655px] rounded-[13px] size-[3px] top-[147px]" />
      <div className="absolute bg-[#aba49a] left-[655px] rounded-[13px] size-[3px] top-[160px]" />
      <div className="absolute bg-[#aba49a] left-[655px] rounded-[13px] size-[3px] top-[173px]" />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[667px] top-[121px]">
      <div className="absolute bg-[#aba49a] left-[667px] rounded-[13px] size-[3px] top-[121px]" />
      <div className="absolute bg-[#aba49a] left-[667px] rounded-[13px] size-[3px] top-[134px]" />
      <div className="absolute bg-[#aba49a] left-[667px] rounded-[13px] size-[3px] top-[147px]" />
      <div className="absolute bg-[#aba49a] left-[667px] rounded-[13px] size-[3px] top-[160px]" />
      <div className="absolute bg-[#aba49a] left-[667px] rounded-[13px] size-[3px] top-[173px]" />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[679px] top-[121px]">
      <div className="absolute bg-[#aba49a] left-[679px] rounded-[13px] size-[3px] top-[121px]" />
      <div className="absolute bg-[#aba49a] left-[679px] rounded-[13px] size-[3px] top-[134px]" />
      <div className="absolute bg-[#aba49a] left-[679px] rounded-[13px] size-[3px] top-[147px]" />
      <div className="absolute bg-[#aba49a] left-[679px] rounded-[13px] size-[3px] top-[160px]" />
      <div className="absolute bg-[#aba49a] left-[679px] rounded-[13px] size-[3px] top-[173px]" />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[691px] top-[121px]">
      <div className="absolute bg-[#aba49a] left-[691px] rounded-[13px] size-[3px] top-[121px]" />
      <div className="absolute bg-[#aba49a] left-[691px] rounded-[13px] size-[3px] top-[134px]" />
      <div className="absolute bg-[#aba49a] left-[691px] rounded-[13px] size-[3px] top-[147px]" />
      <div className="absolute bg-[#aba49a] left-[691px] rounded-[13px] size-[3px] top-[160px]" />
      <div className="absolute bg-[#aba49a] left-[691px] rounded-[13px] size-[3px] top-[173px]" />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[703px] top-[121px]">
      <div className="absolute bg-[#aba49a] left-[703px] rounded-[13px] size-[3px] top-[121px]" />
      <div className="absolute bg-[#aba49a] left-[703px] rounded-[13px] size-[3px] top-[134px]" />
      <div className="absolute bg-[#aba49a] left-[703px] rounded-[13px] size-[3px] top-[147px]" />
      <div className="absolute bg-[#aba49a] left-[703px] rounded-[13px] size-[3px] top-[160px]" />
      <div className="absolute bg-[#aba49a] left-[703px] rounded-[13px] size-[3px] top-[173px]" />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-[715px] top-[121px]">
      <div className="absolute bg-[#aba49a] left-[715px] rounded-[13px] size-[3px] top-[121px]" />
      <div className="absolute bg-[#aba49a] left-[715px] rounded-[13px] size-[3px] top-[134px]" />
      <div className="absolute bg-[#aba49a] left-[715px] rounded-[13px] size-[3px] top-[147px]" />
      <div className="absolute bg-[#aba49a] left-[715px] rounded-[13px] size-[3px] top-[160px]" />
      <div className="absolute bg-[#aba49a] left-[715px] rounded-[13px] size-[3px] top-[173px]" />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[727px] top-[121px]">
      <div className="absolute bg-[#aba49a] left-[727px] rounded-[13px] size-[3px] top-[121px]" />
      <div className="absolute bg-[#aba49a] left-[727px] rounded-[13px] size-[3px] top-[134px]" />
      <div className="absolute bg-[#aba49a] left-[727px] rounded-[13px] size-[3px] top-[147px]" />
      <div className="absolute bg-[#aba49a] left-[727px] rounded-[13px] size-[3px] top-[160px]" />
      <div className="absolute bg-[#aba49a] left-[727px] rounded-[13px] size-[3px] top-[173px]" />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[739px] top-[121px]">
      <div className="absolute bg-[#aba49a] left-[739px] rounded-[13px] size-[3px] top-[121px]" />
      <div className="absolute bg-[#aba49a] left-[739px] rounded-[13px] size-[3px] top-[134px]" />
      <div className="absolute bg-[#aba49a] left-[739px] rounded-[13px] size-[3px] top-[147px]" />
      <div className="absolute bg-[#aba49a] left-[739px] rounded-[13px] size-[3px] top-[160px]" />
      <div className="absolute bg-[#aba49a] left-[739px] rounded-[13px] size-[3px] top-[173px]" />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[654px] top-[120px]">
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
      <Group8 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute left-[57.5px] size-[10px] top-[614.5px]">
      <div className="absolute inset-[-60%_-60.01%_-60%_-59.99%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <g id="Frame 1984079525">
            <rect fill="var(--fill-0, #524B41)" height="10" rx="5" width="10" x="5.99858" y="6.00036" />
            <g filter="url(#filter0_d_1_120)" id="Ellipse 11493">
              <circle cx="11" cy="11" fill="var(--fill-0, #FC2E2E)" r="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="22" id="filter0_d_1_120" width="22" x="0" y="1.19209e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="effect1_dropShadow_1_120" />
              <feOffset />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.932354 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_120" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_120" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute left-[82px] size-[10px] top-[615px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Frame 1984079526">
          <rect fill="var(--fill-0, #524B41)" height="10" rx="5" width="10" />
          <circle cx="5" cy="5" fill="var(--fill-0, #840A0A)" id="Ellipse 11493" r="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute left-[107px] size-[10px] top-[615px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Frame 1984079526">
          <rect fill="var(--fill-0, #524B41)" height="10" rx="5" width="10" />
          <circle cx="5" cy="5" fill="var(--fill-0, #840A0A)" id="Ellipse 11493" r="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute left-[132px] size-[10px] top-[615px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Frame 1984079526">
          <rect fill="var(--fill-0, #524B41)" height="10" rx="5" width="10" />
          <circle cx="5" cy="5" fill="var(--fill-0, #840A0A)" id="Ellipse 11493" r="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame6({
  isPlaying,
  pressedButton,
  togglePlay,
  skipForward,
  skipBackward
}: {
  isPlaying: boolean
  pressedButton: string | null
  togglePlay: () => void
  skipForward: () => void
  skipBackward: () => void
}) {
  const buttonStyle = {
    cursor: 'pointer' as const
  }

  return (
    <div className="absolute h-[105.97px] left-[58px] top-[691px] w-[263.91px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 263.91 105.97">
        <g id="Frame 1984079530">
          <g id="prevBtn" style={buttonStyle} onClick={skipBackward}>
            <g filter="url(#filter0_ii_1_103)">
              <circle cx="29.9851" cy="52.985" fill="var(--fill-0, #F1EAE0)" r="29.9851" />
            </g>
            <circle cx="29.9851" cy="52.985" r="29.7807" stroke="url(#paint0_linear_1_103)" strokeWidth="0.408888" />
            {pressedButton === 'prev' && <circle cx="29.9851" cy="52.985" r="29.9851" fill="rgba(0,0,0,0.1)" />}
          </g>
          <g id="pauseBtn" style={buttonStyle} onClick={togglePlay}>
            <g filter="url(#filter1_ii_1_103)">
              <circle cx="131.955" cy="52.985" fill="var(--fill-0, #F1EAE0)" r="52.985" />
            </g>
            <circle cx="131.955" cy="52.985" r="52.6237" stroke="url(#paint1_linear_1_103)" strokeWidth="0.722523" />
            {pressedButton === 'pause' && <circle cx="131.955" cy="52.985" r="52.985" fill="rgba(0,0,0,0.1)" />}
          </g>
          <g id="nextBtn" style={buttonStyle} onClick={skipForward}>
            <g filter="url(#filter2_ii_1_103)">
              <circle cx="233.925" cy="52.985" fill="var(--fill-0, #F1EAE0)" r="29.9851" />
            </g>
            <circle cx="233.925" cy="52.985" r="29.7807" stroke="url(#paint2_linear_1_103)" strokeWidth="0.408888" />
            {pressedButton === 'next' && <circle cx="233.925" cy="52.985" r="29.9851" fill="rgba(0,0,0,0.1)" />}
          </g>
          <g id="Frame" pointerEvents="none">
            <image x="114" y="35" width="36" height="36" href={isPlaying ? "/pause.svg" : "/play.svg"} />
          </g>
          <g id="Frame_2" pointerEvents="none">
            <image x="225" y="42" width="24" height="24" href="/nextsong.svg" />
          </g>
          <g id="Frame_3" pointerEvents="none">
            <image x="20" y="42" width="24" height="24" href="/prev.svg" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="62.6961" id="filter0_ii_1_103" width="62.6961" x="-1.36296" y="21.6369">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="1.36296" dy="1.36296" />
            <feGaussianBlur stdDeviation="0.68148" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_103" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="1.36296" result="effect2_innerShadow_1_103" />
            <feOffset dx="-1.36296" dy="-1.36296" />
            <feGaussianBlur stdDeviation="1.36296" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
            <feBlend in2="effect1_innerShadow_1_103" mode="normal" result="effect2_innerShadow_1_103" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="110.787" id="filter1_ii_1_103" width="110.787" x="76.5618" y="-2.40841">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="2.40841" dy="2.40841" />
            <feGaussianBlur stdDeviation="1.2042" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_103" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="2.40841" result="effect2_innerShadow_1_103" />
            <feOffset dx="-2.40841" dy="-2.40841" />
            <feGaussianBlur stdDeviation="2.40841" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
            <feBlend in2="effect1_innerShadow_1_103" mode="normal" result="effect2_innerShadow_1_103" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="62.6961" id="filter2_ii_1_103" width="62.6961" x="202.577" y="21.6369">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="1.36296" dy="1.36296" />
            <feGaussianBlur stdDeviation="0.68148" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_103" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="1.36296" result="effect2_innerShadow_1_103" />
            <feOffset dx="-1.36296" dy="-1.36296" />
            <feGaussianBlur stdDeviation="1.36296" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
            <feBlend in2="effect1_innerShadow_1_103" mode="normal" result="effect2_innerShadow_1_103" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="28" id="filter3_i_1_103" width="8.5" x="135" y="39.5">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_103" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="28" id="filter4_i_1_103" width="8.5" x="121.5" y="39.5">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_103" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="17" id="filter5_i_1_103" width="15.0002" x="225" y="45">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_103" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="17" id="filter6_i_1_103" width="4" x="241" y="45">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_103" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="17" id="filter7_i_1_103" width="15.0002" x="24.9998" y="45">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_103" />
          </filter>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="17" id="filter8_i_1_103" width="4" x="20" y="45">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_103" />
          </filter>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_103" x1="0" x2="59.9702" y1="22.9999" y2="82.9701">
            <stop stopColor="#C9C9C9" />
            <stop offset="1" stopColor="#AAAAAA" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_103" x1="78.9702" x2="184.94" y1="0" y2="105.97">
            <stop stopColor="#C9C9C9" />
            <stop offset="1" stopColor="#AAAAAA" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_103" x1="203.94" x2="263.91" y1="22.9999" y2="82.9701">
            <stop stopColor="#C9C9C9" />
            <stop offset="1" stopColor="#AAAAAA" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Frame({
  volume,
  setVolume,
  currentLyric,
  isPlaying,
  pressedButton,
  togglePlay,
  skipForward,
  skipBackward
}: {
  volume: number
  setVolume: (v: number) => void
  currentLyric: string
  isPlaying: boolean
  pressedButton: string | null
  togglePlay: () => void
  skipForward: () => void
  skipBackward: () => void
}) {

  return (
    <div className="-translate-x-1/2 top-10 max-md:top-36 max-sm:top-96 absolute bg-[#f1eae0] border border-[#d9d3ca] border-solid h-[903px] left-1/2 overflow-clip rounded-[33px] shadow-[410px_449px_170px_0px_rgba(112,112,112,0.01),263px_287px_156px_0px_rgba(112,112,112,0.04),148px_162px_131px_0px_rgba(112,112,112,0.15),66px_72px_97px_0px_rgba(112,112,112,0.26),16px_18px_54px_0px_rgba(112,112,112,0.29)] top-[calc(50%-0.5px)] w-[792px]">
      <div className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] left-[57px] text-[#5e5e5e] text-[37px] top-[111px] tracking-[-1.11px] whitespace-nowrap">
        <p className="mb-0">rizzabh</p>
        <p>rp-01</p>
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[0] left-[222px] text-[#5e5e5e] text-[16px] top-[120px] tracking-[-0.16px] w-[305px] whitespace-pre-wrap">
        <span className="leading-[normal]">hi, i am a product designer</span>
        <span className="leading-[normal]">{` based in India`}</span>
        <span className="leading-[normal]">{`, currently designing at `}</span>
        <span className="font-['Plus_Jakarta_Sans:Medium_Italic',sans-serif] italic leading-[normal]">{`Juspay. `}</span>
        <span className="leading-[normal]">not just a designer i can also code :p</span>
      </p>
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] left-[57px] text-[#636363] text-[16px] top-[44px] tracking-[-0.48px]">21yo</p>
      <p className="absolute font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] left-[661px] text-[#636363] text-[16px] top-[44px] tracking-[-0.48px]">mum / blr</p>
      <Frame1 volume={volume} setVolume={setVolume} />
      <div className="absolute h-[335px] left-[57px] rounded-[11px] top-[252px] w-[694px]" data-name="Screenshot 2026-02-19 at 7.51.27 PM 1">
        <div className="absolute inset-0 overflow-hidden rounded-[11px] pointer-events-none">
          <img alt="" className="" src="/monkey.png" />
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.85)] border-solid inset-0 rounded-[11px] pointer-events-none" />
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_19.1px_7px_rgba(0,0,0,0.34)] pointer-events-none" />
      </div>
      <Group9 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <Frame6
        isPlaying={isPlaying}
        pressedButton={pressedButton}
        togglePlay={togglePlay}
        skipForward={skipForward}
        skipBackward={skipBackward}
      />
      <div className=" pointer-events-none absolute h-[334px] left-[58px] rounded-[10px] top-[252px] w-[691px]" data-name="image 209456">
        <img alt="" className="absolute inset-0 max-w-none mix-blend-overlay object-cover opacity-50 pointer-events-none rounded-[10px] size-full" src="/tvtexture.png" />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-4px_-4px_3px_3px_rgba(0,0,0,0.08),inset_4px_4px_3px_3px_rgba(255,255,255,0.53)]" />
    </div>
  );
}

export default function TwitterPost() {
  const { volume, setVolume, currentLyric, currentLyricIndex, isPlaying, pressedButton, togglePlay, skipForward, skipBackward } = useAudioPlayer()

  // Get 2 lines before and 2 lines after current lyric
  const visibleLyrics = lyricsData.slice(
    Math.max(0, currentLyricIndex - 2),
    Math.min(lyricsData.length, currentLyricIndex + 3)
  )

  return (
    <div className="bg-white relative size-full select-none" data-name="Twitter post - 1">
      {/* Back button */}
      <a
        href="/"
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-[#f1eae0] rounded-full text-[#5e5e5e] font-['Plus_Jakarta_Sans',sans-serif] font-medium text-sm hover:bg-[#e5ddd2] transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </a>
      <div className="max-md:scale-75 max-sm:scale-50">
      <Frame
        volume={volume}
        setVolume={setVolume}
        currentLyric={currentLyric}
        isPlaying={isPlaying}
        pressedButton={pressedButton}
        togglePlay={togglePlay}
        skipForward={skipForward}
        skipBackward={skipBackward}
       
      />
      </div>
      {/* Spotify-style lyrics display beside the device */}
      <div className="absolute mx-auto left-1/2 -translate-x-1/2 top-96 w-[350px] max-md:scale-75">
        <div className="flex flex-col gap-1">
          {visibleLyrics.map((lyric, i) => {
            const actualIndex = Math.max(0, currentLyricIndex - 2) + i
            const isCurrent = actualIndex === currentLyricIndex
            const distance = Math.abs(actualIndex - currentLyricIndex)
            const opacity = isCurrent ? 1 : Math.max(0.2, 0.6 - distance * 0.2)
            const scale = isCurrent ? 1 : 1
            const translateY = (actualIndex - currentLyricIndex) * 8

            return (
              <div
                key={actualIndex}
                className="transition-all duration-600 linear"
                style={{
                  opacity,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                }}
              >
                <p
                  className={`font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed transition-all duration-200 ${
                    isCurrent
                      ? 'font-medium text-[#ffffff] text-[20px]'
                      : 'font-medium text-[#ffffff]/70 text-[20px]'
                  }`}
                >
                  {lyric.text || '\u00A0'}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
