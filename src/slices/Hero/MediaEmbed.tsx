"use client";

import * as React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaEmbedProps {
  media: {
    html: string | null;
    thumbnail_url?: string | null;
    embed_url?: string | null;
    title?: string | null;
  } | null;
}

function getYouTubeThumbnail(url: string | null): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const id = (match && match[2].length === 11) ? match[2] : null;
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}

export function MediaEmbed({ media }: MediaEmbedProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  if (!media || !media.html) return null;

  const thumbnailUrl =
    media.thumbnail_url ||
    (media.embed_url ? getYouTubeThumbnail(media.embed_url) : null);

  // Append autoplay parameters when playing
  let embedHtml = media.html;
  if (isPlaying && embedHtml.includes('src="')) {
    embedHtml = embedHtml.replace(/src="([^"]+)"/, (match, src) => {
      const separator = src.includes("?") ? "&" : "?";
      return `src="${src}${separator}autoplay=1&mute=1"`;
    });
  }

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden shadow-2xl shadow-brand/30 border border-black/5 bg-[#F9FAFB] aspect-video w-full",
        !isPlaying && "cursor-pointer"
      )}
      onClick={() => {
        if (!isPlaying) {
          setIsPlaying(true);
        }
      }}
    >
      {isPlaying ? (
        <div
          className="absolute inset-0 size-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:size-full [&_iframe]:border-0"
          dangerouslySetInnerHTML={{ __html: embedHtml }}
        />
      ) : (
        <>
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={media.title || "Video thumbnail"}
              className="absolute inset-0 w-full h-full object-cover select-none"
              loading="lazy"
            />
          ) : (
            <div
              className="absolute inset-0 size-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:size-full [&_iframe]:border-0 pointer-events-none"
              dangerouslySetInnerHTML={{ __html: embedHtml }}
            />
          )}

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-black/20 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg text-brand hover:scale-110 transition-transform duration-200">
              <Play className="h-6 w-6 fill-current ml-1" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
