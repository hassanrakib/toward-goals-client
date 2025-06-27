import FeatureCard from "./feature-card";
import NextImage from "next/image";

export default function GoalSubgoalFeature() {
  return (
    <FeatureCard
      mdFlexDirection="row"
      description="Break your goals into clear, achievable subgoals so you always know your next step."
      image={
        <NextImage
          src="/images/landing-page/subgoals-progress-screenshot.webp"
          alt="subgoals-progress-screenshot"
          width="448"
          height="359"
        />
      }
    >
      Set Big Goals <br /> & Break Them Down
    </FeatureCard>
  );
}
