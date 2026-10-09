// ─────────────────────────────────────────────────────────────────────────────
// HEADER (barra superior de todas las páginas)
//
// Logo · menú principal con submenús · redes sociales · botón "Agendar visita".
// • Opciones del menú y submenús → src/config/navigation.ts (no edites este archivo para eso).
// • En pantallas < 1080 px el menú se convierte en un panel que abre el botón ☰.
// • Accesible con teclado: Enter/Espacio abre, flechas recorren, Escape cierra.
// • Estilos → src/styles/layout/header.css.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react'
import { flushSync } from 'react-dom'
import { MAIN_NAV, type NavMenu } from '@/config/navigation'
import { ariaCurrent, HOME, scheduleHref } from '@/config/routes'
import { cx } from '@/lib/cx'
import { Icon } from '@/components/ui/Icon'
import { Logo } from '@/components/layout/Logo'
import { SocialLinks } from '@/components/ui/SocialLinks'

const MENU_ID = 'menu-principal'
const DESKTOP_QUERY = '(min-width: 1080px)'

const buttonId = (id: string) => `nav-${id}-boton`
const panelId = (id: string) => `nav-${id}-submenu`

interface HeaderProps {
  currentPath: string
}

export function Header({ currentPath }: HeaderProps) {
  const isHome = currentPath === HOME.path
  const [menuOpen, setMenuOpen] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Sombra del header al desplazarse (también si la página carga ya desplazada).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    const frame = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Cerrar con Escape o al tocar fuera del header.
  useEffect(() => {
    if (!openId && !menuOpen) return

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (openId) {
        setOpenId(null)
        document.getElementById(buttonId(openId))?.focus()
      } else {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return
      setOpenId(null)
      setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [openId, menuOpen])

  // Menú móvil: bloquear el scroll del fondo y cerrarlo al pasar a escritorio.
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', onChange)
    return () => {
      document.body.style.overflow = previous
      desktop.removeEventListener('change', onChange)
    }
  }, [menuOpen])

  return (
    <header ref={headerRef} className={cx('site-header', scrolled && 'is-scrolled', menuOpen && 'menu-open')}>
      <div className="container site-header__bar">
        <Logo isHome={isHome} />

        <div id={MENU_ID} className={cx('site-menu', menuOpen && 'is-open')}>
          <nav className="site-nav" aria-label="Principal">
            <ul className="nav-list">
              {MAIN_NAV.map((item) =>
                item.kind === 'menu' ? (
                  <NavDropdown
                    key={item.id}
                    item={item}
                    currentPath={currentPath}
                    open={openId === item.id}
                    onToggle={() => setOpenId((id) => (id === item.id ? null : item.id))}
                    onOpen={() => setOpenId(item.id)}
                    onClose={() => setOpenId((id) => (id === item.id ? null : id))}
                  />
                ) : (
                  <li key={item.id} className="nav-item">
                    <a
                      className="nav-link"
                      href={item.href}
                      aria-current={ariaCurrent(item.href, currentPath)}
                    >
                      {item.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <SocialLinks className="site-menu__social" iconSize={22} />
        </div>

        <div className="site-header__actions">
          <a className="btn btn--primary btn--sm" href={scheduleHref(currentPath)} onClick={() => setMenuOpen(false)}>
            <span>
              Agendar<span className="hide-xs"> visita</span>
            </span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            onClick={() => {
              setOpenId(null)
              setMenuOpen((open) => !open)
            }}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
            <span className="visually-hidden">Menú</span>
          </button>
        </div>
      </div>
    </header>
  )
}

interface NavDropdownProps {
  item: NavMenu
  currentPath: string
  open: boolean
  onToggle: () => void
  onOpen: () => void
  onClose: () => void
}

function NavDropdown({ item, currentPath, open, onToggle, onOpen, onClose }: NavDropdownProps) {
  const { children } = item
  const isActive = children.some((child) => child.path === currentPath) || item.overview?.href === currentPath

  const links = (container: HTMLElement) =>
    Array.from(container.querySelectorAll<HTMLAnchorElement>(`#${panelId(item.id)} a`))

  // Teclado: flecha abajo abre el submenú; flechas, Inicio y Fin recorren sus enlaces.
  const onKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    const container = event.currentTarget
    const target = event.target as HTMLElement

    if (target.id === buttonId(item.id) && event.key === 'ArrowDown') {
      event.preventDefault()
      flushSync(onOpen)
      links(container)[0]?.focus()
      return
    }

    const items = links(container)
    const index = items.indexOf(target as HTMLAnchorElement)
    if (index === -1) return

    const next: Record<string, number> = {
      ArrowDown: (index + 1) % items.length,
      ArrowUp: (index - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1,
    }
    if (event.key in next) {
      event.preventDefault()
      items[next[event.key]]?.focus()
    }
  }

  // Cerrar cuando el foco del teclado sale del submenú.
  const onBlur = (event: FocusEvent<HTMLLIElement>) => {
    const nextFocus = event.relatedTarget as Node | null
    if (nextFocus && !event.currentTarget.contains(nextFocus)) onClose()
  }

  return (
    <li className={cx('nav-item has-dropdown', open && 'is-open')} onKeyDown={onKeyDown} onBlur={onBlur}>
      <button
        id={buttonId(item.id)}
        type="button"
        className={cx('nav-link nav-button', isActive && 'is-active')}
        aria-expanded={open}
        aria-controls={panelId(item.id)}
        onClick={onToggle}
      >
        {item.label}
        <Icon name="chevronDown" size={16} className="nav-chevron" />
      </button>

      <div id={panelId(item.id)} className={`dropdown dropdown--${item.id}`} hidden={!open}>
        <ul className="dropdown__list">
          {children.map((child) => (
            <li key={child.path}>
              <a
                className="dropdown__link"
                href={child.path}
                aria-current={ariaCurrent(child.path, currentPath)}
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
        {item.overview && (
          <a
            className="dropdown__overview"
            href={item.overview.href}
            aria-current={ariaCurrent(item.overview.href, currentPath)}
          >
            {item.overview.label}
            <Icon name="arrowRight" size={18} />
          </a>
        )}
      </div>
    </li>
  )
}
