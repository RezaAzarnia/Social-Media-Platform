export { auth as middleware } from "@/app/_lib/auth";
//matcher for handele the protect routes
export const config = {
  matcher: [
    "/",
    "/createPost",
    "/account/:path*",
    "/explore/:path*",
    "/post/:path*",
    "/saved",
    "/users",
    "/login",
    "/register",
  ],
};
