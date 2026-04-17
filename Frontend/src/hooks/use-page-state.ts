import { useEffect } from "react";
import { setState } from "../redux/app/app-slice";
import { useAppDispatch } from "./use-redux";

const usePageState = (state: string, child?: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setState({ state, child }));
  }, [dispatch, state, child]);
};

export default usePageState;
