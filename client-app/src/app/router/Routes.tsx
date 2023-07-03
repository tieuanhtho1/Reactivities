import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/Home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetail";
import TestErrors from "../../features/Errors/TestErrors";
import NotFound from "../../features/Errors/NotFound";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        children: [
            {path: '', element: <HomePage/>},
            {path: 'activities', element: <ActivityDashboard/>},
            {path: 'activity/:id', element: <ActivityDetails/>},
            {path: 'createActivity', element: <ActivityForm key='create'/>},
            {path: 'manage/:id', element: <ActivityForm key='manage'/>},
            {path: 'errors', element: <TestErrors/>},
            {path: 'not-found', element: <NotFound/>},
            {path: '*', element: <Navigate replace to='/not-found'/>},

        ]
    }
]

export const router = createBrowserRouter(routes)