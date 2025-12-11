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
<<<<<<< HEAD
          const { data } = await axios.get(`http://localhost:3000/user/${user.email}`, {
=======
          const { data } = await axios.get(`http://localhost:5000/user/${user.email}`, {
>>>>>>> 1c8d3c5b5a04bf02dd716c01f1c26e7e39cb1795
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
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