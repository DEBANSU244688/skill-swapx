interface VideoPreviewProps {
  name: string
}

export function VideoPreview({ name }: VideoPreviewProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden flex-1 flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <div className="w-12 h-12 bg-teal-500 rounded-full mx-auto mb-2" />
        <p className="text-white text-sm font-medium">{name}</p>
        <p className="text-gray-400 text-xs mt-1">Video preview</p>
      </div>
    </div>
  )
}
