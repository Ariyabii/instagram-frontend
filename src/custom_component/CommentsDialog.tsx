import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

type CommentsDialogProps = {
  commentDialogOpen: boolean;
  handleDialog: () => void;
  username: string;
};

export const CommentsDialog = ({
  commentDialogOpen,
  handleDialog,
  username,
}: CommentsDialogProps) => {
  return (
    <Dialog open={commentDialogOpen} onOpenChange={handleDialog}>
      <DialogContent>
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <DialogTitle>{username}</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
