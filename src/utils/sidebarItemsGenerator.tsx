/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from "react";
import { NavLink } from "react-router-dom";

// Define types for the input item and child item
interface SidebarItem {
  key: string;
  path?: string;
  name?: string;
  icon?: any;
  children?: SidebarItem[]; // Recursive type for nested children
}

interface SidebarItemWithChildren {
  key: string;
  icon: JSX.Element | null;
  label: JSX.Element;
  children?: { key: string; label: JSX.Element }[];
}

export const sidebarItemsGenerator = (
  items: SidebarItem[],
  role: string
): SidebarItemWithChildren[] => {
  const sidebarItems = items.reduce<SidebarItemWithChildren[]>((acc, item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.key,
        icon: item.icon ? (
          <img
            src={item.icon}
            alt="icon"
            width={20}
            style={{
              marginRight: "5px",
              filter: location.pathname.includes(item.path)
                ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
                : undefined,
            }}
          />
        ) : null,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children && item.children.length > 0) {
      acc.push({
        key: item.key,
        icon:
          typeof item.icon === "string" ? (
            <img
              src={item.icon}
              alt="icon"
              width={20}
              style={{
                marginRight: "5px",
                filter:
                  item.key && location.pathname.includes(item.key)
                    ? "invert(1) sepia(1) saturate(0) brightness(200%) contrast(100%)"
                    : undefined,
              }}
            />
          ) : (
            item.icon ?? null
          ),
        label: <span>{item.name}</span>,
        children: item.children
          .filter((child) => child.name)
          .map((child) => ({
            key: child.key,
            label: (
              <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
            ),
            // child.icon can be a bullet <span> or an image
            icon:
              typeof child.icon === "string" ? (
                <img src={child.icon} alt="child-icon" width={14} />
              ) : (
                child.icon ?? null
              ),
          })),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
