import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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
        {" "}
        <DialogTitle>{username}</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
