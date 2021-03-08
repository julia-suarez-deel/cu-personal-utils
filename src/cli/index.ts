#!/usr/bin/env node
import { config } from "dotenv";
import * as yargonaut from "yargonaut";

config();
import "reflect-metadata";
import * as yargs from "yargs";
import { LessonReminderCommand } from "./commands/LessonReminderCommand";

yargs
  .usage("Usage: $0 <command> [options]")
  .command(new LessonReminderCommand())
  .recommendCommands()
  .demandCommand(1)
  .strict()
  .alias("v", "version")
  .help("h")
  .alias("h", "help").argv;

yargonaut
  .style("blue")
  .style("yellow", "required")
  .helpStyle("green")
  .errorsStyle("red");
