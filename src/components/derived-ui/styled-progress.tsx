import {
  Box,
  HStack,
  ProgressRootProps,
  Progress as ChakraProgress,
} from "@chakra-ui/react";
import { ProgressLabel, ProgressRoot, ProgressValueText } from "../ui/progress";
import { forwardRef } from "react";

interface StyledProgressBarProps extends ProgressRootProps {
  barColorPalette?: ChakraProgress.RangeProps["bgColor"];
  progressPercentage: string;
  labelPosition?: "inside" | "top" | "inline";
  label: string;
}

const StyledProgressBar = (props: StyledProgressBarProps) => {
  const {
    barColorPalette = "gray",
    progressPercentage,
    labelPosition = "inside",
    label,
    ...rest
  } = props;
  return (
    <ProgressRoot
      variant="outline"
      position="relative"
      size="md"
      shape="full"
      striped
      {...(labelPosition === "top" ? { mt: "7" } : {})}
      {...rest}
    >
      {/* progress label */}
      {labelPosition !== "inline" ? (
        <>
          <ProgressLabel
            position="absolute"
            height="full"
            left="0"
            // position the label based on the prop labelPosition
            top={labelPosition === "top" ? "-6" : "0"}
            zIndex="1"
            lineHeight="1"
            fontSize={labelPosition === "top" ? "16px" : "12px"}
            px="2"
            // setting minW & maxW so that the width doesn't go beyond this
            minW="max-content"
            maxW="100%"
            // width equals to the progress bar (filled part) within the progress container
            width={progressPercentage}
            display="flex"
            // align the child to the end of the progress bar (filled part)
            justifyContent="flex-end"
          >
            <Box
              {...(labelPosition === "top"
                ? {
                    position: "relative",
                    border: "2px solid",
                    borderColor: barColorPalette,
                    bgColor: "yellow.100",
                    padding: "2px 13px",
                    rounded: "xl",
                    shadow: "md",
                    _after: {
                      content: '""',
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderWidth: "6px",
                      borderStyle: "solid",
                      borderColor: "transparent",
                      borderTopColor: barColorPalette,
                    },
                  }
                : {
                    bgColor: "transparent",
                  })}
            >
              {label}
            </Box>
          </ProgressLabel>
          <ProgressBar barColor={barColorPalette} />
        </>
      ) : (
        <HStack gap="3">
          <ProgressLabel>{label}</ProgressLabel>
          <ProgressBar flex="1" barColor={barColorPalette} />
          <ProgressValueText>{progressPercentage}</ProgressValueText>
        </HStack>
      )}
    </ProgressRoot>
  );
};

export interface ProgressBarProps extends ChakraProgress.TrackProps {
  barColor: ChakraProgress.RangeProps["bgColor"];
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  function ProgressBar(props, ref) {
    const { barColor, ...rest } = props;
    return (
      <ChakraProgress.Track {...rest} ref={ref}>
        <ChakraProgress.Range bgColor={barColor} />
      </ChakraProgress.Track>
    );
  }
);

export default StyledProgressBar;
