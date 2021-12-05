import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Container,
  GroupAvatarContainer,
  GroupInfosContainer,
  InviteCard,
} from "../../styles/pages/invite";
import Header from "@component/Header";

const Invite = () => {
  return (
    <>
      <Container>
        <InviteCard>
          <span className="presentation_title">
            Você foi convidado(a) para o grupo:
          </span>
          <GroupAvatarContainer>
            <Image
              className="group_avatar"
              alt="Avatar do grupo"
              src={require("../../../public/assets/background.jpg")}
              quality={70}
            />
          </GroupAvatarContainer>
          <GroupInfosContainer>
            <h1>Saturn Chat</h1>
            <Link href="/download">
              <a>Baixe o app e aceite o convite</a>
            </Link>
          </GroupInfosContainer>
        </InviteCard>
      </Container>
    </>
  );
};

export default Invite;
