import {
  Box,
  HStack,
  ProgressRootProps,
  ProgressValueText,
} from "@chakra-ui/react";
import { ProgressBar, ProgressLabel, ProgressRoot } from "../ui/progress";

interface StyledProgressBarProps extends ProgressRootProps {
  progressPercentage: string;
  labelPosition?: "inside" | "top" | "inline";
  label: string;
}

const StyledProgressBar = (props: StyledProgressBarProps) => {
  const {
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
      {...(labelPosition === "top" ? { mt: "6" } : {})}
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
              border="2px solid"
              borderColor={props.colorPalette}
              {...(labelPosition === "top"
                ? {
                    position: "relative",
                    bgColor: "yellow.200",
                    padding: "2px 13px",
                    rounded: "xl",
                    _after: {
                      content: '""',
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderWidth: "6px",
                      borderStyle: "solid",
                      borderColor: `${props.colorPalette} transparent transparent transparent`,
                    },
                  }
                : {
                    bgColor: "transparent",
                  })}
            >
              {label}
            </Box>
          </ProgressLabel>
          <ProgressBar />
        </>
      ) : (
        <HStack gap="3">
          <ProgressLabel>{label}</ProgressLabel>
          <ProgressBar flex="1" />
          <ProgressValueText>{progressPercentage}</ProgressValueText>
        </HStack>
      )}
    </ProgressRoot>
  );
};

export default StyledProgressBar;
