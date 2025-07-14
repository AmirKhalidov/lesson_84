import { Outlet } from "react-router";
import { lazy } from "react";

const Navigation = lazy(() => import("../components/Navigation"));

export default function AppLayout() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
