const addThousandSeparators = (input) => {
	const inputValue = input.value.replace(/,/g, "");
	const numericValue = parseFloat(inputValue);

	if (typeof numericValue !== "number") return;

	if (numericValue >= 1000) {
		const formattedValue = numericValue.toLocaleString();

		input.value = formattedValue;
	}
};

export default addThousandSeparators;
