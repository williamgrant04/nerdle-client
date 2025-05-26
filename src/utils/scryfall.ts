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
      const res = await axios.get(`https://api.scryfall.com/cards/named?exact=${name}`)
      return res.data
    } catch (error) {
      console.error(error);
      return null
    }
  }
}
