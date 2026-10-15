import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import AppRoot from './AppRoot.jsx'

const root = document.getElementById('root')
const app = <AppRoot />

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
