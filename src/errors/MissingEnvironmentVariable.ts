export default class MissingEnvironmentVariableError extends Error {
  variable: string;
  constructor(variable: string) {
    super(`Missing environment variable ${variable}`);
    this.variable = variable;
  }
}
