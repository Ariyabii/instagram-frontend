import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type PostLikesDialogProps = {
  isLikesDialogOpen: boolean;
  handleDialog: () => void;
  username: string;
};

export const PostLikesDialog = ({
  isLikesDialogOpen,
  handleDialog,
  username,
}: PostLikesDialogProps) => {
  return (
    <Dialog open={isLikesDialogOpen} onOpenChange={handleDialog}>
      <DialogContent>
        {" "}
        <DialogTitle>{username}</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default PostLikesDialog;
