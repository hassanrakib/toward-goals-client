import Goals from "@/components/pages/home/auth/goals";
import { InputGroup } from "@/components/ui/input-group";
import { Input, VStack } from "@chakra-ui/react";
import { Search } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <VStack align="stretch" gap={4}>
      {/* go to the goal search page */}
      <Link href="/goals/search" prefetch>
        <InputGroup width="100%" startElement={<Search size={18} />}>
          <Input
            type="text"
            placeholder="Search for a goal to start"
            borderRadius="2xl"
            cursor="pointer"
            bg="bg"
            readOnly
          />
        </InputGroup>
      </Link>
      {/* cards of all the started goals by the user */}
      <Goals />
    </VStack>
  );
};

export default Home;
