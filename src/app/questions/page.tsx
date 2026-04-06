'use client';
import { Question } from "@/components/question/Question";
import { QuestionFilters } from "@/components/question/QuestionFilters";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter, Bookmark, Share2, SlidersHorizontal } from "lucide-react";

type SortOption = 'newest' | 'trending' | 'mostAnswered' | 'mostViewed';

interface QuestionData {
    _id: string,
    votes: {
        up: number,
        down: number
    };
    answers: {
        count: number,
        answers: object[]
    };
    views: number;
    title: string;
    description: string;
    tags: string[];
    author: {
        _id: string,
        username: string,
        avatar: string
        reputation: number
    },
    createdAt: Date,
    updatedAt: Date
}

export default function Questions() {
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredQuestions, setFilteredQuestions] = useState<QuestionData[]>([]);
    const [filters, setFilters] = useState({
        search: '',
        sortBy: 'newest' as SortOption,
        tags: [] as string[]
    });
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get('/api/question');
                setQuestions(response.data as QuestionData[]);
                setFilteredQuestions(response.data as QuestionData[]);
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        let filtered = [...questions];

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(q => 
                q.title.toLowerCase().includes(searchLower) ||
                q.description.toLowerCase().includes(searchLower)
            );
        }

        // Apply tag filter
        if (filters.tags.length > 0) {
            filtered = filtered.filter(q =>
                filters.tags.some(tag => q.tags.includes(tag))
            );
        }

        // Apply sorting
        switch (filters.sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'trending':
                filtered.sort((a, b) => (b.votes.up - b.votes.down) - (a.votes.up - a.votes.down));
                break;
            case 'mostAnswered':
                filtered.sort((a, b) => b.answers.count - a.answers.count);
                break;
            case 'mostViewed':
                filtered.sort((a, b) => b.views - a.views);
                break;
        }

        setFilteredQuestions(filtered);
    }, [filters, questions]);

    const handleFilterChange = (newFilters: { search: string; sortBy: SortOption; tags: string[] }) => {
        setFilters(newFilters);
    };

    const toggleFilters = () => {
        setIsFilterExpanded(!isFilterExpanded);
    };

    if (isLoading) {
        return <div className="container mx-auto mt-10 px-4 flex justify-center">
            <div className="animate-pulse flex space-x-4">
                <div className="h-10 w-10 bg-slate-700 rounded-full"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Filter Toggle Bar */}
            <div className="bg-slate-900 border-b border-slate-800 py-3">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold text-slate-100">Questions</h1>
                        <div className="flex items-center gap-4">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={toggleFilters}
                                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700"
                            >
                                <SlidersHorizontal size={16} />
                                {isFilterExpanded ? 'Hide Filters' : 'Show Filters'}
                            </Button>
                            <Button asChild className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700">
                                <Link href="/questions/new" className="flex items-center">
                                    <PlusCircle size={16} className="mr-2" />
                                    Ask Question
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Panel */}
            <QuestionFilters 
                onFilterChange={handleFilterChange} 
                isExpanded={isFilterExpanded}
                onToggle={toggleFilters}
            />

            {/* Questions List */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-4">
                    {filteredQuestions.length === 0 ? (
                        <div className="bg-slate-900 rounded-lg p-8 text-center border border-slate-800">
                            <h3 className="text-lg font-medium text-slate-300 mb-2">No questions found</h3>
                            <p className="text-slate-400">Try adjusting your filters or ask a new question.</p>
                        </div>
                    ) : (
                        filteredQuestions.map((question, index) => (
                            <div key={index} className="relative group">
                                <Question
                                    id={question._id}
                                    votes={question.votes}
                                    answers={question.answers}
                                    views={question.views}
                                    title={question.title}
                                    description={question.description}
                                    tags={question.tags}
                                    author={question.author}
                                    createdAt={question.createdAt}
                                    updatedAt={question.updatedAt}
                                />
                                <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200">
                                        <Bookmark size={16} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200">
                                        <Share2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
