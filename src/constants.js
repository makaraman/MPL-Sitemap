import * as dotenv from 'dotenv' 
dotenv.config()

export let endpoints = [
  `${process.env.API_BASE_URL}cloud-routes/homepages`,
  `${process.env.API_BASE_URL}cloud-routes/airportpages`,
  `${process.env.API_BASE_URL}cloud-routes/merchantpages`,
  `${process.env.API_BASE_URL}cloud-routes/staticpages`,
];
export const blacklistApi = [`${process.env.API_BASE_URL}sitemap/blacklist`]
export const domains = {
  nl: {
    lang: "nl",
    domain: "parkos.nl",
  },
  "nl-be": {
    lang: "nl-be",
    domain: "parkos.be",
  },
  fr: {
    lang: "fr",
    domain: "parkos.fr",
  },
  "fr-be": {
    lang: "fr-be",
    domain: "fr.parkos.be",
  },
  de: {
    lang: "de",
    domain: "parkos.de",
  },
  "sv-se": {
    lang: "sv-se",
    domain: "parkos.sv",
  },
  it: {
    lang: "it",
    domain: "parkos.it",
  },
  "de-at": {
    lang: "de-at",
    domain: "parkos.at",
  },
  "en-us": {
    lang: "en-us",
    domain: "parkos.com",
  },
  es: {
    lang: "es",
    domain: "parkos.es",
  },
  "en-au": {
    lang: "en-au",
    domain: "parkos.com",
  },
  "en-eu": {
    lang: "en-eu",
    domain: "eu.parkos.com",
  },
  pl: {
    lang: "pl",
    domain: "parkos.pl",
  },
  pt: {
    lang: "pt",
    domain: "parkos.pt",
  },
  "en-gb": {
    lang: "en-gb",
    domain: "parkos.com",
  },
  "da-dk": {
    lang: "da-dk",
    domain: "parkos.dk",
  },
};
