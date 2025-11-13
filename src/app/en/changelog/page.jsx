import ChangelogEN from "@/components/ui/en/ChangelogEN";

export default function PageEN() {
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", "en");
    window.dispatchEvent(new Event("languageChange"));
  }

  return <ChangelogEN />;
}
