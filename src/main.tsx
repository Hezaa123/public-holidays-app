import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

import { App } from './components/App.tsx'

import './styles/index.css'

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>,
);