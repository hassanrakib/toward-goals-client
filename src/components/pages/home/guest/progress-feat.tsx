import FeatureCard from "./feature-card";
import NextImage from "next/image";

const ProgressFeature = () => {
  return (
    <FeatureCard
      mdFlexDirection="row"
      description="Visualize your growth with clean, motivating progress charts."
      image={
        <NextImage
          src="/images/landing-page/habits-progress-screenshot.webp"
          alt="habits-progress-screenshot"
          width="473"
          height="414"
        />
      }
    >
      Track Progress <br /> & Celebrate Milestones
    </FeatureCard>
  );
};

export default ProgressFeature;
