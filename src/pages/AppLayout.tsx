import { Outlet } from "react-router";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const Navigation = lazy(() => import("../components/Navigation"));

export default function AppLayout() {
  return (
    <>
      <Navigation />
      <main>
        {/* <Suspense fallback={<Loading />}> */}
        <Outlet />
        {/* </Suspense> */}
      </main>
    </>
  );
}
