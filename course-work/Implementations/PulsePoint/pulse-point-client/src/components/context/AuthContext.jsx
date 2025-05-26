import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLoader } from '../context/LoaderContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const { setIsLoading } = useLoader();

  useEffect(() => {
      if (token) {
        setIsLoading(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        fetchUserProfile();
        setIsLoading(false);
    }
  }, [token]);

    useEffect(() => {
        console.log(user);
    }, [user]);

  const login = async (username, password) => {
    try {
        const response = await axios.post('https://localhost:7011/api/auth/login', { username, password });
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
      return true;
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      return error.response?.data?.message || "Login failed. Please try again.";
    }
  };

  const register = async (userData) => {
    try {
      await axios.post('https://localhost:7011/api/auth/register', userData);
      await login(userData.username, userData.password);
      return true;
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
        return error.response?.data?.message || "Register failed. Please try again.";
    }
  };

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('https://localhost:7011/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Fetching user profile failed:', error);
            logout();
        }
    };

    const updateProfile = async (profileData) => {
        try {
            const response = await axios.put('https://localhost:7011/api/auth/update-profile', profileData);
            setUser(response.data);
            return true;
        } catch (error) {
            console.error('Profile update failed:', error.response?.data?.message || error.message);
            return error.response?.data?.message || "Profile update failed. Please try again.";
        }
    };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://localhost:7011/api/dashboard/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Fetching dashboard data failed:", error);
            return null;
        }
        finally {
            setIsLoading(false);
        }
    };


  return (
    <AuthContext.Provider value={{ user, token, login, register, updateProfile, logout, fetchDashboardData, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}