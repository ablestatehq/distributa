const formatCurrency = (amount, settings, prefix = "") => {
  try {
    const absoluteAmount = Math.abs(amount) ? Math.abs(amount) : amount;

    const compactFormatter = new Intl.NumberFormat(settings.locale, {
      style: "currency",
      currency: settings.code,
      notation: "compact",
      compactDisplay: "short",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      signDisplay: prefix ? "always" : "never",
    });

    const regularFormatter = new Intl.NumberFormat(settings.locale, {
      style: "currency",
      currency: settings.code,
      minimumFractionDigits: settings.decimals,
      maximumFractionDigits: settings.decimals,
      signDisplay: prefix ? "always" : "never",
    });

    const formatter =
      absoluteAmount >= 1000 ? compactFormatter : regularFormatter;
    const formatted = formatter.format(
      prefix === "-" ? 0 - absoluteAmount : absoluteAmount
    );

    return formatted;
  } catch (error) {
    return "Invalid format";
  }
};

export default formatCurrency;
