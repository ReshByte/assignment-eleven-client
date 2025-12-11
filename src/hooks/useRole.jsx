import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (user && user.email) {
      const getRole = async () => {
        try {
          const token = localStorage.getItem("access-token");
          const { data } = await axios.get(
            `http://localhost:3000/user/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          setRole(data.role);
          setRoleLoading(false);
        } catch (error) {
          console.error(error);
          setRoleLoading(false);
        }
      };
      getRole();
    } else {
      setRoleLoading(false);
    }
  }, [user, loading]);

  return [role, roleLoading];
};

export default useRole;
