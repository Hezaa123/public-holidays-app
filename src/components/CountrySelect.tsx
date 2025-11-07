import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import '../styles/CountrySelect.css';

interface HolidayData {
	title: string;
	date: string;
	notes: string;
	bunting: boolean;
}

export const CountrySelect = () => {
	const { isPending, error, data } = useQuery<Record<string, { division?: string; events: HolidayData[] }>>({
		queryKey: ['repoData'],
		queryFn: () =>
			fetch('https://www.gov.uk/bank-holidays.json').then((res) =>
				res.json(),
			),
	});

	const [selectedCountry, setSelectedCountry] = useState('england-and-wales');
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

	if (isPending) return 'Loading...';

	if (error) return 'An error has occurred: ' + error.message;

	if (!data) return 'No data available';

	const availableYears = () => {
		const yearsSet = new Set<number>();

		Object.values(data).forEach((division: any) => {
			division.events.forEach((event: { date: string }) => {
				const year = new Date(event.date).getFullYear();
				yearsSet.add(year);
			});
		});

		return Array.from(yearsSet).sort((a, b) => b - a);
	}

	const filteredHolidays: HolidayData[] = (data[selectedCountry]?.events || []).filter((holiday) => {
		return new Date(holiday.date).getFullYear().toString() === selectedYear;
	});

	return (
		<div>
			<h1>UK Bank Holidays</h1>

			<label>Selected Country:
				<select name="selectedCountry" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
					{Object.entries(data).map(([division]) => {
						return (
							<option key={division} value={division}>{division.replace(/-/g, ' ')}</option>
						)
					})}
				</select>
			</label>

			<label>Holiday Year:
				<select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
					{availableYears().map(year => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
			</label>

			<h2>{selectedCountry}</h2>

			{filteredHolidays.map((event: { title: string; date: string }) => {
				return (
					<div key={selectedCountry + event.date}>
						<ul className='listItems'>
							<li key={event.date}>
								{event.title} - {event.date}
							</li>
						</ul>
					</div>
				)
			})}

		</div>
	)
}