import { getAnalytics } from "firebase/analytics";
import { app } from './database';

export const analytics = getAnalytics(app);
