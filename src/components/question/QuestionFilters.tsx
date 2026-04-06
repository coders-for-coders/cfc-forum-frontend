'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Clock, TrendingUp, MessageSquare, Eye, ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface QuestionFiltersProps {
    onFilterChange: (filters: {
        search: string;
        sortBy: 'newest' | 'trending' | 'mostAnswered' | 'mostViewed';
        tags: string[];
    }) => void;
    isExpanded: boolean;
    onToggle: () => void;
}

const popularTags = [
    'javascript', 'typescript', 'react', 'nodejs', 'python',
    'java', 'c++', 'sql', 'aws', 'docker'
];

export function QuestionFilters({ onFilterChange, isExpanded, onToggle }: QuestionFiltersProps) {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'trending' | 'mostAnswered' | 'mostViewed'>('newest');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [activeSection, setActiveSection] = useState<'sort' | 'tags' | null>(null);

    const handleSearch = (value: string) => {
        setSearch(value);
        onFilterChange({ search: value, sortBy, tags: selectedTags });
    };

    const handleSort = (sort: typeof sortBy) => {
        setSortBy(sort);
        onFilterChange({ search, sortBy: sort, tags: selectedTags });
    };

    const handleTagToggle = (tag: string) => {
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag];
        setSelectedTags(newTags);
        onFilterChange({ search, sortBy, tags: newTags });
    };

    const clearFilters = () => {
        setSearch('');
        setSortBy('newest');
        setSelectedTags([]);
        onFilterChange({ search: '', sortBy: 'newest', tags: [] });
    };

    const toggleSection = (section: 'sort' | 'tags') => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 shadow-lg",
            isExpanded ? "max-h-[500px] py-4" : "max-h-0"
        )}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col space-y-6">
                    {/* Search and Clear Filters */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                            <Input
                                type="text"
                                placeholder="Search questions..."
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-10 bg-slate-800 border-slate-700 text-slate-100 focus:border-slate-600 rounded-full"
                            />
                        </div>
                        {(search || sortBy !== 'newest' || selectedTags.length > 0) && (
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={clearFilters}
                                className="text-slate-400 hover:text-slate-100 flex items-center gap-1"
                            >
                                <X size={14} />
                                Clear
                            </Button>
                        )}
                    </div>

                    {/* Active Filters Display */}
                    {selectedTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-sm text-slate-400">Active filters:</span>
                            {selectedTags.map(tag => (
                                <Badge 
                                    key={tag} 
                                    variant="secondary"
                                    className="bg-slate-700 text-slate-200 hover:bg-slate-600 cursor-pointer flex items-center gap-1"
                                    onClick={() => handleTagToggle(tag)}
                                >
                                    {tag}
                                    <X size={12} />
                                </Badge>
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Sort Options */}
                        <div className="space-y-3">
                            <button 
                                onClick={() => toggleSection('sort')}
                                className="flex items-center justify-between w-full text-slate-200 hover:text-white"
                            >
                                <div className="flex items-center gap-2">
                                    <Filter size={16} />
                                    <span className="font-medium">Sort By</span>
                                </div>
                                {activeSection === 'sort' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            
                            {activeSection === 'sort' && (
                                <div className="grid grid-cols-2 gap-2 pt-2 animate-in fade-in-50 duration-200">
                                    <Button
                                        variant={sortBy === 'newest' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handleSort('newest')}
                                        className="flex items-center justify-start gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700"
                                    >
                                        <Clock size={14} />
                                        Newest
                                    </Button>
                                    <Button
                                        variant={sortBy === 'trending' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handleSort('trending')}
                                        className="flex items-center justify-start gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700"
                                    >
                                        <TrendingUp size={14} />
                                        Trending
                                    </Button>
                                    <Button
                                        variant={sortBy === 'mostAnswered' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handleSort('mostAnswered')}
                                        className="flex items-center justify-start gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700"
                                    >
                                        <MessageSquare size={14} />
                                        Most Answered
                                    </Button>
                                    <Button
                                        variant={sortBy === 'mostViewed' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handleSort('mostViewed')}
                                        className="flex items-center justify-start gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700"
                                    >
                                        <Eye size={14} />
                                        Most Viewed
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Popular Tags */}
                        <div className="space-y-3">
                            <button 
                                onClick={() => toggleSection('tags')}
                                className="flex items-center justify-between w-full text-slate-200 hover:text-white"
                            >
                                <div className="flex items-center gap-2">
                                    <Filter size={16} />
                                    <span className="font-medium">Filter by Tags</span>
                                </div>
                                {activeSection === 'tags' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            
                            {activeSection === 'tags' && (
                                <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in-50 duration-200">
                                    {popularTags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                                            className={`cursor-pointer ${
                                                selectedTags.includes(tag)
                                                    ? 'bg-slate-700 text-slate-100'
                                                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                                            }`}
                                            onClick={() => handleTagToggle(tag)}
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 