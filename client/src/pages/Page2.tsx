import { useState } from 'react';
import Popup from '../components/Popup';
import './Page2.css';

interface Block {
  id: string;
  color: string;
}

const Page2 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [frame1Blocks, setFrame1Blocks] = useState<Block[]>([
    { id: '1', color: '#FF6B6B' },
    { id: '2', color: '#4ECDC4' },
    { id: '3', color: '#FFE66D' }
  ]);
  const [frame2Blocks, setFrame2Blocks] = useState<Block[]>([]);
  const [draggedBlock, setDraggedBlock] = useState<Block | null>(null);

  const handleDragStart = (e: React.DragEvent, block: Block) => {
    setDraggedBlock(block);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetFrame: 'frame1' | 'frame2') => {
    e.preventDefault();
    if (!draggedBlock) return;

    if (targetFrame === 'frame1') {
      const isInFrame1 = frame1Blocks.some(b => b.id === draggedBlock.id);
      if (!isInFrame1) {
        setFrame1Blocks([...frame1Blocks, draggedBlock]);
        setFrame2Blocks(frame2Blocks.filter(b => b.id !== draggedBlock.id));
      }
    } else {
      const isInFrame2 = frame2Blocks.some(b => b.id === draggedBlock.id);
      if (!isInFrame2) {
        setFrame2Blocks([...frame2Blocks, draggedBlock]);
        setFrame1Blocks(frame1Blocks.filter(b => b.id !== draggedBlock.id));
      }
    }
    setDraggedBlock(null);
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
  };

  return (
    <div className="page">
      <h1>Page 2</h1>
      <button onClick={() => setIsPopupOpen(true)}>Open Popup</button>
      <div className="dragDropContainer">
        <div
          className="frame frame1"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'frame1')}
        >
          <h3>Frame 1</h3>
          <div className="blocksContainer">
            {frame1Blocks.map((block) => (
              <div
                key={block.id}
                className="block"
                style={{ backgroundColor: block.color }}
                draggable
                onDragStart={(e) => handleDragStart(e, block)}
                onDragEnd={handleDragEnd}
              >
                Block {block.id}
              </div>
            ))}
          </div>
        </div>
        <div
          className="frame frame2"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'frame2')}
        >
          <h3>Frame 2</h3>
          <div className="blocksContainer">
            {frame2Blocks.map((block) => (
              <div
                key={block.id}
                className="block"
                style={{ backgroundColor: block.color }}
                draggable
                onDragStart={(e) => handleDragStart(e, block)}
                onDragEnd={handleDragEnd}
              >
                Block {block.id}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Page 2 Popup"
        content="This is a popup from Page 2. Different content for testing purposes."
      />
    </div>
  );
};

export default Page2;

