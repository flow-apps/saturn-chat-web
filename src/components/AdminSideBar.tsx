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
import { useAdminAuth } from "@hooks/useAdminAuth";
import {
  FiAlertOctagon,
  FiHome,
  FiMessageCircle,
  FiSettings,
  FiUser,
  FiUsers,
} from "react-icons/fi";
const menuItems = [
  {
    name: "Home",
    path: "/admin",
    icon: <FiHome size={25} />,
  },
  {
    name: "Usuários",
    path: "/admin/users",
    icon: <FiUser size={25} />,
  },
  {
    name: "Grupos",
    path: "/admin/groups",
    icon: <FiUsers size={25} />,
  },
  {
    name: "Denúncias",
    path: "#",
    icon: <FiAlertOctagon size={25} />,
  },
  {
    name: "Feedbacks",
    path: "#",
    icon: <FiMessageCircle size={25} />,
  },
  {
    name: "Configurações",
    path: "#",
    icon: <FiSettings size={25} />,
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
