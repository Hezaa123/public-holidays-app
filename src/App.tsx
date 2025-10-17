import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { useState } from 'react';

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://www.gov.uk/bank-holidays.json').then((res) =>
        res.json(),
      ),
  });

  const [ selectedCountry, setSelectedCountry ] = useState('orange');

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log("DATA", data);

return (
  <>
    <label>UK Bank Holidays</label>
    <select name="selectedCountry" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
      {Object.entries(data).map(([division, info]) => {
        const typedInfo = info as { division: string; events: { title: string; date: string }[] };
        return (
          console.log("INFO", typedInfo),
          console.log("DIVISION", division),
          <option key={division} value={division}>{division.replace(/-/g, ' ')}</option>
        )
      })}
  </select>
    {data &&
      Object.entries(data).map(([division, info]) => {
        const typedInfo = info as { division: string; events: { title: string; date: string }[] };
        return (
          console.log("INFO", typedInfo),
          console.log("DIVISION", division),
          <div key={division}>
            <h1>{division}</h1>

            <ul>
              {typedInfo.events.map((event: { title: string; date: string} ) => (
                <li key={event.date}>
                  {event.title} - {event.date}
                </li>
              ))}
            </ul>
          </div>
        )
      })}
  </>
)
}