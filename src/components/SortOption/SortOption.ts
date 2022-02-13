import { toggleSortOption } from "../../app/actions";
import { getSortingOptions } from "../../app/selectors";
import dispatch, { rerenderEvent, Store } from "../../app/store";
import OptionState from "../../types/Option";

import styles from './SortOption.module.css';

type SortOption = {
  state: OptionState,
  value: keyof Store["settings"]["sorting"],
}

const sortOption = (args: SortOption, parentNode: Element | null) => {

  const render = (args: SortOption) => {
    const {
      state,
      value
    } = args;

    let optionContainer = document.createElement('div');
    optionContainer.className = `capitalize ${styles["option-container"]}`;
    
    let optionStateIcon = document.createElement('span');
    optionStateIcon.textContent = state
      ? state === 'asc'
        ? '☝️'
        : '👇'
      : '⚪';
  
    let optionStateText = document.createElement('span');
    optionStateText.className = `capitalize ${styles["option-disabled"]}`;
    optionStateText.textContent = value;
  
    optionContainer.appendChild(optionStateIcon);
    optionContainer.appendChild(optionStateText);

    // unmount and re-render after state update
    optionContainer.addEventListener('click', (e) => {
      e.preventDefault();

      dispatch(toggleSortOption(value)); 
    });

    return optionContainer;
  }

  let node = render(args);
  parentNode?.appendChild(node);

  rerenderEvent.addEventListener('rerender', (e) => {
    const store = (e as CustomEvent<Store>).detail;
    const sortingOptions = getSortingOptions(store);

    const nextNode = render({
      state: sortingOptions[args.value],
      value: args.value,
    });

    Array.from(node.children).forEach(child => {
      node.removeChild(child);
    });

    parentNode?.replaceChild(nextNode, node);

    node = nextNode;
  });
};

export default sortOption;
