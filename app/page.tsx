import ComingSoon from "@/components/ComingSoon";

// The full marketing site is preserved in <HomePage /> (components/HomePage.tsx).
// While we're pre-launch, "/" shows the coming-soon splash instead. To restore
// the site, swap the render below back to `<HomePage />` and drop this import.
export default function Home() {
  return <ComingSoon />;
}
