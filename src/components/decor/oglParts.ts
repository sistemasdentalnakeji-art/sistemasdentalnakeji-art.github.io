// Solo las piezas de `ogl` que usa PlasmaBackground. Se importa de forma diferida (import('./oglParts')): así Vite separa
// en su propio archivo únicamente estas clases (un import('ogl') directo arrastraría la librería completa).
export { Mesh, Program, Renderer, Triangle } from 'ogl'
