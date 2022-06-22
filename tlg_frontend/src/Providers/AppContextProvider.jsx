import { combineComponents } from "./combineComponents";
import { AthletesProvider } from "./AthleteProvider";
import { PostProvider } from './PostProvider';
import { LiftProvider } from './LiftProvider';
import { TeamProvider } from "./TeamProvider";


const providers = [
  AthletesProvider,
  PostProvider,
  LiftProvider,
  TeamProvider,

];
export const AppContextProvider = combineComponents(...providers);
