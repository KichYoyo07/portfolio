'use client';

// Añade estas importaciones al inicio del archivo
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ArrowDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Smartphone, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectModal } from '@/components/ProjectModal';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';
import { cn } from '@/lib/utils';
import { useProjects } from '@/hooks/useProjectsHook'; // Importamos nuestro hook
import { Project } from '@/lib/SupabaseClient'; // Importamos el tipo Project

// Añade este schema de validación después de las importaciones
const formSchema = z.object({
    nombre: z.string().min(2, 'El nombre es requerido'),
    email: z.string().email('Email inválido'),
    mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

// Añade este tipo
type FormData = z.infer<typeof formSchema>;

// Añade este componente
const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => <DialogPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export default function Portfolio() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // En tu componente Portfolio, añade este código antes del return
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        // Aquí puedes manejar el envío del formulario
        // console.log(data);
        // Resetear el formulario y cerrar el modal
        reset();
        setIsOpen(false);
    };

    // Usamos el hook para obtener los proyectos
    const { projects: supabaseProjects, loading, error } = useProjects();

    // Estado para el modal de detalle de proyecto
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    // Función para abrir el modal con los detalles del proyecto
    const openProjectModal = (project: Project) => {
        setSelectedProject(project);
        setIsProjectModalOpen(true);
    };

    useEffect(() => {
        setIsVisible(true);

        const handleScroll = () => {
            const sections = ['home', 'about', 'projects', 'skills', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const projects = [
        {
            id: 0,
            title: 'nou capital',
            description:
                'Plataforma web dedicada a la evaluación de propiedades en venta en el sector español, dando índices de profit, rentabilidad, vialidad.',
            image_url: '/noucapital.png',
            image_detalle: '/noucapital2.png',
            technologies: ['React', 'Firebase', 'Firestore', 'Tailwind', 'Typescript', 'Fragua', 'Axios', 'Vite', 'AWS'],
            github_url: '',
            demo_url: '',
        },
        {
            id: 1,
            title: 'Thunterspa',
            description: 'Aplicación web que permite la gestión, membresías para el manejo de criptomonedas.',
            image_url: '/thunter.png',
            image_detalle: '/thunter2.png',
            technologies: ['React', 'Tailwind', 'Firebase', 'Telegram Api', 'Solana'],
            github_url: '',
            demo_url: '',
        },
        {
            id: 2,
            title: 'Solve Express',
            description:
                'Aplicación móvil que pudiera brindar a los trabajadores adelantos de nómina, recibir notificaciones sobre ofertas, mostrar el historial de los movimientos realizados, información de beneficios y descuentos así como una pantalla de información de la cuenta.',
            image_url: '/solve.jpg',
            image_detalle: '/solve2.jpg',
            technologies: ['React Native', 'Zustand', 'Metamap', 'Style Components', 'Expo', 'Axios', 'AsyncStorage', 'YUP'],
            github_url: '',
            demo_url: '',
        },
        {
            id: 3,
            title: 'Generador de Contraseñas',
            description: 'Aplicación web diseñada para generar contraseñas seguras y personalizadas, con opciones de longitud y complejidad.',
            image_url: '/generador.png',
            image_detalle: '/generador2.png',
            technologies: ['Next', 'Tailwind', 'Sqlite', 'TypeScript', 'Prisma', 'Shadcn'],
            github_url: 'https://github.com/KichYoyo07/password-generator',
            demo_url: 'https://password-generator-black-eta.vercel.app/',
        },
        {
            id: 4,
            title: 'Villas Xaltipa II',
            description: 'Página web enfocada a la promoción de inmuebles de lujo en Villas Xaltipa II.',
            image_url: '/villasXaltipa.png',
            image_detalle: '/villasXaltipaDetalle.jpg',
            technologies: ['HTML5', 'CSS3', 'JavaScript'],
            github_url: '#',
            demo_url: 'https://villasxaltipaii-casaskrearesidencial.com.mx/',
        },
        {
            id: 5,
            title: 'VILLAS XALTIPA II',
            description: 'Página web enfocada a la promoción de inmuebles de lujo en Villas Xaltipa II.',
            image_url: '/villas.jpg',
            image_detalle: '/villas2.png',
            technologies: ['Next', 'tailwind', 'Formik', 'SSR', 'TypeScript'],
            github_url: '#',
            demo_url: 'https://www.casasnuevascuatitlan.com/',
        },
        {
            id: 6,
            title: 'Login Prueba Técnica',
            description: 'Login con opción de registro de nuevos usuarios, añadiendo filtro de datos',
            image_url: '/login.png',
            image_detalle: '/login2.png',
            technologies: ['React', 'HTML5', 'CSS3'],
            github_url: 'https://github.com/KichYoyo07/pruebaAzteca',
            demo_url: 'https://prueba-azteca.vercel.app/login',
        },
    ];

    const skills = [
        { name: 'Frontend', icon: Code, items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
        { name: 'Backend', icon: Code, items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
        { name: 'Design', icon: Palette, items: ['Figma', 'Adobe XD', 'UI/UX', 'Responsive Design'] },
        { name: 'Mobile', icon: Smartphone, items: ['React Native', 'Expo', 'iOS', 'Android'] },
    ];
    // console.log(projects);

    return (
        <div className='min-h-screen bg-white'>
            {/* Navigation */}
            <nav className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100'>
                <div className='max-w-6xl mx-auto px-6 py-4'>
                    <div className='flex justify-between items-center'>
                        <div className='font-bold text-xl text-gray-900'>Kich</div>
                        <div className='hidden md:flex space-x-8'>
                            {['home', 'about', 'projects', 'skills', 'contact'].map(section => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className={`capitalize transition-colors duration-300 hover:text-gray-900 ${
                                        activeSection === section ? 'text-gray-900 font-medium' : 'text-gray-600'
                                    }`}>
                                    {section === 'home'
                                        ? 'Inicio'
                                        : section === 'about'
                                        ? 'Sobre mí'
                                        : section === 'projects'
                                        ? 'Proyectos'
                                        : section === 'skills'
                                        ? 'Habilidades'
                                        : 'Contacto'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id='home' className='min-h-screen flex items-center justify-center px-6'>
                <div className='max-w-4xl mx-auto text-center'>
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h1 className='text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight'>
                            Hola, soy <span className='bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'>Inancy Karina</span>
                        </h1>
                        <p className='text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto'>
                            Desarrollador Full Stack apasionado por crear experiencias digitales excepcionales
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
                            <Button
                                size='lg'
                                onClick={() => scrollToSection('projects')}
                                className='bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105'>
                                Ver Proyectos
                            </Button>
                            <Button
                                variant='outline'
                                size='lg'
                                onClick={() => scrollToSection('contact')}
                                className='border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105'>
                                Contactar
                            </Button>
                        </div>
                        <div className='flex justify-center space-x-6'>
                            <a
                                href='https://github.com/KichYoyo07'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-gray-600 hover:text-gray-900 transition-colors duration-300 hover:scale-110 transform'>
                                <Github className='w-6 h-6' />
                            </a>
                            <a
                                href='https://www.linkedin.com/in/kich007/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-gray-600 hover:text-gray-900 transition-colors duration-300 hover:scale-110 transform'>
                                <Linkedin className='w-6 h-6' />
                            </a>
                            <a
                                href='mailto:karina03ce@gmail.com'
                                className='text-gray-600 hover:text-gray-900 transition-colors duration-300 hover:scale-110 transform'>
                                <Mail className='w-6 h-6' />
                            </a>
                        </div>
                    </div>
                    <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
                        <ArrowDown className='w-6 h-6 text-gray-400' />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id='about' className='py-20 px-6 bg-gray-50'>
                <div className='max-w-4xl mx-auto'>
                    <h2 className='text-4xl font-bold text-gray-900 mb-12 text-center'>Sobre mí</h2>
                    <div className='grid md:grid-cols-2 gap-12 items-center'>
                        <div className='space-y-6'>
                            <p className='text-lg text-gray-600 leading-relaxed'>
                                Soy un desarrollador full stack con más de 3 años de experiencia creando aplicaciones web y móviles. Me especializo en
                                tecnologías modernas como React, Next.js y Node.js.
                            </p>
                            <p className='text-lg text-gray-600 leading-relaxed'>
                                Mi pasión es transformar ideas complejas en soluciones digitales elegantes y funcionales. Siempre busco aprender
                                nuevas tecnologías y mejorar mis habilidades.
                            </p>
                            <div className='flex flex-wrap gap-3'>
                                {['JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Next.js', 'Node.js', 'MCP', 'Python', 'SQl', 'NoSql'].map(
                                    tech => (
                                        <Badge key={tech} variant='secondary' className='px-3 py-1 bg-white text-gray-700 border border-gray-200'>
                                            {tech}
                                        </Badge>
                                    )
                                )}
                            </div>
                        </div>
                        <div className='relative'>
                            <div className='w-80 h-80 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden'>
                                <img src='/17kich.jpeg?height=320&width=320' alt='Profile' className='w-full h-full object-cover' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section - Modificado */}
            <section id='projects' className='py-20 px-6'>
                <div className='max-w-6xl mx-auto'>
                    <h2 className='text-4xl font-bold text-gray-900 mb-12 text-center'>Proyectos Destacados</h2>

                    {loading ? (
                        <div className='text-center py-12'>
                            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent'></div>
                            <p className='mt-4 text-gray-600'>Cargando proyectos...</p>
                        </div>
                    ) : error ? (
                        <div className='text-center py-12'>
                            <p className='text-red-500'>Error al cargar los proyectos: {error.message}</p>
                        </div>
                    ) : (
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {projects && projects.length > 0
                                ? projects.map(project => (
                                      <Card
                                          key={project.id}
                                          className='group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md cursor-pointer flex flex-col'
                                          onClick={() => openProjectModal(project)}>
                                          <div className='relative overflow-hidden rounded-t-lg'>
                                              <img
                                                  src={project.image_url || '/placeholder.svg'}
                                                  alt={project.title}
                                                  className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                                              />
                                              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300' />
                                          </div>
                                          <CardContent className='p-6 flex flex-1 flex-col justify-between'>
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
                                              {project.demo_url !== '' ? (
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
                                              ) : (
                                                  <div className='flex justify-center'>
                                                      <Button variant='outline' size='sm' className='text-xs'>
                                                          Por motivos de confidencialidad
                                                          <br /> no se puede mostrar código
                                                      </Button>
                                                  </div>
                                              )}
                                          </CardContent>
                                      </Card>
                                  ))
                                : projects.map((project, index) => (
                                      <Card
                                          key={index}
                                          className='group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md cursor-pointer'
                                          onClick={() => {
                                              const fallbackProject = {
                                                  id: index,
                                                  title: project.title,
                                                  description: project.description,
                                                  image_url: project.image_url,
                                                  technologies: project.technologies,
                                                  github_url: project.github_url,
                                                  demo_url: project.demo_url,
                                              };
                                              openProjectModal(fallbackProject as any);
                                          }}>
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
                                                      project.technologies.map(technology => (
                                                          <Badge key={technology} variant='secondary' className='text-xs bg-gray-100 text-gray-700'>
                                                              {technology}
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
                                  ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Skills Section */}
            <section id='skills' className='py-20 px-6 bg-gray-50'>
                <div className='max-w-4xl mx-auto'>
                    <h2 className='text-4xl font-bold text-gray-900 mb-12 text-center'>Habilidades</h2>
                    <div className='grid md:grid-cols-2 gap-8'>
                        {skills.map((skill, index) => (
                            <Card key={index} className='p-6 hover:shadow-lg transition-shadow duration-300 border-0 shadow-md'>
                                <div className='flex items-center mb-4'>
                                    <skill.icon className='w-6 h-6 text-gray-700 mr-3' />
                                    <h3 className='text-xl font-semibold text-gray-900'>{skill.name}</h3>
                                </div>
                                <div className='grid grid-cols-2 gap-3'>
                                    {skill.items.map(item => (
                                        <div key={item} className='text-gray-600 text-sm py-1'>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id='contact' className='py-20 px-6'>
                <div className='max-w-2xl mx-auto text-center'>
                    <h2 className='text-4xl font-bold text-gray-900 mb-6'>¿Trabajamos juntos?</h2>
                    <p className='text-xl text-gray-600 mb-8'>Estoy siempre abierto a nuevas oportunidades y proyectos interesantes.</p>
                    {/* Modifica el botón "Enviar mensaje" en la sección de contacto por esto: */}
                    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                        <Dialog.Trigger asChild>
                            <Button
                                size='lg'
                                className='bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105'>
                                <Mail className='w-5 h-5 mr-2' />
                                Enviar mensaje
                            </Button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className='fixed inset-0 bg-black/40 backdrop-blur-sm' />
                            <Dialog.Content className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-md bg-white rounded-lg p-6 shadow-xl'>
                                <Dialog.Title className='text-2xl font-bold text-gray-900 mb-4'>Enviar Mensaje</Dialog.Title>
                                <Dialog.Description className='text-sm text-gray-500 mb-4'>
                                    Complete el formulario para enviarme un mensaje. Me pondré en contacto con usted lo antes posible.
                                </Dialog.Description>
                                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>Nombre</label>
                                        <input
                                            {...register('nombre')}
                                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900'
                                            type='text'
                                        />
                                        {errors.nombre && <span className='text-sm text-red-500'>{errors.nombre.message}</span>}
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                                        <input
                                            {...register('email')}
                                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900'
                                            type='email'
                                        />
                                        {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>Mensaje</label>
                                        <textarea
                                            {...register('mensaje')}
                                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 h-32 resize-none'
                                        />
                                        {errors.mensaje && <span className='text-sm text-red-500'>{errors.mensaje.message}</span>}
                                    </div>
                                    <div className='flex justify-end gap-3 mt-6'>
                                        <Button type='button' variant='outline' onClick={() => setIsOpen(false)}>
                                            Cancelar
                                        </Button>
                                        <Button type='submit' className='bg-gray-900 text-white'>
                                            Enviar
                                        </Button>
                                    </div>
                                </form>
                                <Dialog.Close className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'>
                                    <X className='w-4 h-4' />
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>
            </section>

            {/* Footer */}
            <footer className='py-8 px-6 border-t border-gray-100'>
                <div className='max-w-4xl mx-auto text-center'>
                    <p className='text-gray-600'>© 2024 Kich Portfolio. Diseñado y desarrollado con V0, cursor, MCP, IA</p>
                </div>
            </footer>

            {/* Modal de detalle de proyecto */}
            <ProjectModal project={selectedProject} isOpen={isProjectModalOpen} onOpenChange={setIsProjectModalOpen} />
        </div>
    );
}
