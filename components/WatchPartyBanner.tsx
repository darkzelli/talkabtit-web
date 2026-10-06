import WatchPartyLivePill from "./WatchPartyLivePill";
import { featuredParty, loadWatchParties, partyStatus } from "@/lib/watch-parties";
import "./watch-party.css";

// Server half of the hero's live flag: picks the live/next party at build and
// hands it to the client pill, which shows itself only while the party runs.
// Renders nothing at all when no party is on the calendar.
export default function WatchPartyBanner() {
  const party = featuredParty(loadWatchParties());
  if (!party) return null;
  const { showName, title, season, episode, start, end } = party;
  return <WatchPartyLivePill party={{ showName, title, season, episode, start, end }} initialStatus={partyStatus(party)} />;
}
