import Link from "next/link";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

type PriceType = {
    name: string;
    price: number;
    description: string;
    items: string[];
    id: string;
    paymentLink: string;
    priceId: string;
};

const plans = [
    {
       name: 'Basic',
       price: 2,
       description: 'Perfect for occasional use',
       items: [
        '5 PDFs summaries per month',
        'Standard processing speed',
        'Email support',
       ],
       id: 'basic',
       paymentLink: ' ',
       priceId: ' ',
    },
    { name: 'Pro',
       price: 10,
       description: 'Ideal for professionals and teams',
       items: [
        'Unlimited PDF sumaries',
        'Priority processing speed',
        'Email and chat support',
       ],
         id: 'pro',
         paymentLink: ' ',
         priceId: ' ',
    }
];

const PricingCard = ({name, price, description, items, id, paymentLink }: PriceType) => {
    return(
        <div className="relative w-full max-w-lg hover:scale-105 hover:transiton-all duration-300">
            <div className={cn("relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-5--/20 rounded-2xl", id === 'pro' && 'border-rode-500 gap-5 border-2')}>
            <div className="flex flex-col  justify-between  font-semibold ">
                <p className="text-lg lg;text-xl font-bold capitalize">{name}</p>
                <p className="text-base-content/80 mt-2">{description}</p>
            </div>

            <div className="flex gap-2">
                <p className="text-5xl tracking-tight font-extrabold">${price}</p>
            
            <div className="flex flex-col justify mb-[4px]">
                <p className="text-xs uppercase font-semibold ">USD</p>
                <p className="text-xs">/month</p>
                </div>

                <div className="space-y-2.5 leading-relaxed text-base flex-1">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                        <CheckIcon size={18}/>
                        <span>{item}</span>
                        </li>
                ))}
                </div>
            </div>
            <div className="sapce-y-2 flex justify-center w-full">
                <Link href={paymentLink}
                className={cn('w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2',
                    id === 'pro'
                    ? 'border-rose-900'
                    : 'border-rose-300 from-rose-400 to-rose-500'
                )}
                >Buy Now</Link>
            </div>
        </div>
        </div>
    );
}

export default function PricingSection() {
    return(
        <section className="relative overflow-hidden">
        <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
            <div className="flex items-center justify-center w-full pb-12">
                <h2 className="uppercase font-bold text-3xl mb-8 text-rose-500">Pricing</h2>
            </div>
            <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
                {plans.map((plan) => (
                    <PricingCard key={plan.id} {...plan} />
                ))}
            </div>
        </div>
        </section>
    )
}