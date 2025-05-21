"use client";

import InterceptorDialog from "@/components/derived-ui/interceptor-dialog";
import CreateHabitForm from "@/components/pages/habits/create-habit/create-habit-form";
import { useRef } from "react";

const CreateHabitInterceptor = () => {
  const dialogContentRef = useRef<HTMLDivElement>(null);
  return (
    <InterceptorDialog ref={dialogContentRef}>
      {/* receiving dialog content dom node sending it to create habit form */}
      {/* so that StyledSelect component's Portal component is set to a customized container */}
      <CreateHabitForm
        selectPortalRef={dialogContentRef as React.RefObject<HTMLElement>}
      />
    </InterceptorDialog>
  );
};

export default CreateHabitInterceptor;
