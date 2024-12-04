import { QueryClient, QueryClientProvider } from "react-query"; // Import React Query dependencies
import Header from "component/common/header";
import HomePage from "component/home";
import Footer from "component/common/footer";

const App = () => {
    const queryClient = new QueryClient(); // Initialize React Query client

    return (
        <QueryClientProvider client={queryClient}>
            <Header />
                <HomePage />
            <Footer />
        </QueryClientProvider>
    );
}

export default App;
