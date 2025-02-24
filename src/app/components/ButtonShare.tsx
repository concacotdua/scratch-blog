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

export default function ButtonShare({ post_id }: { post_id: string }) {
    const shareUrl = `https://myblog.com/posts/${post_id}`;
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="bg-blue-500 text-white px-3 py-2 rounded">
                    <Share2 className="w-4 h-4 mr-2" />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Chia sẻ bài viết</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="flex gap-2">
                            <FacebookShareButton url={shareUrl}>
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>

                            <TwitterShareButton url={shareUrl}>
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

