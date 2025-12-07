export default function GlobalSpinner() {
  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center bg-dark/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner animado */}
        <div className="relative size-16">
          <div className="animate-spin rounded-full size-full border-4 border-yellow-dark border-t-transparent" />
          <div className="absolute inset-0 animate-ping rounded-full size-full border-2 border-yellow-light opacity-20" />
        </div>

        {/* Texto de carga */}
        <p className="text-yellow-light font-semibold text-lg animate-pulse">
          Cargando...
        </p>
      </div>
    </div>
  );
}
