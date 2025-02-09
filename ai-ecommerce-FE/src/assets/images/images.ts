import logo from './logo/logo-01.png'

interface Images {
    logo: string
}

const images: Images = {
    logo
} as const

export default images;