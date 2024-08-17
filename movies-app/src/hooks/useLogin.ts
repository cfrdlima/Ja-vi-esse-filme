import { getLogin } from '@/services/loginService';
import { Login } from '@/types/login';
import { useState, useEffect } from 'react';

export const useLogin = () => {
  const [login, setLogin] = useState<Login[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const loginData = await getLogin();
        setLogin(loginData);
      } catch (error) {
        console.error('Error fetching login:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogin();
  }, []);

  return { login, isLoading };
};
