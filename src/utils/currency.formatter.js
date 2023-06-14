export const ugandaShillings = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'UGX',
});

export const currencyFormatter = (amount, countryCode='UGX', languageCode='en-US') => {
    const formatter = new Intl.NumberFormat(languageCode, {
        style: 'currency',
        currency: countryCode,
    });

    return formatter.format(amount)
}