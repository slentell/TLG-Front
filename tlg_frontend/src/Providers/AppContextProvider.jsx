import { combineComponents } from "./combineComponents";
import { AthletesProvider } from "./AthleteProvider";
import { PostProvider } from './PostProvider';
import { LiftProvider } from './LiftProvider';

const providers = [
  AthletesProvider,
  PostProvider,
  LiftProvider,
];
export const AppContextProvider = combineComponents(...providers);
