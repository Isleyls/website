import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const useUserRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserRole = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "Users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setRole(userDocSnap.data().role);
        }
        setLoading(false);
      }
    };

    getUserRole();
  }, []);

  return { role, loading };
};

export default useUserRole;
