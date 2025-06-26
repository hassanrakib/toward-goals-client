import { Status, StatusIndicatorProps } from "@chakra-ui/react";

export interface StatusCircleProps extends Status.RootProps {
  bgColor: StatusIndicatorProps["bgColor"];
  children?: React.ReactNode;
}

export default function StatusCircle(props: StatusCircleProps) {
  // destructure props
  const { bgColor, children, ...rest } = props;
  return (
    <Status.Root {...rest}>
      <Status.Indicator bgColor={bgColor} />
      {children}
    </Status.Root>
  );
}
