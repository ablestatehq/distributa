import cn from "../../utils/cn";
const MainLayout = ({ className, children }) => {
  return <main className={cn("h-screen w-screen", className)}>{children}</main>;
};

export default MainLayout;
