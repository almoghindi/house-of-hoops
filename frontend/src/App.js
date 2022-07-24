import React,{ useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./components/hooks/auth-hook";
import { CartItemContext } from "./context/cartItem-context";
import LoadingSpinner from "./components/UIElements/LoadingSpinner";

const Header = React.lazy(() => import("./components/layout/header"));
const Home = React.lazy(() => import("./components/blog/home"));
const About = React.lazy(() => import("./components/about/about"));
const NBAstore = React.lazy(() => import("./components/NBAstore/NBAstore"));
const Auth = React.lazy(() => import("./components/Authentication/Auth"));
const ForgetPassword = React.lazy(() => import("./components/Authentication/ForgetPassword"));
const PasswordReset = React.lazy(() =>
  import("./components/Authentication/ResetPassword")
);
const ProductPage = React.lazy(() => import("./components/NBAstore/ProductPage"));
const ArticlePage = React.lazy(() => import("./components/blog/ArticlePage"));
const CartStyle = React.lazy(() => import("./components/cart/CartStyle"));
const CheckoutPage = React.lazy(() => import("./components/cart/checkoutPage"));

function App() {
  const { token, login, logout, userId } = useAuth();
  const [cartAmount, setCartAmount] = useState("");

  const passData = (data) => {
    setCartAmount(data);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <CartItemContext.Provider value={{ cartItems: cartAmount }}>
        <Router>
          <Suspense
            fallback={ 
              <div className="center">
                <LoadingSpinner/>
              </div>
            }>
            <Header />
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<NBAstore />} />
              {!token && (
                <>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/resetPassword" element={<ForgetPassword />} />
                  <Route
                    path="/resetPassword/:userId"
                    element={<PasswordReset />}
                  />
                </>
              )}
              <Route path="/shop/:productId" element={<ProductPage />} />
              <Route path="/articles/:articleId" element={<ArticlePage />} />
              {token && (
                <>
                  <Route
                    path="/cart"
                    element={<CartStyle onCartAmount={passData} />}
                  />
                  <Route path="/checkout" element={<CheckoutPage />} />
                </>
              )}
              <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
          </Suspense>
        </Router>
      </CartItemContext.Provider>
    </AuthContext.Provider>
  );
}
export default App;
