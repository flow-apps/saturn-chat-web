import React from "react";
import Head from "next/head";
import Header from "@component/Header";
import Footer from "@component/Footer";
import { useTranslations } from "next-intl";
import { Container, PrivacyContainer } from "@styles/pages/privacy";

const Privacy: React.FC = () => {
  const t = useTranslations("Privacy");
  const definitions = Array.from({ length: 11 }, (_, index) => index);
  const personalData = Array.from({ length: 3 }, (_, index) => index);
  const media = Array.from({ length: 2 }, (_, index) => index);
  const permissions = Array.from({ length: 3 }, (_, index) => index);
  const purposes = Array.from({ length: 6 }, (_, index) => index);
  const rights = Array.from({ length: 5 }, (_, index) => index);

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
        <PrivacyContainer>
          <h1>{t("title")}</h1>
          <p>{t("updated")}</p>
          <p>{t("intro.0")}</p>
          <p>{t("intro.1")}</p>
          <h2>{t("interpretation.title")}</h2>
          <h3>{t("interpretation.subtitle")}</h3>
          <p>{t("interpretation.body")}</p>
          <h3>{t("definitions.title")}</h3>
          <p>{t("definitions.intro")}</p>
          <ul>{definitions.map((index) => <li key={index}><strong>{t(`definitions.${index}.term`)}</strong>: {t(`definitions.${index}.body`)}</li>)}</ul>
          <h2>{t("collection.title")}</h2>
          <h3>{t("collection.types")}</h3>
          <h4>{t("personal.title")}</h4>
          <p>{t("personal.intro")}</p>
          <ul>{personalData.map((index) => <li key={index}>{t(`personal.items.${index}`)}</li>)}</ul>
          <h4>{t("media.title")}</h4>
          <p>{t("media.intro")}</p>
          <ul>{media.map((index) => <li key={index}><strong>{t(`media.items.${index}.term`)}:</strong> {t(`media.items.${index}.body`)}</li>)}</ul>
          <h4>{t("usageData.title")}</h4>
          <p>{t("usageData.0")}</p><p>{t("usageData.1")}</p>
          <h4>{t("permissions.title")}</h4>
          <p>{t("permissions.intro")}</p>
          <ul>{permissions.map((index) => <li key={index}><strong>{t(`permissions.items.${index}.term`)}:</strong> {t(`permissions.items.${index}.body`)}</li>)}</ul>
          <p>{t("permissions.outro")}</p>
          <h3>{t("use.title")}</h3><p>{t("use.intro")}</p>
          <ul>{purposes.map((index) => <li key={index}><strong>{t(`use.items.${index}.term`)}</strong>: {t(`use.items.${index}.body`)}</li>)}</ul>
          <h3>{t("retention.title")}</h3><p>{t("retention.0")}</p><p>{t("retention.1")}</p>
          <h3>{t("security.title")}</h3><p>{t("security.body")}</p>
          <h2>{t("rights.title")}</h2><p>{t("rights.intro")}</p>
          <ul>{rights.map((index) => <li key={index}>{t(`rights.items.${index}`)}</li>)}</ul>
          <h2>{t("children.title")}</h2><p>{t("children.body")}</p>
          <h2>{t("changes.title")}</h2><p>{t("changes.body")}</p>
          <h2>{t("contact.title")}</h2><p>{t("contact.body")}</p><ul><li>{t("contact.email")}</li></ul>
        </PrivacyContainer>
        <Footer />
      </Container>
    </>
  );
};

export default Privacy;
