import { combineComponents } from "./combineComponents";
import { AthletesProvider } from "./AthleteProvider";
import { PostProvider } from './PostProvider';
import { LiftProvider } from './LiftProvider';
import { TeamProvider } from "./TeamProvider";
import { UserTypeProvider } from "./UserTypeProvider";



const providers = [
  AthletesProvider,
  PostProvider,
  LiftProvider,
  TeamProvider,
  UserTypeProvider,


];
export const AppContextProvider = combineComponents(...providers);
