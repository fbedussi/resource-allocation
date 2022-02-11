import './index.css'
import './i18n'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { configureStore } from './store'
import {
  CircularProgress, LocalizationProvider, StylesProvider,
  ThemeProvider
} from './styleguide'
import theme from './styleguide/theme'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <Suspense fallback={<CircularProgress />}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </Suspense>
          </StylesProvider>
        </ThemeProvider>
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
