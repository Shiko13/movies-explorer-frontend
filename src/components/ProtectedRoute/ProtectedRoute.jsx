import './ProtectedRoute.css';
import {Navigate} from 'react-router-dom';
import React from 'react';

function ProtectedRoute({ isLogin, page }) {
    return isLogin ? page : <Navigate to="/" replace />;
}

export default ProtectedRoute;
