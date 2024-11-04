import { flushSync } from "react-dom";

function makeTransition(transition: () => void) {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      flushSync(() => {
        transition();
      });
    });
  } else {
    transition();
  }
}

export default makeTransition