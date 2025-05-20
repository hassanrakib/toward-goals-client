import InterceptorDialog from "@/components/derived-ui/interceptor-dialog";
import CreateSubgoalForm from "@/components/pages/subgoals/create-subgoal/create-subgoal-form";

const CreateSubgoalInterceptor = () => {
  return (
    <InterceptorDialog>
      <CreateSubgoalForm />
    </InterceptorDialog>
  );
};

export default CreateSubgoalInterceptor;
