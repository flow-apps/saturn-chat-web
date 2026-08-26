import {
  Container,
  HeaderContainer,
  NavigatorContainer,
  NavigatorOption,
  UserAvatarContainer,
  UserContainer,
  UserDataContainer,
} from "@styles/components/adminSideBar";
import Image from "next/image";
import React from "react";
import { useAdminAuth } from "src/hooks/useAdminAuth";
import { FiAlertOctagon, FiHome, FiOctagon, FiUser, FiUsers } from "react-icons/fi";
const menuItems = [
  {
    name: "Home",
    path: "#",
    icon: <FiHome size={25} />,
  },
  {
    name: "Usuários",
    path: "#",
    icon: <FiUser size={25} />,
  },
  {
    name: "Grupos",
    path: "#",
    icon: <FiUsers size={25} />,
  },
  {
    name: "Denúncias",
    path: "#",
    icon: <FiAlertOctagon size={25} />,
  },
];

const AdminSideBar: React.FC = () => {
  const { user } = useAdminAuth();
  return (
    <Container>
      <HeaderContainer>
        <UserContainer>
          <UserAvatarContainer>
            <Image
              src={"/avatar-placeholder.png"}
              width={50}
              height={50}
              alt="User Avatar"
            />
          </UserAvatarContainer>
          <UserDataContainer>
            <h2>{user?.name}</h2>
            <p>@{user?.nickname}</p>
          </UserDataContainer>
        </UserContainer>
      </HeaderContainer>

      <NavigatorContainer>
        {menuItems.map((item, i) => (
          <NavigatorOption key={i} href={item.path}>
            <span>{item.icon}</span>
            <p>{item.name}</p>
          </NavigatorOption>
        ))}
      </NavigatorContainer>
    </Container>
  );
};

export default AdminSideBar;
