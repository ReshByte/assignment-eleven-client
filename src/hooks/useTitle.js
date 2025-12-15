import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | LocalChef` : "LocalChef";
  }, [title]);
};

export default useTitle;
