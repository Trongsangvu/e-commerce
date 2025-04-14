type Routes = {
    home: string,
    cart: string,
    login: string,
    register: string,
    products: string,
    productDetail: string,
    profile: string,
    checkout: string,
    shop: string,
    features: string,
    blog: string,
    about: string,
    contact: string,
    oauthSuccess: string;
}

const routes: Routes = {
    home: '/',
    cart: '/cart',
    login: '/login',
    register: '/register',
    products: '/products',
    productDetail: '/products/:id',
    profile: '/profile',
    checkout: '/checkout',
    shop: '/shop',
    features: '/features',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
    oauthSuccess: '/oauth-success'
}

export default routes;