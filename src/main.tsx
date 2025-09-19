import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './App.css'
// import "react-toastify/dist/ReactToastify.css";
// import { registerSW } from 'virtual:pwa-register'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'


// registerSW({
//   immediate: true,
//   onNeedRefresh() {
//     console.log('New content available; refresh to update.')
//   },
//   onOfflineReady() {
//     console.log('App ready to work offline.')
//   },
// })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
        <ToastContainer newestOnTop={false} />
        <ToastContainer newestOnTop={false} />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
)