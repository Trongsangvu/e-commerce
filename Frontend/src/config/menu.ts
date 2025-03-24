export interface MenuItems {
    title: string,
    path?: string,
    delay?: number,
}

// Menu Sidebar
export const MENU_ITEMS: MenuItems[] = [
    { title: 'Gifts' ,},
    { title: 'New In' },
    { title: 'Handbags' },
    { title: 'Travel' },
    { title: 'Women' },
    { title: 'Men' },
    { title: 'Children' },
    { title: 'Jewelry & Watches' },
    { title: 'Décor & Lifestyle' },
    { title: 'Fragrances & Make-Up' },
];

// Menu Sidebar
export const MENU_ITEMS_2: MenuItems[] = [
    { title: 'Gucci Services' },
    { title: 'World of Gucci' },
    { title: 'Store Locator' },
    
];

// Menu Profile
export const MENU_PROFILE: MenuItems[] = [
    // { title: 'my account' },
    { title: 'sign in', path: '/login' },
    { title: 'my orders' },
    { title: 'account setting' },
    { title: 'address book' },
    { title: 'wallet' },
    { title: 'saved items' },
    { title: 'my appointments' },
];

// Menu categories
export const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'women', label: 'women' },
    { id: 'men', label: 'men' },
    { id: 'bag', label: 'bag' },
    { id: 'shoes', label: 'shoes' },
    { id: 'watches', label: 'watches' },
]