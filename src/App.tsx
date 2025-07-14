import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import AppLayout from "./pages/AppLayout";
import Error from "./pages/Error";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const MovieCast = lazy(() => import("./components/MovieCast"));
const MovieReviews = lazy(() => import("./components/MovieReviews"));

function App() {
  const router = createBrowserRouter([
    {
      Component: AppLayout,
      errorElement: <Error />,

      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />} key={1}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "/movies",
          element: (
            <Suspense fallback={<Loading />} key={2}>
              <MoviesPage />
            </Suspense>
          ),
        },
        {
          path: "/movies/:movieId",
          element: (
            <Suspense fallback={<Loading />} key={3}>
              <MovieDetailsPage />
            </Suspense>
          ),
        },
        {
          path: "/movies/:movieId/cast",
          element: (
            <Suspense fallback={<Loading />} key={4}>
              <MovieCast />
            </Suspense>
          ),
        },
        {
          path: "/movies/:movieId/reviews",
          element: (
            <Suspense fallback={<Loading />} key={5}>
              <MovieReviews />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
