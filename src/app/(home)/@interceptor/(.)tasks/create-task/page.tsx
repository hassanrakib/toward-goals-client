"use client";

import InterceptorDialog from "@/components/derived-ui/interceptor-dialog";
import CreateTaskForm from "@/components/pages/tasks/create-task/create-task-form";
import { useSearchParams } from "next/navigation";

const CreateTaskInterceptor = () => {
  // get the task title from search params
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  return (
    <InterceptorDialog>
      <CreateTaskForm title={title} />
    </InterceptorDialog>
  );
};

export default CreateTaskInterceptor;
