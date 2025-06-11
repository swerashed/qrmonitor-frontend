export const getUserAvatarFallbackLetters = (activeUser:any) => {
  if (!activeUser?.name) return "";

  const parts = activeUser.name.trim().split(/\s+/);
  const firstInitial = parts[0]?.[0] || '';
  const lastInitial = parts[parts.length - 1]?.[0] || '';

  return `${firstInitial}${lastInitial}`.toUpperCase();
};