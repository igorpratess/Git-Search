import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/pages/Home';
import AllUsers from '@/pages/AllUsers';
import UserProfile from '@/pages/UserProfile';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/all-users',
        name: 'AllUsers',
        component: AllUsers
    },
    {
        path: '/user-profile',
        name: 'UserProfile',
        component: UserProfile
    }
];

const router = new createRouter({
    history: createWebHistory(),
    routes
}); 

export default router;