import './App.css';

import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { Navigation } from '@/components/Navigation/Navigation';

import { AppStyled } from './App.styled';
import { Loader } from './components/Loader/Loader';
import { fetchBreeds, resetImages, resetRandomImage } from './store/actions';
import { useStore } from './store/store';

const BreedRandomPage = lazy(async () => import('@/pages/BreedRandomPage/BreedRandomPage'))
const SubBreedRandomPage = lazy(async () => import('@/pages/SubBreedRandomPage/SubBreedRandomPage'))
const BreedListPage = lazy(async () => import('@/pages/BreedListPage/BreedListPage'))
const SubBreedListPage = lazy(async () => import('@/pages/SubBreedListPage/SubBreedListPage'))

export const App = () => {
  const dispatch = useStore(false)[1]

  const { pathname } = useLocation()

  useEffect(() => {
    dispatch(fetchBreeds())
  }, [dispatch])

  useEffect(() => {
    dispatch(resetRandomImage())
    dispatch(resetImages())
  }, [pathname])

  return (
    <AppStyled>
      <header>
        <h1>Dog dashboard</h1>
      </header>

      <main>
        <Navigation />

        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/list" component={BreedListPage} />
            <Route exact path="/sub/list" component={SubBreedListPage} />
            <Route exact path="/sub/random" component={SubBreedRandomPage} />
            <Route exact path="/" component={BreedRandomPage} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </main>

      <footer>
        Made with ♥️ using Typescript, React, fp-ts, styled-components
      </footer>
    </AppStyled>
  );
}
