import MenuApp from '@components/MenuApp'
import '@styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <div className="container">
    <MenuApp />
    <Component {...pageProps} />
  </div>
  )
}

export default MyApp
