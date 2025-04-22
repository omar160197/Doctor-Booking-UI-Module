"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Menu,
  User,
  Bell,
  Search,
  Home,
  Calendar,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { useMediaQuery } from "../../hooks/use-media-query";
import { useBookingStore } from "@/src/store/bookingStore";

function AppointmentsBadge() {
  const { bookedSlots } = useBookingStore();
  if (!bookedSlots.length) return null;

  return (
    <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
      {bookedSlots.length}
    </span>
  );
}

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    {
      icon: Calendar,
      label: "Appointments",
      href: "/appointments",
      badge: true,
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the sidebar and menu button
      if (isSidebarOpen && 
          !event.target.closest('[data-sidebar="content"]') && 
          !event.target.closest('[data-sidebar="trigger"]')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background" role="banner">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <Button
            variant="outline"
            size="icon"
            data-sidebar="trigger"
            className="mr-4 md:mr-6"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">MedApp</span>
          </div>

          <div className="ml-auto flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      {isDesktop && (
        <div
          data-sidebar="content"
          className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-background shadow-lg transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center border-b px-6">
            <span className="text-lg font-semibold">Menu</span>
          </div>
          <nav className="space-y-1 px-3 py-4" aria-label="Main navigation">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-primary"
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && <AppointmentsBadge />}
              </a>
            ))}
            <div className="pt-6">
              <a
                href="#"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Mobile Drawer */}
      {!isDesktop && (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="bottom" className="h-[70vh]">
            <nav className="grid gap-2 py-6" aria-label="Mobile navigation">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center rounded-md px-3 py-4 text-base font-medium hover:bg-muted hover:text-primary"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && <AppointmentsBadge />}
                </a>
              ))}
              <div className="pt-6">
                <a
                  href="#"
                  className="flex items-center rounded-md px-3 py-4 text-base font-medium text-red-500 hover:bg-red-50"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </a>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
