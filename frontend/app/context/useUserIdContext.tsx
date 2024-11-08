"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  FC,
  ReactNode,
} from "react";
import { getUserId } from "../lib/action";
import { resolve } from "path";

interface UserContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
  loading: boolean;
  refreshUserId: ()=>void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchUserId = async () => {
    try {
      const id = await getUserId();
      if (id) {
        setUserId(id);
        // setLoading(false);
      } else {
        console.log("There is no user id");
      }
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    
    fetchUserId();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "session_userid") {
        fetchUserId();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const refreshUserId = async()=>{
    // setLoading(true);
    await fetchUserId();
  }
  return (
    <UserContext.Provider value={{ userId, setUserId, loading, refreshUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
