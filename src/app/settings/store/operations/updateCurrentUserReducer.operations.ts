import { SettingsStateInterface } from 'src/app/settings/types/settingsState.interface'
import { RequestFailureActionProps } from 'src/app/shared/types/requestFailureActionProps.type'

export const updateCurrentUserOperation = (
    state: SettingsStateInterface
): SettingsStateInterface => ({
    ...state,
    isSubmitting: true,
})

export const updateCurrentUserSuccessOperation = (
    state: SettingsStateInterface
): SettingsStateInterface => ({
    ...state,
    isSubmitting: false,
})

export const updateCurrentUserFailureOperation = (
    state: SettingsStateInterface,
    action: RequestFailureActionProps
): SettingsStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
})
