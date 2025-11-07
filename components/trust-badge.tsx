import { Star } from "lucide-react"

interface TrustBadgeProps {
  score: number
}

export function TrustBadge({ score }: TrustBadgeProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-20 h-20 bg-white rounded-full shadow-lg border-4 border-yellow-400 flex items-center justify-center">
        <div className="text-center">
          <Star className="w-6 h-6 text-yellow-500 mx-auto fill-yellow-500 mb-1" />
          <span className="text-xl font-bold text-yellow-600">{score}</span>
        </div>
      </div>
      <p className="text-sm font-semibold text-gray-700 mt-3">Trust Score</p>
    </div>
  )
}
