import { render, screen } from '@testing-library/react';
import ModalBuy from './modal-buy';
import { withHistory } from '../../utils/mock-component';


describe('Component: ModalBuy', () => {
  it('should render correctly', () => {
    const expectedText = 'Спасибо за покупку';
    const preparedComponent = withHistory(<ModalBuy onCloseButtonClick={() => (null)} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
