import { render, screen } from '@testing-library/react';
import ModalAddItem from './modal-add-item';
import { withHistory } from '../../utils/mock-component';
import { makeFakeProduct } from '../../utils/mocks';


describe('Component: ModalAddItem', () => {
  it('should render correctly', () => {
    const fakeProduct = makeFakeProduct();
    const expectedText = fakeProduct.name;
    const preparedComponent = withHistory(<ModalAddItem product={fakeProduct} onCloseButtonClick={() => (null)} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
