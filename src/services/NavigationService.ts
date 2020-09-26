import { NavigationActions, NavigationContainerComponent, NavigationParams, NavigationState } from "react-navigation";

let navigatorContainer!: NavigationContainerComponent;
let navigationState: NavigationState | null = null

function setContainer(_CONTAINER: NavigationContainerComponent) {
  navigatorContainer = _CONTAINER;
}

function navigate(routeName: string, params?: NavigationParams, key?: string) {
  navigatorContainer && navigatorContainer.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      key
    }),
  );
}

export const NavigationServices = {
  setContainer,
  navigate
}