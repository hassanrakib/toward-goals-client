"use client";

import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import SubmitButton from "@/components/form/SubmitButton";
import { envConfig } from "@/config/envConfig";
import { useCreateUserMutation } from "@/redux/features/user/user.api";
import { IResponse } from "@/types/global";
import { IUser } from "@/types/user";
import debounce from "@/utils/debounce";
import { Alert, Card, Flex } from "@chakra-ui/react";
import { AtSign, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

type IFormValues = Pick<IUser, "username" | "email" | "password">;

const SignUp = () => {
  // router from next/navigation
  const router = useRouter();

  const [createUser, { isLoading: isCreatingUser, error: createUserError }] =
    useCreateUserMutation();

  // default values for the register form
  const defaultValues: IFormValues = {
    username: "",
    email: "",
    password: "",
  };

  // check username existence in registerOptions' prop
  const checkUsername = debounce(async (username: string) => {
    const res = await fetch(
      `${envConfig.baseApi}/auth/check-username?username=${username}`
    );

    const data: IResponse<{ exists: boolean }> = await res.json();

    // if username exists
    if (data.data?.exists) {
      // error message
      return "Username is not available";
    } else {
      // no error
      return true;
    }
  }, 2000);

  // check email existence in registerOptions' prop
  const checkEmail = debounce(async (email: string) => {
    const res = await fetch(
      `${envConfig.baseApi}/auth/check-email?email=${email}`
    );

    const data: IResponse<{ exists: boolean }> = await res.json();

    // if email exists
    if (data.data?.exists) {
      // error message
      return "Email is already used";
    } else {
      // no error
      return true;
    }
  }, 2000);

  const submitHandler: SubmitHandler<IFormValues> = async (data) => {
    const result = await createUser(data);

    if (result.data?.data) {
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
        <CustomForm
          submitHandler={submitHandler}
          useFormProps={{ defaultValues }}
        >
          <Card.Body gap={3}>
            <CustomInput
              name="username"
              placeholder="Username"
              type="text"
              registerOptions={{
                required: "Username is required",
                validate: async (username: string) =>
                  await checkUsername(username),
              }}
              startElement={<AtSign size={18} />}
            />
            <CustomInput
              name="email"
              placeholder="Email"
              type="email"
              registerOptions={{
                required: "Email is required",
                validate: async (email: string) => await checkEmail(email),
              }}
              startElement={<Mail size={18} />}
            />
            <CustomInput
              name="password"
              placeholder="Password"
              type="password"
              registerOptions={{ required: "Password is required" }}
              startElement={<LockKeyhole size={18} />}
            />
          </Card.Body>
          <Card.Footer flexDir="column">
            {!isCreatingUser && createUserError ? (
              <Alert.Root status="error" variant="outline" size="sm">
                <Alert.Indicator />
                <Alert.Title>
                  There was an error processing your request
                </Alert.Title>
              </Alert.Root>
            ) : null}
            <SubmitButton
              loading={isCreatingUser}
              loadingText="Creating user..."
            >
              Sign up
            </SubmitButton>
          </Card.Footer>
        </CustomForm>
      </Card.Root>
    </Flex>
  );
};

export default SignUp;
