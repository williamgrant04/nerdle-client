import axios from "axios"

export const comparison = {
  async compare(data: any): Promise<Comparison> {
    const response = await axios.post("http://localhost:3000/compare", {
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

    return response.data
  },

  checkComparison(comparison: Comparison): boolean {
    return (
      comparison.mana!.hls === "same" &&
      comparison.rarity! === "same" &&
      comparison.name! &&
      comparison.type! &&
      comparison.subtype! &&
      comparison.set! &&
      comparison.released_at! === "same" &&
      comparison.colors!.all
    )
  }
}
