import Features from "@/components/pages/home/guest/features";
import Footer from "@/components/pages/home/guest/footer";
import OverviewImage from "@/components/pages/home/guest/overview-image";
import Quote from "@/components/pages/home/guest/quote";
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
      {/* a quote for inspiration */}
      <Quote />
      {/* footer */}
      <Footer />
    </VStack>
  );
}
