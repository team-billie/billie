import { CircleAlert } from 'lucide-react';

interface AlertMessageProps {
    txt: string;
    exiting: boolean;
}

export default function AlertMessage({ txt, exiting = false }: AlertMessageProps) {
    return (
        <div
            className={`absolute overflow-hidden top-4 flex items-center bg-[#F9FCFF] rounded-lg w-[90dvw] p-4 shadow-popup
                ${exiting ? 'animate-slide-exit' : 'animate-slide-enter'}`}
            style={{
                animation: exiting
                    ? 'slideExit 0.5s ease forwards'
                    : 'slideEnter 0.5s ease forwards'
            }}
        >
            {/* 별 이미지와 효과를 위한 컨테이너 */}
            <div className="absolute bottom-[-13px] right-[-13px] w-16 h-16 z-10">
                {/* 별 주변의 발광 효과 */}
                <div
                    className="absolute w-10 h-10 bg-blue-300 rounded-full filter blur-md opacity-30"
                    style={{
                        animation: 'gentlePulse 2s ease-in-out infinite',
                        top: '3px',
                        left: '3px'
                    }}
                ></div>

                {/* 확장되는 원형 파동 효과 */}
                <div
                    className="absolute w-6 h-6 bg-blue-200 rounded-full opacity-0"
                    style={{
                        animation: "ripple 2.5s linear infinite",
                        top: '12px',
                        left: '12px'
                    }}
                ></div>
                <div
                    className="absolute w-6 h-6 bg-blue-200 rounded-full opacity-0"
                    style={{
                        animation: "ripple 2.5s linear infinite 1.25s",
                        top: '12px',
                        left: '12px'
                    }}
                ></div>

                {/* 폭죽 효과 - 여러 개의 반짝이는 점들 */}
                <div className="absolute inset-0">
                    {/* 폭죽 1 */}
                    <div
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            animation: 'firework 1.5s ease-out infinite',
                            top: '10%',
                            left: '20%',
                            animationDelay: '0.2s'
                        }}
                    ></div>
                    <div
                        className="absolute w-1 h-1 bg-blue-200 rounded-full"
                        style={{
                            animation: 'firework 1.8s ease-out infinite',
                            top: '15%',
                            right: '25%',
                            animationDelay: '0.5s'
                        }}
                    ></div>
                    <div
                        className="absolute w-0.5 h-0.5 bg-white rounded-full"
                        style={{
                            animation: 'firework 1.2s ease-out infinite',
                            bottom: '30%',
                            right: '15%',
                            animationDelay: '0.7s'
                        }}
                    ></div>
                    <div
                        className="absolute w-0.5 h-0.5 bg-blue-100 rounded-full"
                        style={{
                            animation: 'firework 1.5s ease-out infinite',
                            bottom: '20%',
                            left: '30%',
                            animationDelay: '0.3s'
                        }}
                    ></div>
                </div>

                {/* 스파클 효과 - 반짝이는 작은 점들 */}
                <div
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                        animation: 'sparkle 2s ease-in-out infinite',
                        top: '0px',
                        right: '5px'
                    }}
                ></div>
                <div
                    className="absolute w-0.5 h-0.5 bg-white rounded-full"
                    style={{
                        animation: 'sparkle 1.7s ease-in-out infinite 0.5s',
                        bottom: '5px',
                        left: '0px'
                    }}
                ></div>
                <div
                    className="absolute w-0.5 h-0.5 bg-white rounded-full"
                    style={{
                        animation: 'sparkle 1.4s ease-in-out infinite 0.3s',
                        top: '50%',
                        left: '0px'
                    }}
                ></div>

                {/* 별 이미지 - 역동적인 움직임 */}
                <img
                    src="/images/blueStar.png"
                    alt="alert"
                    className="w-12 h-12 absolute top-2 left-2"
                    style={{
                        animation: 'dynamicStar 2s ease-in-out infinite'
                    }}
                />
            </div>

            <div className=" text-[#607793] font-bold flex items-center gap-2">
                <CircleAlert className="w-6 h-6" />
                <span>{txt}</span>
            </div>

            <style jsx>{`
                @keyframes slideEnter {
                    from {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideExit {
                    from {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                }
                
                @keyframes dynamicStar {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg) scale(1);
                    }
                    20% {
                        transform: translateY(-3px) rotate(5deg) scale(1.05);
                    }
                    40% {
                        transform: translateX(2px) rotate(-3deg) scale(0.98);
                    }
                    60% {
                        transform: translateY(2px) rotate(2deg) scale(1.02);
                    }
                    80% {
                        transform: translateX(-2px) rotate(-2deg) scale(0.95);
                    }
                }
                
                @keyframes gentlePulse {
                    0%, 100% {
                        opacity: 0.2;
                        transform: scale(0.9);
                    }
                    50% {
                        opacity: 0.4;
                        transform: scale(1.2);
                    }
                }
                
                @keyframes ripple {
                    0% {
                        transform: scale(1);
                        opacity: 0.7;
                    }
                    100% {
                        transform: scale(3.5);
                        opacity: 0;
                    }
                }
                
                @keyframes firework {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    20% {
                        transform: scale(1.5);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(0);
                        opacity: 0;
                    }
                }
                
                @keyframes sparkle {
                    0%, 100% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }
            `}</style>
        </div>
    );
}