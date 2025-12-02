import { Footer, Header } from "@/components/common";
import { Outlet } from "react-router-dom";

const CommonLayout: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-28">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default CommonLayout;
