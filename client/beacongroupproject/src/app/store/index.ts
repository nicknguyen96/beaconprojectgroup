import { housingReducer } from "./housing/housing.reducer";
import { hrReducer } from "./hr/hr.reducer";
import { loadingReducer } from "./loading/loading.reducer";
import { onboardingReducer } from "./onboarding/onboarding.reducer";
import { authReducer } from "./user/auth.reducer";

export const storeReducer = {
    auth: authReducer,
    hr: hrReducer,
    employeeDetails: onboardingReducer,
    house: housingReducer,
    loading: loadingReducer,
}