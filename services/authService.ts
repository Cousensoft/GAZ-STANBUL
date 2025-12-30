
import { api } from './api';
import { User } from '../context/AuthContext';

export const authService = {
  login: async (email: string): Promise<User> => {
    // Mock login logic
    // In reality, this would send credentials to backend
    await api.post('/auth/login', { email });
    
    // Teknik Personel Kontrolü (Simülasyon)
    if (email.startsWith('teknik@')) {
         return {
            id: 'tech-user-123',
            name: 'Teknik Personel (Ahmet Usta)',
            email: email,
            role: 'technician',
            avatar: 'https://ui-avatars.com/api/?name=Teknik+Personel&background=4f46e5&color=fff',
            phone: '0555 999 88 77',
            connectedCompanyName: 'Bosphorus Enerji',
            connectionStatus: 'approved'
         };
    }

    // Varsayılan Bireysel Kullanıcı
    return {
      id: 'user-123',
      name: 'Ahmet Yılmaz',
      email: email,
      role: 'individual',
      avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yilmaz&background=ef4444&color=fff',
      phone: '0555 123 45 67'
    };
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put('/user/profile', userData);
    return response.data as User;
  },

  logout: async () => {
    await api.post('/auth/logout', {});
  }
};
