import {validateEnvironmentVariables} from "@/utils/validation";
import ClickUpService from "@/services/ClickUpService";
import {AREA_CUSTOM_FIELD, CATEGORY_CUSTOM_FIELD} from "@/settings";

export default class LessonService {
  static async createLesson(name: string, dueDate: Date) {
    validateEnvironmentVariables(['LESSON_LIST_ID', 'USER_ID']);
    const {LESSON_LIST_ID, USER_ID} = process.env;
    const assignees = [
      USER_ID
    ];
    const parentTask = await ClickUpService.createTask(LESSON_LIST_ID, {
      name,
      assignees,
      due_date: dueDate.getTime(),
      "custom_fields": [
        {
          "id": CATEGORY_CUSTOM_FIELD.id,
          "value": [CATEGORY_CUSTOM_FIELD.options['Learning'].id]
        },
        {
          "id": AREA_CUSTOM_FIELD.id,
          "value": AREA_CUSTOM_FIELD.options.Professional.id
        }
      ]
    })
  }
}
