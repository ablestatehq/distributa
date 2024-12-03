import React from "react";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import { CURRENCY_LOCALE_MAP } from "../../data/constants";
import { toast } from "react-toastify";
import cn from "../../utils/cn";
import { CommonSelect, CurrencySelect } from "../../components/common/forms";
import { Button } from "../../components/common/forms";
import { useFetcher, useLoaderData, Await } from "react-router-dom";

const CurrencySettingsSchema = Yup.object().shape({
  preferredCurrency: Yup.object().shape({
    code: Yup.string().required("Currency code is required"),
    locale: Yup.string().required("Locale is required"),
    decimals: Yup.number()
      .min(0, "Must be greater or equal to zero")
      .max(3, "Must be less than 3")
      .required("Decimal places are required"),
    show_symbol: Yup.boolean(),
    symbol_position: Yup.string().oneOf(["before", "after"]),
  }),
  availableCurrencies: Yup.array()
    .of(
      Yup.object().shape({
        code: Yup.string().required(),
        locale: Yup.string().required(),
        decimals: Yup.number().min(0).max(3).required(),
        show_symbol: Yup.boolean(),
        symbol_position: Yup.string().oneOf(["before", "after"]),
      })
    )
    .min(1, "At least one currency must be selected"),
});

const CurrencySettings = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const fetcher = useFetcher();
  const loaderData = useLoaderData();

  const filteredCurrencies = React.useMemo(() => {
    return Object.entries(CURRENCY_LOCALE_MAP).filter(([code, currency]) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        code.toLowerCase().includes(searchLower) ||
        currency.name.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      fetcher.submit(JSON.stringify(values), {
        method: "POST",
        action: "/settings/currency",
        encType: "application/json",
      });
    } catch (error) {
      toast.error("Failed to save currency settings");
    }
  };

  React.useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        toast.success("Currency settings saved successfully");
      } else if (fetcher.data.success === false) {
        toast.error(fetcher.data.message || "An error occurred");
      }
    }
  }, [fetcher.data]);

  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <Await resolve={loaderData?.currencySettings}>
        {(data) => {
          const initialValues = {
            preferredCurrency:
              data.preferredCurrency?.total === 1
                ? data.preferredCurrency.documents[0]
                : {
                    code: "",
                    locale: "",
                    decimals: 2,
                    show_symbol: true,
                    symbol_position: "before",
                  },
            availableCurrencies: data.availableCurrencies.documents,
          };

          return (
            <div className="max-w-4xl pt-2 w-full">
              <Formik
                initialValues={initialValues}
                validationSchema={CurrencySettingsSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                  <Form>
                    <div className="bg-white rounded-lg">
                      <header className="py-4 border-b border-b-greyborder">
                        <h2 className="font-archivo font-normal text-lg lg:text-xl leading-110 tracking-normal">
                          Currency Settings
                        </h2>
                        <p className="font-satoshi text-tiny leading-150 tracking-normal mt-1">
                          Configure your preferred currency and available
                          currency options
                        </p>
                      </header>

                      <section className="py-4 border-b border-gray-200">
                        <h3 className="font-archivo font-normal text-medium leading-150 tracking-normal mb-4">
                          Preferred Currency
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <CurrencySelect
                            label="Currency"
                            as="select"
                            id="preferredCurrency.code"
                            name="preferredCurrency.code"
                            optionData={
                              Object.entries(CURRENCY_LOCALE_MAP).map(
                                ([code, currency]) => ({
                                  value: code,
                                  label: `${currency.name} (${code})`,
                                })
                              ) || []
                            }
                            onChange={(selectedOption) => {
                              const { value: code } = selectedOption;
                              const currency = CURRENCY_LOCALE_MAP[code];
                              setFieldValue("preferredCurrency", {
                                code,
                                locale: currency.defaultLocale,
                                decimals: currency.defaultDecimals,
                                show_symbol: true,
                                symbol_position: "before",
                              });
                            }}
                          />
                          <CommonSelect
                            label="Format"
                            as="select"
                            id="preferredCurrency.locale"
                            name="preferredCurrency.locale"
                            optionData={
                              values?.preferredCurrency?.code
                                ? CURRENCY_LOCALE_MAP[
                                    values.preferredCurrency.code
                                  ]?.locales.map((locale) => ({
                                    value: locale.code,
                                    label: locale.name,
                                  }))
                                : []
                            }
                            value={values.preferredCurrency.locale}
                          />

                          <div className="w-full flex flex-col gap-y-2">
                            <label
                              htmlFor="preferredCurrency.decimals"
                              className="font-satoshi font-normal text-small leading-100 tracking-normal"
                            >
                              Decimal Places
                            </label>
                            <Field
                              type="number"
                              name="preferredCurrency.decimals"
                              min="0"
                              max="3"
                              className={cn(
                                "w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0",
                                {
                                  "border-error focus:border-error":
                                    touched?.preferredCurrency?.decimals &&
                                    errors?.preferredCurrency?.decimals,
                                }
                              )}
                            />
                            <ErrorMessage name="preferredCurrency.decimals">
                              {(msg) => (
                                <div className="font-normal font-satoshi text-tiny tracking-normal leading-150 text-error">
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </div>

                          <div className="flex items-center">
                            <Field
                              type="checkbox"
                              name="preferredCurrency.show_symbol"
                              className="h-4 w-4 text-accent-600 focus:border-accent-600 border-greyborder rounded-full"
                            />
                            <label className="ml-2 font-satoshi font-normal text-small leading-100 tracking-normal">
                              Show Currency Symbol
                            </label>
                          </div>

                          {values.preferredCurrency.show_symbol && (
                            <CommonSelect
                              label="Symbol Position"
                              as="select"
                              id="preferredCurrency.symbol_position"
                              name="preferredCurrency.symbol_position"
                              optionData={[
                                { value: "before", label: "Before" },
                                { value: "after", label: "After" },
                              ]}
                              value={values.preferredCurrency.locale}
                            />
                          )}
                        </div>

                        <div className="mt-4 p-4 bg-grey rounded-md">
                          <h4 className="font-archivo font-normal leading-140 text-medium tracking-normal opacity-60">
                            Preview
                          </h4>
                          <div className="font-satoshi font-normal text-large leading-150 tracking-normal">
                            {values?.preferredCurrency?.code
                              ? formatCurrency(
                                  1234567.89,
                                  values.preferredCurrency
                                )
                              : "Select a currency to preview"}
                          </div>
                        </div>
                      </section>

                      {/* Available Currencies Section */}
                      <div className="py-4">
                        <h3 className="font-archivo font-normal text-medium leading-150 tracking-normal mb-4">
                          Available Currencies
                        </h3>

                        <div className="relative mb-4">
                          <input
                            type="text"
                            placeholder="Search currencies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-greyborder focus:border-accent p-3 bg-white font-satoshi font-normal text-tiny outline-none placeholder-black leading-100 tracking-0 appearance-none resize-none"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2 mb-5">
                          <h4 className="font-archivo font-normal text-small leading-150 tracking-normal mb-4">
                            Selected Currencies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {values.availableCurrencies.map((currency) => (
                              <span
                                key={currency.code}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {currency.code}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newCurrencies =
                                      values.availableCurrencies.filter(
                                        (c) => c.code !== currency.code
                                      );
                                    setFieldValue(
                                      "availableCurrencies",
                                      newCurrencies
                                    );
                                  }}
                                  className="ml-1.5 inline-flex items-center justify-center"
                                >
                                  <span className="sr-only">Remove</span>
                                  <svg
                                    className="h-3 w-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="border border-grey overflow-hidden">
                          <div className="max-h-96 overflow-y-auto">
                            {filteredCurrencies.map(([code, currency]) => (
                              <div
                                key={code}
                                className="flex items-center px-4 py-3 hover:bg-gray-50 border-b border-grey last:border-b-0"
                              >
                                <Field
                                  type="checkbox"
                                  name="availableCurrencies"
                                  value={code}
                                  className="h-4 w-4 text-accent ring-none focus:border focus:border-accent border-gray-300 rounded cursor-pointer"
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const currentCurrencies = [
                                      ...values.availableCurrencies,
                                    ];

                                    if (isChecked) {
                                      currentCurrencies.push({
                                        code,
                                        locale:
                                          CURRENCY_LOCALE_MAP[code]
                                            .defaultLocale,
                                        decimals:
                                          CURRENCY_LOCALE_MAP[code]
                                            .defaultDecimals,
                                        show_symbol: true,
                                        symbol_position: "before",
                                      });
                                    } else {
                                      setFieldValue(
                                        "availableCurrencies",
                                        currentCurrencies.filter(
                                          (c) => c.code !== code
                                        )
                                      );
                                      return;
                                    }

                                    setFieldValue(
                                      "availableCurrencies",
                                      currentCurrencies
                                    );
                                  }}
                                  checked={values.availableCurrencies.some(
                                    (c) => c.code === code
                                  )}
                                />
                                <div className="ml-3 flex-1">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-satoshi font-normal text-tiny leading-150 tracking-normal text-gray-900">
                                        {currency.name}
                                      </p>
                                      <p className="font-archivo font-normal text-small leading-150 tracking-normal text-gray-500">
                                        {code}
                                      </p>
                                    </div>
                                    <span className="font-satoshi font-normal text-medium leading-150 tracking-normal text-gray-500">
                                      {currency.symbol}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {errors.availableCurrencies &&
                          touched.availableCurrencies && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.availableCurrencies}
                            </div>
                          )}
                      </div>

                      <div className="py-4 border-t border-greyborder">
                        <Button
                          type="submit"
                          className="font-bold text-small px-6"
                          disabled={fetcher.state === "submitting"}
                        >
                          {fetcher.state === "submitting"
                            ? "Saving..."
                            : "Save Currency Settings"}
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          );
        }}
      </Await>
    </React.Suspense>
  );
};

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

export default CurrencySettings;
