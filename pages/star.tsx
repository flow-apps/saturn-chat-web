import React from "react";
import Head from "next/head";
import Image from "next/image";

import {
  BenefitsContainer,
  Container,
  PresentationContainer,
} from "../src/styles/pages/star";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

const Star: React.FC = () => {
  return (
    <>
      <Head>
        <title>Benefícios e Recursos do Star | Saturn Chat</title>
        <meta
          name="og:title"
          content="Benefícios e Recursos do Star | Saturn Chat"
        />
        <meta
          name="description"
          content="Aproveite ao máximo todos os recursos do Saturn Chat obtendo o plano Star. Faça grandes uploads de arquivos, ganhe um emblema exclusivo ao lado de seu nome, crie muito mais grupos, e mais."
        />

        <meta
          name="og:description"
          content="Aproveite ao máximo todos os recursos do Saturn Chat obtendo o plano Star. Faça grandes uploads de arquivos, ganhe um emblema exclusivo ao lado de seu nome, crie muito mais grupos, e mais."
        />
      </Head>
      <Container>
        <PresentationContainer>
          <Header />

          <div className="content">
            <div id="content_container">
              <h1>Plano Star</h1>
              <p>
                Aproveite ao máximo todos os recursos do Saturn Chat obtendo o
                plano Star. Faça grandes uploads de arquivos, ganhe um emblema
                exclusivo ao lado de seu nome, crie muito mais grupos, e mais.
              </p>
              <span className="price">
                <span id="currency">R$</span> 439,89{" "}
                <span id="per">por ano</span>
                <span id="discount_container">R$ 479,88</span>
              </span>
              <span className="price">
                <span id="currency">R$</span> 39,99{" "}
                <span id="per">por mês</span>
              </span>
            </div>
            <div id="image_container">
              <Image
                src={require("../public/assets/upgrade-to-star.svg")}
                alt="Evolua para plano star"
                quality={70}
              />
            </div>
          </div>
        </PresentationContainer>
        <BenefitsContainer>
          <div className="content">
            <h2>
              Com o Star, o Saturn Chat ganha superpoderes, melhorando sua
              experiência por completo de uma vez.
            </h2>
            <p>Veja só algumas das várias vantagens que o plano Star traz:</p>
          </div>
          <div className="benefits">
            <div className="benefit_card">
              <div className="benefit_title">
                <h3>Totalmente livre de anúncios chatos</h3>
              </div>
              <div className="benefit_description">
                <p>
                  Remova todos os anúncios chatos do aplicativo de uma vez por
                  todas.
                </p>
              </div>
              <div className="benefit_image">{/* <Image /> */}</div>
            </div>
            <div className="benefit_card">
              <div className="benefit_title">
                <h3>Faça uploads maiores</h3>
              </div>
              <div className="benefit_description">
                <p>Aumente em 10x o espaço de envio, de 12MB para 120MB.</p>
              </div>
              <div className="benefit_image">{/* <Image /> */}</div>
            </div>
            <div className="benefit_card">
              <div className="benefit_title">
                <h3>Crie mais grupos</h3>
              </div>
              <div className="benefit_description">
                <p>
                  Tenha mais grupos para caber todos seus amigos, de 2 para 20
                  grupos.
                </p>
              </div>
              <div className="benefit_image">{/* <Image /> */}</div>
            </div>
            <div className="benefit_card">
              <div className="benefit_title">
                <h3>Tenha mais amigos no grupo</h3>
              </div>
              <div className="benefit_description">
                <p>Aumente a quantidade de participantes de mil para 10 mil</p>
              </div>
              <div className="benefit_image">{/* <Image /> */}</div>
            </div>
            <div className="benefit_card">
              <div className="benefit_title">
                <h3>Tenha um emblema bonitão</h3>
              </div>
              <div className="benefit_description">
                <p>
                  Ganhe um emblema exclusivo ao lado do seu nome. Mostre ao
                  mundo que nos apoia!
                </p>
              </div>
              <div className="benefit_image">{/* <Image /> */}</div>
            </div>
            <div className="benefit_card">
              <div className="benefit_title">
                <h3>Ajuda no desenvolvimento do app</h3>
              </div>
              <div className="benefit_description">
                <p>
                  Ajude um pequeno desenvolvedor a continuar criando este app
                  incrível!
                </p>
              </div>
              <div className="benefit_image">{/* <Image /> */}</div>
            </div>
          </div>
        </BenefitsContainer>
        <Footer />
      </Container>
    </>
  );
};

export default Star;
