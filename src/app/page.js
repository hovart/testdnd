import {Inter} from '@next/font/google'
import Dashboard from '../components/Dashboard';

const inter = Inter({subsets: ['latin']})

export default function Home() {
  return (
    <main>
      <div>
        <Dashboard />
      </div>
    </main>
  )
}
