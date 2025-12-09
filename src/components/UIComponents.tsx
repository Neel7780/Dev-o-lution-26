import React from 'react'

interface PCWindowProps {
    title: string;
    className?: string;
    children: React.ReactNode;
}

export const PCWindow: React.FC<PCWindowProps> = ({ title, className, children }) => {
    return (
        <div className={`pc-window bg-[#4ecdc4] p-3 lg:p-8 border-4 border-[#1a1a1a] neo-box ${className}`}>
            <div className="window-controls">
                <div className="window-control window-close"></div>
                <div className="window-control window-minimize"></div>
                <div className="window-control window-maximize"></div>
            </div>
            <h2 className="text-2xl font-bold mb-4 retro-text">{title}</h2>
            {children}
        </div>
    )
}

interface AnimatedBoxProps {
    className?: string;
    children: React.ReactNode;
}

export const PCWindow2: React.FC<PCWindowProps> = ({ title, className, children }) => {
    return (
        <div className={`pc-window bg-[#FF6B6B] p-3 lg:p-8 border-4 border-[#1a1a1a] neo-box ${className}`}>
            <div className="window-controls">
                <div className="window-control window-close"></div>
                <div className="window-control window-minimize"></div>
                <div className="window-control window-maximize"></div>
            </div>
            <h2 className="text-2xl font-bold mb-4 retro-text">{title}</h2>
            {children}
        </div>
    )
}

interface AnimatedBoxProps {
    className?: string;
    children: React.ReactNode;
}

export const AnimatedBox: React.FC<AnimatedBoxProps> = ({ className, children }) => {
    return (
        <div className={`animated-box pulse-animation ${className}`}>
            {children}
        </div>
    )
}

interface FloatingElementProps {
    className?: string;
    delay?: number;
    children: React.ReactNode;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({ className, delay = 0, children }) => {
    return (
        <div className={`floating-element float-animation ${className}`} style={{ animationDelay: `${delay}s` }}>
            {children}
        </div>
    )
}

interface GlitchTextProps {
    text: string;
    className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className }) => {
    return (
        <div className={`glitch ${className}`} data-text={text}>
            {text}
        </div>
    )
}

interface TypewriterTextProps {
    text: string;
    className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ text, className }) => {
    return (
        <div className={`typewriter ${className}`}>
            {text}
        </div>
    )
}

interface RotatingElementProps {
    className?: string;
    children: React.ReactNode;
}

export const RotatingElement: React.FC<RotatingElementProps> = ({ className, children }) => {
    return (
        <div className={`rotate-animation ${className}`}>
            {children}
        </div>
    )
}

interface SlideInElementProps {
    className?: string;
    children: React.ReactNode;
}

export const SlideInElement: React.FC<SlideInElementProps> = ({ className, children }) => {
    return (
        <div className={`slide-in-animation ${className}`}>
            {children}
        </div>
    )
}

interface HoverLiftElementProps {
    className?: string;
    children: React.ReactNode;
}

export const HoverLiftElement: React.FC<HoverLiftElementProps> = ({ className, children }) => {
    return (
        <div className={`hover-lift ${className}`}>
            {children}
        </div>
    )
}