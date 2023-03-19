import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/auth/login';
import CategoryCreatePage from './components/categories/create';
import CategoryUpdatePage from './components/categories/update';
import DefaultLayout from './components/containers/default';
import HomePage from './components/home';
import NotFoundPage from './components/notFound';
import ProductCreatePage from './components/products/create';
import ProductUpdatePage from './components/products/update/ProductUpdatePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="categories/create" element={<CategoryCreatePage />} />
          <Route path="/api/categories/:id" element={<CategoryUpdatePage />} />
          <Route path="products/create" element={<ProductCreatePage />} />
          <Route path="products/update" element={<ProductUpdatePage />} />

          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      {/* <HomePage/> */}
    </>
  );
}

export default App;
