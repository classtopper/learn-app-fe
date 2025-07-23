// src/app/components/HomePage.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeBoxGrid from './HomeBoxGrid';
import './HomePage.css';

interface HomePageProps {
    navItems: { id: number; title: string }[];
}

const HomePage: React.FC<HomePageProps> = ({ navItems }) => {

    const router = useRouter();
    const [isGetStartedLoading, setIsGetStartedLoading] = useState(false);
    const [isLearnGenerativeAILoading, setIsLearnGenerativeAILoading] = useState(false);

    const handleGetStartedClick = () => {
        setIsGetStartedLoading(true);
        router.push('/java/java-introduction');
    };

    const handleLearnGenerativeAIClick = () => {
        setIsLearnGenerativeAILoading(true);
        router.push('/generative-ai/what-does-generative-ai-mean');
    };

    const [loadingConverters, setLoadingConverters] = useState<{ [key: string]: boolean }>({
        PDF: false,
        Word: false,
        Image: false,
        Others: false,
    });

    const handleConverterClick = (type: string) => {
        setLoadingConverters((prevState) => ({
            ...prevState,
            [type]: true,
        }));
        router.push(`/tools/convert-util?type=${type}`);
    };
    
    const [loadingServices, setLoadingServices] = useState<{ [key: string]: boolean }>({
        Quizzes: false,
        Questions: false,
        Interviews: false,
        Books: false,
    });

    const handleServiceClick = (type: string) => {
        setLoadingServices((prevState) => ({
            ...prevState,
            [type]: true, // Set the clicked service's loading state to true
        }));

        // Navigate to the respective URL based on the clicked service
        let url = '';
        switch (type) {
            case 'Quizzes':
                url = '/quiz/java-quiz';
                break;
            case 'Questions':
                url = '/questions/view-questions';
                break;
            case 'Interviews':
                url = '/interviews/java-interview-questions';
                break;
            case 'Books':
                url = '/books/view-books';
                break;
        }

        router.push(url);
    };

    const [loadingDesigns, setLoadingDesigns] = useState<{ [key: string]: boolean }>({
        Fevicon: false,
        Logo: false,
    });

    const handleDesignClick = (type: string) => {
        setLoadingDesigns((prevState) => ({
            ...prevState,
            [type]: true,
        }));

        router.push(`/design/web-util?type=${type}`);
    };

    return (
        <>
            <div className="home-page-container">
                <div className="home-page-hero">
                    <h1>Learning Made Easy</h1>
                    <p>Learn coding, ace quizzes, prep interviews, languages & use tools!</p>
                    <button
                        className="get-started-btn"
                        aria-label="Get Started"
                        onClick={handleGetStartedClick}
                        disabled={isGetStartedLoading}
                    >
                        {isGetStartedLoading ? 'LOADING...' : 'Get Started'}
                    </button>

                    <button
                        className="gen-ai-btn"
                        aria-label="Learn Generative AI"
                        onClick={handleLearnGenerativeAIClick}
                        disabled={isLearnGenerativeAILoading}
                    >
                        {isLearnGenerativeAILoading ? 'LOADING...' : 'Learn Generative AI'}
                    </button>

                </div>

                <div className="home-page-java">
                    <div className="java-left">
                        <h1>JAVA</h1>
                        <p>Learn Object Oriented Programming Language.</p>
                    </div>
                    <div className="java-right">
                        <h2>Java Example:</h2>
                        <pre className="java-code">
                            <code>
                                <span className="keyword">public</span> <span className="keyword">class</span> <span className="class-name">HelloWorld</span> {'{'}
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">public</span> <span className="keyword">static</span> <span className="keyword">void</span> <span className="method-name">main</span>(<span className="type">String</span>[] <span className="variable">args</span>) {'{'}
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="type">System</span>.<span className="method-name">out</span>.<span className="method-name">println</span>(<span className="string">&quot;Hello, World!&quot;</span>);
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;{'}'}
                                <br />
                                {'}'}
                            </code>
                        </pre>
                    </div>
                </div>

                {/* Services Section */}
                <div className="home-page-services">
                    <div className="services-left">
                        <h1>SERVICES</h1>
                        <p>We offer these services for free.</p>
                    </div>
                    <div className="services-right">
                        <div className="services-box">
                            <div
                                className="service-item"
                                onClick={() => handleServiceClick('Quizzes')}
                            >
                                {loadingServices['Quizzes'] ? 'LOADING...' : 'Quizzes'}
                            </div>
                            <div
                                className="service-item"
                                onClick={() => handleServiceClick('Questions')}
                            >
                                {loadingServices['Questions'] ? 'LOADING...' : 'Questions'}
                            </div>
                            <div
                                className="service-item"
                                onClick={() => handleServiceClick('Interviews')}
                            >
                                {loadingServices['Interviews'] ? 'LOADING...' : 'Interviews'}
                            </div>
                            <div
                                className="service-item"
                                onClick={() => handleServiceClick('Books')}
                            >
                                {loadingServices['Books'] ? 'LOADING...' : 'Books'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tools Section */}
                <div className="home-page-tools">
                    <div className="tools-left">
                        <h1>TOOLS</h1>
                        <p>Use simple converters for PDF, Word, Image, and others.</p>
                    </div>
                    <div className="tools-right">
                        <div className="tools-box">
                            <div
                                className="converter-item"
                                onClick={() => handleConverterClick('pdf')}
                            >
                                {loadingConverters['PDF'] ? 'LOADING...' : 'Word to PDF'}
                            </div>
                            <div
                                className="converter-item"
                                onClick={() => handleConverterClick('word')}
                            >
                                {loadingConverters['Word'] ? 'LOADING...' : 'PDF to Word'}
                            </div>
                            <div
                                className="converter-item"
                                onClick={() => handleConverterClick('image')}
                            >
                                {loadingConverters['Image'] ? 'LOADING...' : 'Image to PDF'}
                            </div>
                            <div
                                className="converter-item"
                                onClick={() => handleConverterClick('compress')}
                            >
                                {loadingConverters['Others'] ? 'LOADING...' : 'Compress'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Design Section */}
                <div className="home-page-design">
                    <div className="design-left">
                        <h1>DESIGN</h1>
                        <p>Use free design tool for website.</p>
                    </div>
                    <div className="design-right">
                        <div className="design-box">
                            <div
                                className="design-item"
                                onClick={() => handleDesignClick('fevicon')}
                            >
                                {loadingDesigns['Fevicon'] ? 'LOADING...' : 'Fevicon Icon'}
                            </div>
                            <div
                                className="design-item"
                                onClick={() => handleDesignClick('logo')}
                            >
                                {loadingDesigns['Logo'] ? 'LOADING...' : 'Logo'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="home-page-box">
                    <HomeBoxGrid navItems={navItems} />
                </div>

                <br />

            </div>

        </>
    );
};

export default HomePage;
