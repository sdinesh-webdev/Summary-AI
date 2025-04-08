import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import { ReactNode } from "react";

type Step = {
    icon: ReactNode;
    label: string;
    description: string;
}

// Add StepItem component
const StepItem = ({ icon, label, description }: Step) => (
    <div className="group flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1">
        <div className="mb-6 p-4 rounded-full bg-blue-50 transition-transform duration-300 group-hover:scale-110">
            {icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900">{label}</h3>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
            {description}
        </p>
    </div>
);

const steps: Step[] = [
    {
        icon: <FileText size={64} strokeWidth={1.5}/>,
        label: 'Upload your PDF',
        description: 'Simply drag and drop your PDF document or click to upload',
    },
      {
        icon: <BrainCircuit size={64} strokeWidth={1.5}/>,
        label: 'AI Analysis',
        description: 'Our advanced Ai processes and analyzes your document instantly',
    },
      {
        icon: <FileOutput size={64} strokeWidth={1.5}/>,
        label: 'Get Summary',
        description: 'Receive a clear, concise summary of your document',
    },
    
];

export default function HowItWorksSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
            {/* Background blur effect */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-80 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 max-w-2xl mx-auto mb-4">
                        How it works
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        Transform any PDF into an easy-to-digest summary in three simple steps
                    </p>
                </div>

                {/* Connected steps with line */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Connection line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0  -translate-y-1/2" />

                    {/* Steps grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 relative">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative flex items-stretch">
                                <StepItem  key={idx} {...step}/>

                                {idx < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                    <MoveRight 
                                    size={32}
                                    strokeWidth={1}
                                    className='text-rose-400'
                                    ></MoveRight>
                                    </div> 
                                 )}
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
 );
}

function Stepitem({ icon, label, description }: Step) {
    return (
        <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/5 transition-colors group w-full">
            <div className="flex flex-col gap-4 h-full">
                <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
                <div className="text-rose-500">{icon}</div>
                </div>
                <div className="flex flex-col  flex-1 gap-1 justify-between">
                    <h4 className="text-center font-bold text-xl">{label}</h4>
                    <p className="text-center text-gray-600 text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
}