import React from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';

const ExcalidrawWrapper: React.FC = () => {
  return (
    <div style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
      <Excalidraw 
        initialData={{
          appState: {
            viewBackgroundColor: '#f5f5f5',
          },
        }}
      />
    </div>
  );
};

export default ExcalidrawWrapper;
