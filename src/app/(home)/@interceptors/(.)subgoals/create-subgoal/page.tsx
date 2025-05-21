"use client";

import InterceptorDialog from "@/components/derived-ui/interceptor-dialog";
import CreateSubgoalForm from "@/components/pages/subgoals/create-subgoal/create-subgoal-form";
import { useRef } from "react";

const CreateSubgoalInterceptor = () => {
  const dialogContentRef = useRef<HTMLDivElement>(null);
  return (
    <InterceptorDialog ref={dialogContentRef}>
      {/* receiving dialog content dom node sending it to create subgoal form */}
      {/* so that StyledSelect component's Portal component is set to a customized container */}
      <CreateSubgoalForm
        selectPortalRef={dialogContentRef as React.RefObject<HTMLElement>}
      />
    </InterceptorDialog>
  );
};

export default CreateSubgoalInterceptor;
