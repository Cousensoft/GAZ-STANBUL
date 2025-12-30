
import React from 'react';
import { Navigate } from 'react-router-dom';

// Eğitmen modülü sistemden kaldırılmıştır.
// Bu dosya artık kullanılmamaktadır ve ana sayfaya yönlendirir.
const InstructorDashboard = () => {
    return <Navigate to="/" replace />;
};

export default InstructorDashboard;
