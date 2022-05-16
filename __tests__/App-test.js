import {it, jest} from '@jest/globals';

//mocking async storage module
jest.mock('@react-native-community/async-storage', () => ({
  setItem: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  return {
    createNavigatorFactory: jest.fn(),
    useNavigation: jest.fn(),
  };
});
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
}));
jest.mock('@react-native-community/masked-view', () => ({}));
