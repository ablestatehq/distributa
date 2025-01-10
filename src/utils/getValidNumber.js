const getValidNumber = (value) => (isNaN(Number(value)) ? 0 : Number(value));
export default getValidNumber;
