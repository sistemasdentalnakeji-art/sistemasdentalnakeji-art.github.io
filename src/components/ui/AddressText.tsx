import { SITE } from '@/config/site'

const { address } = SITE

/** Dirección completa de la clínica en una línea. */
export function AddressText() {
  return (
    <>
      {address.street}, {address.neighborhood}, {address.postalCode} {address.city}, {address.region}
    </>
  )
}
