import type { PageProps } from "@inertiajs/inertia";
import i18next from "i18next";
import type { PropsWithChildren } from "react";
import { initReactI18next } from "react-i18next";
import locales from "../locales.json";

const resources = locales;

console.log(resources);
i18next.use(initReactI18next);
i18next.init({
  resources,
  ns: Object.keys(resources.en),
  lng: "en",
  debug: true,
  interpolation: {
    prefix: "%{",
    suffix: "}",
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

export default function Root(props: PropsWithChildren) {
  // const typedProps = props as RootProps;
  // const { locale, suffix } = usePage<SharedProps>().props;
  // const { locale, suffix } = typedProps.initialPage.props;

  // useEffect?
  // i18next.changeLanguage("en");

  return <div>{props.children}</div>;
}
