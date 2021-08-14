import Head from "next/head";
import React from "react";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";

import { Container, GuideContainer } from "../src/styles/pages/guidelines";

const pages: React.FC = () => {
  return (
    <>
      <Head>
        <title>Diretrizes da Comunidade | Saturn Chat</title>
        <meta
          name="description"
          content="Veja aqui todas as regras do Saturn Chat. É muito importante que você saiba de todas elas para evitar problemas futuros."
        />
        <meta
          property="og:title"
          content="Diretrízes da Comunidade | Saturn Chat"
        />
        <meta
          property="og:description"
          content="Veja aqui todas as regras do Saturn Chat. É muito importante que você saiba de todas elas para evitar problemas futuros."
        />
      </Head>
      <Header colorScheme="black" />
      <Container>
        <GuideContainer>
          <h1>Diretrizes da Comunidade do Saturn Chat</h1>
          <h2 id="updated_in">
            Última atualização e validação: 14 de Agosto de 2021
          </h2>

          <p>
            O Saturn Chat foi criado com o objetivo de unir mais as pessoas
            através de mensagens numa plataforma simples para todos.
          </p>

          <p>
            As diretrizes da comunidade foram criadas para mostrar tudo que não
            é permitido no Saturn Chat. Nós podemos tomar várias medidas como,
            simplesmente remover o conteúdo que infringe nossas regras, quanto
            remover a conta do(s) responsável(is) do conteúdo que infringe
            nossas regras.
          </p>

          <p>
            Esperamos que nenhuma pessoa desrespeite nenhuma dessas regras. Por
            isso, deixaremos bem claro o que esperamos que nossos usuários
            façam. Sempre que vir algo de errado não deixe de nos denunciar.
          </p>

          <h2>Como interagir com outros usuários</h2>

          <ol>
            <li>
              <strong>Não promova e incentive o assédio.</strong> Discussões são
              normais de se acontecerem, porém ofender os usuários de um tom
              agressivo, ameaçador ou negativo não é legal.
            </li>
            <li>
              <strong>Não dissemine ou incentive o ódio.</strong> Não ataque
              pessoas ou comunidades pela sua cor, raça, etnia, gênero,
              orientação sexual, deficiências (físicas ou mentais) ou religião.
            </li>
            <li>
              <strong>Não faça ameaças ou tente lesar outras pessoas. </strong>
              Isso inclui ameaças de compartilhamento de dados do usuário (como
              email, telefone, fotos, etc).
            </li>
            <li>
              <strong>Não envie vírus, malwares.</strong> Nem mesmo tente
              hacker, aplicar golpes ou fazer DDoS.
            </li>
          </ol>

          <h2>Conteúdos no Saturn Chat</h2>

          <ol start={5}>
            <li>
              <strong>Não compartilhe imagens que sexualizem menores.</strong> {" "}
              Isso inclui links que levam a conteúdos relacionados, imagens e
              vídeos pornográficos (ou sugestivos), incluindo também conteúdos
              alterados digitalmente.
            </li>
            <li>
              <strong>
                Não compartilhe conteúdo que glorifique o suicídio,
                automutilação, disfunções alimentares,
              </strong> {" "}
              e muito menos incentivem que as pessoas a fazerem isso. Se estiver
              numa situação difícil, peça ajuda!
            </li>
            <li>
              <strong>
                Não use o Saturn Chat para vender produtos proibidos ou
                potencialmente perigosos,
              </strong> {" "}
              como armas de fogo, drogas, remédios, munições e nada relacionado.
            </li>
            <li>
              <strong>
                Não forneça, compartilhe ou produza conteúdo de hackeamento
                (como de vazamentos de dados), softwares crackeados ou piratas e
                contas roubadas. 
              </strong> {" "}
              Isso também inclui cheats de jogos.
            </li>
            <li>
              <strong>
                Não compartilhe conteúdo de outra pessoa sem o consentimento
                dela. 
              </strong> {" "}
              Isso inclui, por exemplo, compartilhar fotos explícitas
              (pornográficas) de uma pessoa para envergonhá-la ou fazer
              chantagens.
            </li>
            <li>
              <strong>Não faça spam.</strong> Isso além de ser chato, atrapalha
              toda a comunidade.
            </li>
          </ol>

          <p>
            Essas são as nossas diretrizes, não deixe de seguir todas essas
            regras, assim você poderá permanecer no Saturn Chat e aproveitar
            tudo que podemos te oferecer.
          </p>
        </GuideContainer>
        <Footer />
      </Container>
    </>
  );
};

export default pages;
