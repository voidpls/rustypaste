import { getLogger } from "@logtape/logtape";
import type { CellContext } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { deleteFile } from "@/api/deleteFile.ts";
import type { ListItem } from "@/api/getList.ts";
import { CopyLinkButton } from "@/components/shared/CopyLinkButton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { useSettings } from "@/components/useSettings.ts";

const logger = getLogger(["rustypaste-ui", "ActionsCell"]);

type ActionsCellProps = CellContext<ListItem, unknown>;

export function ActionsCell({ row }: ActionsCellProps) {
  const url = row.original.url;
  const name = row.original.fileName;
  return (
    <div className="flex items-center justify-end gap-2">
      <CopyLinkButton size="sm" className="p-0" text={url} />
      <DeleteButton name={name} />
    </div>
  );
}

function DeleteButton({ name }: { name: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { settings } = useSettings();
  const onClick = useCallback(async () => {
    setIsDeleting(true);
    try {
      await deleteFile({
        instanceUrl: settings.instanceUrl,
        name,
      });
    } catch (e) {
      logger.error("Failed to delete file", { error: e });
    }
  }, [settings.instanceUrl, name]);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="sm"
          className="flex items-center gap-2 px-2"
          variant="outline"
          onClick={onClick}
          disabled={isDeleting}
        >
          {isDeleting ? <Spinner /> : <FiTrash2 />}
          Delete
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isDeleting ? "Deleting..." : "Permanently remove file from server."}
      </TooltipContent>
    </Tooltip>
  );
}
