import ChangelogID from "@/components/ui/id/ChangelogID";

export default function PageID() {
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", "id");
    window.dispatchEvent(new Event("languageChange"));
  }

  return <ChangelogID />;
}
