import Head from "next/head";
import React from "react";
import Header from "@component/Header";
import Footer from "@component/Footer";
import { useTranslations } from "next-intl";

import { Container, GuideContainer } from "@styles/pages/guidelines";

const Guidelines: React.FC = () => {
  const t = useTranslations("Guidelines");
  const interactionRules = Array.from({ length: 6 }, (_, index) => index);
  const serviceRules = Array.from({ length: 8 }, (_, index) => index + 6);

  return (
    <>
      <Head>
        <title>{t("meta.title")}</title>
        <meta
          name="description"
          content={t("meta.description")}
        />
        <meta
          property="og:title"
          content={t("meta.title")}
        />
        <meta
          property="og:description"
          content={t("meta.description")}
        />
      </Head>
      <Header colorScheme="black" />
      <Container>
        <GuideContainer>
          <h1>{t("title")}</h1>
          <h2 id="updated_in">{t("updated")}</h2>
          <p>{t("intro.0")}</p>
          <p>{t("intro.1")}</p>
          <p>{t("intro.2")}</p>
          <h2>{t("interactionTitle")}</h2>
          <ol>
            {interactionRules.map((index) => (
              <li key={index}>
                <strong>{t(`rules.${index}.title`)}:</strong>{" "}
                {t(`rules.${index}.body`)}
              </li>
            ))}
          </ol>
          <h2>{t("serviceTitle")}</h2>
          <ol start={7}>
            {serviceRules.map((index) => (
              <li key={index}>
                <strong>{t(`rules.${index}.title`)}:</strong>{" "}
                {t(`rules.${index}.body`)}
              </li>
            ))}
          </ol>
          <p>{t("outro")}</p>
        </GuideContainer>
        <Footer />
      </Container>
    </>
  );
};

export default Guidelines;
