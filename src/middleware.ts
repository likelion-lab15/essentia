export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/mypage/:path*",
    "/products/:_id/order/:path*",
    "/products/:_id/sell/:path*",
  ],
};
