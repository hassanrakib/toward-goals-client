"use client";

import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import { Button, Card, Flex } from "@chakra-ui/react";
import { AtSign, LockKeyhole, Mail } from "lucide-react";
import { SubmitHandler } from "react-hook-form";

interface IFormValues {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  // default values for the register form
  const defaultValues: IFormValues = {
    username: "",
    email: "",
    password: "",
  };

  const submitHandler: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
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
              registerOptions={{ required: "Username is required" }}
              inputIcon={<AtSign size={18} />}
            />
            <CustomInput
              name="email"
              placeholder="Email"
              type="email"
              registerOptions={{ required: "Email is required" }}
              inputIcon={<Mail size={18} />}
            />
            <CustomInput
              name="password"
              placeholder="Password"
              type="password"
              registerOptions={{ required: "Password is required" }}
              inputIcon={<LockKeyhole size={18} />}
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
              Sign up
            </Button>
          </Card.Footer>
        </CustomForm>
      </Card.Root>
    </Flex>
  );
};

export default SignUp;
