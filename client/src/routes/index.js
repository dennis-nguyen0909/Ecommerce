import { SearchProduct } from "../pages/SearchProduct/SearchProduct";
import { AdminPage } from "../pages/AdminPage/AdminPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { LogInPage } from "../pages/LogInPage/LogInPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { OrderPage } from "../pages/OrderPage/OrderPage";
import { ProductDetailPage } from "../pages/ProductDetailPage/ProductDetailPage";
import { ProductPage } from "../pages/ProductPage/ProductPage";
import { ProfileUserPage } from "../pages/ProfileUserPage/ProfileUserPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { TypeProductPage } from "../pages/TypeProductPage/TypeProductPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/product',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: '/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/search-product',
        page: SearchProduct,
        isShowHeader: true
    },
    {
        path: '/login',
        page: LogInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/product-detail/:id',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: ProfileUserPage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    },
]