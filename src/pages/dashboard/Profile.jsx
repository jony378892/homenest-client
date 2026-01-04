import React from "react";
import useAuthContext from "../../hooks/useAuthContext";

export default function Profile() {
  const { user } = useAuthContext();
  console.log(user);

  return <div></div>;
}
