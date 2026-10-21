// Idioma de la página actual. App lo fija desde la ruta (<LangContext value={route.lang}>) y los componentes
// lo leen con useLang() para elegir sus enlaces y datos (Record<Lang, …>) sin recibirlo por props.

import { createContext, use } from 'react'
import type { Lang } from '@/config/routes'

export const LangContext = createContext<Lang>('en')

export const useLang = () => use(LangContext)
