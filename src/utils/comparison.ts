import axios from "axios"

export const comparison = {
  async compare(data: any): Promise<Comparison> {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/compare`, {
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
  },

  share() {
    const guesses = JSON.parse(localStorage.getItem("guesses")|| "[]") as Guess[];
    const day = localStorage.getItem("day") || "0";
    if (!guesses || guesses.length === 0) return;
    // ⬛🟨🟩
    let shareString = `Warpwordle day ${day} ${guesses.length}/20\n\n`;
    guesses.forEach((guess) => {
      const comparison = guess.comparison;
      if (comparison.mana?.hls === "same") {
        console.log("same mana");
        shareString += "🟩";
      } else if (comparison.mana?.diff) {
        console.log("close mana");
        shareString += "🟨";
      } else if (comparison.mana?.hls as string !== "same" && !comparison.mana?.diff) {
        console.log("no mana");
        shareString += "⬛";
      }

      if (comparison.rarity === "same") {
        console.log("same rarity");
        shareString += "🟩";
      } else if (comparison.rarity !== "same" as string) {
        console.log("no rarity");
        shareString += "⬛";
      }

      if (comparison.set && comparison.released_at === "same") {
        console.log("same set");
        shareString += "🟩";
      } else if (comparison.released_at === "same" && !comparison.set) {
        console.log("close set");
        shareString += "🟨";
      } else if (comparison.released_at !== "same" && !comparison.set) {
        console.log("no set");
        shareString += "⬛";
      }

      if (comparison.colors?.all) {
        console.log("same colors");
        shareString += "🟩";
      } else if (comparison.colors?.matching && comparison.colors?.matching.length > 0) {
        console.log("close colors");
        shareString += "🟨";
      } else if (comparison.colors?.matching && comparison.colors?.matching.length === 0) {
        console.log("no colors");
        shareString += "⬛";
      }

      if (comparison.type) {
        console.log("same type");
        shareString += "🟩";
      } else if (!comparison.type) {
        console.log("no type");
        shareString += "⬛";
      }

      if (comparison.subtype) {
        console.log("same subtype");
        shareString += "🟩";
      } else if (!comparison.subtype) {
        console.log("no subtype");
        shareString += "⬛";
      }

      shareString += "\n";
    })

    shareString += `\nWarpwordle - ${import.meta.env.VITE_APP_URL}`;
    console.log(shareString)
    navigator.clipboard.writeText(shareString)
  }
}
