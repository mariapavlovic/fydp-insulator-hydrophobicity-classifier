import { getToastHook } from './Toast';
import { ToastComponent } from './ToastComponent';
import { ToastTitle } from './ToastTitle';
import { ToastDescription } from './ToastDescription';
export const createToastHook = (AnimationWrapper, AnimatePresence) => {
  return getToastHook(AnimationWrapper, AnimatePresence);
};
export function createToast({
  Root,
  Title,
  Description
}) {
  const Toast = ToastComponent(Root);
  Toast.Title = ToastTitle(Title);
  Toast.Description = ToastDescription(Description);
  Toast.displayName = 'Toast';
  Toast.Title.displayName = 'Toast.Title';
  Toast.Description.displayName = 'Toast.Description';
  return Toast;
}
export { ToastProvider } from './Toast';
//# sourceMappingURL=index.js.map