// src/app/components/MainBody.tsx

"use client";

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import QuizQuestion from './QuizQuestion';
import './MainBody.css';
import HomePage from './HomePage';
import ConvertersPage from './Tools';
import DesignPage from './Design';
import BooksPage from './Books';
import QuestionsPage from './Questions';
import German from './German';
import English from './English';
import French from './French';

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

const MainBody: React.FC<MainBodyProps> = ({
    content,
    activeSidebarId,
    sidebarItems,
    activeNavId,
    navItems,
    quizData,
    choicesData
}) => {
    const router = useRouter();
    const [loadingDirection, setLoadingDirection] = useState<"next" | "previous" | null>(null);

    const formatTitleForUrl = (title: string) => {
        return title
            .replace(/\s+/g, '-')
            .toLowerCase()
            .replace(/#/g, 'sharp')
            .replace(/\.net/gi, 'dotnet');
    };

    const handleNavigation = async (direction: 'next' | 'previous') => {
        setLoadingDirection(direction); // Show loading on clicked button

        const currentIndex = sidebarItems.findIndex(item => item.id === activeSidebarId);
        const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

        if (targetIndex >= 0 && targetIndex < sidebarItems.length) {
            const sidebarTitle = formatTitleForUrl(sidebarItems[targetIndex].title.toLowerCase());
            const navTitle = formatTitleForUrl(navItems.find(item => item.id === activeNavId)?.title.toLowerCase() || '');
            await router.push(`/${navTitle}/${sidebarTitle}`);
        }

        // Add slight delay for UX
        setTimeout(() => setLoadingDirection(null), 500);
    };

    const handleNext = useCallback(() => handleNavigation('next'), [activeSidebarId, sidebarItems, navItems, router]);
    const handlePrevious = useCallback(() => handleNavigation('previous'), [activeSidebarId, sidebarItems, navItems, router]);

    const isHomePage = activeNavId === 1;
    const isConvertersPage = activeNavId === 23;
    const isDesingPage = activeNavId === 24;
    const isBooksPage = activeNavId === 25;
    const isQuestionPage = activeNavId === 13;
    const showNavigationButtons = (!isHomePage && !isConvertersPage && !isDesingPage && !isBooksPage && !isQuestionPage);

    const activeNavTitle = navItems.find(item => item.id === activeNavId)?.title || '';
    const pageTitle = (activeNavId === 14 || activeNavId === 15) ? `${activeNavTitle} Question` : `${activeNavTitle} Tutorial`;

    const renderContent = () => {
        if (activeNavId === 14 && quizData && choicesData) {
            return (
                <>
                    <div style={{ paddingLeft: '20px' }} dangerouslySetInnerHTML={{ __html: content }} />
                    <QuizQuestion quizData={quizData} choicesData={choicesData} />
                </>
            );
        }

        if (isHomePage) return <HomePage navItems={navItems} />;
        if (isConvertersPage) return <ConvertersPage />;
        if (isDesingPage) return <DesignPage />;
        if (isBooksPage) return <BooksPage />;
        if (isQuestionPage) return <QuestionsPage />;

        if (activeNavId === 26 && activeSidebarId === 291) return <German />;
        if (activeNavId === 26 && activeSidebarId === 292) return <English />;
        if (activeNavId === 26 && activeSidebarId === 293) return <French />;

        return <div dangerouslySetInnerHTML={{ __html: content }} />;
    };

    let mainColor = '';
    if (isHomePage) {
        mainColor = '';
    } else if (isConvertersPage) {
        mainColor = 'main-body main-body-bg-white converter-color';
    } else {
        mainColor = 'main-body main-body-bg-white';
    }

    const isFirst = sidebarItems.findIndex(item => item.id === activeSidebarId) === 0;
    const isLast = sidebarItems.findIndex(item => item.id === activeSidebarId) === sidebarItems.length - 1;

    return (
        <main className={mainColor}>
            {showNavigationButtons && (
                <>
                    <div className="page-title-container">
                        <h1 className="page-title">{pageTitle}</h1>
                    </div>

                    <div className="navigation-buttons nav-top-padding">
                        <button
                            onClick={handlePrevious}
                            disabled={isFirst || loadingDirection !== null}
                            aria-label="Previous Page"
                        >
                            {loadingDirection === 'previous' ? 'Loading' : 'Prev'}
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={isLast || loadingDirection !== null}
                            aria-label="Next Page"
                        >
                            {loadingDirection === 'next' ? 'Loading' : 'Next'}
                        </button>
                    </div>
                </>
            )}

            {renderContent()}

            {showNavigationButtons && (
                <div className="navigation-buttons navigation-buttons-bottom">
                    <button
                        onClick={handlePrevious}
                        disabled={isFirst || loadingDirection !== null}
                        aria-label="Previous Page"
                    >
                        {loadingDirection === 'previous' ? 'Loading' : 'Prev'}
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={isLast || loadingDirection !== null}
                        aria-label="Next Page"
                    >
                        {loadingDirection === 'next' ? 'Loading' : 'Next'}
                    </button>
                </div>
            )}
        </main>
    );
};

export default MainBody;
