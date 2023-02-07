import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

// dev-ewun56wd6edpb745.us.auth0.com
// EBmj86K0B2GDGDDoXwNy3Xg45WEcduNx
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Auth0Provider
    domain='dev-ewun56wd6edpb745.us.auth0.com'
    clientId='Pl1NSem5xdUBJ8oI0k05pp86vTeZSU8Q'
    redirectUri={window.location.origin}
    // authorizationParams={{
    //   redirect_uri: window.location.origin,
    // }}
    cacheLocation='localstorage'
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
)
