"use client";

import InterceptorDialog from "@/components/derived-ui/interceptor-dialog";
import CreateSubgoalForm from "@/components/pages/subgoals/create-subgoal/create-subgoal-form";

const CreateSubgoalInterceptor = () => {
  return (
    <InterceptorDialog>
      {/* receiving dialog content dom node sending it to create subgoal form */}
      {/* so that StyledSelect component's Portal component is set to a customized container */}
      {(dialogContentRef) => (
        <CreateSubgoalForm selectPortalRef={dialogContentRef} />
      )}
    </InterceptorDialog>
  );
};

export default CreateSubgoalInterceptor;
