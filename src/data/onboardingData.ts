export interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Selamat Datang di E-Commerce',
    description: 'Temukan produk terbaik dengan harga terjangkau dan kualitas terjamin.',
    image: 'https://i.pinimg.com/736x/87/55/16/875516c9da401a6c76812d0e0c0f87e0.jpg',
  },
  {
    id: '2', 
    title: 'Mudah & Cepat',
    description: 'Beli produk favorit Anda dengan proses yang mudah dan pengiriman yang cepat.',
    image: 'https://i.pinimg.com/736x/3a/72/d9/3a72d9d44d5bb6d6d0febc52d5b0b8e8.jpg',
  },
];