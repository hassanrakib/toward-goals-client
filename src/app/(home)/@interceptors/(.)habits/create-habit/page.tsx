"use client";

import InterceptorDialog from "@/components/derived-ui/interceptor-dialog";
import CreateHabitForm from "@/components/pages/habits/create-habit/create-habit-form";

const CreateHabitInterceptor = () => {
  return (
    <InterceptorDialog>
      {/* receiving dialog content dom node sending it to create habit form */}
      {/* so that StyledSelect component's Portal component is set to a customized container */}
      {(dialogContentRef) => (
        <CreateHabitForm selectPortalRef={dialogContentRef} />
      )}
    </InterceptorDialog>
  );
};

export default CreateHabitInterceptor;
