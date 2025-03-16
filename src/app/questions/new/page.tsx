"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Code, Hash, AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"

export default function NewQuestionPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [codeSnippet, setCodeSnippet] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput) {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your question",
        variant: "destructive",
      })
      return
    }

    if (!content.trim()) {
      toast({
        title: "Missing content",
        description: "Please describe your question in detail",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate submission delay
    setTimeout(() => {
      toast({
        title: "Question submitted",
        description: "Your question has been posted successfully",
      })
      router.push("/questions")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Link 
          href="/questions" 
          className="inline-flex items-center text-sm text-slate-400 hover:text-slate-300 mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to questions
        </Link>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-100 mb-3">Ask a Question</h1>
          <p className="text-slate-400 max-w-2xl">Get help from the community by clearly describing your coding problem</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="overflow-hidden border border-slate-800 bg-slate-950 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div className="p-6 md:p-7">
              <div className="space-y-3">
                <label htmlFor="title" className="block text-sm font-medium text-slate-300">
                  Question Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. How to implement authentication in Next.js?"
                  className="h-10 border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus-visible:ring-slate-700 focus-visible:border-slate-700"
                />
                <p className="text-xs text-slate-500">Be specific and imagine you're asking another person</p>
              </div>
            </div>

            <Separator className="bg-slate-800/70" />

            <div className="p-6 md:p-7">
              <div className="space-y-3">
                <label htmlFor="content" className="block text-sm font-medium text-slate-300">
                  Question Details
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe your problem in detail. What have you tried? What errors are you seeing?"
                  className="min-h-[150px] border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus-visible:ring-slate-700 focus-visible:border-slate-700"
                />
              </div>
            </div>

            <Separator className="bg-slate-800/70" />

            <div className="p-6 md:p-7 bg-slate-950/80">
              <div className="space-y-3">
                <label htmlFor="code" className="block text-sm font-medium text-slate-300">
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-slate-400" />
                    <span>Code Snippet (optional)</span>
                  </div>
                </label>
                <Textarea
                  id="code"
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="// Paste your code here"
                  className="min-h-[120px] font-mono text-sm border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus-visible:ring-slate-700 focus-visible:border-slate-700"
                />
                <p className="text-xs text-slate-500">Include the relevant code that shows what you've tried</p>
              </div>
            </div>

            <Separator className="bg-slate-800/70" />

            <div className="p-6 md:p-7">
              <div className="space-y-4">
                <label htmlFor="tags" className="block text-sm font-medium text-slate-300">
                  <div className="flex items-center gap-2">
                    <Hash size={16} className="text-slate-400" />
                    <span>Tags</span>
                  </div>
                </label>

                <div className="flex items-center gap-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. javascript, react, nextjs"
                    className="h-10 border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus-visible:ring-slate-700 focus-visible:border-slate-700"
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    variant="outline"
                    className="h-10 border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                  >
                    Add
                  </Button>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} className="bg-slate-800 text-slate-300 hover:bg-slate-700 px-2 py-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1.5 rounded-full hover:text-slate-100"
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                <p className="text-xs text-slate-500">Add up to 5 tags to help others find your question</p>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
            <div className="flex items-center text-sm text-slate-400 gap-2">
              <AlertCircle size={16} className="text-slate-400" />
              <span>All questions are reviewed by moderators</span>
            </div>
            <div className="flex gap-3 ml-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-slate-800 bg-transparent text-slate-300 hover:bg-slate-900 hover:text-slate-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-slate-900 text-slate-100 hover:bg-slate-800 transition-colors border border-slate-800"
              >
                {isSubmitting ? "Submitting..." : "Post Question"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 