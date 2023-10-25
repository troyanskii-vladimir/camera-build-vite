import { render, screen } from '@testing-library/react';
import ModalSuccessReview from './modal-success-review';
import { withHistory } from '../../utils/mock-component';


describe('Component: ModalSuccessReview', () => {
  it('should render correctly', () => {
    const expectedText = 'Спасибо за отзыв';
    const preparedComponent = withHistory(<ModalSuccessReview onCloseButtonClick={() => (null)} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
