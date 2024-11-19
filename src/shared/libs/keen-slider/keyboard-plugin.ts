import type { KeenSliderInstance } from 'keen-slider';

export const KeyboardControlsPlugin = (slider: KeenSliderInstance) => {
  let focused = false;

  function eventFocus() {
    focused = true;
  }

  function eventBlur() {
    focused = false;
  }

  function eventKeydown(e: KeyboardEvent) {
    if (!focused) return;
    switch (e.key) {
      case 'Left':
      case 'ArrowLeft': {
        slider.prev();

        break;
      }

      case 'Right':
      case 'ArrowRight': {
        slider.next();

        break;
      }

      default: {
        break;
      }
    }
  }

  slider.on('created', () => {
    slider.container.setAttribute('tabindex', '0');
    slider.container.addEventListener('focus', eventFocus);
    slider.container.addEventListener('blur', eventBlur);
    slider.container.addEventListener('keydown', eventKeydown);
  });
};
