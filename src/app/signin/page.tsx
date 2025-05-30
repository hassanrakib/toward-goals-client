"use client";

import Form from "@/components/derived-ui/form";
import { Alert } from "@/components/ui/alert";
import { useSignInMutation } from "@/redux/features/auth/auth.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { signInCredentialsSchema } from "@/schemas/auth";
import { Card, Flex, Link as ChakraLink, Text } from "@chakra-ui/react";
import NavLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, LockKeyhole } from "lucide-react";
import { UseFormReset } from "react-hook-form";
import StyledInput from "@/components/derived-ui/styled-input";
import SubmitButton from "@/components/derived-ui/submit-button";
import { useAppDispatch } from "@/redux/hooks";
import { setSession } from "@/redux/features/auth/auth.slice";
import { useSearchParams } from "next/navigation";
import TowardGoalsLogo from "@/components/shared/toward-goals-logo";
import { toaster } from "@/components/ui/toaster";

interface IFormValues {
  username: string;
  password: string;
}

const SignIn = () => {
  // get the redirect search param from search params
  const redirect = useSearchParams().get("redirect");

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
      // show a ui feedback
      toaster.create({ type: "info", description: "Successfully signed in" });
      // set the session in the redux store
      dispatch(setSession(result.data.data));

      // redirect user to the redirect path or home page
      // not using router from next.js because /signin is an unprotected
      // route, if router from next.js used it would do soft navigation to a protected route
      // there are some protected routes that are intercepted to show
      // route content in a dialog, we don't want protected route content to be shown
      // on this unprotected route
      window.location.replace(redirect ? redirect : "/");
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
        {/* show logo */}
        <TowardGoalsLogo mt="2" />
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
            {/* show link to the signup page */}
            <Text fontSize="sm" mt="2" textAlign="center">
              Don&apos;t have an account?{" "}
              <ChakraLink variant="underline" colorPalette="yellow" asChild>
                <NavLink href="/signup">Sign up</NavLink>
              </ChakraLink>
            </Text>
          </Card.Footer>
        </Form>
      </Card.Root>
    </Flex>
  );
};

export default SignIn;
