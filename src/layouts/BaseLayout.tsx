import { Footer, Header } from "@/components/common";
import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router-dom";

const BaseLayout: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <section className="max-w-7xl mx-auto px-4 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-28">
          <Outlet />
        </main>
        <Footer />
      </section>
    </ThemeProvider>
  );
};

export default BaseLayout;
