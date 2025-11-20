"use client";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

type Videos = {
  key: string;
  site: "YouTube";
  type: "Trailer";
};

export default function TrailerPlayer({ videos }: { videos: Videos[] | null }) {
  const [trailer, setTrailer] = useState<string | null>(null);
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);

  const handlePlayTrailer = () => {
    setTrailer(videos?.[0].key ?? null);
    setIsMiniPlayer(false);
  };

  // Cambia entre el mini reproductor y el modal
  const handleTogglePlayer = () => {
    setIsMiniPlayer(prev => !prev);
  };

  const handleClose = () => {
    setTrailer(null);
    setIsMiniPlayer(true); // Abre el mini reproductor al cerrar el modal
  };

  useEffect(() => {
    if(!isMiniPlayer && trailer) {
        const onScroll = () => setIsMiniPlayer(true);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }
  }, [isMiniPlayer, trailer]);

  return (
    <section>
      <button
        onClick={handlePlayTrailer}
        className="flex flex-end px-6 py-3 bg-yellow-dark hover:bg-yellow-dark/80 rounded-lg font-semibold transition-colors text-dark ml-auto"
      >
        Ver trailer
      </button>

      {trailer && (
        <div
          className={`
            fixed z-50
            ${isMiniPlayer
              ? "bottom-4 right-4 w-[320px] h-[180px] shadow-2xl transition-all"
              : "inset-0 flex justify-center items-center bg-dark/80 transition-all"}
            rounded-lg overflow-hidden
          `}
          style={{ transition: "all 1s cubic-bezier(.4,0,.2,1)" }}
          // Al hacer click en fondo oscuro, pasa al mini reproductor
          onClick={!isMiniPlayer ? handleTogglePlayer : undefined}
          onScroll={!isMiniPlayer ? handleTogglePlayer : undefined}
        >
          <div
            className={`${isMiniPlayer ? "relative" : "bg-dark p-2 max-w-3xl w-full h-8/10"} rounded-lg`}
            style={isMiniPlayer ? { pointerEvents: "auto" } : { pointerEvents: "none" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              className={`absolute ${isMiniPlayer ? "top-1 right-1 size-6" : "top-2 right-2 size-7"} bg-red-500 rounded hover:bg-red-600 transition-colors z-10 text-dark font-bold`}
              onClick={handleClose}
            >
              ✕
            </button>
            {/* Reproductor */}
            <ReactPlayer
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
              controls
              playing
              width="100%"
              height="100%"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}
