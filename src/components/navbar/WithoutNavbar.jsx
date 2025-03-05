import { Outlet } from 'react-router-dom';

const WithoutNavbarLayout = () => (
  <div>
    <Outlet /> {/* Render nested routes */}
  </div>
);

export default WithoutNavbarLayout;
