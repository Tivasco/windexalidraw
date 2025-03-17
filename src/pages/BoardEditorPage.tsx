import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../services/api/apiClient';
import { Excalidraw } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';

interface Board {
  id: string;
  title: string;
  data: any;
}

const BoardEditorPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board | null>(null);
  const [boardTitle, setBoardTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [excalidrawData, setExcalidrawData] = useState<{ elements: readonly any[]; appState: any }>({ 
    elements: [], 
    appState: { 
      viewBackgroundColor: '#f5f5f5',
      collaborators: [],
      currentChartType: 'bar',
      gridSize: null,
      theme: 'light'
    } 
  });

  useEffect(() => {
    if (id && id !== 'new') {
      handleLoad(id);
    }
  }, [id]);

  const handleLoad = async (boardId: string) => {
    try {
      const response = await apiClient.get<Board>(`/api/excalidraw/boards/${boardId}`);
      setBoard(response);
      setBoardTitle(response.title);
      try {
        console.log('Received data:', response.data);
        const parsedData = JSON.parse(response.data);
        console.log('Parsed data:', parsedData);
        setExcalidrawData({
          elements: parsedData.elements || [],
          appState: {
            viewBackgroundColor: '#f5f5f5',
            collaborators: [],
            currentChartType: 'bar',
            gridSize: null,
            theme: 'light',
            ...parsedData.appState
          }
        });
      } catch (parseError) {
        console.error('Error parsing board data:', parseError);
        setError('Failed to parse board data');
      }
    } catch (err) {
      console.error('Load error:', err);
      setError('Failed to load board');
    }
  };

  const handleSave = async () => {
    if (!boardTitle.trim()) {
      setError('Please enter a title for your board');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Get the current Excalidraw data
      const dataToSave = {
        elements: excalidrawData.elements,
        appState: excalidrawData.appState
      };
      console.log('Saving data:', dataToSave);

      const payload = {
        title: boardTitle,
        data: dataToSave
      };

      if (board) {
        await apiClient.put(`/api/excalidraw/boards/${board.id}`, payload);
      } else {
        const response = await apiClient.post<Board>('/api/excalidraw/boards', payload);
        setBoard(response);
        navigate(`/excalidraw/${response.id}`);
      }

      setLoading(false);
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save board');
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/excalidraw')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to Boards
            </button>
            <input
              type="text"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              placeholder="Enter board title"
              className="px-4 py-2 border rounded"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="flex-1">
        <Excalidraw
          initialData={{
            appState: excalidrawData?.appState || {
              viewBackgroundColor: '#f5f5f5',
              collaborators: [],
              currentChartType: 'bar',
              gridSize: null,
              theme: 'light'
            },
            elements: excalidrawData?.elements || [],
          }}
          onChange={(elements, appState) => {
            if (JSON.stringify(elements) !== JSON.stringify(excalidrawData?.elements)) {
              setExcalidrawData({
                elements,
                appState,
              });
            }
          }}
        />
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 p-4 bg-red-100 text-red-700 rounded shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default BoardEditorPage;
