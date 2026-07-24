import HomePage from "@/components/HomePage";

// "/" renders the full marketing site. The pre-launch splash still lives in
// <ComingSoon /> (components/ComingSoon.tsx) — swap the render back to it to
// park the site again.
export default function Home() {
  return <HomePage />;
}
