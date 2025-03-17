import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../services/api/apiClient';
import { Excalidraw } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import BoardList from '../components/excalidraw/BoardList';

interface Board {
  id: string;
  title: string;
  data: any;
}

const ExcalidrawPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board | null>(null);
  const [boardTitle, setBoardTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [excalidrawData, setExcalidrawData] = useState<any>(null);

  useEffect(() => {
    if (!excalidrawData) {
      setExcalidrawData({ elements: [], appState: { viewBackgroundColor: '#f5f5f5' } });
    }
  }, []);

  const handleSave = async () => {
    if (!boardTitle.trim()) {
      setError('Please enter a title for your board');
      return;
    }



    try {
      setLoading(true);
      setError(null);

      const payload = {
        title: boardTitle,
        data: excalidrawData
      };

      if (board) {
        // Update existing board
        await apiClient.put(`/api/excalidraw/boards/${board.id}`, payload);
      } else {
        // Create new board
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

  const handleLoad = async (boardId: string) => {
    try {
      const response = await apiClient.get<Board>(`/api/excalidraw/boards/${boardId}`);
      setBoard(response);
      setBoardTitle(response.title);
      setExcalidrawData(response.data);
    } catch (err) {
      console.error('Load error:', err);
      setError('Failed to load board');
    }
  };

  useEffect(() => {
    if (id) {
      handleLoad(id);
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Excalidraw Whiteboard</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            placeholder="Enter board title"
            className="px-4 py-2 border rounded"
          />
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <Excalidraw 
              initialData={{
                appState: excalidrawData?.appState || { viewBackgroundColor: '#f5f5f5' },
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
        </div>
        <div>
          <BoardList />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default ExcalidrawPage;
