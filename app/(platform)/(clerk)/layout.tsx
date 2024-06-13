const ClerkLayout = ({ children }: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full flex items-center justify-center dark:bg-slate-800">
      {children}
    </div>
  );
};

export default ClerkLayout;
