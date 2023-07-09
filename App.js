import { AuthProvider } from "./app/context/AuthContext";
import { Layout } from "./Layout";
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications'

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <ToastProvider>
          <Layout />
        </ToastProvider>
      </PaperProvider>
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);