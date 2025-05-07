import { FiHome, FiBox, FiUsers, FiPieChart, FiSettings } from "react-icons/fi";
import { ClipBoard, FileText, Book } from "../components/common/icons";

// Icon registry
export const iconRegistry = {
  clipboard: ClipBoard,
  fileText: FileText,
  home: FiHome,
  box: FiBox,
  users: FiUsers,
  pieChart: FiPieChart,
  settings: FiSettings,
  book: Book,
};

// Navigation config
export const sidebarConfig = {
  branding: {
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9",
    title: "Dashboard",
    altText: "Logo",
  },
  navigationItems: [
    {
      id: "invoices",
      path: "/sales-invoices",
      label: "Invoices",
      icon: "fileText",
      type: "parent",
      hasPagination: true,
      tooltip: "Manage all invoices",
      roles: ["admin", "user"],
      priority: 1,
    },
    {
      id: "sales-invoices",
      path: "/sales-invoices",
      label: "Sales Invoices",
      icon: "fileText",
      type: "child",
      parentId: "invoices",
      hasPagination: true,
      tooltip: "View sales invoices",
      roles: ["admin", "user"],
      priority: 1,
    },
    {
      id: "purchase-invoices",
      path: "/purchase-invoices",
      label: "Purchase Invoices",
      icon: "fileText",
      type: "child",
      parentId: "invoices",
      hasPagination: true,
      tooltip: "View purchase invoices",
      roles: ["admin"],
      priority: 2,
    },
    // {
    //   id: "recurring-invoices",
    //   path: "/recurring-invoices",
    //   label: "Recurring Invoices",
    //   icon: "clipboard",
    //   type: "child",
    //   parentId: "invoices",
    //   hasPagination: true,
    //   tooltip: "Manage recurring invoices",
    //   roles: ["admin"],
    //   priority: 3,
    // },
    // {
    //   id: "receipts",
    //   path: "/external-receipts",
    //   label: "Receipts",
    //   icon: "fileText",
    //   type: "parent",
    //   hasPagination: true,
    //   tooltip: "Manage receipts",
    //   roles: ["admin", "user"],
    //   priority: 2,
    // },
    // {
    //   id: "external-receipts",
    //   path: "/external-receipts",
    //   label: "External Receipts",
    //   icon: "fileText",
    //   type: "child",
    //   parentId: "receipts",
    //   hasPagination: true,
    //   tooltip: "View external receipts",
    //   roles: ["admin"],
    //   priority: 1,
    // },
    {
      id: "transactions",
      path: "/transactions",
      label: "Transactions",
      icon: "book",
      type: "parent",
      hasPagination: true,
      tooltip: "View transactions",
      roles: ["admin", "user"],
      priority: 3,
    },
    // {
    //   id: "requests",
    //   path: "/requests",
    //   label: "Requests",
    //   icon: "clipboard",
    //   type: "parent",
    //   hasPagination: true,
    //   tooltip: "Manage requests",
    //   roles: ["admin", "user"],
    //   priority: 4,
    // },
  ],
};

// Cache for processed navigation data
let cachedTree = null;
let lastRoles = null;
let cachedMap = null;
let cachedPathRelationships = null;

// Utility to get navigation tree
export const getNavigationTree = (items, userRoles = ["user"]) => {
  if (
    cachedTree &&
    lastRoles &&
    userRoles.length === lastRoles.length &&
    userRoles.every((role, i) => role === lastRoles[i])
  ) {
    return cachedTree;
  }

  const tree = [];
  const map = new Map(
    items.map((item) => [item.id, { ...item, children: [] }])
  );

  for (const item of items) {
    if (!item.roles.some((role) => userRoles.includes(role))) {
      continue;
    }
    if (item.parentId) {
      map.get(item.parentId)?.children.push(map.get(item.id));
    } else {
      tree.push(map.get(item.id));
    }
  }

  tree.sort((a, b) => a.priority - b.priority);
  tree.forEach((item) => item.children.sort((a, b) => a.priority - b.priority));

  cachedTree = tree;
  lastRoles = [...userRoles];
  return tree;
};

// Utility for navigation map
export const getNavigationMap = (items) => {
  if (cachedMap) {
    return cachedMap;
  }
  cachedMap = new Map(items.map((item) => [item.path, item]));
  return cachedMap;
};

/**
 * Utility to get path relationships for efficient sidebar expansion
 * This pre-computes all possible path relationships to enable O(1) lookups
 * @param {Array} items - Navigation items
 * @returns {Object} Object containing pathToParentMap and pathPrefixLookup
 */
export const getPathRelationships = (items) => {
  if (cachedPathRelationships) {
    return cachedPathRelationships;
  }

  const pathToParentMap = new Map();
  const pathPrefixLookup = {};

  // Process all items to build the maps
  const processItem = (item) => {
    // Store direct parent relationship
    const parentId = item.parentId || item.id;
    pathToParentMap.set(item.path, parentId);

    // Create path segments for prefix matching
    // This allows for O(1) lookup of any path that starts with this path
    const segments = item.path.split("/").filter(Boolean);
    let currentPath = "";

    // Build all possible path prefixes and map them to this parent
    for (let i = 0; i < segments.length; i++) {
      currentPath += "/" + segments[i];

      // Store this path prefix and its parent ID
      pathPrefixLookup[currentPath] = parentId;

      // Also store with trailing slash for exact matching
      pathPrefixLookup[currentPath + "/"] = parentId;
    }
  };

  // Process all items
  items.forEach(processItem);

  cachedPathRelationships = {
    pathToParentMap,
    pathPrefixLookup,
  };

  return cachedPathRelationships;
};

/**
 * Utility to find the parent ID for any path, including nested paths
 * This provides O(1) lookup time for any path
 * @param {string} path - The current path to find a parent for
 * @returns {string|null} The parent ID or null if not found
 */
export const findParentForPath = (path) => {
  const { pathToParentMap, pathPrefixLookup } = getPathRelationships(
    sidebarConfig.navigationItems
  );

  // First check for exact path match
  if (pathToParentMap.has(path)) {
    return pathToParentMap.get(path);
  }

  // If no exact match, try to find the longest matching prefix
  // Start with the full path and remove segments until we find a match
  let pathToCheck = path;

  while (pathToCheck && pathToCheck !== "/") {
    if (pathPrefixLookup[pathToCheck]) {
      return pathPrefixLookup[pathToCheck];
    }

    // Add trailing slash and check again
    if (pathPrefixLookup[pathToCheck + "/"]) {
      return pathPrefixLookup[pathToCheck + "/"];
    }

    // Remove the last path segment
    const lastSlashIndex = pathToCheck.lastIndexOf("/");
    if (lastSlashIndex <= 0) {
      // We've reached the root
      pathToCheck = "/";
    } else {
      pathToCheck = pathToCheck.substring(0, lastSlashIndex);
    }
  }

  // Check root path as last resort
  return pathPrefixLookup["/"] || null;
};
