interface TranslateInterface {
  current: any;
  next: any;
  layouts: any;
}

interface OptionInterface {
  headerShown: boolean;
  cardStyleInterpolator: any;
}

interface StackScreenInterface {
  name: string;
  component: React.FCComponent;
  option: OptionInterface;
}

interface NavigationParams {
  navigation: any;
}