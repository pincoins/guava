import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export const useGoogleRecaptcha = () => {
  const ref = useRef<ReCAPTCHA>(null);

  const siteKey: string = process.env.GOOGLE_RECAPTCHA_SITE_KEY as string;

  const component = (
    <ReCAPTCHA
      ref={ref}
      size="invisible" // v3
      sitekey={siteKey}
    />
  );

  return [ref, component] as const;
};
