export function getWhatsappHref(message = 'Hola, quisiera información sobre los cachorros Boston Terrier disponibles.') {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_CACHORROSRAZAPURA?.replace(/\D/g, '') || '50672006675'
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
