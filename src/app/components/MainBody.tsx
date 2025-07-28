// src/app/components/MainBody.tsx

"use client";

import React, { useCallback, useMemo, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import QuizQuestion from "./QuizQuestion";
import "./MainBody.css";
import HomePage from "./HomePage";
import ConvertersPage from "./Tools";
import DesignPage from "./Design";
import BooksPage from "./Books";
import QuestionsPage from "./Questions";
import German from "./German";
import English from "./English";
import French from "./French";

interface Quiz {
  id: number;
  question: string;
  correctAnswer: string;
}

interface Choice {
  id: number;
  optionText: string;
  quizId: number;
}

interface MainBodyProps {
  content: string;
  activeSidebarId: number;
  sidebarItems: { id: number; title: string }[];
  activeNavId: number;
  navItems: { id: number; title: string }[];
  quizData?: Quiz[];
  choicesData?: {
    quizId: number;
    choices: Choice[];
  }[];
}

const formatTitleForUrl = (title: string) =>
  title.replace(/\s+/g, "-").toLowerCase().replace(/#/g, "sharp").replace(/\.net/gi, "dotnet");

const MainBody: React.FC<MainBodyProps> = ({
  content,
  activeSidebarId,
  sidebarItems,
  activeNavId,
  navItems,
  quizData,
  choicesData,
}) => {
  const router = useRouter();
  const [loadingDirection, setLoadingDirection] = useState<"next" | "previous" | null>(null);

  // ✅ Precompute current index and first/last flags
  const { currentIndex, isFirst, isLast } = useMemo(() => {
    const idx = sidebarItems.findIndex((item) => item.id === activeSidebarId);
    return {
      currentIndex: idx,
      isFirst: idx === 0,
      isLast: idx === sidebarItems.length - 1,
    };
  }, [sidebarItems, activeSidebarId]);

  const activeNavItem = useMemo(
    () => navItems.find((item) => item.id === activeNavId),
    [navItems, activeNavId]
  );

  const navTitle = useMemo(
    () => formatTitleForUrl(activeNavItem?.title.toLowerCase() || ""),
    [activeNavItem]
  );

  const pageTitle = useMemo(() => {
    if (activeNavId === 14 || activeNavId === 15) return `${activeNavItem?.title} Question`;
    return `${activeNavItem?.title} Tutorial`;
  }, [activeNavId, activeNavItem]);

  const showNavigationButtons = useMemo(() => {
    return ![1, 23, 24, 25, 13].includes(activeNavId);
  }, [activeNavId]);

  const handleNavigation = useCallback(
    (direction: "next" | "previous") => {
      if (direction === "next" && isLast) return;
      if (direction === "previous" && isFirst) return;

      setLoadingDirection(direction);

      const targetIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
      if (targetIndex >= 0 && targetIndex < sidebarItems.length) {
        const sidebarTitle = formatTitleForUrl(
          sidebarItems[targetIndex].title.toLowerCase()
        );

        startTransition(() => {
          router.push(`/${navTitle}/${sidebarTitle}`);
        });
      }

      setTimeout(() => setLoadingDirection(null), 500);
    },
    [currentIndex, isFirst, isLast, sidebarItems, router, navTitle]
  );

  // ✅ Memoize page content
  const renderedContent = useMemo(() => {
    if (activeNavId === 14 && quizData && choicesData) {
      return (
        <>
          <div style={{ paddingLeft: "20px" }} dangerouslySetInnerHTML={{ __html: content }} />
          <QuizQuestion quizData={quizData} choicesData={choicesData} />
        </>
      );
    }

    switch (activeNavId) {
      case 1:
        return <HomePage navItems={navItems} />;
      case 23:
        return <ConvertersPage />;
      case 24:
        return <DesignPage />;
      case 25:
        return <BooksPage />;
      case 13:
        return <QuestionsPage />;
      case 26:
        if (activeSidebarId === 291) return <German />;
        if (activeSidebarId === 292) return <English />;
        if (activeSidebarId === 293) return <French />;
        break;
      default:
        return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
  }, [activeNavId, activeSidebarId, quizData, choicesData, content, navItems]);

  const mainColor = useMemo(() => {
    if (activeNavId === 1) return "";
    if (activeNavId === 23) return "main-body main-body-bg-white converter-color";
    return "main-body main-body-bg-white";
  }, [activeNavId]);

  return (
    <main className={mainColor}>
      {showNavigationButtons && (
        <>
          <div className="page-title-container">
            <h1 className="page-title">{pageTitle}</h1>
          </div>

          <div className="navigation-buttons nav-top-padding">
            <button
              onClick={() => handleNavigation("previous")}
              disabled={isFirst || loadingDirection !== null}
              aria-label="Previous Page"
            >
              {loadingDirection === "previous" ? "Loading" : "Prev"}
            </button>
            <button
              onClick={() => handleNavigation("next")}
              disabled={isLast || loadingDirection !== null}
              aria-label="Next Page"
            >
              {loadingDirection === "next" ? "Loading" : "Next"}
            </button>
          </div>
        </>
      )}

      {renderedContent}

      {showNavigationButtons && (
        <div className="navigation-buttons navigation-buttons-bottom">
          <button
            onClick={() => handleNavigation("previous")}
            disabled={isFirst || loadingDirection !== null}
            aria-label="Previous Page"
          >
            {loadingDirection === "previous" ? "Loading" : "Prev"}
          </button>
          <button
            onClick={() => handleNavigation("next")}
            disabled={isLast || loadingDirection !== null}
            aria-label="Next Page"
          >
            {loadingDirection === "next" ? "Loading" : "Next"}
          </button>
        </div>
      )}
    </main>
  );
};

export default MainBody;
