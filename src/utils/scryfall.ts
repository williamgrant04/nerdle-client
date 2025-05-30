import axios from "axios"

export const scryfall = {
  async autocomplete(q: string): Promise<string[]> {
    try {
      const res = await axios.get(`https://api.scryfall.com/cards/autocomplete?q=${q}`)
      console.log(res);
      return res.data.data
    } catch (error) {
      console.error(error);
      return []
    }
  },

  async getCardByName(name: string): Promise<Card | null> {
    try {
      const res = await axios.get(`https://api.scryfall.com/cards/named?fuzzy=${name}`)

      return {
        cmc: res.data.cmc,
        id: res.data.id,
        name: res.data.name,
        set_name: res.data.set_name,
        colors: res.data.colors,
        rarity: res.data.rarity,
        image_uris: res.data.image_uris,
        type_line: res.data.type_line,
        released_at: res.data.released_at,
        set_image: res.data.set_uri ? await this.getSetImage(res.data.set_uri) : undefined
      }
    } catch (error) {
      console.error(error);
      return null
    }
  },

  async getSetImage(set_uri: string): Promise<string | undefined> {
    try {
      const res = await axios.get(set_uri)
      return res.data.icon_svg_uri || undefined
    } catch (error) {
      console.error(error);
      return undefined
    }
  }
}
