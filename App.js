import { AuthProvider } from "./app/context/AuthContext";
import { Layout } from "./Layout";
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={{}} >
        <Layout></Layout>
      </PaperProvider>
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);