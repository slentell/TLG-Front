import { combineComponents } from "./combineComponents";
import { AthletesProvider } from "./AthleteProvider";
import { PostProvider } from './PostProvider';

const providers = [
  AthletesProvider,
  PostProvider
];
export const AppContextProvider = combineComponents(...providers);
