import axios from "axios"

export const scryfall = {
  async autocomplete(q: string): Promise<string[]> {
    try {
      const res = await axios.get(`https://api.scryfall.com/cards/autocomplete?q=${q}`)
      return res.data.data
    } catch (error) {
      console.error(error);
      return []
    }
  },

  async getCardByName(name: string): Promise<Card | null> {
    try {
      const res = await axios.get(`https://api.scryfall.com/cards/search?q=%21%22${name}%22+not%3Areprint`)

      return {
        cmc: res.data.data[0].cmc,
        id: res.data.data[0].id,
        name: res.data.data[0].name,
        set_name: res.data.data[0].set_name,
        colors: res.data.data[0].colors,
        rarity: res.data.data[0].rarity,
        image_uris: res.data.data[0].image_uris,
        type_line: res.data.data[0].type_line,
        released_at: res.data.data[0].released_at,
        set_image: res.data.data[0].set_uri ? await this.getSetImage(res.data.data[0].set_uri) : undefined
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
  },

  async getRandomCard(): Promise<Card | null> {
    try {
      const res = await axios.get("https://api.scryfall.com/cards/random?q=is%3Afirstprinting")
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
  }
}
