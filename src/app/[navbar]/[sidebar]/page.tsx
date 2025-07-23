// src/app/[navbar]/[sidebar]/page.tsx
import { fetchNavbar, fetchSidebar, fetchBodyContent, fetchQuizzes, fetchChoices, fetchInterviewQuestions } from '@/utils/api';
import MainBody from '../../components/MainBody';
import Sidebar from '../../components/Sidebar';
import Ads from '@/app/components/Ads';

// Utility functions for title formatting
const memoizedFormatTitle = (() => {
  const cache = new Map();
  return (title: string, forUrl: boolean = false) => {
    const key = `${title}-${forUrl}`;
    if (cache.has(key)) {
      return cache.get(key);
    }
    const formatted = title
      .replace(/#/g, 'sharp')
      .replace(/\.net/gi, 'dotnet')
      .replace(forUrl ? /\s+/g : /-/g, forUrl ? '-' : ' ')
      .trim()
      .toLowerCase();

    const result = forUrl
      ? formatted
      : formatted
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

    cache.set(key, result);
    return result;
  };
})();

const trimQuestionMark = (title: string) =>
  title.endsWith('?') ? title.slice(0, -1).trim() : title.trim();

export async function generateMetadata({ params }: { params: { navbar: string; sidebar: string } }) {
  const { navbar, sidebar } = params;

  const formattedNavbar = memoizedFormatTitle(navbar);
  const formattedSidebar = memoizedFormatTitle(sidebar);
  const canonicalUrl = `https://www.alphatutor.org/${memoizedFormatTitle(navbar, true)}/${memoizedFormatTitle(sidebar, true)}`;

  return {
    title: `${formattedSidebar.replace(/Csharp/g, 'C#').replace(/Dotnet/g, '.NET')} | Alphatutor`,
    description: `Explore the ${formattedSidebar} section under ${formattedNavbar} with AlphaTutor. Learn about Generative AI, Java, Spring Boot, Flutter, and more through expert-led tutorials and courses.`,
    canonical: canonicalUrl,
  };
}

export default async function SidebarPage({ params }: { params: { navbar: string; sidebar: string } }) {
  try {
    const { navbar, sidebar } = params;

    // Format titles
    const formattedNavbar = memoizedFormatTitle(navbar);
    const formattedSidebar = memoizedFormatTitle(sidebar);

    // Fetch the navigation items
    const navItems = await fetchNavbar();
    const currentNav = navItems.find(
      (item: { title: string }) =>
        memoizedFormatTitle(trimQuestionMark(item.title)) === formattedNavbar
    ) || navItems[0];

    const [sidebarItems, bodyContent] = await Promise.all([
      fetchSidebar(currentNav.id),
      fetchSidebar(currentNav.id).then((items) => {
        const firstSidebarItem = items.find(
          (item: { title: string }) =>
            memoizedFormatTitle(trimQuestionMark(item.title)) === formattedSidebar
        ) || items[0];

        return fetchBodyContent(firstSidebarItem.id);
      }),
    ]);

    const currentSidebar = sidebarItems.find(
      (item: { title: string }) =>
        memoizedFormatTitle(trimQuestionMark(item.title)) === formattedSidebar
    ) || sidebarItems[0];

    let quizData = null;
    let choicesData = null;
    let interviewQuestions = null;
    let finalContent = bodyContent;   

    if (currentNav.id === 14) {
      const normalizedSidebarTitle = formattedSidebar.trim().toLowerCase();
      const matchedNavItem = navItems.find((item: { title: string; }) => {
        const normalizedNavTitle = item.title.trim().toLowerCase();
        return normalizedSidebarTitle.includes(normalizedNavTitle) || normalizedNavTitle.includes(normalizedSidebarTitle);
      });

      if (matchedNavItem) {
        const navbarId = matchedNavItem.id;
 
        quizData = await fetchQuizzes(navbarId);
 
        choicesData = await Promise.all(
          quizData.map(async (quiz: { id: any; }) => {
            const quizChoices = await fetchChoices(quiz.id);
            return { quizId: quiz.id, choices: quizChoices };
          })
        );
      }
    }
    
    if (currentNav.id === 15) {
      const normalizedSidebarTitle = formattedSidebar.trim().toLowerCase();
      const matchedNavItem = navItems.find((item: { title: string; }) => {
        const normalizedNavTitle = item.title.trim().toLowerCase();
        return normalizedSidebarTitle.includes(normalizedNavTitle) || normalizedNavTitle.includes(normalizedSidebarTitle);
      });

      if (matchedNavItem) {
        const navbarId = matchedNavItem.id;
 
        interviewQuestions = await fetchInterviewQuestions(navbarId);
 
        const interviewContent = interviewQuestions
          .map((q: { question: any; answer: any; }) => `${q.question}${q.answer}`)
          .join(''); 

        finalContent += interviewContent;
      }
    }
 
    return (
      <>
      
      <div className="content">
        <Sidebar sidebarItems={sidebarItems} initialSidebarId={currentSidebar.id} />
        <MainBody
          content={finalContent}
          activeSidebarId={currentSidebar.id}
          sidebarItems={sidebarItems}
          activeNavId={currentNav.id}
          navItems={navItems}
          quizData={quizData}
          choicesData={choicesData || undefined} />
      </div><Ads initialNavbarId={currentNav.id} />
      
      </>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading content. Please try again later.</div>;
  }
}
