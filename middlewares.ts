import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
export default withAuth(
    function middleware(req) {
        // Kiểm tra session có tồn tại không (req.nextauth.token sẽ là undefined nếu chưa login)
        if (!req.nextauth.token) {
            return NextResponse.redirect(new URL("/", req.url)); // Chuyển hướng về trang chủ
        }
        return NextResponse.next(); // Nếu đã đăng nhập, tiếp tục truy cập
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // Chặn nếu không có token
        },
    }
);

// 🔒 Bảo vệ các route `/posts/**`
export const config = {
    matcher: ["/posts(.*)"],
};
