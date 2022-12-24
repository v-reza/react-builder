import { useDispatch, useSelector } from "react-redux";
import { setOverlay } from "../redux/reducer/overlayReducer";

export type OverlayType = {
  isActive?: boolean;
};
const useOverlay = () => {
  const { isActive }: OverlayType = useSelector((state: any) => state.overlay);
  const dispatch = useDispatch()
  const show = () => {
    dispatch(setOverlay(true))
  }
  
  const hide = () => {
    dispatch(setOverlay(false))
  }
  
  return { isActive, show, hide };
};

export default useOverlay;
