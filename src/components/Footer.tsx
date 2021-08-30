import React from 'react';
import Link from 'next/link';
import { FiInstagram, FiYoutube } from 'react-icons/fi';

import { Container } from '@styles/components/footer';
import { useChooseTheme } from 'src/hooks/useTheme';

const Footer: React.FC = () => {
    const SocialNetworks = [
        {
            Path: 'https://www.instagram.com/saturn_chat/',
            Text: 'Acessar Instagram do Saturn Chat',
            Icon: FiInstagram,
        },
        {
            Path: 'https://www.youtube.com/gamesantos',
            Text: 'Acessar YouTube do criador do Saturn Chat',
            Icon: FiYoutube,
        },
    ];

    const Policies = [
        {
            Path: '/privacy',
            Text: 'Política de Privacidade',
        },
        {
            Path: '/guidelines',
            Text: 'Diretrízes da comunidade',
        },
    ];

    return (
        <Container>
            <div className="social_networks_container">
                {SocialNetworks.map(({ Path, Text, Icon }, key) => {
                    return (
                        <a key={key} href={Path} rel="external nofollow noreferrer" target="_blank" className="social_network" aria-label={Text}>
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
                                <a>{Text}</a>
                            </Link>
                        </div>
                    );
                })}
            </div>
            <p id="copyright">&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
        </Container>
    );
};

export default Footer;
