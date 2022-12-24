import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../redux/reducer/sidebarReducer";

export type SidebarType = {
  open?: boolean;
};
const useSidebar = () => {
  const { open }: SidebarType = useSelector((state: any) => state.sidebar);
  const dispatch = useDispatch()
  const show = () => {
    dispatch(setSidebar(true))
  }
  
  const hide = () => {
    dispatch(setSidebar(false))
  }
  
  return { open, show, hide };
};

export default useSidebar;
