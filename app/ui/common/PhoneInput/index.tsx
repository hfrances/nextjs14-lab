"use client";

import React, { ChangeEventHandler, useState } from "react";
import Image from "next/image";
import { formatPhoneNumber, PhoneData, CountryCode } from "./phone.utils";

interface PhoneInputSimpleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  defaultCountry?: CountryCode; // ISO 3166-1 alpha-2 country code
  value?: string | readonly string[] | number | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, phoneData?: PhoneData) => void;
};

/**
 * Un React Component que extiende el elemento HTML `input` diseñado para introducir números de teléfono 
 * que permite identificar su país y validar su formato.
 * @requires libphonenumber-js 
 * @requires i18n-iso-countries
 */
const PhoneInput: React.FC<PhoneInputSimpleProps> = ({ defaultCountry, type = "tel", value, onChange, ...inputProps }) => {
  const [phone, setPhone] = useState(value);
  const [phoneData, setPhoneData] = useState<PhoneData | undefined>();

  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;

    // Establecer el valor al control.
    setPhone(newValue);

    // Generar datos del número de teléfono usando el helper
    const phoneData = formatPhoneNumber(newValue, defaultCountry);
    setPhoneData(phoneData);

    // Disparar el onChange con el evento original y los datos adicionales
    if (onChange) {
      onChange(event, phoneData);
    }
  };

  return (
    <div className="relative">
      {/* Input Field */}
      <input
        {...inputProps}
        type={type}
        value={phone}
        onChange={handlePhoneChange}
      />
      {/* Country Flag */}
      <div className="absolute inset-y-0 right-3 my-auto w-6 h-6 overflow-hidden rounded-full">
        {(phoneData?.country) && (
          <Image
            src={`https://flagcdn.com/w40/${phoneData.country.countryCode.toLowerCase()}.png`}
            alt={phoneData.country.name || "Flag"}
            className="w-full h-full object-cover"
            width={40} height={27}
          />
        )}
      </div>
    </div>
  );
};

export type { PhoneData }
export { PhoneInput }
export default PhoneInput;
