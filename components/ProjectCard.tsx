import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { type Project } from '@/lib/SupabaseClient';

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card className='group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md'>
            <div className='relative overflow-hidden rounded-t-lg'>
                <img
                    src={project.image_url || '/placeholder.svg'}
                    alt={project.title}
                    className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300' />
            </div>
            <CardContent className='p-6'>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>{project.title}</h3>
                <p className='text-gray-600 mb-4 text-sm leading-relaxed'>{project.description}</p>
                <div className='flex flex-wrap gap-2 mb-4'>
                    {project.technologies &&
                        project.technologies.map(tech => (
                            <Badge key={tech} variant='secondary' className='text-xs bg-gray-100 text-gray-700'>
                                {tech}
                            </Badge>
                        ))}
                </div>
                <div className='flex space-x-3'>
                    <Button
                        variant='outline'
                        size='sm'
                        className='flex-1 text-xs bg-transparent'
                        onClick={() => window.open(project.github_url || '#', '_blank')}>
                        <Github className='w-3 h-3 mr-1' />
                        Código
                    </Button>
                    <Button
                        size='sm'
                        className='flex-1 bg-gray-900 hover:bg-gray-800 text-xs'
                        onClick={() => window.open(project.demo_url || '#', '_blank')}>
                        <ExternalLink className='w-3 h-3 mr-1' />
                        Demo
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
