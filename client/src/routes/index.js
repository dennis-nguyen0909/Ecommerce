import { HomePage } from "../pages/HomePage/HomePage";
import { LogInPage } from "../pages/LogInPage/LogInPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { OrderPage } from "../pages/OrderPage/OrderPage";
import { ProductDetailPage } from "../pages/ProductDetailPage/ProductDetailPage";
import { ProductPage } from "../pages/ProductPage/ProductPage";
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
        path: '/product-details',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    },
]