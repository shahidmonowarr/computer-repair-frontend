export const getBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://computer-repair-backend.vercel.app/api/v1"
  );
};
// export const getBaseUrl = (): string => {
//   return "http://localhost:5005/api/v1";
// };

console.log("getBaseUrl", getBaseUrl());
