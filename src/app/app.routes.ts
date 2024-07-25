import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';
import { userGuard } from './guards/user.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        title: 'Home',
        canActivate:[userGuard],
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    }, 
    {
        path: 'submission',
        title: 'Submission',
        canActivate:[userGuard],
        loadComponent: () => import('./pages/submission/submission.component').then(m => m.SubmissionComponent)
    },
    {
        path: 'history',
        title: 'History',
        canActivate:[userGuard],
        loadComponent: () => import('./pages/history/history.component').then(m => m.HistoryComponent)
    }, 
    {
        path:'dashboard',
        title: 'Dashboard',
        canActivate:[adminGuard],
        loadComponent:() => import('./pages/dashboard-admin/dashboard-admin.component').then(m=>m.DashboardAdminComponent) ,
    },
    {
        path:'login',
        title: 'Login',
        canActivate: [publicGuard],
        loadComponent:() => import('./pages/login/login.component').then(m=>m.LoginComponent) ,
    }, 
    {
        path:'register',
        title: 'Register',
        canActivate: [publicGuard],
        loadComponent:() => import('./pages/register/register.component').then(m=>m.RegisterComponent) ,
    }, 
    {
        path:'user',
        title: 'User',
        canActivate:[adminGuard],
        loadComponent:() => import('./pages/user/user.component').then(m=>m.UserComponent) ,
    },
    {
        path:'profile',
        title: 'Profile',
        canActivate: [userGuard],
        loadComponent:() => import('./pages/profile/profile.component').then(m=>m.ProfileComponent) ,
    },
    {
        path:'peminjaman-aset',
        title: 'Peminjaman Aset',
        canActivate:[adminGuard],
        loadComponent:() => import('./pages/peminjaman-aset/peminjaman-aset.component').then(m=>m.PeminjamanAsetComponent) ,
    },
    {
        path:'fasilitas',
        title: 'Fasilitas',
        canActivate:[adminGuard],
        loadComponent:() => import('./pages/fasility/fasility.component').then(m=>m.FasilityComponent),
    },
    {
        path:'fasilitas/edit-fasilitas/:id',
        title: 'Edit Fasilitas',
        canActivate:[adminGuard],
        loadComponent:() => import("./pages/fasility-edit/fasility-edit.component").then(m=>m.FasilityEditComponent) ,
    },
    {
        path:'tambah-fasilitas',
        title: 'Tambah Fasilitas',
        canActivate:[adminGuard],
        loadComponent:() => import('./pages/fasility-add/fasility-add.component').then(m=>m.FasilityAddComponent) ,
    },

];
