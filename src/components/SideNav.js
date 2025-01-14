"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import logoFull from "@/assets/PTR_logo_primary_fullcolor_reverse.jpg";
import logoSmall from "@/assets/PTR_icon_red.png";
import Icon, {
  DashboardFilled,
  RightOutlined,
  LeftOutlined,
  FileTextFilled,
  PieChartFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AmazonCircleFilled,
} from "@ant-design/icons";

export default function SideNav({ selectedNavbar, collapsed, setCollapsed }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("sidebarExpanded");
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true; // default state if window is not defined
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "sidebarExpanded",
        JSON.stringify(isSidebarExpanded)
      );
    }
  }, [isSidebarExpanded]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const items = [
    {
      path: "/dashboard",
      icon: PieChartFilled,
      iconActive: PieChartFilled,
      label: "Dashboard",
    },
    {
      path: "/realtime",
      icon: DashboardFilled,
      iconActive: DashboardFilled,
      label: "Realtime",
    },

    // {
    //   path: "/report",
    //   icon: FileTextFilled,
    //   iconActive: FileTextFilled,
    //   label: "Report",
    // },
  ];

  return (
    <div>
      <div
        className={`${
          isSidebarExpanded ? "w-[180px]" : "w-[68px]"
        }  border-r transition-all duration-300 ease-in-out transform hidden sm:flex h-screen bg-navy`}
      >
        <aside className="fixed top-0 flex flex-col w-full h-screen px-4 overflow-x-hidden break-words z-1 columns-1">
          {/* Top */}
          <div className="relative pb-4 mt-2">
            <div className="flex flex-col space-y-2">
              <Link href="/">
                <Image
                  src={isSidebarExpanded ? logoFull : logoSmall}
                  alt="Logo"
                  width="100%"
                  height="50px"
                  priority={true}
                />
              </Link>
              {items.map(({ path, icon, iconActive, label }) => (
                <SideNavItem
                  key={path}
                  label={label}
                  icon={
                    selectedNavbar === label ? (
                      <Icon
                        component={iconActive}
                        style={{ color: "#E64A51" }}
                      />
                    ) : (
                      <Icon component={icon} />
                    )
                  }
                  // icon={
                  //   <IconComponent
                  //     style={{
                  //       color: selectedNavbar === path ? "#E64A51" : "inherit",
                  //     }}
                  //   />
                  // }
                  path={path}
                  active={selectedNavbar === path} // Set to `true` based on current route
                  isSidebarExpanded={isSidebarExpanded}
                />
              ))}
            </div>
          </div>
          {/* Bottom */}
          <div className="sticky bottom-0 block mt-auto mb-4 mr-0 transition duration-200 whitespace-nowrap">
            <div className="flex justify-end space-y-2 ">
              {/* <button
                type="button"
                className="text-xl text-white"
                onClick={toggleSidebar}
              >
                {isSidebarExpanded ? (
                  <MenuFoldOutlined style={{ fontSize: "1rem" }} />
                ) : (
                  <MenuUnfoldOutlined style={{ fontSize: "1rem" }} />
                )}
              </button> */}
            </div>
          </div>
        </aside>
        <div className="mt-[calc(calc(90vh)-40px)] flex">
          <button
            type="button"
            className="absolute bottom-32 right-[-12px] flex h-7 w-7 items-center justify-center border border-muted-foreground/20 rounded-full bg-navy/70 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out text-white text-xl"
            onClick={toggleSidebar}
          >
            {isSidebarExpanded ? (
              <LeftOutlined style={{ fontSize: "1rem" }} />
            ) : (
              <RightOutlined style={{ fontSize: "1rem" }} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// export const SideNavItem = ({
//   label,
//   icon,
//   path,
//   active,
//   isSidebarExpanded,
// }) => {
//   return (
//     <>
//       {isSidebarExpanded ? (
//         <Link
//           href={path}
//           className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
//             active
//               ? " text-red "
//               : "font-base text-sm  bg-navy shadow-sm text-white "
//           }`}
//         >
//           <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
//             {icon}
//             <span>{label}</span>
//           </div>
//         </Link>
//       ) : (
//         <div delayDuration={70}>
//           <Link
//             href={path}
//             className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
//               active
//                 ? "text-red"
//                 : "font-base text-sm  bg-navy shadow-sm text-white "
//             }`}
//           >
//             <div className="relative flex flex-row items-center p-2 space-x-2 text-sm duration-100 rounded-md font-base">
//               {icon}
//             </div>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

export const SideNavItem = ({
  label,
  icon,
  path,
  active,
  isSidebarExpanded,
}) => {
  return (
    <Link
      href={path}
      className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
        active
          ? "bg-beige text-navy"
          : "font-base text-sm bg-navy shadow-sm text-white"
      }`}
    >
      <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
        {icon}
        {isSidebarExpanded && <span>{label}</span>}
      </div>
    </Link>
  );
};
