import { combineComponents } from "./combineComponents";
import { AthletesProvider } from "./AthleteProvider";
import { PostProvider } from './PostProvider';
import { LiftProvider } from './LiftProvider';
import { TeamProvider } from "./TeamProvider";
import { UserTypeProvider } from "./UserTypeProvider";
import { MaxLiftProvider } from "./MaxLiftProvider";
import { AthleteByTeamProvider } from "./AthleteByTeam";



const providers = [
  AthletesProvider,
  PostProvider,
  LiftProvider,
  TeamProvider,
  UserTypeProvider,
  MaxLiftProvider,
  AthleteByTeamProvider,


];
export const AppContextProvider = combineComponents(...providers);
