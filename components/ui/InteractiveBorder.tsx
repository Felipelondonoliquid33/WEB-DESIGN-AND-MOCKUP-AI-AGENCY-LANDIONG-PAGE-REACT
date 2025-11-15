"use client";

import { useState, ReactNode } from "react";
import { Shuffle } from "lucide-react";

interface InteractiveBorderProps {
  children: ReactNode;
  onShuffle?: () => void;
  className?: string;
}

export default function InteractiveBorder({
  children,
  onShuffle,
  className = "",
}: InteractiveBorderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenido del componente */}
      {children}

      {/* Borde interactivo - Completo, siempre visible */}
      <div
        className={`absolute top-12 bottom-12 left-4 right-4 pointer-events-none transition-all duration-300 ease-out rounded-xl ${
          isHovered
            ? "border-2 border-blue-600"
            : "border border-blue-300"
        }`}
      />
      
      {/* Sombra solo en hover - Posicionada en la base */}
      {isHovered && (
        <div 
          className="absolute bottom-12 left-4 right-4 pointer-events-none"
          style={{
            height: '2px',
            boxShadow: '0 8px 16px rgba(0, 116, 217, 0.15)',
          }}
        />
      )}

      {/* Indicadores de esquina - Cuadrados más grandes */}
      {isHovered && (
        <>
          <div className="absolute top-12 left-4 w-3 h-3 bg-blue-500 rounded-sm -translate-x-1.5 -translate-y-1.5 transition-all duration-300 pointer-events-none" />
          <div className="absolute top-12 right-4 w-3 h-3 bg-blue-500 rounded-sm translate-x-1.5 -translate-y-1.5 transition-all duration-300 pointer-events-none" />
          <div className="absolute bottom-12 left-4 w-3 h-3 bg-blue-500 rounded-sm -translate-x-1.5 translate-y-1.5 transition-all duration-300 pointer-events-none" />
          <div className="absolute bottom-12 right-4 w-3 h-3 bg-blue-500 rounded-sm translate-x-1.5 translate-y-1.5 transition-all duration-300 pointer-events-none" />
        </>
      )}

      {/* Botón Shuffle - Siempre visible sobre la línea del borde inferior */}
      <div className="absolute bottom-12 left-8 flex items-center pointer-events-auto z-10" style={{ transform: 'translateY(50%)' }}>
        <button
          onClick={onShuffle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-600 shadow-sm hover:bg-blue-200 transition-colors duration-200 border border-blue-200"
          aria-label="Shuffle"
        >
          <Shuffle size={14} className="text-blue-600" />
          <span className="text-blue-600">Shuffle</span>
        </button>
      </div>
    </div>
  );
}

