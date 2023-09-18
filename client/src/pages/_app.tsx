import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/store';
import '@/styles/globals.css';
import CryptoCurrencyProvider from '@/providers/CryptoCurrencyProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CryptoCurrencyProvider>
        <Component {...pageProps} />
      </CryptoCurrencyProvider>
    </Provider>
  ) 
}
