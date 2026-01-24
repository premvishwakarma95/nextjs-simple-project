export const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2
    ? parts.pop()!.split(";").shift()!
    : null;
};

export const getToken = (): string | null => {
  return getCookie("token");
};

export const getUserId = (): string | null => {
  return getCookie("userId");
};
