import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head"

import {
  Container,
  GroupAvatarContainer,
  GroupInfosContainer,
  InviteCard,
} from "../../styles/pages/invite";
import { GetServerSideProps } from "next";
import { api } from "../../services/api"
import { InviteData } from "src/@types/interfaces";

export const getServerSideProps: GetServerSideProps = async (context) => {

  console.log(context.query)

  const inviteID = context.query.id as string

  if (inviteID === "favicon.ico") {
    return {
      props: {
        error: true
      }
    }
  }

  const invite = await api.get(`/invites/${inviteID}`)

  return {
    props: {
      invite: invite.data as InviteData
    }
  }
}

const Invite: React.FC = (props) => {
  return (
    <>
      <Head>
        <title>Baixe o Saturn Chat e comece sua jornada</title>
        <meta
          name="description"
          content="Baixe agora o melhor aplicativo de conversas da internet. Comunique-se por texto e voz agora mesmo! Disponível para Android e em breve IOS."
        />
        <meta
          name="og:title"
          content="Baixe o Saturn Chat e comece sua jornada"
        />
        <meta
          name="og:description"
          content="Baixe agora o melhor aplicativo de conversas da internet. Comunique-se por texto e voz agora mesmo! Disponível para Android e em breve IOS."
        />
      </Head>
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
