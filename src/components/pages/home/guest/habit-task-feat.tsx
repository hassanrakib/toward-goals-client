import FeatureCard from "./feature-card";
import NextImage from "next/image";

export default function HabitTaskFeature() {
  return (
    <FeatureCard
      mdFlexDirection="row-reverse"
      description="Progress isn't about perfection — it's about showing up, every day."
      image={
        <NextImage
          src="/images/landing-page/habit-mention-screenshot.webp"
          alt="habit-mention-screenshot"
          width="451"
          height="333"
        />
      }
    >
      Build Elastic Habits <br /> & Stay Consistent
    </FeatureCard>
  );
}
