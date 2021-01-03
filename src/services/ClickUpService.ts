import {createClickUpHttpInstance} from "@/utils/clickup";

const http = createClickUpHttpInstance();

export default class ClickUpService {
  static async createTask(listId, task): Promise<void> {
    await http.post(`list/${listId}/task/`, task)
  }
}
