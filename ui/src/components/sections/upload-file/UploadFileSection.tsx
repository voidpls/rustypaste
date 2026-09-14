import { useState } from "react";
import { UploadDropzone } from "@/components/sections/upload-file/UploadDropzone.tsx";
import { UploadList } from "@/components/sections/upload-file/UploadList.tsx";
import { useFileUploads } from "@/components/sections/upload-file/useFileUploads.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";

const EXPIRY_CHOICES = [
  { value: "", label: "never" },
  { value: "1h", label: "1 hour" },
  { value: "12h", label: "12 hours" },
  { value: "1d", label: "1 day" },
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
];

export function UploadFileSection() {
  const [expire, setExpire] = useState("");
  const [preserveFileName, setPreserveFileName] = useState(false);
  const { files, uploadFile, removeFile } = useFileUploads({
    expire: expire || undefined,
    preserveFileName,
  });
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">expires:</span>
          <select
            value={expire}
            onChange={(e) => setExpire(e.target.value)}
            className="bg-background text-foreground h-7 outline-none"
          >
            {EXPIRY_CHOICES.map((choice) => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="preserve-filename"
            checked={preserveFileName}
            onCheckedChange={(checked) => setPreserveFileName(checked === true)}
          />
          <Label htmlFor="preserve-filename" className="text-xs font-normal">
            preserve filename
          </Label>
        </div>
      </div>
      <UploadDropzone uploadFile={uploadFile} />
      <UploadList files={files} removeFile={removeFile} />
    </div>
  );
}
