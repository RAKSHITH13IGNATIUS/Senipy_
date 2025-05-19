
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import Mixpanel SDK
import mixpanel from 'mixpanel-browser'

// Initialize Mixpanel
mixpanel.init('f484186352d2f656edb084a05806e11a', {
  debug: true,
  track_pageview: true,
  persistence: 'localStorage',
})

createRoot(document.getElementById("root")!).render(<App />)
