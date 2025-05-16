import axios from "axios"

interface ComparedCard {
  name: boolean,
  mana: "same" | "higher" | "lower",
  rarity: "same" | "higher" | "lower",
  type: boolean,
  subtype: boolean,
  set: boolean,
  released_at: "same" | "higher" | "lower",
  colors: string[] // The colors that match
}

export const comparison = {
  async compare(data: any): Promise<ComparedCard> {
    return await axios.post("http://localhost:3000/compare", {
      card: {
        name: data.name,
        mana: data.cmc,
        rarity: data.rarity,
        type_line: data.type_line,
        set: data.set_name,
        released_at: data.released_at,
        colors: data.colors
      }
    })
  }
}
