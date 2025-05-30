"use client";

import StyledButton from "@/components/derived-ui/styled-button";
import StyledPopover from "@/components/derived-ui/styled-popover";
import { Avatar } from "@/components/ui/avatar";
import useSession from "@/hooks/useSession";
import { clearSession } from "@/redux/features/auth/auth.slice";
import { useAppDispatch } from "@/redux/hooks";
import { deleteSession } from "@/services/auth";
import { Flex, GridItem, IconButton, Text } from "@chakra-ui/react";
import { BellIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopNavbar() {
  // next.js router
  const router = useRouter();

  // redux dispatch
  const dispatch = useAppDispatch();

  // get the decrypted session
  const session = useSession();

  const handleSignout = async () => {
    // delete the "session" cookie
    await deleteSession();
    // clear session from redux store
    dispatch(clearSession());

    // redirect user to the signin page
    router.replace("/signin");
  };

  return (
    <GridItem
      as="header"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      px={4}
      borderRadius="3xl"
    >
      {/* Notification Icon */}
      <Flex align="center" gap={4}>
        <IconButton aria-label="Notifications" variant="ghost" rounded="full">
          <BellIcon />
        </IconButton>
        {/* Avatar */}
        <StyledPopover
          triggerElement={
            <IconButton rounded="full" variant="plain">
              <Avatar name={session?.username} />
            </IconButton>
          }
        >
          {/* popover content */}
          <Flex flexDir="column" alignItems="center">
            <Avatar size="xl" name={session?.username} />
            <Text mt="1" fontSize="xl">
              @{session?.username}
            </Text>
            <StyledButton mt="5" alignSelf="stretch" onClick={handleSignout}>
              Sign out
            </StyledButton>
          </Flex>
        </StyledPopover>
      </Flex>
    </GridItem>
  );
}
