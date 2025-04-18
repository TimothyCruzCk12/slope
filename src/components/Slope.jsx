import React, { useState, useEffect, useRef } from 'react';

const Slope = () => {
  // Step 1: Initial state
  const [showButton, setShowButton] = useState(true);
  const [isButtonShrinking, setIsButtonShrinking] = useState(false);

  // Step 2: Points and line
  const [showPoints, setShowPoints] = useState(false);
  const [showLine, setShowLine] = useState(false);

  // Step 3: Initial text and continue button
  const [showText, setShowText] = useState(false);
  const [showFullText, setShowFullText] = useState(true);
  const [showContinue, setShowContinue] = useState(false);
  const [isContinueShrinking, setIsContinueShrinking] = useState(false);

  // Step 4: Rise/Run visualization
  const [showHorizontalLine, setShowHorizontalLine] = useState(false);
  const [showVerticalLine, setShowVerticalLine] = useState(false);
  const [showRunLabel, setShowRunLabel] = useState(false);
  const [showRiseLabel, setShowRiseLabel] = useState(false);
  const [isRiseLabelShrinking, setIsRiseLabelShrinking] = useState(false);
  const [isRunLabelShrinking, setIsRunLabelShrinking] = useState(false);
  const [showRunNumbers, setShowRunNumbers] = useState([false, false, false, false, false]);
  const [showRiseNumbers, setShowRiseNumbers] = useState([false, false, false, false, false, false, false, false]);
  const [isRunNumbersShrinking, setIsRunNumbersShrinking] = useState(false);
  const [isRiseNumbersShrinking, setIsRiseNumbersShrinking] = useState(false);
  const [showFractionBar, setShowFractionBar] = useState(false);
  const [showSlopeText, setShowSlopeText] = useState(false);
  const [isNumbersMoving, setIsNumbersMoving] = useState(false);
  const [showExploreButton, setShowExploreButton] = useState(false);
  const [showInstructionText, setShowInstructionText] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [showStaticNumbers, setShowStaticNumbers] = useState(false);
  const [points, setPoints] = useState([
    { x: 2, y: 3 },
    { x: 7, y: 11 }
  ]);
  const [currentRise, setCurrentRise] = useState(8);
  const [currentRun, setCurrentRun] = useState(5);
  const [isExploring, setIsExploring] = useState(false);

  // Step 5: Explanation text
  const [showExplanation, setShowExplanation] = useState(false);
  const [isExplanationShrinking, setIsExplanationShrinking] = useState(false);

  // Step 6: Second continue button
  const [showSecondContinue, setShowSecondContinue] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const gridRef = useRef(null);
  const riseRef = useRef(8);
  const runRef = useRef(5);

  const updateRiseAndRun = (newPoints) => {
    const rise = newPoints[1].y - newPoints[0].y;
    const run = Math.abs(newPoints[1].x - newPoints[0].x);
    riseRef.current = rise;
    runRef.current = run;
    
    // Update the display directly
    const riseText = document.querySelector('text[fill="#ef4444"]');
    const runText = document.querySelector('text[fill="#3b82f6"]');
    if (riseText) riseText.textContent = rise;
    if (runText) runText.textContent = run;
  };

  const handleClick = () => {
    setIsAnimating(true);
    // Step 1: Shrink and remove initial button
    setIsButtonShrinking(true);
    setTimeout(() => {
      setShowButton(false);
      
      // Step 2: Show points and line
      setShowPoints(true);
      setTimeout(() => {
        setShowLine(true);
        
        // Step 3: Show text and continue button
        setTimeout(() => {
          setShowText(true);
          setTimeout(() => {
            setShowContinue(true);
            setIsAnimating(false);
          }, 1500);
        }, 700);
      }, 800);
    }, 300);
  };

  const handleContinue = () => {
    setIsAnimating(true);
    // Step 3: Shrink and remove initial text and continue button
    setIsContinueShrinking(true);
    setTimeout(() => {
      setShowContinue(false);
      setShowFullText(false);
      setShowText(false);
      
      // Step 4: Show rise/run visualization
      setTimeout(() => {
        setShowHorizontalLine(true);
        // Show run numbers sequentially
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            setShowRunNumbers(prev => {
              const newState = [...prev];
              newState[i] = true;
              return newState;
            });
          }, i * 200);
        }
        setTimeout(() => {
          setShowVerticalLine(true);
          // Show rise numbers sequentially
          for (let i = 0; i < 8; i++) {
            setTimeout(() => {
              setShowRiseNumbers(prev => {
                const newState = [...prev];
                newState[i] = true;
                return newState;
              });
            }, i * 200);
          }
          setTimeout(() => {
            setShowRunLabel(true);
            setShowRiseLabel(true);
            
            // Step 5: Show explanation text
            setTimeout(() => {
              setShowExplanation(true);
              
              // Step 6: Show second continue button
              setTimeout(() => {
                setShowSecondContinue(true);
                setIsAnimating(false);
              }, 500);
            }, 500);
          }, 800);
        }, 800);
      }, 500);
    }, 500);
  };

  const handleSecondContinue = () => {
    setIsAnimating(true);
    // Shrink and remove all elements
    setIsRiseLabelShrinking(true);
    setIsRunLabelShrinking(true);
    setIsExplanationShrinking(true);
    setIsRunNumbersShrinking(true);
    setIsRiseNumbersShrinking(true);
    
    // Show slope text and fraction bar after a short delay
    setTimeout(() => {
      setShowSlopeText(true);
      setTimeout(() => {
        setShowFractionBar(true);
        setTimeout(() => {
          setIsNumbersMoving(true);
          setTimeout(() => {
            setShowExploreButton(true);
            setIsAnimating(false);
          }, 800);
        }, 300);
      }, 300);
    }, 200);
    
    setTimeout(() => {
      setShowRiseLabel(false);
      setShowRunLabel(false);
      setShowExplanation(false);
      setShowSecondContinue(false);
      // Hide all numbers except the last ones
      setShowRunNumbers([false, false, false, false, true]);
      setShowRiseNumbers([false, false, false, false, false, false, false, true]);
    }, 500);
  };

  const handlePointDrag = (index, e) => {
    if (!isDraggable) return;
    
    setIsDragging(true);
    setDragIndex(index);
    
    const rect = gridRef.current.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    const x = Math.max(0, Math.min(400, clientX - rect.left));
    const y = Math.max(0, Math.min(260, clientY - rect.top));
    
    // Snap to nearest grid point (20x20 grid)
    const snappedX = Math.round(x / 20) * 20;
    const snappedY = Math.round(y / 20) * 20;
    
    setPoints(prev => {
      const newPoints = [...prev];
      const newX = Math.round(snappedX / 20);
      const newY = Math.round((260 - snappedY) / 20);
      
      // Constrain points within boundaries
      const constrainedX = Math.max(1, Math.min(19, newX));
      const constrainedY = Math.max(1, Math.min(12, newY));
      
      newPoints[index] = {
        x: constrainedX,
        y: constrainedY
      };
      
      if (isExploring) {
        updateRiseAndRun(newPoints);
      }
      return newPoints;
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || dragIndex === null) return;
    
    const rect = gridRef.current.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    const x = Math.max(0, Math.min(400, clientX - rect.left));
    const y = Math.max(0, Math.min(260, clientY - rect.top));
    
    // Snap to nearest grid point (20x20 grid)
    const snappedX = Math.round(x / 20) * 20;
    const snappedY = Math.round(y / 20) * 20;
    
    setPoints(prev => {
      const newPoints = [...prev];
      const newX = Math.round(snappedX / 20);
      const newY = Math.round((260 - snappedY) / 20);
      
      // Constrain points within boundaries
      const constrainedX = Math.max(1, Math.min(19, newX));
      const constrainedY = Math.max(1, Math.min(12, newY));
      
      newPoints[dragIndex] = {
        x: constrainedX,
        y: constrainedY
      };
      
      if (isExploring) {
        updateRiseAndRun(newPoints);
      }
      return newPoints;
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragIndex(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragIndex]);

  const handleExploreClick = () => {
    setIsAnimating(true);
    setShowExploreButton(false);
    setShowInstructionText(true);
    setIsDraggable(true);
    setIsExploring(true);
    // Hide the moving numbers
    setShowRunNumbers([false, false, false, false, false]);
    setShowRiseNumbers([false, false, false, false, false, false, false, false]);
    // Show static numbers
    setShowStaticNumbers(true);
    // Calculate initial rise and run
    const rise = Math.abs(points[1].y - points[0].y);
    const run = Math.abs(points[1].x - points[0].x);
    setCurrentRise(rise);
    setCurrentRun(run);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const x1 = points[0].x * 20;
  const y1 = (13 - points[0].y) * 20;
  const x2 = points[1].x * 20;
  const y2 = (13 - points[1].y) * 20;

  const handleReset = () => {
    // Reset all states to initial values
    setShowButton(true);
    setIsButtonShrinking(false);
    setShowPoints(false);
    setShowLine(false);
    setShowText(false);
    setShowFullText(true);
    setShowContinue(false);
    setIsContinueShrinking(false);
    setShowHorizontalLine(false);
    setShowVerticalLine(false);
    setShowRunLabel(false);
    setShowRiseLabel(false);
    setIsRiseLabelShrinking(false);
    setIsRunLabelShrinking(false);
    setShowRunNumbers([false, false, false, false, false]);
    setShowRiseNumbers([false, false, false, false, false, false, false, false]);
    setIsRunNumbersShrinking(false);
    setIsRiseNumbersShrinking(false);
    setShowFractionBar(false);
    setShowSlopeText(false);
    setIsNumbersMoving(false);
    setShowExploreButton(false);
    setShowInstructionText(false);
    setIsDraggable(false);
    setShowStaticNumbers(false);
    setPoints([
      { x: 2, y: 3 },
      { x: 7, y: 11 }
    ]);
    setCurrentRise(8);
    setCurrentRun(5);
    setIsExploring(false);
    setShowExplanation(false);
    setIsExplanationShrinking(false);
    setShowSecondContinue(false);
    setIsDragging(false);
    setDragIndex(null);
    riseRef.current = 8;
    runRef.current = 5;
  };

  return (
    <div className="w-[464px] mx-auto mt-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg select-none">
      <style>
        {`
          .point {
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #5750E3;
            transform: translate(-50%, -50%);
            transition: background-color 0.3s ease;
          }
          @keyframes growPoint {
            from {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }
          .point-animation {
            animation: growPoint 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes pointColorChange {
            0% {
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              transform: translate(-50%, -50%) scale(0.8);
            }
            100% {
              transform: translate(-50%, -50%) scale(1);
            }
          }
          .point-color-change {
            animation: pointColorChange 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            background-color: #FFB066;
          }
          @keyframes shrinkButton {
            from {
              transform: scale(1);
              opacity: 1;
            }
            to {
              transform: scale(0);
              opacity: 0;
            }
          }
          .shrink-animation {
            animation: shrinkButton 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes drawLine {
            from {
              stroke-dashoffset: 200;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
          .line-animation {
            stroke-dasharray: 200;
            animation: drawLine 0.6s cubic-bezier(0.5, 0, 0.05, 1) forwards;
          }
          .horizontal-line-animation {
            stroke-dasharray: 200;
            animation: drawLine 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
          .text-animation {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .text-fade-out {
            animation: fadeIn 0.5s ease-out reverse forwards;
          }
          @keyframes growButton {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .continue-animation {
            animation: growButton 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes transformSlash {
            from {
              transform: rotate(-45deg) scale(1);
              width: 1em;
              height: 0.1em;
            }
            to {
              transform: rotate(0deg) scale(1.5);
              width: 200px;
              height: 0.1em;
            }
          }
          .slash-animation {
            animation: transformSlash 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            background-color: currentColor;
            display: inline-block;
            transform-origin: left center;
          }
          .slash {
            display: inline-block;
            width: 1.2em;
            height: 2px;
            background-color: currentColor;
            transform: rotate(-60deg);
            vertical-align: middle;
          }
          @keyframes bounceAndFade {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            50% {
              transform: translateY(-8px);
              opacity: 1;
            }
            100% {
              transform: translateY(0);
              opacity: 0;
            }
          }
          .bounce-fade {
            animation: bounceAndFade 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes shrinkText {
            from {
              transform: scale(1);
              opacity: 1;
            }
            to {
              transform: scale(0);
              opacity: 0;
            }
          }
          @keyframes runNumberExit {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(20px);
              opacity: 0;
            }
          }
          @keyframes riseNumberExit {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(20px);
              opacity: 0;
            }
          }
          @keyframes fractionBarAppear {
            from {
              transform: scaleX(0);
              opacity: 0;
            }
            to {
              transform: scaleX(1);
              opacity: 1;
            }
          }
          .text-shrink {
            animation: shrinkText 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .run-number-exit {
            animation: runNumberExit 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .rise-number-exit {
            animation: riseNumberExit 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .fraction-bar {
            animation: fractionBarAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .fade-in-down {
            animation: fadeInDown 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
          .fade-in-right {
            animation: fadeInRight 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
          @keyframes moveToFraction {
            from {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate(50px, -20px) scale(1.5);
              opacity: 1;
            }
          }
          @keyframes moveRunToFraction {
            from {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate(164px, -90px) scale(1.5);
              opacity: 1;
            }
          }
          @keyframes moveRiseToFraction {
            from {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate(145px, -45px) scale(1.5);
              opacity: 1;
            }
          }
          .move-to-fraction {
            animation: moveToFraction 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .move-run-to-fraction {
            animation: moveRunToFraction 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .move-rise-to-fraction {
            animation: moveRiseToFraction 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .reset-button {
            background-color: #5750E3;
            color: white;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            transition: background-color 0.2s;
            margin-left: auto;
            font-family: system-ui, -apple-system, sans-serif;
            font-weight: bold;
            padding: 0.25rem 0.5rem;
            line-height: 1;
          }
          .reset-button:hover {
            background-color: #4a42c7;
          }
          .reset-button:disabled {
            background-color: #5750E3;
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}
      </style>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#5750E3] text-sm font-medium select-none">Slope Explorer</h2>
          <button 
            className="reset-button"
            onClick={handleReset}
            title="Reset interactive"
            disabled={isAnimating}
          >
            Reset
          </button>
        </div>

        <div className="mt-4">
          <div className="w-[400px] mx-auto bg-white border border-[#5750E3]/30 rounded-md overflow-hidden">
            <div 
              ref={gridRef}
              className="relative w-[400px] h-[260px] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U1ZTVlNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"
            >
              {showButton && (
                <button 
                  className={`absolute bottom-4 right-4 px-3 py-1.5 bg-[#5750E3] text-white text-sm rounded-full hover:bg-[#4a42c7] transition-colors duration-200 select-none ${isButtonShrinking ? 'shrink-animation' : ''}`}
                  onClick={handleClick}
                  style={{ transformOrigin: 'center' }}
                >
                  Click to Explore!
                </button>
              )}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {showLine && (
                  <line 
                    x1={x1} 
                    y1={y1} 
                    x2={x2} 
                    y2={y2} 
                    stroke="#000000" 
                    strokeWidth="2"
                    className="line-animation"
                    style={{ strokeDasharray: isExploring ? Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) : 200 }}
                  />
                )}
                {showHorizontalLine && (
                  <line 
                    x1={x1} 
                    y1={y1} 
                    x2={x2} 
                    y2={y1} 
                    stroke="#3b82f6" 
                    strokeWidth="2"
                    className="horizontal-line-animation"
                    style={{ strokeDasharray: isExploring ? Math.abs(x2 - x1) : 200 }}
                  />
                )}
                {showVerticalLine && (
                  <line 
                    x1={x2} 
                    y1={y1} 
                    x2={x2} 
                    y2={y2} 
                    stroke="#ef4444" 
                    strokeWidth="2"
                    className="horizontal-line-animation"
                    style={{ strokeDasharray: isExploring ? Math.abs(y2 - y1) : 200 }}
                  />
                )}
                {showRunLabel && (
                  <text
                    x={x1 + 40}
                    y={y1 + 34}
                    fill="#3b82f6"
                    className={`text-sm font-bold ${isRunLabelShrinking ? 'text-shrink' : 'fade-in-right'}`}
                    style={{ transformOrigin: `${x1 + 40}px ${y1 + 30}px` }}
                  >
                    run
                  </text>
                )}
                {showRiseLabel && (
                  <text
                    x={x2 + 25}
                    y={y1 + (y2 - y1) / 2}
                    fill="#ef4444"
                    className={`text-sm font-bold ${isRiseLabelShrinking ? 'text-shrink' : 'fade-in-right'}`}
                    style={{ transformOrigin: 'center' }}
                  >
                    rise
                  </text>
                )}
                {showRunNumbers.map((show, index) => (
                  show && (
                    <text
                      key={index}
                      x={x1 + (index + 0.30) * 20}
                      y={y1 + 16}
                      fill="#3b82f6"
                      className={`text-sm font-bold ${isRunNumbersShrinking && index !== 4 ? 'run-number-exit' : isNumbersMoving && index === 4 ? 'move-run-to-fraction' : !isRunNumbersShrinking ? 'fade-in-right' : ''}`}
                      style={{ transformOrigin: `${x1 + (index + 0.5) * 20}px ${y1 + 25}px` }}
                    >
                      {isExploring && index === 4 ? currentRun : index + 1}
                    </text>
                  )
                ))}
                {showRiseNumbers.map((show, index) => (
                  show && (
                    <text
                      key={index}
                      x={x2 + 7}
                      y={y2 - (index * 20) + 156}
                      fill="#ef4444"
                      className={`text-sm font-bold ${isRiseNumbersShrinking && index !== 7 ? 'rise-number-exit' : isNumbersMoving && index === 7 ? 'move-rise-to-fraction' : !isRiseNumbersShrinking ? 'fade-in-right' : ''}`}
                      style={{ transformOrigin: `${x2 + 15}px ${y2 - (index * 20) + 10}px` }}
                    >
                      {isExploring && index === 7 ? currentRise : index + 1}
                    </text>
                  )
                ))}
              </svg>
              {showPoints && (
                <>
                  <div 
                    className={`point ${isDraggable ? 'point-color-change' : (showPoints ? 'point-animation' : '')} ${isDraggable ? 'cursor-move' : ''}`}
                    style={{ 
                      left: `${points[0].x * 20}px`,
                      top: `${(13 - points[0].y) * 20}px`,
                      touchAction: 'none'
                    }}
                    onMouseDown={(e) => handlePointDrag(0, e)}
                    onTouchStart={(e) => handlePointDrag(0, e.touches[0])}
                  />
                  <div 
                    className={`point ${isDraggable ? 'point-color-change' : (showPoints ? 'point-animation' : '')} ${isDraggable ? 'cursor-move' : ''}`}
                    style={{ 
                      left: `${points[1].x * 20}px`,
                      top: `${(13 - points[1].y) * 20}px`,
                      touchAction: 'none'
                    }}
                    onMouseDown={(e) => handlePointDrag(1, e)}
                    onTouchStart={(e) => handlePointDrag(1, e.touches[0])}
                  />
                </>
              )}
              {showSlopeText && (
                <div className={`absolute top-4 right-4 w-[180px] text-sm text-gray-600 fade-in-down text-center`}>
                  <div>
                    {showInstructionText ? (
                      <>
                        Drag the points to find new <span className="font-bold text-[#5750E3]">slopes</span>!
                      </>
                    ) : (
                      <>
                        For this particular line, the <span className="font-bold text-[#5750E3]">slope</span> would be:
                      </>
                    )}
                  </div>
                  {showFractionBar && (
                    <div className="relative w-full h-16 mt-2">
                      <svg className="w-full h-full" viewBox="0 0 200 100">
                        <line
                          x1="60"
                          y1="50"
                          x2="140"
                          y2="50"
                          stroke="#000000"
                          strokeWidth="2"
                          className="fraction-bar"
                          style={{ transformOrigin: '0 4px' }}
                        />
                        {showStaticNumbers && (
                          <>
                            <text
                              x="100"
                              y="92"
                              fill="#3b82f6"
                              className="text-lg font-bold"
                              style={{ fontSize: '2.1rem' }}
                              textAnchor="middle"
                            >
                              {isExploring ? runRef.current : 5}
                            </text>
                            <text
                              x="100"
                              y="30"
                              fill="#ef4444"
                              className="text-lg font-bold"
                              style={{ fontSize: '2.1rem' }}
                              textAnchor="middle"
                            >
                              {isExploring ? riseRef.current : 8}
                            </text>
                          </>
                        )}
                      </svg>
                    </div>
                  )}
                </div>
              )}
              {showText && (
                <div className={`absolute top-4 right-4 w-[180px] text-sm text-gray-600 ${isContinueShrinking ? 'text-shrink' : 'text-animation'} text-center`}>
                  <div>
                    {showFullText ? (
                      <span>
                        Here we have a line between two points. A <span className="font-bold text-[#5750E3]">slope</span> is what describes how steep a line is in terms of{" "}
                      </span>
                    ) : null}
                    <span className="inline-flex items-center">
                      <span className="font-bold text-red-500">rise</span>
                      <span className="slash"></span>
                      <span className="font-bold text-blue-500">run</span>
                    </span>
                    {showFullText ? "." : null}
                  </div>
                </div>
              )}
              {showExplanation && (
                <div className={`absolute top-4 right-4 w-[180px] text-sm text-gray-600 ${isExplanationShrinking ? 'text-shrink' : 'fade-in-down'} text-center`}>
                  <div>
                    <span className="font-bold text-red-500">Rise</span> is the vertical displacement between two points on a line while <span className="font-bold text-blue-500">run</span> is the horizontal displacement between those two points.
                  </div>
                </div>
              )}
              {showContinue && (
                <button 
                  className={`absolute bottom-4 right-4 px-3 py-1.5 bg-[#5750E3] text-white text-sm rounded-full hover:bg-[#4a42c7] transition-colors duration-200 select-none ${isContinueShrinking ? 'shrink-animation' : 'continue-animation'}`}
                  onClick={handleContinue}
                  style={{ transformOrigin: 'center' }}
                >
                  Continue
                </button>
              )}
              {showSecondContinue && (
                <button 
                  className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#5750E3] text-white text-sm rounded-full hover:bg-[#4a42c7] transition-colors duration-200 select-none continue-animation"
                  onClick={handleSecondContinue}
                  style={{ transformOrigin: 'center' }}
                >
                  Continue
                </button>
              )}
              {showExploreButton && (
                <button 
                  className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#5750E3] text-white text-sm rounded-full hover:bg-[#4a42c7] transition-colors duration-200 select-none continue-animation"
                  onClick={handleExploreClick}
                  style={{ transformOrigin: 'center' }}
                >
                  Explore more slopes!
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slope;
