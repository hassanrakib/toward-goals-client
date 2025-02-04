"use client";

import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import { ILoginCredentials } from "@/types/auth";
import { Button, Card, Flex } from "@chakra-ui/react";
import { AtSign, LockKeyhole } from "lucide-react";
import { SubmitHandler } from "react-hook-form";

const SignIn = () => {
  // default values for the signin form
  const defaultValues: ILoginCredentials = {
    username: "",
    password: "",
  };

  const submitHandler: SubmitHandler<ILoginCredentials> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center" minHeight="100vh" bg="gray.50" p={4}>
      <Card.Root maxW="sm" w="100%" borderRadius="lg" boxShadow="lg" bg="white">
        <Card.Header>
          <Card.Title fontSize="2xl">Welcome Back!</Card.Title>
          <Card.Description>Sign in to access your account</Card.Description>
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
              registerOptions={{ required: "Username is required" }}
              startElement={<AtSign size={18} />}
            />
            <CustomInput
              name="password"
              placeholder="Password"
              type="password"
              registerOptions={{ required: "Password is required" }}
              startElement={<LockKeyhole size={18} />}
            />
          </Card.Body>
          <Card.Footer>
            <Button
              type="submit"
              colorScheme="gray"
              bg="gray.600"
              color="white"
              _hover={{ bg: "gray.700" }}
              w="100%"
              borderRadius="md"
            >
              Sign in
            </Button>
          </Card.Footer>
        </CustomForm>
      </Card.Root>
    </Flex>
  );
};

export default SignIn;
