import Features from "@/components/pages/home/guest/features";
import OverviewImage from "@/components/pages/home/guest/overview-image";
import TopBanner from "@/components/pages/home/guest/top-banner";
import { VStack } from "@chakra-ui/react";

export default function LandingPage() {
  return (
    <VStack alignItems="stretch" gap="12">
      {/* top banner */}
      <TopBanner />
      {/* overview image */}
      <OverviewImage />
      {/* features section */}
      <Features />
    </VStack>
  );
}
