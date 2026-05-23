import { useState } from 'react';
import { NodePaletteItem } from './NodePaletteItem';
import { toolbarNodes, toolbarCategories } from '../nodes/nodeRegistry';

export const NodeToolbar = () => {
  const [activeCategory, setActiveCategory] = useState(toolbarCategories[0]);
  const filtered = toolbarNodes.filter((n) => n.category === activeCategory);

  return (
    <section className="node-toolbar" aria-label="Node library">
      <nav className="node-toolbar__tabs" role="tablist">
        {toolbarCategories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            className={`node-toolbar__tab ${
              activeCategory === category ? 'node-toolbar__tab--active' : ''
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="node-toolbar__palette" role="tabpanel">
        {filtered.map((node) => (
          <NodePaletteItem key={node.type} {...node} />
        ))}
      </div>
    </section>
  );
};
