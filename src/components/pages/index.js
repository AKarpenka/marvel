import { lazy } from "react";

const MainPage = lazy(() => import('./MainPage'));
const ComicsPage = lazy(() => import('./ComicsPage'));
const Page404 = lazy(() => import('./404'));
const SingleComic = lazy(() => import('./SingleComic'));

export {MainPage, ComicsPage, Page404, SingleComic};