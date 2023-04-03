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
import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import { api } from "../../services/api"
import { InviteData } from "src/@types/interfaces";
import Footer from "@component/Footer";

const Invite: React.FC< { invite: InviteData }> = ({ invite }) => {

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
          content={`Baixe o Saturn Chat e comece sua jornada`}
        />
        <meta
          name="og:description"
          content="Baixe agora o melhor aplicativo de conversas da internet. Comunique-se por texto e voz agora mesmo! Disponível para Android e em breve IOS."
        />
      </Head>
      <Container>
        <InviteCard>
          {
            invite ? (
              <>
                <span className="presentation_title">
                  Você foi convidado(a) para o grupo:
                </span>
                <GroupAvatarContainer>
                  <Image
                    className="group_avatar"
                    alt="Avatar do grupo"
                    src={invite?.group?.group_avatar?.url || "/avatar-placeholder.png"}
                    width={220}
                    height={220}
                    quality={70}
                  />
                </GroupAvatarContainer>
                <GroupInfosContainer>
                  <h1>{invite.group.name}</h1>
                  <Link passHref href="/download">
                    <a>Baixe o app e aceite o convite</a>
                  </Link>
                </GroupInfosContainer>
              </>
            ) : (
              <>
              <GroupAvatarContainer>
                  <Image
                    className="group_avatar"
                    alt="Avatar do grupo"
                    src={"/assets/crying.gif"}
                    width={220}
                    height={220}
                    quality={70}
                  />
                </GroupAvatarContainer>
                <GroupInfosContainer>
                  <h1>Convite inválido</h1>
                  <p id="invalid_inv_message">O convite pode ter sido expirado, apagado ou ter atingido seu número máximo de usos. Peça outro.</p>
                </GroupInfosContainer>
              </>
            )
          }
        </InviteCard>
        {
          invite && (
            <p id="app_warning">Caso já tenha o app, certifique-se de abrir o convite diretamente por ele.</p>
          )
        }
      </Container>
    </>
  );
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  try {
    const data = (await api.get(`/invites/${params?.id}`)).data;
    return {
      props: {
        invite: data.invite,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        Invite: null
      }
    }
  }

};

export async function getStaticPaths(ctx: GetStaticPathsContext) {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default Invite;
