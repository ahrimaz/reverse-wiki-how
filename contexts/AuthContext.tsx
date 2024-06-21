'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Flex, Spinner } from '@chakra-ui/react';

interface User {
  isAuthenticated: boolean;
  username: string;
}

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ isAuthenticated: true, username });
    }
    setLoading(false);
  }, []);

  const login = (token: string, username: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setUser({ isAuthenticated: true, username });
    router.push('/'); // Redirect to home page on login
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
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
