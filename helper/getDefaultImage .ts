export const getDefaultImage = () => {
  const IMAGES = [
    '/images/pebble/blue-pebble.png',
    '/images/pebble/blue-pebble2.png',
    '/images/pebble/blue-pebble3.png',
    '/images/pebble/mint-pebble.png',
    '/images/pebble/mint-pebble2.png',
    '/images/pebble/purple-pebble.png',
    '/images/pebble/purple-pebble2.png',
    '/images/pebble/purple-pebble3.png',
    '/images/pebble/red-pebble.png',
    '/images/pebble/red-pebble2.png',
  ]

  const randomIndex = Math.floor(Math.random() * IMAGES.length)
  return IMAGES[randomIndex]
}
