import { fetchNavbar, fetchSidebar, fetchBodyContent } from '@/utils/api';
import MainBody from './components/MainBody';
import Sidebar from './components/Sidebar';

export default async function HomePage() {
  const navItems = await fetchNavbar();

  if (navItems.length === 0) {
    return <div>No navigation items available.</div>;
  }

  const firstNavItem = navItems[0];
  const sidebarItems = await fetchSidebar(firstNavItem.id);

  let bodyContent;

  if (sidebarItems.length > 0) {
    // Sidebar exists – fetch content for first sidebar item
    bodyContent = await fetchBodyContent(sidebarItems[0].id);
  } else {
    // No sidebar – fallback to content using nav ID
    bodyContent = await fetchBodyContent(firstNavItem.id);
  }

  return (
    <div className="content">
      {/* Only show Sidebar if there are sidebar items */}
      {sidebarItems.length > 0 && (
        <Sidebar
          sidebarItems={sidebarItems}
          initialSidebarId={sidebarItems[0].id}
        />
      )}

      <MainBody
        content={bodyContent}
        activeSidebarId={sidebarItems[0]?.id ?? null}
        sidebarItems={sidebarItems}
        activeNavId={firstNavItem.id}
        navItems={navItems}
      />
    </div>
  );
}
