import InterceptorDialog from "@/components/derived-ui/interceptor-dialog";
import CreateTaskForm from "@/components/pages/tasks/create-task/create-task-form";

const CreateTaskInterceptor = () => {
  return (
    <InterceptorDialog>
      <CreateTaskForm />
    </InterceptorDialog>
  );
};

export default CreateTaskInterceptor;
