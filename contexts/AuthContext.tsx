'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Flex, Spinner } from '@chakra-ui/react';

interface User {
  username: string;
  // Add more user-related fields as needed
}

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check local storage for existing user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    router.push('/'); // Redirect to home page on login
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/'); // Redirect to home page on logout
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {loading ? (
        <Flex
          height="100vh"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" />
        </Flex>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
