export const WHATSAPP_NUMBER = '50672006675'

export function getWhatsappHref(message = 'Hola, quisiera información sobre los cachorros Boston Terrier disponibles.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
