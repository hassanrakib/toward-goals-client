"use client";

import Form from "@/components/derived-ui/form";
import StyledInput from "@/components/derived-ui/styled-input";
import SubmitButton from "@/components/derived-ui/submit-button";
import { Avatar } from "@/components/ui/avatar";
import useSession from "@/hooks/useSession";
import { taskTitleSchema } from "@/schemas/task";
import { decrypt } from "@/utils/auth";
import { Card, HStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";
import { z } from "zod";

interface IFormValues {
  title: string;
}

export default function CallToCreateTask() {
  // form default value
  const defaultValues: IFormValues = {
    title: "",
  };

  //   next.js router
  const router = useRouter();
  //   get the session
  const session = useSession();
  // get the session payload
  const sessionPayload = decrypt(session);

  // form submit handler
  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    // reset the form
    reset(defaultValues);
    // navigate user to the task creation page
    router.push(`/tasks/create-task?title=${data.title}`);
  };

  return (
    <Card.Root>
      {/* form */}
      <Form
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues,
          resolver: zodResolver(
            z.object({
              title: taskTitleSchema,
            })
          ),
        }}
      >
        <Card.Body gap="2">
          <HStack gap="3" alignItems="flex-start">
            {/* avatar */}
            <Avatar size="lg" name={sessionPayload?.username} />
            {/* input for title */}
            <StyledInput
              type="text"
              size="lg"
              name="title"
              placeholder="What do you have to complete?"
            />
          </HStack>
          <SubmitButton
            size="sm"
            isServerActionLoading={false}
            alignSelf="flex-end"
          >
            Submit
          </SubmitButton>
        </Card.Body>
      </Form>
    </Card.Root>
  );
}
