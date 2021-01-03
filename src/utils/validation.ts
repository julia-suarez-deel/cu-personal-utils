import MissingEnvironmentVariable from "@/errors/MissingEnvironmentVariable";

export function validateEnvironmentVariables(variables: string[]) {
  for(const variable of variables) {
    if(!variable) throw new MissingEnvironmentVariable(variable);
  }
}
