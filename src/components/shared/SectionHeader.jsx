import React from 'react';

const SectionHeader = ({badge, title, description}) => {
    return (
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-3">
            {
                badge && <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    {badge}
                </span>
            }

            {
                title && <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mt-1">
                    {title}
                </h2>
            }
            {
                description && <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">
                    {description}
                </p>
            }
        </div>
    );
};

export default SectionHeader;