// import { useLocation } from "react-router-dom";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// export default function Layout({ children }) {
//   const location = useLocation();
//   const hideLayout = ["/login", "/register"].includes(location.pathname);
 

//   return (
//     <div className="flex flex-col min-h-screen">
//       {!hideLayout && <Navbar />}
//       <main className="flex-grow">{children}</main>
//       {!hideLayout && <Footer />}
//     </div>
//   );
// }

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Navbar always visible */}
      <Navbar />

      {/* ✅ Main content area grows */}
      <main className="flex-grow">{children}</main>

      {/* ✅ Footer always visible */}
      <Footer />
    </div>
  );
}
