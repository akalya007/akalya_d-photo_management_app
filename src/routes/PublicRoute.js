import React from 'react';
import { useAuth } from "../hooks/useAuth";
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    var { user } = useAuth();
    if (user) {
        return <Navigate to='/gallery' replace={true} />;
    }

    return children;
};

export default PublicRoute;
