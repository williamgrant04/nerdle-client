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
  }
}
