import * as yargs from "yargs";
import LessonService from "@/services/LessonService";

function getDefaultLessonDate(): Date {
  const date = new Date();
  date.setHours(14, 0, 0, 0);
  return date;
}

export class LessonReminderCommand implements yargs.CommandModule {
  command = "lesson:create";
  describe = "Creates a ClickUp task with a subtasks for review the knowledge acquired for 1 day, 1 week and 1 month afterward";

  builder(args: yargs.Argv) {
    return args
      .option("n", {
        alias: "name",
        describe: "Name of the lesson",
        demandOption: true
      })
      .option("date", {
        describe: "Date of the lesson, from this date the due date of each review will be calculated to 1 day, 1 week and 1 month afterwards, by default today will be used at 3pm"
      })
  }

  async handler(args: yargs.Arguments) {
    const {name, date} = args;
    const parsedDate = date? new Date(date as string): getDefaultLessonDate();
    await LessonService.createLesson(name as string, parsedDate);
  }
}
