'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Github, ExternalLink, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/lib/SupabaseClient';

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, isOpen, onOpenChange }: ProjectModalProps) {
    const [imageScale, setImageScale] = useState(1);
    const [isImageFullscreen, setIsImageFullscreen] = useState(false);

    const handleZoomIn = () => {
        setImageScale(prev => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = () => {
        setImageScale(prev => Math.max(prev - 0.25, 0.5));
    };

    const handleResetZoom = () => {
        setImageScale(1);
    };

    const toggleFullscreen = () => {
        setIsImageFullscreen(!isImageFullscreen);
        setImageScale(1); // Reset zoom when toggling fullscreen
    };

    if (!project) return null;

    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50' />

                {isImageFullscreen ? (
                    // Modo pantalla completa para la imagen
                    <div className='fixed inset-0 z-[60] bg-black flex items-center justify-center'>
                        <img
                            src={project.image_detalle || project.image || '/placeholder.svg'}
                            alt={project.title}
                            className='max-h-screen max-w-screen p-4 object-contain'
                            style={{ transform: `scale(${imageScale})` }}
                            onError={e => {
                                e.currentTarget.src = '/placeholder.svg';
                            }}
                        />

                        <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-black/40 rounded-full p-2'>
                            <button onClick={handleZoomOut} className='p-2 bg-white/10 rounded-full hover:bg-white/20'>
                                <ZoomOut size={20} className='text-white' />
                            </button>
                            <button onClick={handleResetZoom} className='p-2 bg-white/10 rounded-full hover:bg-white/20'>
                                <span className='text-white font-medium'>{Math.round(imageScale * 100)}%</span>
                            </button>
                            <button onClick={handleZoomIn} className='p-2 bg-white/10 rounded-full hover:bg-white/20'>
                                <ZoomIn size={20} className='text-white' />
                            </button>
                        </div>

                        <button onClick={toggleFullscreen} className='absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20'>
                            <X size={24} className='text-white' />
                        </button>
                    </div>
                ) : (
                    // Modal normal
                    <Dialog.Content className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[95%] max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl z-50'>
                        <Dialog.Title className='sr-only'>Detalle del Proyecto</Dialog.Title>

                        <div className='flex flex-col md:flex-row max-h-[90vh]'>
                            {/* Sección de imagen */}
                            <div className='md:w-3/5 bg-gray-50 relative h-[40vh] md:h-[90vh] overflow-hidden'>
                                <div className='absolute inset-0 flex items-center justify-center bg-[#f8f9fa]'>
                                    <img
                                        src={project.image_detalle || project.image || '/placeholder.svg'}
                                        alt={project.title || 'Proyecto'}
                                        className='w-full h-full object-contain transition-transform duration-200'
                                        style={{ transform: `scale(${imageScale})` }}
                                        onError={e => {
                                            e.currentTarget.src = '/placeholder.svg';
                                        }}
                                    />
                                </div>

                                {/* Controles de zoom para la imagen */}
                                <div className='absolute bottom-4 right-4 flex space-x-2'>
                                    <button
                                        onClick={handleZoomOut}
                                        className='p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors'
                                        disabled={imageScale <= 0.5}>
                                        <ZoomOut size={18} />
                                    </button>
                                    <button
                                        onClick={handleResetZoom}
                                        className='p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors'>
                                        <span className='text-xs font-medium'>{Math.round(imageScale * 100)}%</span>
                                    </button>
                                    <button
                                        onClick={handleZoomIn}
                                        className='p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors'
                                        disabled={imageScale >= 3}>
                                        <ZoomIn size={18} />
                                    </button>
                                    <button
                                        onClick={toggleFullscreen}
                                        className='p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors'>
                                        <Maximize2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Detalles del proyecto */}
                            <div className='md:w-2/5 p-6 md:p-8 overflow-y-auto max-h-[50vh] md:max-h-[90vh] bg-white'>
                                <h2 className='text-2xl md:text-3xl font-bold mb-3'>{project.title}</h2>
                                <p className='text-gray-600 mb-8 leading-relaxed'>{project.description}</p>

                                <div className='mb-8'>
                                    <h3 className='text-lg font-semibold mb-3'>Tecnologías</h3>
                                    <div className='flex flex-wrap gap-2'>
                                        {(project.technologies || []).map((tech, index) => (
                                            <Badge key={index} className='bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm'>
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className='flex flex-col sm:flex-row gap-4 mt-auto pt-4 sticky bottom-0 bg-white pb-2'>
                                    {project.github_url && (
                                        <Button
                                            variant='outline'
                                            className='flex items-center justify-center flex-1'
                                            onClick={e => {
                                                e.stopPropagation();
                                                window.open(project.github_url, '_blank');
                                            }}>
                                            <Github className='mr-2 h-4 w-4' />
                                            Ver Código
                                        </Button>
                                    )}

                                    {project.demo_url && (
                                        <Button
                                            className='bg-gray-900 hover:bg-gray-800 flex items-center justify-center flex-1'
                                            onClick={e => {
                                                e.stopPropagation();
                                                window.open(project.demo_url, '_blank');
                                            }}>
                                            <ExternalLink className='mr-2 h-4 w-4' />
                                            Ver Demo
                                        </Button>
                                    )}
                                    {project.github_url === '' && (
                                        <div className='flex justify-center'>
                                            <Button variant='outline' size='sm' className='text-xs'>
                                                Por motivos de confidencialidad
                                                <br /> no se puede mostrar código
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Dialog.Close className='absolute top-4 right-4 p-2 rounded-full bg-white shadow-md text-gray-700 hover:text-gray-900 z-50'>
                            <X className='h-5 w-5' />
                            <span className='sr-only'>Cerrar</span>
                        </Dialog.Close>
                    </Dialog.Content>
                )}
            </Dialog.Portal>
        </Dialog.Root>
    );
}
