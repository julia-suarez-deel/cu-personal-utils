import {createClickUpHttpInstance} from "@/utils/clickup";
import {ClickUpTask} from "@/interfaces/click-up";

const http = createClickUpHttpInstance();

export default class ClickUpService {
  static async createTask(listId, task): Promise<ClickUpTask> {
    return (await http.post(`list/${listId}/task/`, task)).data;
  }
}
