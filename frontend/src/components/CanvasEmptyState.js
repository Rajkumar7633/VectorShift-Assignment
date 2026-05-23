export const CanvasEmptyState = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="canvas-empty" aria-hidden="true">
      <div className="canvas-empty__card">
        <div className="canvas-empty__icon">+</div>
        <h3 className="canvas-empty__title">Start building your pipeline</h3>
        <p className="canvas-empty__text">
          Select a node from the toolbar above, or drag it onto this canvas.
          Connect nodes by linking handles together.
        </p>
      </div>
    </div>
  );
};
