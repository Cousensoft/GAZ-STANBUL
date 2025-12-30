
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceRequest } from '../types';
import { MOCK_REQUESTS } from '../utils/constants';

interface RequestContextType {
  requests: ServiceRequest[];
  addRequest: (request: ServiceRequest) => void;
  cancelRequest: (id: string) => void;
  getRequestById: (id: string) => ServiceRequest | undefined;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const RequestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  // Initialize with mock data on first load
  useEffect(() => {
    // In a real app, this would fetch from an API
    setRequests(MOCK_REQUESTS);
  }, []);

  const addRequest = (newRequest: ServiceRequest) => {
    setRequests((prev) => [newRequest, ...prev]);
  };

  const cancelRequest = (id: string) => {
    setRequests((prev) => prev.map(req => 
      req.id === id ? { ...req, status: 'İptal Edildi' } : req
    ));
  };

  const getRequestById = (id: string) => {
    return requests.find((req) => req.id === id);
  };

  return (
    <RequestContext.Provider value={{ requests, addRequest, cancelRequest, getRequestById }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequests = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequests must be used within an RequestProvider');
  }
  return context;
};
