import Link from "next/link";
import { ArrowRight } from "lucide-react"; 
import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function HeroSection() {
    return(
        <section className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-[90rem] mx-auto flex flex-col items-center justify-center space-y-12 text-center">
                <div className="flex justify-center scale-90 hover:scale-100 transition-transform duration-300">
                    <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x">
                        <Badge 
                            variant={'secondary'}
                            className="flex items-center px-8 py-3 bg-white rounded-full hover:bg-gray-50 transition-colors duration-200"
                        >
                            <Sparkles className="w-6 h-6 mr-3 text-rose-600" />
                            <span className="text-lg text-rose-600 font-semibold">Powered by AI</span>
                        </Badge>
                    </div>
                </div>
                
                <div className="max-w-6xl space-y-6">
                    <h1 className=" tracking-tight">
                        Transform PDFs into{' '}
                        <span className="relative inline-block px-2">
                            <span className="relative z-10">concise</span>
                            <div 
                                className="mb-[-10px] mt-[10px] absolute inset-0 bg-gradient-to-r from-rose-200/60 to-rose-300/60 -rotate-2 rounded-2xl transform -skew-y-1" 
                                aria-hidden="true"
                            />
                        </span>{' '}
                        summaries
                    </h1>
                    <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto">
                        Get a beautiful summary reel of the documents in seconds.
                    </h2>
                </div>
                
                <Button 
                    variant={'default'}
                    size="lg"
                    className="group relative inline-flex items-center justify-center px-10 py-6 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-full text-base animate-gradient-shine"
                >
                    <Link href='/#pricing' className="flex items-center gap-3">
                        <span className="text-white font-bold text-lg">Try Sommaire</span>
                        <ArrowRight className="w-6 h-6 text-white transition-transform group-hover:translate-x-2" />
                    </Link>
                </Button>
            </div>
        </section>
    );
}