"use client";

import InterceptorDialog from "@/components/derived-ui/interceptor-dialog";
import CreateGoalForm from "@/components/pages/goals/create-goal/create-goal-form";

const CreateGoalInterceptor = () => {
  return <InterceptorDialog>{() => <CreateGoalForm />}</InterceptorDialog>;
};

export default CreateGoalInterceptor;
