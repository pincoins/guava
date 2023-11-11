import React from 'react';
import { Outlet } from 'react-router-dom';
import UpperNavbar from '../components/widgets/UpperNavbar';
import LowerNavbar from '../components/widgets/LowerNavbar';

const Root = () => {
  return (
    <div>
      <UpperNavbar />
      <LowerNavbar />
      <Outlet />
    </div>
  );
};

export default Root;
