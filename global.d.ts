interface TranslateInterface {
  current: any;
  next: any;
  layouts: any;
}

interface OptionInterface {
  headerShown: boolean;
  cardStyleInterpolator: any;
}

interface IsNotLoginInterface {
  name: string;
  component: React.FCComponent;
  option: OptionInterface;
}

interface NavigationParams {
  navigation: any;
}