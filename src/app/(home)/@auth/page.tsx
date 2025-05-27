import Goals from "@/components/pages/home/auth/goals";
import { InputGroup } from "@/components/ui/input-group";
import { getMyGoalsProgress } from "@/services/progress/goal-progress";
import { Flex, Heading, Input, VStack } from "@chakra-ui/react";
import { Search } from "lucide-react";
import Link from "next/link";

const Home = async () => {
  // get all the goals started by the user
  const goalsProgress = await getMyGoalsProgress({ fields: "goal" });

  return (
    <Flex
      h="full"
      // center the children
      // when no data
      {...(!goalsProgress.data?.length
        ? { justifyContent: "center", alignItems: "center" }
        : {})}
    >
      <VStack
        alignItems="stretch"
        gap={4}
        // set width to full as the parent is aligning its items to center
        w="full"
        // set max width when no data
        {...(!goalsProgress.data?.length ? { maxW: "xl" } : {})}
      >
        {/* show the heading when no goal progress */}
        {!goalsProgress.data?.length && (
          <Heading size="3xl">Start toward your goals</Heading>
        )}
        {/* go to the goal search page */}
        <Link href="/goals/search" prefetch>
          <InputGroup width="100%" startElement={<Search size={18} />}>
            <Input
              type="text"
              placeholder="Search for a goal to start"
              borderRadius="2xl"
              cursor="pointer"
              bg="bg"
              border="2px solid"
              borderColor="yellow.400"
              readOnly
            />
          </InputGroup>
        </Link>
        {/* cards of all the started goals by the user */}
        <Goals goalsProgress={goalsProgress.data} />
      </VStack>
    </Flex>
  );
};

export default Home;
