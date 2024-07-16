import React from "react";
import { useUserStore } from "../app/zustandStore";

const Profile = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div>
      <h3>Hola {user.name} Bienvenido a tu perfil!</h3>
    </div>
  );
};

export default Profile;
