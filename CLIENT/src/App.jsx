import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthAction } from './store/auth-slice/index.js'
import AuthLayout from './components/auth/layout.jsx'
import Authlogin from './pages/auth/login.jsx'
import Authregister from './pages/auth/register.jsx'
import AdminLayout from './components/admin-view/layout.jsx'
import AdminDashboard from './pages/admin-view/dashboard.jsx'
import AdminFeatures from './pages/admin-view/features.jsx'
import AdminOrders from './pages/admin-view/orders.jsx'
import AdminProducts from './pages/admin-view/products.jsx'
import ShoppingViewLayout from './components/shopping-view/layout.jsx'
import NotFound from './pages/not-found/index.jsx'
import Home from './pages/shopping-view/Home.jsx'
import Listing from './pages/shopping-view/Listing.jsx'
import Account from './pages/shopping-view/account.jsx'
import Checkout from './pages/shopping-view/contribute.jsx'
import StudyReader from './pages/shopping-view/study.jsx'
import CheckAuth from './components/common/check-auth.jsx'
import UnAuthPages from './pages/unauth-pages/index.jsx'
import { Skeleton } from "@/components/ui/skeleton"

const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthAction())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4 p-8">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen overflow-hidden bg-[#FAF8F5] dark:bg-[#0C0C0C] text-[#1C1C1C] dark:text-gray-100 transition-colors'>
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <div>
              <AuthLayout />
            </div>
          </CheckAuth>
        }>
          <Route path="login" element={<Authlogin />} />
          <Route path="register" element={<Authregister />} />
        </Route>

        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        {/* Shopping / Notes Platform Routes */}
        <Route path='/' element={<ShoppingViewLayout />}>
          {/* 1. Public Route: Anyone can view the landing page */}
          <Route path='' element={<Home />} />

          {/* 2. Protected Routes: Must be logged in to access */}
          <Route 
            path='listing' 
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Listing />
              </CheckAuth>
            } 
          />
          <Route 
            path='account' 
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Account />
              </CheckAuth>
            } 
          />
          <Route 
            path='checkout' 
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <Checkout />
              </CheckAuth>
            } 
          />
          <Route 
            path='study/:id' 
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <StudyReader />
              </CheckAuth>
            } 
          />

          {/* 3. 404 Fallback */}
          <Route path='*' element={<NotFound />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
