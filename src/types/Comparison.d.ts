interface Comparison {
  name: boolean,
  mana: "higher" | "lower" | "same",
  rarity: "higher" | "lower" | "same",
  type: boolean,
  subtype: boolean,
  set: boolean,
  released_at: "higher" | "lower" | "same",
  colors: {
    all: boolean, // True if all correct
    matching: string[] // This is an array of the colors that match
  }
}

interface Guess {
  guess: Card,
  comparison: Comparison
}
