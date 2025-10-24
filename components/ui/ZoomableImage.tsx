'use client';

import { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Minimize2, X } from 'lucide-react';

interface ZoomableImageProps {
    src: string;
    alt: string;
    fallbackSrc?: string;
}

export function ZoomableImage({ src, alt, fallbackSrc = '/placeholder.svg' }: ZoomableImageProps) {
    const [scale, setScale] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleZoomIn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(prev => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(prev => Math.max(prev - 0.25, 0.5));
    };

    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(1);
    };

    const handleToggleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFullscreen(prev => !prev);
        setScale(1); // Reset zoom when toggling fullscreen
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = fallbackSrc;
    };

    return (
        <div className={`relative ${isFullscreen ? 'fixed inset-0 z-[100] bg-black/90 flex items-center justify-center' : 'h-full w-full'}`}>
            <div className='relative h-full w-full overflow-hidden flex items-center justify-center'>
                <img
                    src={src}
                    alt={alt}
                    className='transition-transform duration-200 ease-out'
                    style={{
                        transform: `scale(${scale})`,
                        maxHeight: isFullscreen ? '90vh' : '100%',
                        maxWidth: isFullscreen ? '90vw' : '100%',
                        objectFit: 'contain',
                    }}
                    onError={handleImageError}
                />
            </div>

            {/* Controles de zoom */}
            <div className='absolute bottom-4 right-4 flex space-x-2'>
                <button
                    onClick={handleZoomOut}
                    className='p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors'
                    disabled={scale <= 0.5}>
                    <ZoomOut size={18} />
                </button>
                <button onClick={handleReset} className='p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors' disabled={scale === 1}>
                    <span className='text-xs font-medium'>100%</span>
                </button>
                <button onClick={handleZoomIn} className='p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors' disabled={scale >= 3}>
                    <ZoomIn size={18} />
                </button>
                <button onClick={handleToggleFullscreen} className='p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors'>
                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
            </div>

            {/* Botón para cerrar el modo pantalla completa */}
            {isFullscreen && (
                <button
                    onClick={handleToggleFullscreen}
                    className='absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors'>
                    <X size={24} />
                </button>
            )}
        </div>
    );
}
