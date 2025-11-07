import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { CountrySelect } from './CountrySelect';

import '../styles/App.css';

const queryClient = new QueryClient()

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<CountrySelect />
		</QueryClientProvider>
	)
}