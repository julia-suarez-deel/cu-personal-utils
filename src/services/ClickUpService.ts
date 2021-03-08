import { createClickUpHttpInstance } from "@/utils/clickup";
import { ClickUpTask } from "@/interfaces/click-up";

const http = createClickUpHttpInstance();

export default class ClickUpService {
  static async getUser() {
    return (await http.get("/user")).data.user;
  }

  static async createTask(
    listId: string,
    task: Record<string, unknown>
  ): Promise<ClickUpTask> {
    return (await http.post(`list/${listId}/task/`, task)).data;
  }
}
