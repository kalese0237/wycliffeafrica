import { PageTemplate } from "@/components/templates";
import { DonationCTA } from "@/components/organisms";
import {
  HomeHero,
  HomeIntro,
  MissionarySpotlight,
  ServeGiveCards,
  UpdatesFeed,
  ScriptureQuoteBand,
  MissionsMovementFeature,
  Vision2025,
} from "@/components/organisms/home";

export default function HomePage() {
  return (
    <PageTemplate transparentHeader>
      <HomeHero />
      <HomeIntro />
      <MissionarySpotlight />
      <UpdatesFeed />
      <ServeGiveCards />
      <ScriptureQuoteBand />
      <MissionsMovementFeature />
      <Vision2025 />
      <DonationCTA />
    </PageTemplate>
  );
}
