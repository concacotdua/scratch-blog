import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonShare({ post_id }: { post_id: string }) {
    const shareUrl = `https://myblog.com/posts/${post_id}`
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="p-3 rounded-lg text-center text-sm text-rose-300">
                    <Share2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Chia sẻ bài viết</AlertDialogTitle>
                    {/* ✅ Mô tả trực tiếp trong `AlertDialogDescription` */}
                    <AlertDialogDescription>
                        Chọn nền tảng để chia sẻ bài viết của bạn.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {/* ✅ Đặt các nút chia sẻ bên ngoài `AlertDialogDescription` */}
                <div className="flex gap-2 mt-4">
                    <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>

                    <TwitterShareButton url={shareUrl} >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}


