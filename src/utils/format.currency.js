const formatCurrency = (amount, settings) => {
  try {
    const formatter = new Intl.NumberFormat(settings.locale, {
      style: "currency",
      currency: settings.code,
      minimumFractionDigits: settings.decimals,
      maximumFractionDigits: settings.decimals,
    });

    const formatted = formatter.format(amount);

    if (!settings.show_symbol) {
      return formatted.replace(/[^\d.,]/g, "").trim();
    }

    if (settings.symbol_position === "after") {
      const numericPart = formatted.replace(/[^\d.,]/g, "").trim();
      const symbolPart = formatted.replace(/[\d.,\s]/g, "").trim();
      return `${numericPart} ${symbolPart}`;
    }

    if (settings.symbol_position === "before") {
      const numericPart = formatted.replace(/[^\d.,]/g, "").trim();
      const symbolPart = formatted.replace(/[\d.,\s]/g, "").trim();
      return `${symbolPart} ${numericPart}`;
    }

    return formatted;
  } catch (error) {
    return "Invalid format";
  }
};

export default formatCurrency;
