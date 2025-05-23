"use client";

import Form from "@/components/derived-ui/form";
import { Alert } from "@/components/ui/alert";
import { useSignInMutation } from "@/redux/features/auth/auth.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { signInCredentialsSchema } from "@/schemas/auth";
import { Card, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";
import StyledInput from "@/components/derived-ui/styled-input";
import SubmitButton from "@/components/derived-ui/submit-button";
import { useAppDispatch } from "@/redux/hooks";
import { setSession } from "@/redux/features/auth/auth.slice";

interface IFormValues {
  username: string;
  password: string;
}

const SignIn = () => {
  // router from next/navigation
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [signIn, { isLoading: isSigningIn, error: signInError }] =
    useSignInMutation();

  // default values for the signin form
  const defaultValues: IFormValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    const result = await signIn(data);

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
    <Flex
      justify="center"
      align="center"
      minHeight="100vh"
      bg="bg.subtle"
      p={4}
    >
      <Card.Root
        maxW="sm"
        w="100%"
        borderRadius="2xl"
        boxShadow="xs"
        bg="white"
      >
        <Card.Header>
          <Card.Title fontSize="2xl">Welcome Back!</Card.Title>
          <Card.Description>Sign in to access your account</Card.Description>
        </Card.Header>
        <Form
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues,
            resolver: zodResolver(signInCredentialsSchema),
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
              name="password"
              placeholder="Password"
              type="password"
              startElement={<LockKeyhole size={18} />}
            />
          </Card.Body>
          <Card.Footer flexDir="column" alignItems="stretch">
            {!isSigningIn && signInError ? (
              <Alert
                size="sm"
                variant="outline"
                status="error"
                title={
                  isFetchBaseQueryErrorWithData(signInError)
                    ? signInError.data.message
                    : "There was an error processing your request"
                }
              />
            ) : null}
            <SubmitButton
              isServerActionLoading={isSigningIn}
              loadingText="Signing in..."
            >
              Sign in
            </SubmitButton>
          </Card.Footer>
        </Form>
      </Card.Root>
    </Flex>
  );
};

export default SignIn;
