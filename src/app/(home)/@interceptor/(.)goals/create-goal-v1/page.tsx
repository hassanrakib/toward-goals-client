import InterceptorDialog from "@/components/derived-ui/interceptor-dialog";
import CreateGoalForm from "@/components/pages/goals/create-goal-v1/create-goal-form";

const CreateGoalInterceptor = () => {
  return (
    <InterceptorDialog>
      <CreateGoalForm />
    </InterceptorDialog>
  );
};

export default CreateGoalInterceptor;
