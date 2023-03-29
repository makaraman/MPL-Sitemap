import axios from "axios";
import { SitemapStream, streamToPromise } from "sitemap";
import fs from "fs";
import { endpoints, domains, blacklistApi } from "./constants.js";
let keyBasedObjectMapper;


const getBlacklistedUrls = async () => {
  return axios
    .get(blacklistApi)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {});
};
domains;
const groupByDomain = async (dataList) => {
  const BlacklistedUrls = await getBlacklistedUrls();

  return dataList.reduce((domainBasedArray, urlObject) => {
    const { language } = urlObject;

    domainBasedArray[language] = domainBasedArray[language] ?? [];
    domainBasedArray[language].push(urlObject);

    if ((domainBasedArray[language] = domainBasedArray[language])) {
      //modify the url path for an actual link
      urlObject.path = `https://${
        domains[urlObject.language]?.domain ?? "parkos.com"
      }${urlObject.path}`;

      //whitelist the url
      if (BlacklistedUrls.includes(urlObject.path)) {
        domainBasedArray[language].splice(
          domainBasedArray[language].indexOf(urlObject)
        );
      }
    }

    return domainBasedArray;
  }, {});
};
const groupByKey = async (dataList) => {
  return dataList.reduce((keyBasedArray, urlObject) => {
    const { key } = urlObject;

    keyBasedArray[key] = keyBasedArray[key] ?? [];
    keyBasedArray[key].push(urlObject);

    return keyBasedArray;
  }, {});
};
async function generateSitemap(domainBasedUrlLanguage, domainBasedLinks) {
  // generate our sitemap
  const sitemapStream = new SitemapStream({
    hostname: `https://${
      domains[domainBasedUrlLanguage]?.domain ?? "parkos.com"
    }`,
    xmlns: {
      xhtml: true,
    },
  });

  domainBasedLinks.forEach(function (url) {
    let links = [];
    if (keyBasedObjectMapper.hasOwnProperty(url.key)) {
      links = keyBasedObjectMapper[url.key].map((urlObject) => {
        return { lang: urlObject.language, url: urlObject.path };
      });
    }
    sitemapStream.write({
      url: url.path,
      changefreq: "daily",
      priority: 1,
      links: links,
    });
  });

  sitemapStream.end();
  const sitemapData = await streamToPromise(sitemapStream);
  fs.writeFileSync(
    `./sitemap/${domainBasedUrlLanguage}-sitemap.xml`,
    sitemapData,
    "utf8"
  );
}

axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
  axios.spread(async (homepages, airportpages, merchantpages, staticpages, blogpages) => {
    const domainBasedUrls = await groupByDomain([
      ...staticpages.data,
      ...merchantpages.data,
      ...homepages.data,
      ...airportpages.data,
      ...blogpages?.data || [],
    ]);

    //for each domain sitemap entry of that URL should contain list of all alternatives in all other languages
    keyBasedObjectMapper = await groupByKey(airportpages.data);

    // generate sitemap for each domain
    for (const [domainBasedUrlKey] of Object.entries(domainBasedUrls)) {
      if (domains.hasOwnProperty(domainBasedUrlKey)) {
        await generateSitemap(
          domainBasedUrlKey,
          domainBasedUrls[domainBasedUrlKey]
        );
      }
    }
  })
);
