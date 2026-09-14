import axios from "axios";

type DeleteFileArgs = {
  instanceUrl: string;
  signal?: AbortSignal;
  name: string;
};

export async function deleteFile(args: DeleteFileArgs) {
  await axios.delete(args.instanceUrl + "/" + args.name, {
    responseType: "text",
    signal: args.signal,
  });
}
