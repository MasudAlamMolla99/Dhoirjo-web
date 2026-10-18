import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {

        try {

          if (!firebaseUser) {

            setUser(null);
            setRole(null);
            setLoading(false);

            return;
          }

          const userRef = doc(
            db,
            "users",
            firebaseUser.uid
          );

          const userSnapshot =
            await getDoc(userRef);

          if (userSnapshot.exists()) {

            const userData =
              userSnapshot.data();

            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName:
                firebaseUser.displayName,
              ...userData,
            });

            setRole(userData.role || null);

          } else {

            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName:
                firebaseUser.displayName,
            });

            setRole(null);
          }

        } catch (error) {

          console.error(
            "Auth error:",
            error
          );

          setUser(null);
          setRole(null);

        } finally {

          setLoading(false);
        }
      }
    );

    return () => unsubscribe();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};