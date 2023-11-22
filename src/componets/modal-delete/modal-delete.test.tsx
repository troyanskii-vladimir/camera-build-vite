import { render, screen } from '@testing-library/react';
import ModalDelete from './modal-delete';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCartProduct, makeFakeStore } from '../../utils/mocks';


describe('Component: ModalDelete', () => {
  it('should render correctly', () => {
    const expectedText = 'Удалить этот товар?';
    const { withStoreComponent } = withStore(<ModalDelete onCloseButtonClick={() => (null)} product={makeFakeCartProduct()} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
