import { CLIController } from './controllers/CLIController';

export const init = () => CLIController.interpret(process);
