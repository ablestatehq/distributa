# Sidebar Component Structure

```
src/
└── Layouts/
    └── components/
        └── sidebar/
            ├── index.js                 # Main export file
            ├── SideBar.jsx              # Main sidebar component
            ├── MobileHeader.jsx         # Mobile header component
            ├── MenuItem.jsx             # Menu item component
            ├── SubMenu.jsx              # Submenu component
            ├── CollapsedSubMenu.jsx     # Collapsed submenu component
            ├── SidebarFooter.jsx        # Footer with logout/settings
            └── hooks/
                ├── useSidebarState.js   # Custom hook for sidebar state
                └── useNavigationData.js  # Hook for navigation data
```

This structure separates concerns and makes each component more focused and maintainable.
