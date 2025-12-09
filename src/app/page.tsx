import { Metadata } from 'next'
import DevolutionLanding from '@/components/DevolutionLanding'

export const metadata: Metadata = {
  title: 'Dev-o-lution',
  description: 'Where Code Evolves and Innovation Thrives',
}

export default function Home() {
  return <DevolutionLanding />
}