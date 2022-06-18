
import { combineComponents } from './combineComponents';
import { AthletesProvider } from './AthleteProvider';


const providers = [
  AthletesProvider,

]
export const AppContextProvider = combineComponents(...providers);