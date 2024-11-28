import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select from "react-select";

const CurrencySettings = () => {
  const currencyOptions = [
    { value: "USD", label: "US Dollar ($)", symbol: "$" },
    { value: "EUR", label: "Euro (€)", symbol: "€" },
    { value: "GBP", label: "British Pound (£)", symbol: "£" },
    { value: "JPY", label: "Japanese Yen (¥)", symbol: "¥" },
    { value: "INR", label: "Indian Rupee (₹)", symbol: "₹" },
  ];

  const numberFormatOptions = [
    { value: "standard", label: "Standard (1,234.56)" },
    { value: "european", label: "European (1.234,56)" },
    { value: "indian", label: "Indian (1,23,456.78)" },

    { value: "swiss", label: "Swiss (1'234.56)" },
    { value: "chinese", label: "Chinese (1,2345.67)" }, // Groups of 4
    { value: "japanese", label: "Japanese (1,2345.67)" }, // Groups of 4
    { value: "arabic", label: "Arabic (1٬234٫56)" }, // Different separators
    { value: "french", label: "French (1 234,56)" }, // Space as thousand separator
    { value: "swedish", label: "Swedish (1 234:56)" }, // Colon as decimal
    { value: "brazilian", label: "Brazilian (1.234,56)" },
    { value: "russian", label: "Russian (1 234,56)" },
  ];

  const negativeFormatOptions = [
    { value: "standard", label: "Standard (-$100.00)" },
    { value: "parentheses", label: "Parentheses ($100.00)" },
    { value: "redColor", label: "Red Color" },
  ];

  const initialValues = {
    // Basic Settings
    currency: currencyOptions[0],
    customSymbol: "",
    useCustomSymbol: false,
    symbolPosition: { value: "prefix", label: "Before amount ($100)" },

    // Number Formatting
    numberFormat: numberFormatOptions[0],
    thousandSeparator: { value: ",", label: "Comma (,)" },
    decimalSeparator: { value: ".", label: "Period (.)" },
    decimals: 2,

    // Display Options
    showCurrencyCode: false, // Shows USD, EUR etc.
    showSymbol: true,
    trimZeros: false, // Trim trailing zeros (100.00 -> 100)

    // Negative Number Display
    negativeFormat: negativeFormatOptions[0],

    // Regional Settings
    defaultLocale: { value: "en-US", label: "English (US)" },

    // Rounding Options
    roundingMethod: { value: "round", label: "Round to nearest" },

    // Advanced Formatting
    compactNumbers: false, // 1K, 1M, 1B
    showGrouping: true, // Show thousand separators
  };

  const validationSchema = Yup.object({
    decimals: Yup.number()
      .min(0, "Must be 0 or greater")
      .max(10, "Must be 10 or less")
      .required("Decimal places are required"),
    customSymbol: Yup.string().when("useCustomSymbol", {
      is: true,
      then: Yup.string().required("Custom symbol is required"),
    }),
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-8">
            {/* Basic Currency Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Basic Currency Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Currency Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Currency
                  </label>
                  <Select
                    options={currencyOptions}
                    value={values.currency}
                    onChange={(option) => setFieldValue("currency", option)}
                  />
                </div>

                {/* Custom Symbol Toggle */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <Field
                      type="checkbox"
                      name="useCustomSymbol"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Use Custom Symbol
                    </span>
                  </label>
                  {values.useCustomSymbol && (
                    <Field
                      name="customSymbol"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Number Formatting */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Number Formatting
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Format Style
                  </label>
                  <Select
                    options={numberFormatOptions}
                    value={values.numberFormat}
                    onChange={(option) => setFieldValue("numberFormat", option)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Decimal Places
                  </label>
                  <Field
                    name="decimals"
                    type="number"
                    min="0"
                    max="10"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Display Options */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Display Options
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <Field
                      type="checkbox"
                      name="showCurrencyCode"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Show Currency Code
                    </span>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <Field
                      type="checkbox"
                      name="compactNumbers"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Use Compact Numbers
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Preview
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Standard:</span>
                  <span>{formatAmount(1234.56, values)}</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Negative:</span>
                  <span>{formatAmount(-1234.56, values)}</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Large Number:</span>
                  <span>{formatAmount(1234567.89, values)}</span>
                </div>
                {values.compactNumbers && (
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>Compact:</span>
                    <span>{formatCompactNumber(1234567.89, values)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Settings
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// Helper formatting functions would go here
const numberFormatOptions = [
  { value: "standard", label: "Standard (1,234.56)" },
  { value: "european", label: "European (1.234,56)" },
  { value: "indian", label: "Indian (1,23,456.78)" },
  // Additional formats
  { value: "swiss", label: "Swiss (1'234.56)" },
  { value: "chinese", label: "Chinese (1,2345.67)" }, // Groups of 4
  { value: "japanese", label: "Japanese (1,2345.67)" }, // Groups of 4
  { value: "arabic", label: "Arabic (1٬234٫56)" }, // Different separators
  { value: "french", label: "French (1 234,56)" }, // Space as thousand separator
  { value: "swedish", label: "Swedish (1 234:56)" }, // Colon as decimal
  { value: "brazilian", label: "Brazilian (1.234,56)" },
  { value: "russian", label: "Russian (1 234,56)" },
];

// Update format function to handle new formats
const formatAmount = (amount, config) => {
  try {
    const {
      thousandSeparator,
      decimalSeparator,
      decimals,
      currency,
      numberFormat,
      // ... other config options
    } = config;

    // Get absolute value and determine sign
    const isNegative = amount < 0;
    const absoluteValue = Math.abs(amount);

    // Round to specified decimal places
    const roundedNumber = Number(absoluteValue.toFixed(decimals));

    // Split number into whole and decimal parts
    let [wholePart, decimalPart = ""] = roundedNumber.toString().split(".");

    // Format based on selected format
    switch (numberFormat.value) {
      case "indian":
        // Indian grouping (1,23,456)
        const digits = wholePart.split("").reverse();
        let formatted = [];
        digits.forEach((digit, index) => {
          if (index === 0) formatted.push(digit);
          else if (index === 3) formatted.push(thousandSeparator.value, digit);
          else if (index > 3 && (index - 3) % 2 === 0)
            formatted.push(thousandSeparator.value, digit);
          else formatted.push(digit);
        });
        wholePart = formatted.reverse().join("");
        break;

      case "chinese":
      case "japanese":
        // Group by 4 digits
        const digits4 = wholePart.split("").reverse();
        let formatted4 = [];
        digits4.forEach((digit, index) => {
          if (index > 0 && index % 4 === 0) {
            formatted4.push(thousandSeparator.value);
          }
          formatted4.push(digit);
        });
        wholePart = formatted4.reverse().join("");
        break;

      case "swiss":
        // Swiss format uses apostrophe
        const digitsSwiss = wholePart.split("").reverse();
        let formattedSwiss = [];
        digitsSwiss.forEach((digit, index) => {
          if (index > 0 && index % 3 === 0) {
            formattedSwiss.push("'");
          }
          formattedSwiss.push(digit);
        });
        wholePart = formattedSwiss.reverse().join("");
        break;

      case "arabic":
        // Arabic format with different separators
        const arabicSeparators = {
          thousand: "٬",
          decimal: "٫",
        };
        const digitsArabic = wholePart.split("").reverse();
        let formattedArabic = [];
        digitsArabic.forEach((digit, index) => {
          if (index > 0 && index % 3 === 0) {
            formattedArabic.push(arabicSeparators.thousand);
          }
          formattedArabic.push(digit);
        });
        wholePart = formattedArabic.reverse().join("");
        decimalSeparator.value = arabicSeparators.decimal;
        break;

      case "french":
      case "russian":
        // Space as thousand separator
        const digitsSpace = wholePart.split("").reverse();
        let formattedSpace = [];
        digitsSpace.forEach((digit, index) => {
          if (index > 0 && index % 3 === 0) {
            formattedSpace.push(" ");
          }
          formattedSpace.push(digit);
        });
        wholePart = formattedSpace.reverse().join("");
        break;

      case "swedish":
        // Swedish format uses colon as decimal
        const digitsSwedish = wholePart.split("").reverse();
        let formattedSwedish = [];
        digitsSwedish.forEach((digit, index) => {
          if (index > 0 && index % 3 === 0) {
            formattedSwedish.push(" ");
          }
          formattedSwedish.push(digit);
        });
        wholePart = formattedSwedish.reverse().join("");
        decimalSeparator.value = ":";
        break;

      default:
        // Standard grouping (1,234,567)
        const digitsStandard = wholePart.split("").reverse();
        let formattedStandard = [];
        digitsStandard.forEach((digit, index) => {
          if (index > 0 && index % 3 === 0) {
            formattedStandard.push(thousandSeparator.value);
          }
          formattedStandard.push(digit);
        });
        wholePart = formattedStandard.reverse().join("");
    }

    // Pad decimal part if needed
    if (decimals > 0) {
      decimalPart = decimalPart.padEnd(decimals, "0");
    }

    // Combine whole and decimal parts
    let formattedNumber =
      decimals > 0
        ? `${wholePart}${decimalSeparator.value}${decimalPart}`
        : wholePart;

    // Add currency symbol and handle negative numbers
    const symbol = config.useCustomSymbol
      ? config.customSymbol
      : currency.symbol;
    let finalAmount = isNegative
      ? `-${symbol}${formattedNumber}`
      : `${symbol}${formattedNumber}`;

    // Handle symbol position
    if (config.symbolPosition?.value === "suffix") {
      finalAmount = finalAmount.replace(symbol, "") + symbol;
    }

    return finalAmount;
  } catch (error) {
    console.error("Error formatting number:", error);
    return amount.toString();
  }
};

const formatCompactNumber = (amount, config) => {
  try {
    const {
      currency,
      useCustomSymbol,
      customSymbol,
      symbolPosition,
      decimals,
      numberFormat,
      thousandSeparator,
      decimalSeparator,
      showCurrencyCode,
    } = config;

    const isNegative = amount < 0;
    const absoluteValue = Math.abs(amount);
    const symbol = useCustomSymbol ? customSymbol : currency.symbol;

    // Define thresholds and suffixes based on format
    const suffixes = {
      standard: {
        1e12: "T",
        1e9: "B",
        1e6: "M",
        1e3: "K",
      },
      european: {
        1e12: "T",
        1e9: "Mrd",
        1e6: "Mio",
        1e3: "Tsd",
      },
      french: {
        1e12: "T",
        1e9: "Mrd",
        1e6: "M",
        1e3: "k",
      },
      chinese: {
        1e12: "兆",
        1e8: "亿",
        1e4: "万",
      },
      japanese: {
        1e12: "兆",
        1e8: "億",
        1e4: "万",
      },
      indian: {
        1e12: "T",
        1e9: "B",
        1e7: "Cr",
        1e5: "L",
        1e3: "K",
      },
      arabic: {
        1e12: "ت",
        1e9: "م",
        1e6: "مل",
        1e3: "أ",
      },
    };

    // Select suffix set based on format
    let formatSuffixes;
    switch (numberFormat.value) {
      case "chinese":
        formatSuffixes = suffixes.chinese;
        break;
      case "japanese":
        formatSuffixes = suffixes.japanese;
        break;
      case "indian":
        formatSuffixes = suffixes.indian;
        break;
      case "arabic":
        formatSuffixes = suffixes.arabic;
        break;
      case "european":
      case "swiss":
      case "swedish":
      case "brazilian":
        formatSuffixes = suffixes.european;
        break;
      case "french":
      case "russian":
        formatSuffixes = suffixes.french;
        break;
      default:
        formatSuffixes = suffixes.standard;
    }

    // Find appropriate threshold and suffix
    let number = absoluteValue;
    let suffix = "";

    for (const threshold of Object.keys(formatSuffixes)
      .map(Number)
      .sort((a, b) => b - a)) {
      if (absoluteValue >= threshold) {
        number = absoluteValue / threshold;
        suffix = formatSuffixes[threshold];
        break;
      }
    }

    // Round to specified decimal places
    number = Number(number.toFixed(decimals));

    // Split number for formatting
    let [wholePart, decimalPart = ""] = number.toString().split(".");

    // Apply thousand separator formatting based on selected format
    switch (numberFormat.value) {
      case "indian":
        // Indian grouping for the whole part
        const digitsIndian = wholePart.split("").reverse();
        let formattedIndian = [];
        digitsIndian.forEach((digit, index) => {
          if (index === 0) formattedIndian.push(digit);
          else if (index === 3)
            formattedIndian.push(thousandSeparator.value, digit);
          else if (index > 3 && (index - 3) % 2 === 0)
            formattedIndian.push(thousandSeparator.value, digit);
          else formattedIndian.push(digit);
        });
        wholePart = formattedIndian.reverse().join("");
        break;

      case "chinese":
      case "japanese":
        // No thousand separators for Chinese/Japanese formats
        break;

      case "swiss":
        // Swiss apostrophe separator
        wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
        break;

      case "french":
      case "russian":
        // Space as thousand separator
        wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        break;

      default:
        // Standard grouping
        if (wholePart.length > 3) {
          wholePart = wholePart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            thousandSeparator.value
          );
        }
    }

    // Get the appropriate decimal separator
    let finalDecimalSeparator = decimalSeparator.value;
    if (numberFormat.value === "swedish") {
      finalDecimalSeparator = ":";
    } else if (numberFormat.value === "arabic") {
      finalDecimalSeparator = "٫";
    }

    // Combine parts
    let formattedNumber =
      decimals > 0 && decimalPart
        ? `${wholePart}${finalDecimalSeparator}${decimalPart}`
        : wholePart;

    // Add suffix
    formattedNumber = `${formattedNumber}${suffix}`;

    // Handle negative numbers and symbol placement
    let finalAmount = isNegative
      ? `-${symbol}${formattedNumber}`
      : `${symbol}${formattedNumber}`;

    // Handle symbol position
    if (symbolPosition.value === "suffix") {
      finalAmount = finalAmount.replace(symbol, "") + symbol;
    }

    // Add currency code if enabled
    if (showCurrencyCode) {
      finalAmount = `${finalAmount} ${currency.value}`;
    }

    return finalAmount;
  } catch (error) {
    console.error("Error formatting compact number:", error);
    return amount.toString();
  }
};

export default CurrencySettings;
