import * as dayjs from "dayjs";
import { validateEnvironmentVariables } from "@/utils/validation";
import ClickUpService from "@/services/ClickUpService";
import { OpUnitType } from "dayjs";

function formatLessonReviewName(name: string, timePeriod: string): string {
  return `Review ${name.toLowerCase()} lesson in ${timePeriod}`;
}

function buildTimeRangeFromDate(date: Date, value: number, unit: OpUnitType) {
  const start = dayjs(date).add(value, unit).toDate().getTime();
  return {
    start,
    end: dayjs(start).add(1, "hour").toDate().getTime(),
  };
}

function getSummaryTimePeriod(date: Date) {
  return {
    start: dayjs(date).hour(19).toDate().getTime(),
    end: dayjs(date).hour(20).toDate().getTime(),
  };
}

export default class LessonService {
  static async createLesson(name: string, date: Date): Promise<void> {
    validateEnvironmentVariables(["LESSON_LIST_ID", "USER_ID"]);
    const user = await ClickUpService.getUser();
    const { LESSON_LIST_ID } = process.env;
    const assignees = [user.id];
    const dateInADay = buildTimeRangeFromDate(date, 1, "day");
    const dateInAWeek = buildTimeRangeFromDate(date, 1, "week");
    const dateInAMonth = buildTimeRangeFromDate(date, 1, "month");
    const commonTaskOptions = {
      start_date_time: true,
      due_date_time: true,
      assignees,
    };
    const parentTask = await ClickUpService.createTask(LESSON_LIST_ID, {
      ...commonTaskOptions,
      name,
      start_date: dateInAMonth.start,
      due_date: dateInAMonth.end,
    });
    const summaryTimePeriod = getSummaryTimePeriod(date);
    await ClickUpService.createTask(LESSON_LIST_ID, {
      ...commonTaskOptions,
      parent: parentTask.id,
      name: "Write lesson summary",
      start_date: summaryTimePeriod.start,
      due_date: summaryTimePeriod.end,
    });
    await ClickUpService.createTask(LESSON_LIST_ID, {
      ...commonTaskOptions,
      parent: parentTask.id,
      name: formatLessonReviewName(name, "a day"),
      start_date: dateInADay.start,
      due_date: dateInADay.end,
    });
    await ClickUpService.createTask(LESSON_LIST_ID, {
      ...commonTaskOptions,
      parent: parentTask.id,
      name: formatLessonReviewName(name, "a week"),
      start_date: dateInAWeek.start,
      due_date: dateInAWeek.end,
    });
    await ClickUpService.createTask(LESSON_LIST_ID, {
      ...commonTaskOptions,
      parent: parentTask.id,
      name: formatLessonReviewName(name, "a month"),
      start_date: dateInAMonth.start,
      due_date: dateInAMonth.end,
    });
  }
}
