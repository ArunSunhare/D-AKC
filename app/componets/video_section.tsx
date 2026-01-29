"use client";

import { useState } from "react";
import { Play, Pause, Volume2, Maximize } from "lucide-react";

const videosData = [
  {
    id: 1,
    title: "Hospital Tour",
    description: "Take a virtual tour of our state-of-the-art facilities",
    thumbnail: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Sample video URL
    duration: "3:45"
  },
  {
    id: 2,
    title: "Patient Testimonials",
    description: "Hear from our patients about their experiences",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "5:20"
  },
  {
    id: 3,
    title: "Advanced Technology",
    description: "Learn about our cutting-edge medical equipment",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "4:15"
  },
  {
    id: 4,
    title: "Doctor Introduction",
    description: "Meet our expert medical team",
    thumbnail: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "6:30"
  }
];

export function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState(videosData[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoSelect = (video: typeof videosData[0]) => {
    setSelectedVideo(video);
    setIsPlaying(false);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Video Gallery
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Watch our videos to learn more about our hospital, facilities, and patient care
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              
              {/* Video Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-bold mb-2">{selectedVideo.title}</h3>
                <p className="text-gray-200 text-sm">{selectedVideo.description}</p>
              </div>
            </div>
          </div>

          {/* Video Playlist */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">More Videos</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {videosData.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    selectedVideo.id === video.id
                      ? "bg-orange-100 border-2 border-orange-500"
                      : "bg-white hover:bg-gray-50 border-2 border-transparent"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">{video.title}</h4>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
            View All Videos
          </button>
        </div>
      </div>
    </section>
  );
}
