interface Comparison {
  name: boolean,
  mana: "higher" | "lower" | "same",
  rarity: "higher" | "lower" | "same",
  type: boolean,
  subtype: boolean,
  set: boolean,
  released_at: "higher" | "lower" | "same",
  colors: {
    remaining: boolean,
    matching: string[] // This is an array of the colors that match
  }
}
