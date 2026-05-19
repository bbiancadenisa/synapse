import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SUBJECT_COLORS } from '../../utils/constants';
import { ColorPicker } from './ColorPicker';

describe('ColorPicker', () => {
  it('renders all subject colors', () => {
    const { container } = render(
      <ColorPicker value={SUBJECT_COLORS[0]} onChange={vi.fn()} />,
    );

    const circles = container.querySelectorAll('div[style]');

    expect(circles.length).toBe(SUBJECT_COLORS.length);
  });

  it('calls onChange when a color is clicked', () => {
    const onChange = vi.fn();

    const { container } = render(
      <ColorPicker value={SUBJECT_COLORS[0]} onChange={onChange} />,
    );

    const circles = container.querySelectorAll('div[style]');

    fireEvent.click(circles[1]);

    expect(onChange).toHaveBeenCalled();
  });
});
