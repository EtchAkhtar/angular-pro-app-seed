import { AuthGuard } from './auth.guard';
import { LoggedInGuard } from './loggedin.guard';

export const guards: any[] = [AuthGuard, LoggedInGuard];

export * from './auth.guard';
export * from './loggedin.guard';
