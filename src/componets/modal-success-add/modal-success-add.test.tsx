import { render, screen } from '@testing-library/react';
import ModalSuccessAdd from './modal-success-add';
import { withHistory } from '../../utils/mock-component';


describe('Component: ModalSuccessAdd', () => {
  it('should render correctly', () => {
    const expectedText = 'Товар успешно добавлен в корзину';
    const preparedComponent = withHistory(<ModalSuccessAdd onCloseButtonClick={() => (null)} layout='catalog' />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
