import { rerenderEvent, Store, useSelector } from "./store";

// a component that will re-render on state changes
function smartComponent<T extends Element>(
  render: (arg: Store) => T,
  parentNode: Element | null,
  ) {
  const store = useSelector(state => state);
  let node = render(store);
  parentNode?.appendChild(node);

  rerenderEvent.addEventListener('rerender', (e) => {
    const store = (e as CustomEvent<Store>).detail;

    Array.from(node.children).forEach(child => {
      node.removeChild(child);
    });

    const nextNode = render(store);

    parentNode?.replaceChild(nextNode, node);

    node = nextNode;
  });

  return node;
}

export default smartComponent;
