import React from "react";
import Link from "next/link";
import { FiInstagram, FiYoutube } from "react-icons/fi";

import { Container } from "@styles/components/footer";
import { useChooseTheme } from "@hooks/useTheme";
import { useTranslations } from "next-intl";

const Footer: React.FC = () => {
  const t = useTranslations("Footer");
  const SocialNetworks = [
    {
      Path: "https://www.instagram.com/saturn_chat/",
      Text: t("instagram"),
      Icon: FiInstagram,
    },
    {
      Path: "https://www.youtube.com/gamesantos",
      Text: t("youtube"),
      Icon: FiYoutube,
    },
  ];

  const Policies = [
    {
      Path: "/privacy",
      Text: t("privacy"),
    },
    {
      Path: "/guidelines",
      Text: t("guidelines"),
    },
  ];

  return (
    <Container>
      <div className="social_networks_container">
        {SocialNetworks.map(({ Path, Text, Icon }, key) => {
          return (
            <a
              key={key}
              href={Path}
              rel="external nofollow noreferrer"
              target="_blank"
              className="social_network"
              aria-label={Text}
            >
              <Icon />
            </a>
          );
        })}
      </div>
      <div className="policies_container">
        {Policies.map(({ Path, Text }, key) => {
          return (
            <div key={key} className="policie">
              <Link href={Path}>
                <div>{Text}</div>
              </Link>
            </div>
          );
        })}
      </div>
      <p id="copyright">
        &copy; {new Date().getFullYear()} {t("copyright")}
      </p>
    </Container>
  );
};

export default Footer;
