import { render, screen } from '@testing-library/react';
import ModalAddItem from './modal-add-item';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeProduct, makeFakeStore } from '../../utils/mocks';


describe('Component: ModalAddItem', () => {
  it('should render correctly', () => {
    const fakeProduct = makeFakeProduct();
    const expectedText = fakeProduct.name;
    const { withStoreComponent } = withStore(<ModalAddItem product={fakeProduct} onCloseButtonClick={() => (null)} onSuccessAddButtonClick={() => null} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
