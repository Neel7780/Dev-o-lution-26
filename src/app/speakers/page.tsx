import { Metadata } from 'next'
import SpeakersPage from '@/components/SpeakersPage'

export const metadata: Metadata = {
    title: 'Speakers | Dev-o-lution',
    description: 'Meet the innovative speakers at Dev-o-lution conference',
}

export default function Speakers() {
    return <SpeakersPage />
}