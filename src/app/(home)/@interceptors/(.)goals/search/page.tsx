import InterceptorDialog from "@/components/derived-ui/interceptor-dialog";
import GoalSearchForm from "@/components/pages/goals/search/goal-search-form";

const SearchGoalInterceptor = () => {
  return (
    <InterceptorDialog size="xl">
      <GoalSearchForm />
    </InterceptorDialog>
  );
};

export default SearchGoalInterceptor;
