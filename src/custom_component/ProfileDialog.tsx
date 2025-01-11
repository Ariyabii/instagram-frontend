import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

type ProfilesDialogProps = {
  profileDialogOpen: boolean;
  handleDialog: () => void;
  username: string;
};

export const ProfileDialog = ({
  profileDialogOpen,
  handleDialog,
  username,
}: ProfilesDialogProps) => {
  return (
    <Dialog open={profileDialogOpen} onOpenChange={handleDialog}>
      <DialogContent>
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <DialogTitle className="text-white">{username}</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
