import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export default function useSession() {
  return useAppSelector((state: RootState) => state.auth.session);
}
