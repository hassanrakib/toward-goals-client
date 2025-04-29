import { Box, ProgressRootProps } from "@chakra-ui/react";
import { ProgressBar, ProgressLabel, ProgressRoot } from "../ui/progress";

interface StyledProgressBarProps extends ProgressRootProps {
  barWidthInContainer: string;
  labelPosition?: "inside" | "top";
  label: string;
}

const StyledProgressBar = (props: StyledProgressBarProps) => {
  const {
    barWidthInContainer,
    labelPosition = "inside",
    label,
    ...rest
  } = props;
  return (
    <ProgressRoot
      variant="outline"
      position="relative"
      size="lg"
      shape="full"
      striped
      mt={labelPosition === "top" ? "6" : undefined}
      {...rest}
    >
      {/* progress label */}
      <ProgressLabel
        position="absolute"
        left="0"
        // position the label based on the prop labelPosition
        top={labelPosition === "top" ? "-6" : "0"}
        zIndex="10"
        lineHeight="1"
        fontSize={labelPosition === "top" ? "16px" : "12px"}
        fontWeight="300"
        px="2"
        // setting minW & maxW so that the width doesn't go beyond this
        minW="max-content"
        maxW="100%"
        // width equals to the progress bar (filled part) within the progress container
        width={barWidthInContainer}
        display="flex"
        // align the child to the end of the progress bar (filled part)
        justifyContent="flex-end"
      >
        <Box
          position="relative"
          bgColor={labelPosition === "top" ? "yellow.400" : "transparent"}
          padding={labelPosition === "top" ? "2px 3px" : undefined}
          borderRadius={labelPosition === "top" ? "xl" : undefined}
          _after={
            labelPosition === "top"
              ? {
                  content: '""',
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderWidth: "6px",
                  borderStyle: "solid",
                  borderColor: "black transparent transparent transparent",
                }
              : undefined
          }
        >
          {label}
        </Box>
      </ProgressLabel>
      <ProgressBar />
    </ProgressRoot>
  );
};

export default StyledProgressBar;
