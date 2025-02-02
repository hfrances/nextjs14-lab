import { parsePhoneNumberWithError, PhoneNumber, CountryCode, CountryCallingCode, getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { getName as getCountryName, registerLocale } from 'i18n-iso-countries';
import localeData from "i18n-iso-countries/langs/en.json";

registerLocale(localeData);

export type CountryData = {
  countryCode: CountryCode;
  dialCode: CountryCallingCode;
  name: string | undefined;
}

export type PhoneData = {
  success: boolean;
  country: CountryData | undefined | null;
  number: string | null;
  error: any | null;
};

export type { CountryCode }

export function formatPhoneNumber(phone: string, defaultCountry?: string | number): PhoneData {

  try {
    let parsedNumber: PhoneNumber;

    // Parse with default country.
    if ((defaultCountry as any) instanceof Number) {
      parsedNumber = parsePhoneNumberWithError(phone, {
        defaultCallingCode: defaultCountry as string
      });
    }
    else {
      parsedNumber = parsePhoneNumberWithError(phone, {
        defaultCountry: String(defaultCountry)?.toUpperCase() as CountryCode | undefined,
      });
    }

    // Check if parsed number is valid.
    const isValid = parsedNumber.isValid(); // Is valid format?
    const isPossible = parsedNumber.isPossible(); // Is valid numeration?

    if (!isValid) {
      return {
        success: false,
        country: null,
        number: null,
        error: 'Invalid phone number format.',
      };
    }
    else if (!isPossible) {
      return {
        success: false,
        country: null,
        number: null,
        error: 'Invalid phone number rules.',
      };
    }
    else {
      const formattedNumber = parsedNumber.format('E.164');
      const countryCode = parsedNumber.country;

      return {
        success: true,
        country: countryCode ? {
          countryCode: countryCode,
          dialCode: parsedNumber.countryCallingCode,
          name: getCountryName(countryCode, 'en'),
        } : undefined,
        number: formattedNumber,
        error: null,
      };
    }

  } catch (error) {
    return {
      success: false,
      country: null,
      number: null,
      error,
    };
  }
}

export function getCountryFromDial(value: string): { countryCode: CountryCode, name: string | undefined }[] {
  return getCountries()
    .filter(countryCode => getCountryCallingCode(countryCode) == value)
    .map(countryCode => ({
      countryCode,
      name: getCountryName(countryCode, 'en')
    }));
}
