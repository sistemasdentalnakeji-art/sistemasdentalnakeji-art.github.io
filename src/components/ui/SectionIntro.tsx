import { Icon, type IconName } from '@/components/ui/Icon'

interface SectionIntroProps {
  icon: IconName
  id: string
  title: string
  text: string
}

/** Encabezado de sección: ícono en recuadro, título (h2) y texto introductorio. */
export function SectionIntro({ icon, id, title, text }: SectionIntroProps) {
  return (
    <>
      <span className="icon-badge">
        <Icon name={icon} size={24} />
      </span>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      <p className="section-text">{text}</p>
    </>
  )
}
