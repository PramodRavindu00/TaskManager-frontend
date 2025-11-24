import { AxiosError } from "axios";
import { toast } from "sonner";

const errorStatusCodes: number[] = [401, 403, 404, 409];
export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError && error.response) {
    const { status, data } = error.response;
    if (errorStatusCodes.includes(status)) {
      toast.error(data?.message || `HTTP error ${status}`);
    } else if (status === 400) {
      toast.error("Bad Request");
    } else if (status === 500) {
      toast.error("Internal Server error");
    } else {
      toast.error("Unknown Error");
    }
  } else {
    toast.error("Unknown Error");
  }
};
