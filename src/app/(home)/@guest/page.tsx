import OverviewImage from "@/components/pages/home/guest/overview-image";
import TopBanner from "@/components/pages/home/guest/top-banner";
import { VStack } from "@chakra-ui/react";

export default function LandingPage() {
  return (
    <VStack alignItems="stretch">
      {/* top banner */}
      <TopBanner />
      {/* overview image */}
      <OverviewImage />
    </VStack>
  );
}
