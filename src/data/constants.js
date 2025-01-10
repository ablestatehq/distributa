export const {
  // Project
  VITE_APPWRITE_API_ENDPOINT: API_ENDPOINT,
  VITE_APPWRITE_API_PROJECT_ID: PROJECT_ID,

  // Databases
  VITE_APPWRITE_DATABASE_ID: DATABASE_ID,

  // Teams
  VITE_APPWRITE_SYSTEM_TEAM_ID: SYSTEM_TEAM_ID,

  // Collections
  VITE_APPWRITE_INVOICES_COLLECTION_ID: INVOICES_COLLECTION_ID,
  VITE_APPWRITE_DISTRIBUTIONS_COLLECTION_ID: DISTRIBUTIONS_COLLECTION_ID,
  VITE_APPWRITE_BILLING_ADDRESS_COLLECTION_ID: BILLING_ADDRESS_COLLECTION_ID,
  VITE_APPRWITE_TRANSACTIONS_COLLECTION_ID: TRANSACTIONS_COLLECTION_ID,
  VITE_APPWRITE_MONTHLY_STATEMENTS_COLLECTION_ID:
    MONTHLY_STATEMENTS_COLLECTION_ID,
  VITE_APPWRITE_ACCOUNT_SUMMARIES_COLLECTION_ID:
    ACCOUNT_SUMMARIES_COLLECTION_ID,
  VITE_APPWRITE_CATEGORIES_COLLECTION_ID: CATEGORIES_COLLECTION_ID,
  VITE_APPWRITE_MONTHLY_CATEGORY_TOTALS_COLLECTION_ID:
    MONTHLY_CATEGORY_TOTALS_COLLECTION_ID,
  VITE_APPWRITE_SHARED_INVOICES_COLLECTION_ID: SHARED_INVOICES_COLLECTION_ID,
  VITE_APPRWITE_ITEMS_COLLECTION_ID: ITEMS_COLLECTION_ID,
  VITE_APPWRITE_ORGANISATIONS_COLLECTION_ID: ORGANISTIONS_COLLECTION_ID,
  VITE_APPWRITE_PROFILES_COLLECTION_ID: PROFILES_COLLECTION_ID,
  VITE_APPWRITE_PARTIES_COLLECTION_ID: PARTIES_COLLECTION_ID,
  VITE_APPWRITE_CURRENCY_PREFERENCES_COLLECTION_ID:
    CURRENCY_PREFERENCES_COLLECTION_ID,

  // Buckets
  VITE_APPWRITE_LOGOS_BUCKET_ID: LOGOS_BUCKET_ID,
  VITE_APPWRITE_AVATARS_BUCKET_ID: AVATARS_BUCKET_ID,

  // Functions
  VITE_APPWRITE_SEND_EMAIL_FUNCTION_ID: SEND_EMAIL_FUNCTION_ID,

  // Frontend URL
  VITE_FRONTEND_URL: FRONTEND_URL,
} = import.meta.env;

// Part 1 of the comprehensive currency locale mapping
export const CURRENCY_LOCALE_MAP = {
  AED: {
    name: "UAE Dirham",
    symbol: "د.إ",
    locales: [
      { code: "ar-AE", name: "Arabic (UAE)" },
      { code: "en-AE", name: "English (UAE)" },
    ],
    defaultLocale: "ar-AE",
    defaultDecimals: 2,
  },
  AFN: {
    name: "Afghan Afghani",
    symbol: "؋",
    locales: [
      { code: "ps-AF", name: "Pashto (Afghanistan)" },
      { code: "fa-AF", name: "Dari (Afghanistan)" },
    ],
    defaultLocale: "ps-AF",
    defaultDecimals: 2,
  },
  ALL: {
    name: "Albanian Lek",
    symbol: "L",
    locales: [{ code: "sq-AL", name: "Albanian" }],
    defaultLocale: "sq-AL",
    defaultDecimals: 2,
  },
  AMD: {
    name: "Armenian Dram",
    symbol: "֏",
    locales: [{ code: "hy-AM", name: "Armenian" }],
    defaultLocale: "hy-AM",
    defaultDecimals: 2,
  },
  ANG: {
    name: "Netherlands Antillean Guilder",
    symbol: "ƒ",
    locales: [
      { code: "nl-CW", name: "Dutch (Curaçao)" },
      { code: "nl-SX", name: "Dutch (Sint Maarten)" },
    ],
    defaultLocale: "nl-CW",
    defaultDecimals: 2,
  },
  AOA: {
    name: "Angolan Kwanza",
    symbol: "Kz",
    locales: [{ code: "pt-AO", name: "Portuguese (Angola)" }],
    defaultLocale: "pt-AO",
    defaultDecimals: 2,
  },
  ARS: {
    name: "Argentine Peso",
    symbol: "$",
    locales: [{ code: "es-AR", name: "Spanish (Argentina)" }],
    defaultLocale: "es-AR",
    defaultDecimals: 2,
  },
  AUD: {
    name: "Australian Dollar",
    symbol: "A$",
    locales: [
      { code: "en-AU", name: "English (Australia)" },
      { code: "en-CX", name: "English (Christmas Island)" },
      { code: "en-CC", name: "English (Cocos Islands)" },
      { code: "en-HM", name: "English (Heard & McDonald Islands)" },
      { code: "en-KI", name: "English (Kiribati)" },
      { code: "en-NF", name: "English (Norfolk Island)" },
      { code: "en-NR", name: "English (Nauru)" },
      { code: "en-TV", name: "English (Tuvalu)" },
    ],
    defaultLocale: "en-AU",
    defaultDecimals: 2,
  },
  AWG: {
    name: "Aruban Florin",
    symbol: "ƒ",
    locales: [
      { code: "nl-AW", name: "Dutch (Aruba)" },
      { code: "pap-AW", name: "Papiamento (Aruba)" },
    ],
    defaultLocale: "nl-AW",
    defaultDecimals: 2,
  },
  AZN: {
    name: "Azerbaijani Manat",
    symbol: "₼",
    locales: [{ code: "az-AZ", name: "Azerbaijani" }],
    defaultLocale: "az-AZ",
    defaultDecimals: 2,
  },
  BAM: {
    name: "Bosnia-Herzegovina Convertible Mark",
    symbol: "KM",
    locales: [
      { code: "bs-BA", name: "Bosnian" },
      { code: "hr-BA", name: "Croatian (Bosnia)" },
      { code: "sr-BA", name: "Serbian (Bosnia)" },
    ],
    defaultLocale: "bs-BA",
    defaultDecimals: 2,
  },
  BBD: {
    name: "Barbadian Dollar",
    symbol: "Bds$",
    locales: [{ code: "en-BB", name: "English (Barbados)" }],
    defaultLocale: "en-BB",
    defaultDecimals: 2,
  },
  BDT: {
    name: "Bangladeshi Taka",
    symbol: "৳",
    locales: [{ code: "bn-BD", name: "Bengali (Bangladesh)" }],
    defaultLocale: "bn-BD",
    defaultDecimals: 2,
  },
  BGN: {
    name: "Bulgarian Lev",
    symbol: "лв",
    locales: [{ code: "bg-BG", name: "Bulgarian" }],
    defaultLocale: "bg-BG",
    defaultDecimals: 2,
  },
  BHD: {
    name: "Bahraini Dinar",
    symbol: ".د.ب",
    locales: [{ code: "ar-BH", name: "Arabic (Bahrain)" }],
    defaultLocale: "ar-BH",
    defaultDecimals: 3, // Note: Bahraini Dinar uses 3 decimal places
  },
  BIF: {
    name: "Burundian Franc",
    symbol: "FBu",
    locales: [
      { code: "rn-BI", name: "Kirundi" },
      { code: "fr-BI", name: "French (Burundi)" },
    ],
    defaultLocale: "fr-BI",
    defaultDecimals: 0,
  },
  BMD: {
    name: "Bermudian Dollar",
    symbol: "BD$",
    locales: [{ code: "en-BM", name: "English (Bermuda)" }],
    defaultLocale: "en-BM",
    defaultDecimals: 2,
  },
  BND: {
    name: "Brunei Dollar",
    symbol: "B$",
    locales: [
      { code: "ms-BN", name: "Malay (Brunei)" },
      { code: "en-BN", name: "English (Brunei)" },
    ],
    defaultLocale: "ms-BN",
    defaultDecimals: 2,
  },
  BOB: {
    name: "Bolivian Boliviano",
    symbol: "Bs.",
    locales: [
      { code: "es-BO", name: "Spanish (Bolivia)" },
      { code: "ay-BO", name: "Aymara (Bolivia)" },
      { code: "qu-BO", name: "Quechua (Bolivia)" },
    ],
    defaultLocale: "es-BO",
    defaultDecimals: 2,
  },
  BRL: {
    name: "Brazilian Real",
    symbol: "R$",
    locales: [{ code: "pt-BR", name: "Portuguese (Brazil)" }],
    defaultLocale: "pt-BR",
    defaultDecimals: 2,
  },
  BSD: {
    name: "Bahamian Dollar",
    symbol: "B$",
    locales: [{ code: "en-BS", name: "English (Bahamas)" }],
    defaultLocale: "en-BS",
    defaultDecimals: 2,
  },
  BTN: {
    name: "Bhutanese Ngultrum",
    symbol: "Nu.",
    locales: [{ code: "dz-BT", name: "Dzongkha" }],
    defaultLocale: "dz-BT",
    defaultDecimals: 2,
  },
  BWP: {
    name: "Botswanan Pula",
    symbol: "P",
    locales: [
      { code: "en-BW", name: "English (Botswana)" },
      { code: "tn-BW", name: "Tswana" },
    ],
    defaultLocale: "en-BW",
    defaultDecimals: 2,
  },
  BYN: {
    name: "Belarusian Ruble",
    symbol: "Br",
    locales: [
      { code: "be-BY", name: "Belarusian" },
      { code: "ru-BY", name: "Russian (Belarus)" },
    ],
    defaultLocale: "be-BY",
    defaultDecimals: 2,
  },
  BZD: {
    name: "Belize Dollar",
    symbol: "BZ$",
    locales: [{ code: "en-BZ", name: "English (Belize)" }],
    defaultLocale: "en-BZ",
    defaultDecimals: 2,
  },
  CAD: {
    name: "Canadian Dollar",
    symbol: "CA$",
    locales: [
      { code: "en-CA", name: "English (Canada)" },
      { code: "fr-CA", name: "French (Canada)" },
      { code: "iu-CA", name: "Inuktitut (Canada)" },
    ],
    defaultLocale: "en-CA",
    defaultDecimals: 2,
  },
  CDF: {
    name: "Congolese Franc",
    symbol: "FC",
    locales: [
      { code: "fr-CD", name: "French (DR Congo)" },
      { code: "ln-CD", name: "Lingala (DR Congo)" },
      { code: "sw-CD", name: "Swahili (DR Congo)" },
    ],
    defaultLocale: "fr-CD",
    defaultDecimals: 2,
  },
  CHF: {
    name: "Swiss Franc",
    symbol: "CHF",
    locales: [
      { code: "de-CH", name: "German (Switzerland)" },
      { code: "fr-CH", name: "French (Switzerland)" },
      { code: "it-CH", name: "Italian (Switzerland)" },
      { code: "rm-CH", name: "Romansh" },
    ],
    defaultLocale: "de-CH",
    defaultDecimals: 2,
  },
  CLP: {
    name: "Chilean Peso",
    symbol: "$",
    locales: [{ code: "es-CL", name: "Spanish (Chile)" }],
    defaultLocale: "es-CL",
    defaultDecimals: 0, // Chilean Peso doesn't use decimal places
  },
  CNY: {
    name: "Chinese Yuan",
    symbol: "¥",
    locales: [
      { code: "zh-CN", name: "Chinese (Simplified)" },
      { code: "zh-Hans-CN", name: "Chinese (Simplified, China)" },
      { code: "bo-CN", name: "Tibetan (China)" },
      { code: "ug-CN", name: "Uyghur" },
    ],
    defaultLocale: "zh-CN",
    defaultDecimals: 2,
  },
  COP: {
    name: "Colombian Peso",
    symbol: "$",
    locales: [{ code: "es-CO", name: "Spanish (Colombia)" }],
    defaultLocale: "es-CO",
    defaultDecimals: 2,
  },
  CRC: {
    name: "Costa Rican Colón",
    symbol: "₡",
    locales: [{ code: "es-CR", name: "Spanish (Costa Rica)" }],
    defaultLocale: "es-CR",
    defaultDecimals: 2,
  },
  CUC: {
    name: "Cuban Convertible Peso",
    symbol: "CUC$",
    locales: [{ code: "es-CU", name: "Spanish (Cuba)" }],
    defaultLocale: "es-CU",
    defaultDecimals: 2,
  },
  CUP: {
    name: "Cuban Peso",
    symbol: "$MN",
    locales: [{ code: "es-CU", name: "Spanish (Cuba)" }],
    defaultLocale: "es-CU",
    defaultDecimals: 2,
  },
  CVE: {
    name: "Cape Verdean Escudo",
    symbol: "$",
    locales: [{ code: "pt-CV", name: "Portuguese (Cape Verde)" }],
    defaultLocale: "pt-CV",
    defaultDecimals: 2,
  },
  CZK: {
    name: "Czech Koruna",
    symbol: "Kč",
    locales: [{ code: "cs-CZ", name: "Czech" }],
    defaultLocale: "cs-CZ",
    defaultDecimals: 2,
  },
  DJF: {
    name: "Djiboutian Franc",
    symbol: "Fdj",
    locales: [
      { code: "fr-DJ", name: "French (Djibouti)" },
      { code: "ar-DJ", name: "Arabic (Djibouti)" },
    ],
    defaultLocale: "fr-DJ",
    defaultDecimals: 0, // Djiboutian Franc doesn't use decimal places
  },
  DKK: {
    name: "Danish Krone",
    symbol: "kr",
    locales: [
      { code: "da-DK", name: "Danish" },
      { code: "fo-FO", name: "Faroese" },
      { code: "kl-GL", name: "Kalaallisut (Greenland)" },
    ],
    defaultLocale: "da-DK",
    defaultDecimals: 2,
  },
  DOP: {
    name: "Dominican Peso",
    symbol: "RD$",
    locales: [{ code: "es-DO", name: "Spanish (Dominican Republic)" }],
    defaultLocale: "es-DO",
    defaultDecimals: 2,
  },
  DZD: {
    name: "Algerian Dinar",
    symbol: "د.ج",
    locales: [
      { code: "ar-DZ", name: "Arabic (Algeria)" },
      { code: "fr-DZ", name: "French (Algeria)" },
    ],
    defaultLocale: "ar-DZ",
    defaultDecimals: 2,
  },
  EGP: {
    name: "Egyptian Pound",
    symbol: "ج.م",
    locales: [{ code: "ar-EG", name: "Arabic (Egypt)" }],
    defaultLocale: "ar-EG",
    defaultDecimals: 2,
  },
  ERN: {
    name: "Eritrean Nakfa",
    symbol: "Nfk",
    locales: [
      { code: "ti-ER", name: "Tigrinya" },
      { code: "ar-ER", name: "Arabic (Eritrea)" },
    ],
    defaultLocale: "ti-ER",
    defaultDecimals: 2,
  },
  ETB: {
    name: "Ethiopian Birr",
    symbol: "Br",
    locales: [
      { code: "am-ET", name: "Amharic" },
      { code: "om-ET", name: "Oromo" },
    ],
    defaultLocale: "am-ET",
    defaultDecimals: 2,
  },
  EUR: {
    name: "Euro",
    symbol: "€",
    locales: [
      { code: "de-DE", name: "German (Germany)" },
      { code: "fr-FR", name: "French (France)" },
      { code: "it-IT", name: "Italian (Italy)" },
      { code: "es-ES", name: "Spanish (Spain)" },
      { code: "pt-PT", name: "Portuguese (Portugal)" },
      { code: "nl-NL", name: "Dutch (Netherlands)" },
      { code: "el-GR", name: "Greek (Greece)" },
      { code: "fi-FI", name: "Finnish (Finland)" },
      { code: "et-EE", name: "Estonian" },
      { code: "lv-LV", name: "Latvian" },
      { code: "lt-LT", name: "Lithuanian" },
      { code: "sk-SK", name: "Slovak" },
      { code: "sl-SI", name: "Slovenian" },
      { code: "ga-IE", name: "Irish" },
      { code: "mt-MT", name: "Maltese" },
    ],
    defaultLocale: "de-DE",
    defaultDecimals: 2,
  },
  FJD: {
    name: "Fijian Dollar",
    symbol: "FJ$",
    locales: [
      { code: "en-FJ", name: "English (Fiji)" },
      { code: "fj-FJ", name: "Fijian" },
    ],
    defaultLocale: "en-FJ",
    defaultDecimals: 2,
  },
  FKP: {
    name: "Falkland Islands Pound",
    symbol: "£",
    locales: [{ code: "en-FK", name: "English (Falkland Islands)" }],
    defaultLocale: "en-FK",
    defaultDecimals: 2,
  },
  GBP: {
    name: "British Pound Sterling",
    symbol: "£",
    locales: [
      { code: "en-GB", name: "English (United Kingdom)" },
      { code: "cy-GB", name: "Welsh" },
      { code: "gd-GB", name: "Scottish Gaelic" },
    ],
    defaultLocale: "en-GB",
    defaultDecimals: 2,
  },
  GEL: {
    name: "Georgian Lari",
    symbol: "₾",
    locales: [{ code: "ka-GE", name: "Georgian" }],
    defaultLocale: "ka-GE",
    defaultDecimals: 2,
  },
  GGP: {
    name: "Guernsey Pound",
    symbol: "£",
    locales: [{ code: "en-GG", name: "English (Guernsey)" }],
    defaultLocale: "en-GG",
    defaultDecimals: 2,
  },
  GHS: {
    name: "Ghanaian Cedi",
    symbol: "GH₵",
    locales: [
      { code: "en-GH", name: "English (Ghana)" },
      { code: "ak-GH", name: "Akan" },
      { code: "ee-GH", name: "Ewe" },
    ],
    defaultLocale: "en-GH",
    defaultDecimals: 2,
  },
  GIP: {
    name: "Gibraltar Pound",
    symbol: "£",
    locales: [{ code: "en-GI", name: "English (Gibraltar)" }],
    defaultLocale: "en-GI",
    defaultDecimals: 2,
  },
  GMD: {
    name: "Gambian Dalasi",
    symbol: "D",
    locales: [{ code: "en-GM", name: "English (Gambia)" }],
    defaultLocale: "en-GM",
    defaultDecimals: 2,
  },
  GNF: {
    name: "Guinean Franc",
    symbol: "FG",
    locales: [{ code: "fr-GN", name: "French (Guinea)" }],
    defaultLocale: "fr-GN",
    defaultDecimals: 0, // Guinean Franc doesn't use decimal places
  },
  GTQ: {
    name: "Guatemalan Quetzal",
    symbol: "Q",
    locales: [{ code: "es-GT", name: "Spanish (Guatemala)" }],
    defaultLocale: "es-GT",
    defaultDecimals: 2,
  },
  GYD: {
    name: "Guyanese Dollar",
    symbol: "G$",
    locales: [{ code: "en-GY", name: "English (Guyana)" }],
    defaultLocale: "en-GY",
    defaultDecimals: 2,
  },
  HKD: {
    name: "Hong Kong Dollar",
    symbol: "HK$",
    locales: [
      { code: "zh-HK", name: "Chinese (Hong Kong)" },
      { code: "en-HK", name: "English (Hong Kong)" },
    ],
    defaultLocale: "zh-HK",
    defaultDecimals: 2,
  },
  HNL: {
    name: "Honduran Lempira",
    symbol: "L",
    locales: [{ code: "es-HN", name: "Spanish (Honduras)" }],
    defaultLocale: "es-HN",
    defaultDecimals: 2,
  },
  HRK: {
    name: "Croatian Kuna",
    symbol: "kn",
    locales: [{ code: "hr-HR", name: "Croatian" }],
    defaultLocale: "hr-HR",
    defaultDecimals: 2,
  },
  HTG: {
    name: "Haitian Gourde",
    symbol: "G",
    locales: [
      { code: "fr-HT", name: "French (Haiti)" },
      { code: "ht-HT", name: "Haitian Creole" },
    ],
    defaultLocale: "fr-HT",
    defaultDecimals: 2,
  },
  HUF: {
    name: "Hungarian Forint",
    symbol: "Ft",
    locales: [{ code: "hu-HU", name: "Hungarian" }],
    defaultLocale: "hu-HU",
    defaultDecimals: 2,
  },
  IDR: {
    name: "Indonesian Rupiah",
    symbol: "Rp",
    locales: [
      { code: "id-ID", name: "Indonesian" },
      { code: "jv-ID", name: "Javanese" },
    ],
    defaultLocale: "id-ID",
    defaultDecimals: 2,
  },
  ILS: {
    name: "Israeli New Shekel",
    symbol: "₪",
    locales: [
      { code: "he-IL", name: "Hebrew" },
      { code: "ar-IL", name: "Arabic (Israel)" },
    ],
    defaultLocale: "he-IL",
    defaultDecimals: 2,
  },
  IMP: {
    name: "Isle of Man Pound",
    symbol: "£",
    locales: [
      { code: "en-IM", name: "English (Isle of Man)" },
      { code: "gv-IM", name: "Manx" },
    ],
    defaultLocale: "en-IM",
    defaultDecimals: 2,
  },
  INR: {
    name: "Indian Rupee",
    symbol: "₹",
    locales: [
      { code: "hi-IN", name: "Hindi" },
      { code: "en-IN", name: "English (India)" },
      { code: "bn-IN", name: "Bengali (India)" },
      { code: "te-IN", name: "Telugu" },
      { code: "mr-IN", name: "Marathi" },
      { code: "ta-IN", name: "Tamil (India)" },
      { code: "gu-IN", name: "Gujarati" },
      { code: "kn-IN", name: "Kannada" },
      { code: "ml-IN", name: "Malayalam" },
    ],
    defaultLocale: "en-IN",
    defaultDecimals: 2,
  },
  IQD: {
    name: "Iraqi Dinar",
    symbol: "ع.د",
    locales: [
      { code: "ar-IQ", name: "Arabic (Iraq)" },
      { code: "ku-IQ", name: "Kurdish (Iraq)" },
    ],
    defaultLocale: "ar-IQ",
    defaultDecimals: 3, // Iraqi Dinar uses 3 decimal places
  },
  IRR: {
    name: "Iranian Rial",
    symbol: "﷼",
    locales: [{ code: "fa-IR", name: "Persian" }],
    defaultLocale: "fa-IR",
    defaultDecimals: 2,
  },
  ISK: {
    name: "Icelandic Króna",
    symbol: "kr",
    locales: [{ code: "is-IS", name: "Icelandic" }],
    defaultLocale: "is-IS",
    defaultDecimals: 0, // Icelandic Króna doesn't use decimal places
  },
  JEP: {
    name: "Jersey Pound",
    symbol: "£",
    locales: [{ code: "en-JE", name: "English (Jersey)" }],
    defaultLocale: "en-JE",
    defaultDecimals: 2,
  },
  JMD: {
    name: "Jamaican Dollar",
    symbol: "J$",
    locales: [{ code: "en-JM", name: "English (Jamaica)" }],
    defaultLocale: "en-JM",
    defaultDecimals: 2,
  },
  JOD: {
    name: "Jordanian Dinar",
    symbol: "د.ا",
    locales: [{ code: "ar-JO", name: "Arabic (Jordan)" }],
    defaultLocale: "ar-JO",
    defaultDecimals: 3, // Jordanian Dinar uses 3 decimal places
  },
  JPY: {
    name: "Japanese Yen",
    symbol: "¥",
    locales: [{ code: "ja-JP", name: "Japanese" }],
    defaultLocale: "ja-JP",
    defaultDecimals: 0, // Japanese Yen doesn't use decimal places
  },
  KES: {
    name: "Kenyan Shilling",
    symbol: "KSh",
    locales: [
      { code: "en-KE", name: "English (Kenya)" },
      { code: "sw-KE", name: "Swahili (Kenya)" },
    ],
    defaultLocale: "en-KE",
    defaultDecimals: 2,
  },
  KGS: {
    name: "Kyrgystani Som",
    symbol: "сом",
    locales: [
      { code: "ky-KG", name: "Kyrgyz" },
      { code: "ru-KG", name: "Russian (Kyrgyzstan)" },
    ],
    defaultLocale: "ky-KG",
    defaultDecimals: 2,
  },
  KHR: {
    name: "Cambodian Riel",
    symbol: "៛",
    locales: [{ code: "km-KH", name: "Khmer" }],
    defaultLocale: "km-KH",
    defaultDecimals: 2,
  },
  KMF: {
    name: "Comorian Franc",
    symbol: "CF",
    locales: [
      { code: "ar-KM", name: "Arabic (Comoros)" },
      { code: "fr-KM", name: "French (Comoros)" },
    ],
    defaultLocale: "fr-KM",
    defaultDecimals: 0, // Comorian Franc doesn't use decimal places
  },
  KPW: {
    name: "North Korean Won",
    symbol: "₩",
    locales: [{ code: "ko-KP", name: "Korean (North Korea)" }],
    defaultLocale: "ko-KP",
    defaultDecimals: 2,
  },
  KRW: {
    name: "South Korean Won",
    symbol: "₩",
    locales: [{ code: "ko-KR", name: "Korean (South Korea)" }],
    defaultLocale: "ko-KR",
    defaultDecimals: 0, // South Korean Won doesn't use decimal places
  },
  KWD: {
    name: "Kuwaiti Dinar",
    symbol: "د.ك",
    locales: [{ code: "ar-KW", name: "Arabic (Kuwait)" }],
    defaultLocale: "ar-KW",
    defaultDecimals: 3, // Kuwaiti Dinar uses 3 decimal places
  },
  LAK: {
    name: "Laotian Kip",
    symbol: "₭",
    locales: [{ code: "lo-LA", name: "Lao" }],
    defaultLocale: "lo-LA",
    defaultDecimals: 2,
  },
  LBP: {
    name: "Lebanese Pound",
    symbol: "ل.ل",
    locales: [
      { code: "ar-LB", name: "Arabic (Lebanon)" },
      { code: "fr-LB", name: "French (Lebanon)" },
    ],
    defaultLocale: "ar-LB",
    defaultDecimals: 2,
  },
  LKR: {
    name: "Sri Lankan Rupee",
    symbol: "Rs",
    locales: [
      { code: "si-LK", name: "Sinhala" },
      { code: "ta-LK", name: "Tamil (Sri Lanka)" },
    ],
    defaultLocale: "si-LK",
    defaultDecimals: 2,
  },
  LRD: {
    name: "Liberian Dollar",
    symbol: "L$",
    locales: [{ code: "en-LR", name: "English (Liberia)" }],
    defaultLocale: "en-LR",
    defaultDecimals: 2,
  },
  LSL: {
    name: "Lesotho Loti",
    symbol: "L",
    locales: [
      { code: "en-LS", name: "English (Lesotho)" },
      { code: "st-LS", name: "Sotho" },
    ],
    defaultLocale: "en-LS",
    defaultDecimals: 2,
  },
  LYD: {
    name: "Libyan Dinar",
    symbol: "ل.د",
    locales: [{ code: "ar-LY", name: "Arabic (Libya)" }],
    defaultLocale: "ar-LY",
    defaultDecimals: 3, // Libyan Dinar uses 3 decimal places
  },
  MAD: {
    name: "Moroccan Dirham",
    symbol: "د.م.",
    locales: [
      { code: "ar-MA", name: "Arabic (Morocco)" },
      { code: "ber-MA", name: "Berber" },
    ],
    defaultLocale: "ar-MA",
    defaultDecimals: 2,
  },
  MDL: {
    name: "Moldovan Leu",
    symbol: "L",
    locales: [{ code: "ro-MD", name: "Romanian (Moldova)" }],
    defaultLocale: "ro-MD",
    defaultDecimals: 2,
  },
  MGA: {
    name: "Malagasy Ariary",
    symbol: "Ar",
    locales: [
      { code: "mg-MG", name: "Malagasy" },
      { code: "fr-MG", name: "French (Madagascar)" },
    ],
    defaultLocale: "mg-MG",
    defaultDecimals: 2,
  },
  MKD: {
    name: "Macedonian Denar",
    symbol: "ден",
    locales: [{ code: "mk-MK", name: "Macedonian" }],
    defaultLocale: "mk-MK",
    defaultDecimals: 2,
  },
  MMK: {
    name: "Myanmar Kyat",
    symbol: "K",
    locales: [{ code: "my-MM", name: "Burmese" }],
    defaultLocale: "my-MM",
    defaultDecimals: 2,
  },
  MNT: {
    name: "Mongolian Tugrik",
    symbol: "₮",
    locales: [{ code: "mn-MN", name: "Mongolian" }],
    defaultLocale: "mn-MN",
    defaultDecimals: 2,
  },
  MOP: {
    name: "Macanese Pataca",
    symbol: "MOP$",
    locales: [
      { code: "zh-MO", name: "Chinese (Macau)" },
      { code: "pt-MO", name: "Portuguese (Macau)" },
    ],
    defaultLocale: "zh-MO",
    defaultDecimals: 2,
  },
  MRU: {
    name: "Mauritanian Ouguiya",
    symbol: "UM",
    locales: [{ code: "ar-MR", name: "Arabic (Mauritania)" }],
    defaultLocale: "ar-MR",
    defaultDecimals: 2,
  },
  MUR: {
    name: "Mauritian Rupee",
    symbol: "₨",
    locales: [
      { code: "en-MU", name: "English (Mauritius)" },
      { code: "fr-MU", name: "French (Mauritius)" },
    ],
    defaultLocale: "en-MU",
    defaultDecimals: 2,
  },
  MVR: {
    name: "Maldivian Rufiyaa",
    symbol: "Rf",
    locales: [{ code: "dv-MV", name: "Divehi" }],
    defaultLocale: "dv-MV",
    defaultDecimals: 2,
  },
  MWK: {
    name: "Malawian Kwacha",
    symbol: "MK",
    locales: [
      { code: "en-MW", name: "English (Malawi)" },
      { code: "ny-MW", name: "Chichewa" },
    ],
    defaultLocale: "en-MW",
    defaultDecimals: 2,
  },
  MXN: {
    name: "Mexican Peso",
    symbol: "$",
    locales: [{ code: "es-MX", name: "Spanish (Mexico)" }],
    defaultLocale: "es-MX",
    defaultDecimals: 2,
  },
  MYR: {
    name: "Malaysian Ringgit",
    symbol: "RM",
    locales: [
      { code: "ms-MY", name: "Malay" },
      { code: "en-MY", name: "English (Malaysia)" },
      { code: "zh-MY", name: "Chinese (Malaysia)" },
    ],
    defaultLocale: "ms-MY",
    defaultDecimals: 2,
  },
  MZN: {
    name: "Mozambican Metical",
    symbol: "MT",
    locales: [{ code: "pt-MZ", name: "Portuguese (Mozambique)" }],
    defaultLocale: "pt-MZ",
    defaultDecimals: 2,
  },
  NAD: {
    name: "Namibian Dollar",
    symbol: "N$",
    locales: [
      { code: "en-NA", name: "English (Namibia)" },
      { code: "af-NA", name: "Afrikaans (Namibia)" },
    ],
    defaultLocale: "en-NA",
    defaultDecimals: 2,
  },
  NGN: {
    name: "Nigerian Naira",
    symbol: "₦",
    locales: [
      { code: "en-NG", name: "English (Nigeria)" },
      { code: "ha-NG", name: "Hausa" },
      { code: "yo-NG", name: "Yoruba" },
      { code: "ig-NG", name: "Igbo" },
    ],
    defaultLocale: "en-NG",
    defaultDecimals: 2,
  },
  NIO: {
    name: "Nicaraguan Córdoba",
    symbol: "C$",
    locales: [{ code: "es-NI", name: "Spanish (Nicaragua)" }],
    defaultLocale: "es-NI",
    defaultDecimals: 2,
  },
  NOK: {
    name: "Norwegian Krone",
    symbol: "kr",
    locales: [
      { code: "nb-NO", name: "Norwegian Bokmål" },
      { code: "nn-NO", name: "Norwegian Nynorsk" },
      { code: "se-NO", name: "Northern Sami (Norway)" },
    ],
    defaultLocale: "nb-NO",
    defaultDecimals: 2,
  },
  NPR: {
    name: "Nepalese Rupee",
    symbol: "₨",
    locales: [{ code: "ne-NP", name: "Nepali" }],
    defaultLocale: "ne-NP",
    defaultDecimals: 2,
  },
  NZD: {
    name: "New Zealand Dollar",
    symbol: "NZ$",
    locales: [
      { code: "en-NZ", name: "English (New Zealand)" },
      { code: "mi-NZ", name: "Māori" },
    ],
    defaultLocale: "en-NZ",
    defaultDecimals: 2,
  },
  OMR: {
    name: "Omani Rial",
    symbol: "ر.ع.",
    locales: [{ code: "ar-OM", name: "Arabic (Oman)" }],
    defaultLocale: "ar-OM",
    defaultDecimals: 3, // Omani Rial uses 3 decimal places
  },
  PAB: {
    name: "Panamanian Balboa",
    symbol: "B/.",
    locales: [{ code: "es-PA", name: "Spanish (Panama)" }],
    defaultLocale: "es-PA",
    defaultDecimals: 2,
  },
  PEN: {
    name: "Peruvian Sol",
    symbol: "S/",
    locales: [
      { code: "es-PE", name: "Spanish (Peru)" },
      { code: "qu-PE", name: "Quechua (Peru)" },
      { code: "ay-PE", name: "Aymara (Peru)" },
    ],
    defaultLocale: "es-PE",
    defaultDecimals: 2,
  },
  PGK: {
    name: "Papua New Guinean Kina",
    symbol: "K",
    locales: [{ code: "en-PG", name: "English (Papua New Guinea)" }],
    defaultLocale: "en-PG",
    defaultDecimals: 2,
  },
  PHP: {
    name: "Philippine Peso",
    symbol: "₱",
    locales: [
      { code: "fil-PH", name: "Filipino" },
      { code: "en-PH", name: "English (Philippines)" },
    ],
    defaultLocale: "fil-PH",
    defaultDecimals: 2,
  },
  PKR: {
    name: "Pakistani Rupee",
    symbol: "₨",
    locales: [
      { code: "ur-PK", name: "Urdu (Pakistan)" },
      { code: "en-PK", name: "English (Pakistan)" },
    ],
    defaultLocale: "ur-PK",
    defaultDecimals: 2,
  },
  PLN: {
    name: "Polish Złoty",
    symbol: "zł",
    locales: [{ code: "pl-PL", name: "Polish" }],
    defaultLocale: "pl-PL",
    defaultDecimals: 2,
  },
  PYG: {
    name: "Paraguayan Guaraní",
    symbol: "₲",
    locales: [{ code: "es-PY", name: "Spanish (Paraguay)" }],
    defaultLocale: "es-PY",
    defaultDecimals: 0, // Guaraní doesn't use decimal places
  },
  QAR: {
    name: "Qatari Riyal",
    symbol: "ر.ق",
    locales: [{ code: "ar-QA", name: "Arabic (Qatar)" }],
    defaultLocale: "ar-QA",
    defaultDecimals: 2,
  },
  RON: {
    name: "Romanian Leu",
    symbol: "lei",
    locales: [{ code: "ro-RO", name: "Romanian" }],
    defaultLocale: "ro-RO",
    defaultDecimals: 2,
  },
  RSD: {
    name: "Serbian Dinar",
    symbol: "дин.",
    locales: [{ code: "sr-RS", name: "Serbian" }],
    defaultLocale: "sr-RS",
    defaultDecimals: 2,
  },
  RUB: {
    name: "Russian Ruble",
    symbol: "₽",
    locales: [{ code: "ru-RU", name: "Russian" }],
    defaultLocale: "ru-RU",
    defaultDecimals: 2,
  },
  RWF: {
    name: "Rwandan Franc",
    symbol: "FRw",
    locales: [
      { code: "rw-RW", name: "Kinyarwanda" },
      { code: "en-RW", name: "English (Rwanda)" },
    ],
    defaultLocale: "rw-RW",
    defaultDecimals: 0, // Rwandan Franc doesn't use decimal places
  },
  SAR: {
    name: "Saudi Riyal",
    symbol: "ر.س",
    locales: [{ code: "ar-SA", name: "Arabic (Saudi Arabia)" }],
    defaultLocale: "ar-SA",
    defaultDecimals: 2,
  },
  SBD: {
    name: "Solomon Islands Dollar",
    symbol: "$",
    locales: [{ code: "en-SB", name: "English (Solomon Islands)" }],
    defaultLocale: "en-SB",
    defaultDecimals: 2,
  },
  SCR: {
    name: "Seychellois Rupee",
    symbol: "₨",
    locales: [
      { code: "en-SC", name: "English (Seychelles)" },
      { code: "fr-SC", name: "French (Seychelles)" },
    ],
    defaultLocale: "en-SC",
    defaultDecimals: 2,
  },
  SDG: {
    name: "Sudanese Pound",
    symbol: "ج.س.",
    locales: [{ code: "ar-SD", name: "Arabic (Sudan)" }],
    defaultLocale: "ar-SD",
    defaultDecimals: 2,
  },
  SEK: {
    name: "Swedish Krona",
    symbol: "kr",
    locales: [{ code: "sv-SE", name: "Swedish" }],
    defaultLocale: "sv-SE",
    defaultDecimals: 2,
  },
  SGD: {
    name: "Singapore Dollar",
    symbol: "$",
    locales: [
      { code: "en-SG", name: "English (Singapore)" },
      { code: "zh-SG", name: "Chinese (Singapore)" },
    ],
    defaultLocale: "en-SG",
    defaultDecimals: 2,
  },
  SHP: {
    name: "Saint Helena Pound",
    symbol: "£",
    locales: [{ code: "en-SH", name: "English (Saint Helena)" }],
    defaultLocale: "en-SH",
    defaultDecimals: 2,
  },
  SLL: {
    name: "Sierra Leonean Leone",
    symbol: "Le",
    locales: [{ code: "en-SL", name: "English (Sierra Leone)" }],
    defaultLocale: "en-SL",
    defaultDecimals: 2,
  },
  SOS: {
    name: "Somali Shilling",
    symbol: "Sh",
    locales: [{ code: "so-SO", name: "Somali" }],
    defaultLocale: "so-SO",
    defaultDecimals: 2,
  },
  SRD: {
    name: "Surinamese Dollar",
    symbol: "$",
    locales: [{ code: "nl-SR", name: "Dutch (Suriname)" }],
    defaultLocale: "nl-SR",
    defaultDecimals: 2,
  },
  STN: {
    name: "São Tomé and Príncipe Dobra",
    symbol: "Db",
    locales: [{ code: "pt-ST", name: "Portuguese (São Tomé and Príncipe)" }],
    defaultLocale: "pt-ST",
    defaultDecimals: 2,
  },
  SVC: {
    name: "Salvadoran Colón",
    symbol: "₡",
    locales: [{ code: "es-SV", name: "Spanish (El Salvador)" }],
    defaultLocale: "es-SV",
    defaultDecimals: 2,
  },
  SYP: {
    name: "Syrian Pound",
    symbol: "£",
    locales: [{ code: "ar-SY", name: "Arabic (Syria)" }],
    defaultLocale: "ar-SY",
    defaultDecimals: 2,
  },
  SZL: {
    name: "Swazi Lilangeni",
    symbol: "L",
    locales: [{ code: "en-SZ", name: "English (Eswatini)" }],
    defaultLocale: "en-SZ",
    defaultDecimals: 2,
  },
  THB: {
    name: "Thai Baht",
    symbol: "฿",
    locales: [{ code: "th-TH", name: "Thai" }],
    defaultLocale: "th-TH",
    defaultDecimals: 2,
  },
  TJS: {
    name: "Tajikistani Somoni",
    symbol: "ЅМ",
    locales: [{ code: "tg-TJ", name: "Tajik" }],
    defaultLocale: "tg-TJ",
    defaultDecimals: 2,
  },
  TMT: {
    name: "Turkmenistani Manat",
    symbol: "m",
    locales: [{ code: "tk-TM", name: "Turkmen" }],
    defaultLocale: "tk-TM",
    defaultDecimals: 2,
  },
  TND: {
    name: "Tunisian Dinar",
    symbol: "د.ت",
    locales: [{ code: "ar-TN", name: "Arabic (Tunisia)" }],
    defaultLocale: "ar-TN",
    defaultDecimals: 3, // Tunisian Dinar uses 3 decimal places
  },
  TOP: {
    name: "Tongan Paʻanga",
    symbol: "T$",
    locales: [{ code: "to-TO", name: "Tongan" }],
    defaultLocale: "to-TO",
    defaultDecimals: 2,
  },
  TRY: {
    name: "Turkish Lira",
    symbol: "₺",
    locales: [{ code: "tr-TR", name: "Turkish" }],
    defaultLocale: "tr-TR",
    defaultDecimals: 2,
  },
  TTD: {
    name: "Trinidad and Tobago Dollar",
    symbol: "$",
    locales: [{ code: "en-TT", name: "English (Trinidad and Tobago)" }],
    defaultLocale: "en-TT",
    defaultDecimals: 2,
  },
  TWD: {
    name: "New Taiwan Dollar",
    symbol: "NT$",
    locales: [{ code: "zh-TW", name: "Chinese (Taiwan)" }],
    defaultLocale: "zh-TW",
    defaultDecimals: 2,
  },
  TZS: {
    name: "Tanzanian Shilling",
    symbol: "TSh",
    locales: [
      { code: "sw-TZ", name: "Swahili (Tanzania)" },
      { code: "en-TZ", name: "English (Tanzania)" },
    ],
    defaultLocale: "sw-TZ",
    defaultDecimals: 2,
  },
  UAH: {
    name: "Ukrainian Hryvnia",
    symbol: "₴",
    locales: [{ code: "uk-UA", name: "Ukrainian" }],
    defaultLocale: "uk-UA",
    defaultDecimals: 2,
  },
  UGX: {
    name: "Ugandan Shilling",
    symbol: "USh",
    locales: [{ code: "en-UG", name: "English (Uganda)" }],
    defaultLocale: "en-UG",
    defaultDecimals: 0, // Ugandan Shilling doesn't use decimal places
  },
  USD: {
    name: "United States Dollar",
    symbol: "$",
    locales: [{ code: "en-US", name: "English (United States)" }],
    defaultLocale: "en-US",
    defaultDecimals: 2,
  },
  UYU: {
    name: "Uruguayan Peso",
    symbol: "$U",
    locales: [{ code: "es-UY", name: "Spanish (Uruguay)" }],
    defaultLocale: "es-UY",
    defaultDecimals: 2,
  },
  UZS: {
    name: "Uzbekistani Som",
    symbol: "so'm",
    locales: [{ code: "uz-UZ", name: "Uzbek" }],
    defaultLocale: "uz-UZ",
    defaultDecimals: 2,
  },
  VES: {
    name: "Venezuelan Bolívar Soberano",
    symbol: "Bs.S",
    locales: [{ code: "es-VE", name: "Spanish (Venezuela)" }],
    defaultLocale: "es-VE",
    defaultDecimals: 2,
  },
  VND: {
    name: "Vietnamese Đồng",
    symbol: "₫",
    locales: [{ code: "vi-VN", name: "Vietnamese" }],
    defaultLocale: "vi-VN",
    defaultDecimals: 0, // Vietnamese Đồng doesn't use decimal places
  },
  VUV: {
    name: "Vanuatu Vatu",
    symbol: "VT",
    locales: [
      { code: "bi-VU", name: "Bislama" },
      { code: "en-VU", name: "English (Vanuatu)" },
    ],
    defaultLocale: "en-VU",
    defaultDecimals: 0,
  },
  WST: {
    name: "Samoan Tālā",
    symbol: "T",
    locales: [{ code: "sm-WS", name: "Samoan" }],
    defaultLocale: "sm-WS",
    defaultDecimals: 2,
  },
  XAF: {
    name: "Central African CFA Franc",
    symbol: "FCFA",
    locales: [
      { code: "fr-CM", name: "French (Cameroon)" },
      { code: "fr-CF", name: "French (Central African Republic)" },
    ],
    defaultLocale: "fr-CM",
    defaultDecimals: 0, // CFA Franc doesn't use decimal places
  },
  XCD: {
    name: "East Caribbean Dollar",
    symbol: "$",
    locales: [{ code: "en-AG", name: "English (Antigua and Barbuda)" }],
    defaultLocale: "en-AG",
    defaultDecimals: 2,
  },
  XOF: {
    name: "West African CFA Franc",
    symbol: "CFA",
    locales: [{ code: "fr-SN", name: "French (Senegal)" }],
    defaultLocale: "fr-SN",
    defaultDecimals: 0, // CFA Franc doesn't use decimal places
  },
  XPF: {
    name: "CFP Franc",
    symbol: "₣",
    locales: [{ code: "fr-PF", name: "French (French Polynesia)" }],
    defaultLocale: "fr-PF",
    defaultDecimals: 0, // CFP Franc doesn't use decimal places
  },
  YER: {
    name: "Yemeni Rial",
    symbol: "﷼",
    locales: [{ code: "ar-YE", name: "Arabic (Yemen)" }],
    defaultLocale: "ar-YE",
    defaultDecimals: 2,
  },
  ZAR: {
    name: "South African Rand",
    symbol: "R",
    locales: [
      { code: "en-ZA", name: "English (South Africa)" },
      { code: "af-ZA", name: "Afrikaans" },
    ],
    defaultLocale: "en-ZA",
    defaultDecimals: 2,
  },
  ZMW: {
    name: "Zambian Kwacha",
    symbol: "ZK",
    locales: [{ code: "en-ZM", name: "English (Zambia)" }],
    defaultLocale: "en-ZM",
    defaultDecimals: 2,
  },
  ZWL: {
    name: "Zimbabwean Dollar",
    symbol: "$",
    locales: [{ code: "en-ZW", name: "English (Zimbabwe)" }],
    defaultLocale: "en-ZW",
    defaultDecimals: 2,
  },
};
