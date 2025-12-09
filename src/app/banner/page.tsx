import { Metadata } from 'next'
import BannerComponent from '@/components/Banner'

export const metadata: Metadata = {
    title: 'Speakers | Dev-o-lution',
    description: 'Meet the innovative speakers at Dev-o-lution conference',
}

export default function Banner() {
    return <BannerComponent />;
}