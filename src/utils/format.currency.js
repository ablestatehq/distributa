const formatCurrency = (
  amount,
  settings,
  prefix = "",
  compact = false,
  compactThreshold = 1000
) => {
  try {
    const absoluteAmount = Math.abs(amount) ? Math.abs(amount) : amount;

    const baseFormatOptions = {
      style: "currency",
      currency: settings.code,
      signDisplay: prefix ? "always" : "never",
      currencyDisplay: "symbol",
    };

    const compactFormatter = new Intl.NumberFormat(settings.locale, {
      ...baseFormatOptions,
      notation: "compact",
      compactDisplay: "short",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });

    const regularFormatter = new Intl.NumberFormat(settings.locale, {
      ...baseFormatOptions,
      minimumFractionDigits: settings.decimals,
      maximumFractionDigits: settings.decimals,
    });

    const formatter =
      absoluteAmount >= compactThreshold && compact
        ? compactFormatter
        : regularFormatter;

    let formatted = formatter.format(
      prefix === "-" ? 0 - absoluteAmount : absoluteAmount
    );

    if (settings.symbol_position === "after") {
      const symbol = formatted.replace(/[\d\s,.()-KMBkmb]/g, "");
      const numberPart = formatted.replace(symbol, "").trim();
      const matches = numberPart.match(/^([\d,.()-]+)\s*([KMBkmb])?$/);

      if (matches) {
        const [, number, compactSuffix] = matches;
        formatted = `${number}${
          compactSuffix ? `${compactSuffix}` : ""
        } ${symbol}`;
      }
    }

    return formatted;
  } catch (error) {
    return "Invalid format";
  }
};

export default formatCurrency;
