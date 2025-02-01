import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import { SubmitHandler } from "react-hook-form";

interface IFormValues {
  username: string;
  email: string;
  password: string;
}

const Login = () => {
  // default values for the login form
  const defaultValues: IFormValues = {
    username: "",
    email: "",
    password: "",
  };

  const submitHandler: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
  };

  return (
    <CustomForm
      title="Login"
      description="Start your journey towards goals"
      submitHandler={submitHandler}
      useFormProps={{ defaultValues }}
    >
      <CustomInput
        name="username"
        placeholder="Enter username of your choice"
        registerOptions={{ required: true }}
      />
    </CustomForm>
  );
};

export default Login;
