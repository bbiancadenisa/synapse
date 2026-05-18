import { Outlet } from 'react-router-dom';
import { AppNavbar } from '../AppNavbar/AppNavbar';

export const AppLayout = () => {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
};
