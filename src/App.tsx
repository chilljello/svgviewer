import React, { useState, useRef, useEffect, useCallback } from 'react';

interface SVGDimensions {
  width: number;
  height: number;
}

interface TouchCenter {
  x: number;
  y: number;
}

function App(): JSX.Element {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [svgDimensions, setSvgDimensions] = useState<SVGDimensions>({ width: 0, height: 0 });
  
  const viewerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const MIN_SCALE = 0.1;
  const MAX_SCALE = 50;

  const resetView = useCallback((): void => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  }, []);

  const fitToWindow = useCallback((): void => {
    if (svgDimensions.width && svgDimensions.height) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const scaleX = (windowWidth * 0.9) / svgDimensions.width;
      const scaleY = (windowHeight * 0.9) / svgDimensions.height;
      const newScale = Math.min(scaleX, scaleY);
      
      const scaledWidth = svgDimensions.width * newScale;
      const scaledHeight = svgDimensions.height * newScale;
      const newTranslateX = (windowWidth - scaledWidth) / 2;
      const newTranslateY = (windowHeight - scaledHeight) / 2;
      
      setScale(newScale);
      setTranslateX(newTranslateX);
      setTranslateY(newTranslateY);
    }
  }, [svgDimensions]);

  const zoomIn = useCallback((): void => {
    const newScale = Math.min(scale * 1.2, MAX_SCALE);
    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;
    
    const scaleRatio = newScale / scale;
    const newTranslateX = windowCenterX - (windowCenterX - translateX) * scaleRatio;
    const newTranslateY = windowCenterY - (windowCenterY - translateY) * scaleRatio;
    
    setScale(newScale);
    setTranslateX(newTranslateX);
    setTranslateY(newTranslateY);
  }, [scale, translateX, translateY]);

  const zoomOut = useCallback((): void => {
    const newScale = Math.max(scale / 1.2, MIN_SCALE);
    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;
    
    const scaleRatio = newScale / scale;
    const newTranslateX = windowCenterX - (windowCenterX - translateX) * scaleRatio;
    const newTranslateY = windowCenterY - (windowCenterY - translateY) * scaleRatio;
    
    setScale(newScale);
    setTranslateX(newTranslateX);
    setTranslateY(newTranslateY);
  }, [scale, translateX, translateY]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setSvgContent(result);
        resetView();
        
        setTimeout(() => {
          if (svgRef.current) {
            const svgElement = svgRef.current.querySelector('svg');
            if (svgElement) {
              let svgWidth = (svgElement as SVGElement).viewBox?.baseVal?.width || (svgElement as SVGElement).width?.baseVal?.value || 800;
              let svgHeight = (svgElement as SVGElement).viewBox?.baseVal?.height || (svgElement as SVGElement).height?.baseVal?.value || 600;
              
              if (!svgWidth || !svgHeight) {
                const rect = svgElement.getBoundingClientRect();
                svgWidth = rect.width;
                svgHeight = rect.height;
              }
              
              setSvgDimensions({ width: svgWidth, height: svgHeight });
              setTimeout(fitToWindow, 100);
            }
          }
        }, 100);
      };
      reader.readAsText(file);
    } else {
      alert('Please drop an SVG file.');
    }
  };

  const handleWheel = useCallback((e: WheelEvent): void => {
    e.preventDefault();
    if (!viewerRef.current) return;
    
    const rect = viewerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const delta = e.deltaY * -0.001;
    const newScale = Math.max(MIN_SCALE, Math.min(scale + delta, MAX_SCALE));
    
    const scaleRatio = newScale / scale;
    const newTranslateX = mouseX - (mouseX - translateX) * scaleRatio;
    const newTranslateY = mouseY - (mouseY - translateY) * scaleRatio;
    
    setScale(newScale);
    setTranslateX(newTranslateX);
    setTranslateY(newTranslateY);
  }, [scale, translateX, translateY]);

  const handleMouseDown = useCallback((e: MouseEvent): void => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setStartX(e.clientX - translateX);
    setStartY(e.clientY - translateY);
  }, [translateX, translateY]);

  const handleMouseMove = useCallback((e: MouseEvent): void => {
    if (isDragging) {
      const newTranslateX = e.clientX - startX;
      const newTranslateY = e.clientY - startY;
      
      const maxPanX = window.innerWidth * 1.5;
      const maxPanY = window.innerHeight * 1.5;
      
      setTranslateX(Math.max(-maxPanX, Math.min(maxPanX, newTranslateX)));
      setTranslateY(Math.max(-maxPanY, Math.min(maxPanY, newTranslateY)));
    }
  }, [isDragging, startX, startY]);

  const handleMouseUp = useCallback((): void => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent): void => {
    switch (e.key) {
      case '0':
        resetView();
        break;
      case 'f':
      case 'F':
        fitToWindow();
        break;
      case '+':
      case '=':
        zoomIn();
        break;
      case '-':
        zoomOut();
        break;
      case 'Escape':
        resetView();
        break;
    }
  }, [resetView, fitToWindow, zoomIn, zoomOut]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (viewer) {
      viewer.addEventListener('wheel', handleWheel, { passive: false });
      viewer.addEventListener('mousedown', handleMouseDown);
      viewer.addEventListener('mousemove', handleMouseMove);
      viewer.addEventListener('mouseup', handleMouseUp);
      viewer.addEventListener('mouseleave', handleMouseUp);
      viewer.addEventListener('keydown', handleKeyDown);
      
      viewer.focus();
    }
    return () => {
      if (viewer) {
        viewer.removeEventListener('wheel', handleWheel);
        viewer.removeEventListener('mousedown', handleMouseDown);
        viewer.removeEventListener('mousemove', handleMouseMove);
        viewer.removeEventListener('mouseup', handleMouseUp);
        viewer.removeEventListener('mouseleave', handleMouseUp);
        viewer.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp, handleKeyDown]);

  return (
    <div
      className="App"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        margin: 0,
        padding: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        userSelect: 'none',
        overflow: 'hidden'
      }}
    >
      {svgContent ? (
        <div
          ref={viewerRef}
          className="svg-viewer"
          tabIndex={0}
          style={{
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            width: '100vw',
            height: '100vh',
            cursor: isDragging ? 'grabbing' : 'grab',
            position: 'relative'
          }}
        >
          <div
            ref={svgRef}
            dangerouslySetInnerHTML={{ __html: svgContent }}
            style={{
              margin: 0,
              padding: 0,
              transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              top: 0,
              left: 0,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
          />
          
          {/* Zoom Controls */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 1000
          }}>
            <button
              onClick={zoomIn}
              style={{
                width: '40px',
                height: '40px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                fontSize: '18px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Zoom In (+)"
            >
              +
            </button>
            <button
              onClick={zoomOut}
              style={{
                width: '40px',
                height: '40px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                fontSize: '18px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Zoom Out (-)"
            >
              −
            </button>
            <button
              onClick={fitToWindow}
              style={{
                width: '40px',
                height: '40px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Fit to Window (F)"
            >
              F
            </button>
            <button
              onClick={resetView}
              style={{
                width: '40px',
                height: '40px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Reset View (0)"
            >
              0
            </button>
          </div>

          {/* Info Panel */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#333',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000
          }}>
            <div>Zoom: {Math.round(scale * 100)}%</div>
            <div>Position: ({Math.round(translateX)}, {Math.round(translateY)})</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              Mouse wheel: Zoom | Drag: Pan | F: Fit | 0: Reset | +/-: Zoom
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          margin: 0,
          padding: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          color: '#666'
        }}>
          <p style={{ margin: 0, padding: 0 }}>Drag and drop an SVG file here to view it.</p>
        </div>
      )}
    </div>
  );
}

export default App;
