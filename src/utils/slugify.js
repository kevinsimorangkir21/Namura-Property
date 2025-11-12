// src/utils/slugify.js
export function slugify(s) {
  try {
    // handle bilingual object { id: "...", en: "..." }
    if (typeof s === "object" && s !== null) {
      const lang =
        typeof window !== "undefined"
          ? localStorage.getItem("lang") || "id"
          : "id";
      s = s[lang] || Object.values(s)[0] || "";
    }

    if (typeof s !== "string") s = String(s || "");

    return s
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  } catch (err) {
    console.warn("slugify error:", s, err);
    return "";
  }
}
