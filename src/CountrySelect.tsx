import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export const CountrySelect = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://www.gov.uk/bank-holidays.json').then((res) =>
        res.json(),
      ),
  });

  const [ selectedCountry, setSelectedCountry ] = useState('england-and-wales');

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log("DATA FOR E&W", data['england-and-wales'].events);

return (
  <>
    <label>UK Bank Holidays</label>
    <select name="selectedCountry" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
      {Object.entries(data).map(([division]) => {
        return (
          <option key={division} value={division}>{division.replace(/-/g, ' ')}</option>
        )
      })}
    </select>
    <h1>{selectedCountry}</h1>
    {data[selectedCountry].events.map((event: { title: string; date: string} ) => {
      return (
        <div key={selectedCountry + event.date}>
          <ul>
              <li key={event.date}>
                  {event.title} - {event.date}
                </li>
            </ul>
          </div>
        )
      })}
  </>
)
}