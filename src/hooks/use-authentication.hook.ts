import { useLayoutEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { AUTH_TOKEN_LOCALSTORAGE_NAME } from "@wc/constants/constants";
import { JwtPayload, Roles } from "@wc/types/use-authentication.types";

interface UseAuthentication {
  roles: string[];
  isAdmin: boolean;
  uid: number;
}

export default function useAuthentication(): UseAuthentication {
  const [authentication, setAuthentication] = useState<UseAuthentication>({
    isAdmin: false,
    roles: [],
    uid: 0,
  });

  const getJwtPayload = (token: string | null) => {
    if (!token)
      throw new Error(
        `[AuthenticationHook]: Authorization token not found in localStorage with key '${AUTH_TOKEN_LOCALSTORAGE_NAME}' of this browser.`
      );

    const decoded = jwtDecode<JwtPayload>(token);

    let roles =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (typeof roles === "string") {
      roles = [roles];
    } else {
      roles = roles ?? [];
    }

    setAuthentication({
      roles,
      isAdmin: roles.includes(Roles.ADMIN),
      uid: parseInt(decoded.SellerId),
    });
  };

  useLayoutEffect(() => {
    getJwtPayload(localStorage.getItem(AUTH_TOKEN_LOCALSTORAGE_NAME));
  }, []);

  return authentication;
}
