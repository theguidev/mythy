export interface Word {
  value: string,
  category: "mythology",
  region?: "brazilian" | "greek" | "roman" | "norse" | "egyptian" | "mesopotamian" | "japanese" | "hindu" | "atheism" | "monotheism" | "indian",
  last_time_drawn?: Date,
  level: "easy" | "medium" | "hard" | "extreme"
}