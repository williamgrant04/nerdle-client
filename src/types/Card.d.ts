// Most of ths information here is not useful, but for the sake of completeness, I've added it

interface Part {
  component: string,
  id: string,
  name: string,
  object: string,
  type_line: string,
  uri: string
}

interface ImageURIs {
  art_crop: string,
  border_crop: string,
  large: string,
  normal: string,
  png: string,
  small: string
}

interface Legalities {
  alchemy: string,
  brawl: string,
  commander: string,
  duel: string,
  explorer: string,
  future: string,
  gladiator: string,
  historic: string,
  legacy: string,
  modern: string,
  oathbreaker: string,
  oldschool: string,
  pauper: string,
  paupercommander: string,
  penny: string,
  pioneer: string,
  predh: string,
  premodern: string,
  standard: string,
  standardbrawl: string,
  timeless: string,
  vintage: string
}

interface Prices {
  eur: string,
  eur_foil: string,
  tix: string,
  usd: string,
  usd_etched: string,
  usd_foil: string
}

interface PurchaseURIs {
  cardhoarder: string,
  cardmarket: string,
  tcgplayer: string
}

interface RelatedURIs {
  edhrec: string,
  gatherer: string,
  tcgplayer_infinite_articles: string,
  tcgplayer_infinite_decks: string
}

interface Card {
  all_parts: Part[],
  artist: string,
  artist_ids: string[],
  booster: boolean,
  border_color: string,
  card_back_id: string,
  cardmarket_id: number,
  cmc: number,
  collector_number: string,
  color_identity: string[],
  colors: string[],
  digital: boolean,
  edhrec_rank: number,
  finishes: string[],
  foil: boolean,
  frame: string,
  full_art: boolean,
  game_changer: boolean,
  games: string[],
  highres_image: boolean,
  id: string,
  illustration_id: string,
  image_status: string,
  image_uris: ImageURIs,
  keywords: any[], // Setting this as any because I don't know what it is
  lang: string,
  layout: string,
  legalities: Legalities,
  mana_cost: string,
  mtgo_foil_id: number,
  mtgo_id: number,
  multiverse_ids: number[],
  name: string,
  nonfoil: boolean,
  object: string,
  oracle_id: string,
  oracle_text: string,
  oversized: boolean,
  penny_rank: number,
  power: string,
  prices: Prices,
  prints_search_uri: string,
  promo: boolean,
  purchase_uris: PurchaseURIs,
  rarity: string,
  related_uris: RelatedURIs,
  released_at: string,
  reprint: boolean,
  reserved: boolean,
  rulings_uri: string,
  scryfall_set_uri: string,
  scryfall_uri: string,
  set: string,
  set_id: string,
  set_name: string,
  set_search_uri: string,
  set_type: string,
  set_uri: string,
  story_spotlight: boolean,
  tcgplayer_id: number,
  textless: boolean,
  toughness: string,
  type_line: string,
  uri: string,
  variation: boolean,

  set_image?: string // This is not in the Scryfall API
}
