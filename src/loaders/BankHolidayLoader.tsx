export const BankHolidayLoader = async () => {
	const response = await fetch('https://www.gov.uk/bank-holidays.json');

	if (!response.ok) throw new Error('Failed to fetch employees');

	return response.json();
}