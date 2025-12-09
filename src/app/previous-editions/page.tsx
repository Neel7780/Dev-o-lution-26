import { Metadata } from 'next'
import PreviousEditions from '@/components/PreviousEditions'

export const metadata: Metadata = {
  title: 'Previous Editions | Dev-o-lution',
  description: 'Explore the history of Dev-o-lution conferences',
}

export default function PreviousEditionsPage() {
  return <PreviousEditions />
}

