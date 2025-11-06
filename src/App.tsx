import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { CountrySelect } from './CountrySelect';


const queryClient = new QueryClient()

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<CountrySelect />
		</QueryClientProvider>
	)
}