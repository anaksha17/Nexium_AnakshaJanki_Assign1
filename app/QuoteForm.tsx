"use client";
import { useState } from "react"; // Added this import
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function QuoteForm({ onQuotesUpdate }: { onQuotesUpdate: (quotes: any[]) => void }) {
  const form = useForm({
    defaultValues: {
      topic: "",
    },
  });

  const [quotes, setQuotes] = useState([]);

  const handleSubmit = async (data: { topic: string }) => {
    const response = await fetch("/quotes.json");
    const dataFromJson = await response.json();
    const filteredQuotes = dataFromJson
      .filter((quote: any) => quote.topic.toLowerCase() === data.topic.toLowerCase())
      .slice(0, 3); // Limit to 3
    setQuotes(filteredQuotes);
    onQuotesUpdate(filteredQuotes); // Pass quotes to parent
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="mb-4">
          <Label htmlFor="topic">Topic</Label>
          <input
            {...form.register("topic")}
            id="topic"
            className="mt-1 block w-full rounded-md border-[#B794F4] bg-white shadow-sm focus:border-[#6B46C1] focus:ring focus:ring-[#D6BCFA] focus:ring-opacity-50"
            placeholder="Enter a topic (e.g., motivation)"
          />
        </div>
       <Button type="submit" style={{ backgroundColor: '#6B46C1', color: 'white' }}>Generate Quotes</Button>
      </form>
    </Form>
  );
}