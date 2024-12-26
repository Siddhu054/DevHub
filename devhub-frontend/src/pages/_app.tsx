import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import { NotificationProvider } from "../contexts/NotificationContext";
import { WidgetProvider } from "../contexts/WidgetContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WidgetProvider>
      <AuthProvider>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </AuthProvider>
    </WidgetProvider>
  );
}
