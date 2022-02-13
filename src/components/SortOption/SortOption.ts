import { toggleSortOption } from "../../app/actions";
import smartComponent from "../../app/SmartComponent";
import dispatch, { Store } from "../../app/store";
import OptionState from "../../types/Option";

import styles from './SortOption.module.css';

type SortOption = {
  state: OptionState,
  value: keyof Store["settings"]["sorting"],
}

const sortOption = (args: SortOption, parentNode: Element | null) => {
  const render = (store: Store) => {
    const state = store.settings.sorting[args.value];

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
    optionStateText.textContent = args.value;
  
    optionContainer.appendChild(optionStateIcon);
    optionContainer.appendChild(optionStateText);

    // unmount and re-render after state update
    optionContainer.addEventListener('click', (e) => {
      e.preventDefault();

      dispatch(toggleSortOption(args.value)); 
    });

    return optionContainer;
  }
  
  smartComponent(render, parentNode);
};

export default sortOption;
