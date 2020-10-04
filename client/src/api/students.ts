import ky from "ky";
import { APIS_ENDPOINTS } from "@/constants";
import { API_NAMESPACES_ENDPOINTS } from "../../../shared/constants";

export default ky.extend({
  prefixUrl: `${APIS_ENDPOINTS.STUDENTS}${API_NAMESPACES_ENDPOINTS.STUDENTS}`,
  throwHttpErrors: false
});
