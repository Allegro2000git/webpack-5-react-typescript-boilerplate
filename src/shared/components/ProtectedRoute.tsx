import React, {type ReactNode} from "react";
import { Navigate } from 'react-router-dom';
import {Path} from "../../app/routes/Routes";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
        return <Navigate to={Path.login} replace />;
    }

    return <>{children}</>;
};