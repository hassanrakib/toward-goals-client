"use client";

import Form from "@/components/derived-ui/form";
import StyledInput from "@/components/derived-ui/styled-input";
import { Alert } from "@/components/ui/alert";
import { useCreateUserMutation } from "@/redux/features/user/user.api";
import { createUserSchema } from "@/schemas/user";
import { IUser } from "@/types/user";
import { Card, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";
import SubmitButton from "@/components/derived-ui/submit-button";
import { useAppDispatch } from "@/redux/hooks";
import { setSession } from "@/redux/features/auth/auth.slice";

type IFormValues = Pick<IUser, "username" | "email" | "password">;

const SignUp = () => {
  // router from next/navigation
  const router = useRouter();
  // redux dispatch
  const dispatch = useAppDispatch();

  const [createUser, { isLoading: isCreatingUser, error: createUserError }] =
    useCreateUserMutation();

  // default values for the register form
  const defaultValues: IFormValues = {
    username: "",
    email: "",
    password: "",
  };

  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    const result = await createUser(data);

    // after successful submission
    if (result.data?.data) {
      // reset the form
      reset(defaultValues);
      // set the session in the redux store
      dispatch(setSession(result.data.data));
      // redirect user to the home page
      router.push("/");
    }
  };

  return (
    <Flex justify="center" align="center" minHeight="100vh" bg="gray.50" p={4}>
      <Card.Root maxW="sm" w="100%" borderRadius="lg" boxShadow="lg" bg="white">
        <Card.Header>
          <Card.Title fontSize="2xl">Create Account</Card.Title>
          <Card.Description>
            Fill in the form below to create an account
          </Card.Description>
        </Card.Header>
        <Form
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues,
            resolver: zodResolver(createUserSchema),
          }}
        >
          <Card.Body gap={3}>
            <StyledInput
              name="username"
              placeholder="Username"
              type="text"
              startElement={<AtSign size={18} />}
            />
            <StyledInput
              name="email"
              placeholder="Email"
              type="email"
              startElement={<Mail size={18} />}
            />
            <StyledInput
              name="password"
              placeholder="Password"
              type="password"
              startElement={<LockKeyhole size={18} />}
            />
          </Card.Body>
          <Card.Footer flexDir="column">
            {!isCreatingUser && createUserError ? (
              <Alert size="sm" variant="outline"
                status="error"
                title="There was an error processing your request"
              />
            ) : null}
            <SubmitButton
              isServerActionLoading={isCreatingUser}
              loadingText="Creating user..."
            >
              Sign up
            </SubmitButton>
          </Card.Footer>
        </Form>
      </Card.Root>
    </Flex>
  );
};

export default SignUp;
