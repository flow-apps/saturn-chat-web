import React, { useState } from "react";
import Image from "next/image";
import { useAdminAuth } from "@hooks/useAdminAuth";
import {
  FiAlertOctagon,
  FiHome,
  FiMenu,
  FiMessageCircle,
  FiSettings,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";
import {
  Container,
  HeaderContainer,
  MobileToggle,
  NavigatorContainer,
  NavigatorOption,
  Overlay,
  UserAvatarContainer,
  UserContainer,
  UserDataContainer,
} from "@styles/components/adminSideBar";
import { useAuth } from "@hooks/useAuth";

const menuItems = [
  { name: "Home", path: "/admin", icon: <FiHome size={25} /> },
  { name: "Usuários", path: "/admin/users", icon: <FiUser size={25} /> },
  { name: "Grupos", path: "/admin/groups", icon: <FiUsers size={25} /> },
  {
    name: "Denúncias",
    path: "/admin/reports",
    icon: <FiAlertOctagon size={25} />,
  },
  { name: "Feedbacks", path: "#", icon: <FiMessageCircle size={25} /> },
  { name: "Configurações", path: "#", icon: <FiSettings size={25} /> },
];

const AdminSideBar: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <MobileToggle onClick={toggleMenu} aria-label="Toggle Menu">
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </MobileToggle>

      <Overlay $isOpen={isOpen} onClick={closeMenu} />

      <Container $isOpen={isOpen}>
        <HeaderContainer>
          <UserContainer>
            <UserAvatarContainer>
              <Image
                src={user?.avatar ? user.avatar.url : "/avatar-placeholder.png"}
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
            <NavigatorOption key={i} href={item.path} onClick={closeMenu}>
              <span>{item.icon}</span>
              <p>{item.name}</p>
            </NavigatorOption>
          ))}
        </NavigatorContainer>
      </Container>
    </>
  );
};

export default AdminSideBar;
