interface ImageURIs {
  art_crop: string,
  border_crop: string,
  large: string,
  normal: string,
  png: string,
  small: string
}

interface Card {
  cmc: number,
  colors: string[],
  id: string,
  image_uris: ImageURIs,
  name: string,
  rarity: string,
  released_at: string,
  set_name: string,
  type_line: string,
  set_image?: string // This is not in the Scryfall API
}
