import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  // Briefcase,
  // Building2,
  // CheckCircle2,
  ChevronRight,
  // ClipboardList,
  // Clock,
  FileText,
  LayoutDashboard,
  Map,
  // MapPin,
  // MessageSquare,
  // Timer,
  // UserCheck,
  UserPlus,
  Users
} from "lucide-react";
import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
// import SidebarLogo from "@/assets/images/Logo.png";
import { useAuth } from "@/context/authcontext";
import { Role } from "@/enum/enum";
// import { FaHandHoldingMedical } from "react-icons/fa6";

interface ItemsType {
  title: string;
  description?: string;
  url: string;
  icon: React.ComponentType<any>;
  dropdown?: {
    title: string;
    url: string;
    icon: React.ComponentType<any>;
    notify?: number;
  }[];
  notify?: number;
  permissions?: string[];
}

export function AppSidebar() {
  const pathname = useLocation().pathname;
  const { user } = useAuth();

  const [openDropdowns, setOpenDropdowns] = React.useState<boolean[]>([]);

  const handleDropdownToggle = useCallback((idx: number) => {
    setOpenDropdowns((prev) => {
      const newState = [...prev];
      newState[idx] = !newState[idx];
      return newState;
    });
  }, []);

  // Memoized menu items
  let items: ItemsType[] = [
    {
      title: "Executive Summary",
      description: "Overview & KPIs",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Add Consumer",
      description: "Onboard new consumer",
      url: "/consumers",
      icon: UserPlus,
    },
    {
      title: "Reports",
      description: "System reports & analytics",
      url: "/report",
      icon: FileText,
    },
  ];

  if (user?.role === Role.SUPERADMIN) {
    items = [
      ...items,
      {
        title: "User Management",
        description: "Manage user accounts",
        url: "/users",
        icon: Users,
      },
      {
        title: "State Management",
        description: "Manage states",
        url: "/location", // Assuming location maps to state/city management
        icon: Map,
      },
      // Add more for superadmin as needed
    ];
  } 
  // else if (user?.role === Role.CITYADMIN) {
  //   items = [
  //     ...items,

  //     {
  //       title: "Add Caregiver",
  //       description: "Add new caregiver",
  //       url: "/caregivers",
  //       icon: UserCheck,
  //     },
  //     {
  //       title: "Authorized vs Billed",
  //       description: "Hours utilization",
  //       url: "/hours-utilization", // Placeholder URL
  //       icon: Clock,
  //     },
  //     {
  //       title: "Company Management",
  //       description: "Manage companies",
  //       url: "/company",
  //       icon: Building2,
  //     },
  //     {
  //       title: "Department Management",
  //       description: "Manage departments",
  //       url: "/department",
  //       icon: Briefcase,
  //     },
  //     {
  //       title: "State Management",
  //       description: "Manage states",
  //       url: "/state-management",
  //       icon: Map,
  //     },
  //     {
  //       title: "City Management",
  //       description: "Manage cities",
  //       url: "/city-management",
  //       icon: MapPin,
  //     },
  //     {
  //       title: "User Management",
  //       description: "Manage user accounts",
  //       url: "/users",
  //       icon: Users,
  //     },
  //     {
  //       title: "Audit Log",
  //       description: "System activity tracking",
  //       url: "/audit-log",
  //       icon: ClipboardList,
  //     },
  //     {
  //       title: "Company Messaging",
  //       description: "Send company-wide messages",
  //       url: "/messaging",
  //       icon: MessageSquare,
  //     },
  //     {
  //       title: "Record Billed Hours",
  //       description: "Submit actual hours worked",
  //       url: "/work-log",
  //       icon: Timer,
  //     },
  //     {
  //       title: "Pre-Launch Checklist",
  //       description: "Production readiness validation",
  //       url: "/checklist",
  //       icon: CheckCircle2,
  //     },
  //     {
  //       title: "Insurance",
  //       description: "Manage providers",
  //       url: "/insurance-providers",
  //       icon: FaHandHoldingMedical,
  //     },
  //   ];
  // }

  return (
    <Sidebar className="h-screen bg-gray-50/50">
      {/* Sticky Header */}
      <SidebarHeader className="sticky top-0 z-20 bg-white px-6 py-4 h-16 flex items-center justify-center">
        <img
          src={"/intra-logo.png"}
          alt="IntraNational"
          className="h-8 w-auto object-contain"
        />
      </SidebarHeader>

      {/* Scrollable Content */}
      <SidebarContent className="px-4 py-4 gap-4">
        {/* Increased gap from 2 to 4 */}
        <SidebarMenu className="gap-3">
          {items?.map((item: ItemsType, idx: number) => (
            <SidebarMenuItem key={item.title}>
              {item.dropdown ? (
                <div className="border rounded-2xl bg-white overflow-hidden shadow-sm transition-all hover:shadow-md">
                  {/* Dropdown Logic implementation if needed, currently styled as cards mainly for single items based on screenshot */}
                  <SidebarMenuButton
                    onClick={() => handleDropdownToggle(idx)}
                    className={`w-full h-auto py-3 px-4 flex items-center gap-4 transition-colors
                          ${item.dropdown.some((subItem) =>
                      pathname.includes(subItem.url),
                    ) && !openDropdowns[idx]
                        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-600 hover:text-white"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-white hover:text-gray-700"
                      } `}
                  >
                    <div className={`p-2 rounded-lg ${item.dropdown.some((subItem) => pathname.includes(subItem.url)) && !openDropdowns[idx]
                      ? "bg-white/20 text-white"
                      : "text-gray-500"
                      }`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col items-start flex-1 text-left">
                      <span className="font-semibold text-sm">{item.title}</span>
                      {item.description && <span className={`text-xs ${item.dropdown.some((subItem) => pathname.includes(subItem.url)) && !openDropdowns[idx]
                        ? "text-blue-100"
                        : "text-gray-500"
                        }`}>{item.description}</span>}
                    </div>
                    <ChevronRight
                      className={`h-5 w-5 transition-transform ${openDropdowns[idx] ? "rotate-90" : ""
                        }`}
                    />
                  </SidebarMenuButton>

                  {openDropdowns[idx] && (
                    <SidebarMenu className="bg-gray-50 border-t">
                      {item.dropdown.map((subItem: any) => (
                        <SidebarMenuItem key={subItem.title}>
                          <Link to={subItem.url}>
                            <SidebarMenuButton className={`w-full h-auto py-2 px-12 flex items-center gap-3 hover:text-blue-600 hover:bg-transparent
                                     ${pathname.includes(subItem.url) ? "text-blue-600 font-medium" : "text-gray-600"}
                                `}>
                              <subItem.icon className="h-4 w-4" />
                              <span>{subItem.title}</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  )}
                </div>
              ) : (
                <Link to={item.url} className="block">
                  <SidebarMenuButton
                    className={`w-full h-auto py-3 px-4 rounded-2xl border flex items-center gap-4 transition-all shadow-sm group
                    ${pathname === item.url
                        ? "bg-blue-600 text-white border-blue-600 shadow-blue-200 hover:bg-blue-600 hover:text-white"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-white hover:text-gray-700"
                      }
                    `}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${pathname === item.url
                      ? "bg-white/20 text-white"
                      : "bg-transparent text-gray-400"
                      }`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-sm">{item.title}</span>
                      {item.description && (
                        <span className={`text-xs ${pathname === item.url ? "text-blue-100" : "text-gray-500"
                          }`}>
                          {item.description}
                        </span>
                      )}
                    </div>
                    {/* Only show chevron formatting */}
                    {pathname === item.url && <ChevronRight className="h-5 w-5 ml-auto text-white/70" />}
                  </SidebarMenuButton>
                </Link>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Sticky Footer */}
      <SidebarFooter className="sticky bottom-0 z-20 bg-white border-t p-4">
        <div className="bg-blue-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-200">
          <h3 className="font-bold text-lg">IntraNational</h3>
          <p className="text-sm text-blue-100">Home Care Services</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
