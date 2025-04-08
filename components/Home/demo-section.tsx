import { Pizza } from "lucide-react"

export default function DemoSection() {
    return (
        <section className="relative">
            <div className="py-12 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
                         <Pizza className="w-8 h-8 text-rose-500"/>
                    </div>
                    <div className="text-center mb-16">
                        <h2 className="font-bold text-gray-300 text3xl max-w-5xl mx-auto px-4 sm:px-6">
                            Watch how Sommaire transforms{'  '}
                            <span className="bg-linear-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
                                your PDF
                            </span>{'  '}
                            into an easy-to-read summay !
                        </h2>
                    </div>

                    <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6"></div>
                   
                </div>
                  
            </div>
        </section>
    )
}