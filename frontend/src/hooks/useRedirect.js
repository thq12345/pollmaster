import { useNavigate } from "react-router";

const useRedirect = () => {
  let navigate = useNavigate();
  return () => {
    if (!window.history.state.key) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };
};

export default useRedirect;
