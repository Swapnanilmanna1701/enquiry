'use client';

import { useState } from 'react';
import { Send, Loader2, MessageSquare, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupportScribe() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState('support');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (input.trim() === '') {
            setError('Input cannot be empty.');
            return;
        }

        if (input.length > 500) {
            setError('Input cannot exceed 500 characters.');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/supportScribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mode, input }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();

            // Set the response with the content from the API 
            const content = data.response.map((msg: any) => msg.text).join('\n') || 'No response from the API';
            setResponse(content);
        } catch (error) {
            console.error('Error:', error);
            setResponse('Sorry, there was an error processing your request. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Card className="flex-1 bg-gray-800 text-gray-100 shadow-2xl flex flex-col">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <CardTitle className="text-3xl font-bold text-white flex items-center">
                        <MessageSquare className="mr-2 h-8 w-8" />
                        SupportScribe
                    </CardTitle>
                    <CardDescription className="text-gray-200 text-lg">
                        AI-Powered Customer Communication Hub
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
                    <CardContent className="space-y-6 p-6 flex-grow">
                        <div className="flex items-center space-x-4">
                            <Button
                                type="button"
                                variant={mode === 'support' ? 'default' : 'outline'}
                                className={`flex-1 ${mode === 'support' ? 'bg-blue-600 hover:bg-blue-700' : 'text-gray-300 hover:text-white'}`}
                                onClick={() => setMode('support')}
                            >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Customer Support
                            </Button>
                            <Button
                                type="button"
                                variant={mode === 'email' ? 'default' : 'outline'}
                                className={`flex-1 ${mode === 'email' ? 'bg-purple-600 hover:bg-purple-700' : 'text-gray-300 hover:text-white'}`}
                                onClick={() => setMode('email')}
                            >
                                <Mail className="mr-2 h-4 w-4" />
                                Email Composer
                            </Button>
                        </div>
                        <div className="space-y-2 flex-grow flex flex-col">
                            <label htmlFor="input" className="text-sm font-medium text-gray-300">
                                {mode === 'support' ? 'Describe your issue' : 'Email content or brief'}
                            </label>
                            <Textarea
                                required
                                id="input"
                                placeholder={mode === 'support' ? "What can we help you with?" : "Enter your email content or a brief description"}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-grow bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 resize-none min-h-[300px]"
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
                        </div>
                    </CardContent>
                    <CardFooter className="bg-gray-800 p-6">
                        <Button
                            type="submit"
                            className={`w-full ${mode === 'support' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'} text-white transition-all duration-300 ease-in-out transform hover:scale-105`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Processing
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-5 w-5" />
                                    {mode === 'support' ? 'Submit Inquiry' : 'Generate Email'}
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <div className="flex-1 flex flex-col bg-gray-800 text-gray-100 shadow-2xl p-4 rounded-md">
                <label className="text-sm font-medium text-gray-300 mb-2">AI Response</label>
                <div className={`flex-1 p-4 rounded-md text-gray-100 border border-gray-600 bg-gray-700 overflow-auto ${!response ? 'hidden' : ''}`}>
                    {response.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-2">{paragraph}</p>
                    ))}
                </div>
            </div>
        </>
    );
}