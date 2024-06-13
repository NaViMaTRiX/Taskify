import { Navbar } from "./_components/navbar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full dark:bg-slate-800">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
