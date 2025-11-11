export function getLocalizedText(value, lang = "id") {
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null) {
    return value[lang] || value.id || value.en || "";
  }
  return "";
}
