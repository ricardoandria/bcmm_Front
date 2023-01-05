import SideNavbar from "../Aside/SideNavbar";

export default function Layout({ children }) {
  return (
    <div className="flex  relative w-full">
      <div className="w-[20%]">
        <SideNavbar></SideNavbar>
      </div>

      <main className="absolute top-16 md:top-6 md:left-80 w-full md:w-[80%]">
        {children}
      </main>
    </div>
  );
}
