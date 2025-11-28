"use client";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import type { Video } from "@/types/tmdb";

interface TrailerPlayerProps {
  videos: Video[];
}

export default function TrailerPlayer({ videos }: TrailerPlayerProps) {
  const [trailer, setTrailer] = useState<string | null>(null);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);

  const handlePlayTrailer = () => {
    if (videos && videos.length > 0) {
      // Filtra solo los trailers y los ordena por fecha de publicación más reciente
      const trailers = videos
        .filter((video) => video.type === "Trailer")
        .sort((a, b) => {
          const dateA = new Date(a.published_at).getTime();
          const dateB = new Date(b.published_at).getTime();
          return dateB - dateA; // Orden descendente (más reciente primero)
        });

      if (trailers.length > 0) {
        setTrailer(trailers[0].key);
        setIsMiniPlayer(false);
      }
    }
  };

  const handleClose = () => {
    setTrailer(null);
    setIsMiniPlayer(false);
  };

  // Manejo del scroll para activar el mini reproductor
  useEffect(() => {
    if (!isMiniPlayer && trailer) {
      const onScroll = () => setIsMiniPlayer(true);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [isMiniPlayer, trailer]);

  // Manejo de la tecla Esc para cerrar el modal
  useEffect(() => {
    if (trailer) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [trailer]);

  return (
    <section>
      {videos && videos.length > 0 && (
        <button
          onClick={handlePlayTrailer}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-dark hover:bg-yellow-dark/80 rounded-lg font-semibold transition-colors text-dark ml-auto"
          aria-label="Reproducir tráiler"
        >
          <span className="text-xl">▷</span>Ver trailer
        </button>
      )}

      {trailer && (
        <>
          {/* Fondo oscuro con transición de opacidad para el modal */}
          <div
            className={`fixed inset-0 z-modal bg-dark/80 transition-opacity duration-medium ${
              isMiniPlayer ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            onClick={() => setIsMiniPlayer(true)}
            aria-hidden="true"
          />

          {/* Contenedor del reproductor con transición */}
          <div
            className="fixed top-0 left-0 z-modal rounded-lg overflow-hidden shadow-2xl transition-all duration-medium"
            style={
              isMiniPlayer
                ? {
                    width: "20rem",
                    transform:
                      "translate(calc(100vw - 20rem - 1rem), calc(100vh - 20rem * 9 / 16 - 1rem))",
                  }
                : {
                    width: "min(56rem, calc(100vw - 2rem))",
                    transform:
                      "translate(calc(50vw - min(56rem, calc(100vw - 2rem)) / 2), calc(50vh - min(56rem, calc(100vw - 2rem)) * 9 / 16 / 2))",
                  }
            }
            role="dialog"
            aria-modal="true"
            aria-label="Reproductor de tráiler"
          >
            <div
              className="relative bg-dark p-2 rounded-lg aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar */}
              <button
                className="absolute top-1 right-1 size-6 bg-red-500 rounded hover:bg-red-600 transition-colors z-modal text-dark font-bold"
                onClick={handleClose}
                aria-label="Cerrar reproductor"
              >
                ✕
              </button>
              {/* Reproductor */}
              <ReactPlayer
                src={`https://www.youtube.com/watch?v=${trailer}`}
                controls
                playing
                width="100%"
                height="100%"
                className="rounded-lg"
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
