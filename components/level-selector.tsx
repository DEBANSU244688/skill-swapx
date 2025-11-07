"use client"

interface LevelSelectorProps {
  level: "Beginner" | "Intermediate" | "Expert"
  onChange: (level: "Beginner" | "Intermediate" | "Expert") => void
}

export function LevelSelector({ level, onChange }: LevelSelectorProps) {
  const levels = ["Beginner", "Intermediate", "Expert"] as const

  return (
    <div className="flex gap-2">
      {levels.map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
            level === l ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
