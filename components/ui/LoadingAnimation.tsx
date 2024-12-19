import React from 'react';

const LoadingAnimation: React.FC = () => {
  const letters = "BLOCKSTAR".split("");

  return (
    <div className="flex justify-center items-center min-h-screen  text-white font-helvetica">
      <div className="text-4xl font-bold">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="inline-block opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoadingAnimation;
