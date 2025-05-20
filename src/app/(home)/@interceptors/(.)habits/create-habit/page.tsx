import InterceptorDialog from "@/components/derived-ui/interceptor-dialog";
import CreateHabitForm from "@/components/pages/habits/create-habit/create-habit-form";

const CreateHabitInterceptor = () => {
  return (
    <InterceptorDialog>
      <CreateHabitForm />
    </InterceptorDialog>
  );
};

export default CreateHabitInterceptor;
