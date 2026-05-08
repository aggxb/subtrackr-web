import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Page from './components/Page';
import { Toast } from '@heroui/react';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toast.Provider placement="top" />
      <Page />
    </QueryClientProvider>
  );
}

export default App;
