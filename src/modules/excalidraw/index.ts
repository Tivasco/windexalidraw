import { Module } from '../registry';

// Define the Excalidraw module
export const excalidrawModule: Module = {
  id: 'excalidraw',
  name: 'Excalidraw',
  initialize: () => {
    console.log('Excalidraw module initialized');
    return Promise.resolve();
  },
  cleanup: () => {
    console.log('Excalidraw module cleaned up');
  }
};
