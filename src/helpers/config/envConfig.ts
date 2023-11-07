export const getBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://computer-repair-backend.vercel.app/api/v1"
  );
};

console.log("getBaseUrl", getBaseUrl());
