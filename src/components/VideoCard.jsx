import React, { useRef } from "react";

export default function VideoCard({ video }) {
  const videoId = video.id.videoId || video.id;
  const downloadBase = "https://nashidalibrary.onrender.com/api/youtube/download";
  const snippet = video.snippet;
  const stats = video.statistics || {}; // likes, views, commentCount
  const iframeRef = useRef();

  // Request fullscreen when clicked
  const handleFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen().catch((err) => console.log(err));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-200 overflow-hidden">
      
      {/* Video container */}
      <div
        className="relative w-full h-48 cursor-pointer"
        onClick={handleFullscreen}
      >
        <iframe
          ref={iframeRef}
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={snippet.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video info */}
      <div className="p-3">
        <h2 className="text-sm md:text-base font-semibold font-kufi text-islamicGreen line-clamp-2">
          {snippet.title}
        </h2>
        <p className="text-xs text-gray-500 font-arabic mt-1 line-clamp-1">
          {snippet.channelTitle}
        </p>

        {/* Additional info */}
        <div className="mt-2 text-xs text-gray-600 flex flex-col gap-1">
          {snippet.publishedAt && (
            <span>📅 Uploaded: {new Date(snippet.publishedAt).toLocaleDateString()}</span>
          )}
          {stats.viewCount && <span>👁 Views: {stats.viewCount}</span>}
          {stats.likeCount && <span>👍 Likes: {stats.likeCount}</span>}
          {stats.commentCount && <span>💬 Comments: {stats.commentCount}</span>}
        </div>

        {/* Download buttons */}
        <div className="mt-3 flex gap-2">
          <a
            href={`${downloadBase}/${videoId}?format=mp3`}
            className="flex-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded hover:bg-gray-200 text-center font-semibold transition-colors"
          >
            ⬇ MP3
          </a>
          <a
            href={`${downloadBase}/${videoId}?format=mp4`}
            className="flex-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded hover:bg-gray-200 text-center font-semibold transition-colors"
          >
            ⬇ MP4
          </a>
        </div>
      </div>
    </div>
  );
}
