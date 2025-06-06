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

  endlessCompare(guessedCard: Card, compareCard: Card): Comparison {
    return {
      name: guessedCard.name === compareCard.name,
      mana: compareMana(guessedCard, compareCard),
      rarity: compareRarity(guessedCard, compareCard),
      type: guessedCard.type_line?.split("—")[0].trim() === compareCard.type_line?.split("—")[0].trim(),
      subtype: guessedCard.type_line?.split("—")[1]?.trim() === compareCard.type_line?.split("—")[1]?.trim(),
      set: guessedCard.set_name === compareCard.set_name,
      released_at: compareRelease(guessedCard, compareCard),
      colors: compareColors(guessedCard, compareCard)
    }
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
    let shareString = `Warpworldle day ${day} ${guesses.length}/20\n\n`;
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

    shareString += `\n${import.meta.env.VITE_APP_URL}`;
    console.log(shareString)
    navigator.clipboard.writeText(shareString)
  }
}

const compareRarity = (guess: Card, comparison: Card) => {
  let guessRarity = 1
  let comparisonRarity = 1
  switch (guess.rarity) {
    case "common":
      guessRarity = 1;
      break;
    case "uncommon":
      guessRarity = 2;
      break;
    case "rare":
      guessRarity = 3;
      break;
    case "mythic":
      guessRarity = 4;
      break;
    default:
      guessRarity = 1;
  }
  switch (comparison.rarity) {
    case "common":
      comparisonRarity = 1;
      break;
    case "uncommon":
      comparisonRarity = 2;
      break;
    case "rare":
      comparisonRarity = 3;
      break;
    case "mythic":
      comparisonRarity = 4;
      break;
    default:
      comparisonRarity = 1;
  }

  if (guessRarity > comparisonRarity) {
    return "lower";
  }

  if (guessRarity < comparisonRarity) {
    return "higher";
  }

  return "same";
}

const compareMana = (guess: Card, comparison: Card) => {
  let hls: "same" | "higher" | "lower" = "same"
  let diff = false

  if (guess.cmc > comparison.cmc) {
    hls = "lower"
  }

  if (guess.cmc < comparison.cmc) {
    hls = "higher"
  }

  if (hls === "higher") {
    diff = guess.cmc - comparison.cmc <= 2;
  } else if (hls === "lower") {
    diff = comparison.cmc - guess.cmc <= 2;
  }
  return { hls, diff }
}

const compareRelease = (guess: Card, comparison: Card) => {
  const guessDate = new Date(guess.released_at);
  const comparisonDate = new Date(comparison.released_at);
  if (guessDate > comparisonDate) {
    return "lower";
  }
  if (guessDate < comparisonDate) {
    return "higher";
  }
  return "same";
}

const compareColors = (guess: Card, comparison: Card) => {
  return {
    all: guess.colors.length === comparison.colors.length && guess.colors.every((color) => comparison.colors.includes(color)),
    matching: guess.colors.filter((color) => comparison.colors.includes(color)),
  }
}
