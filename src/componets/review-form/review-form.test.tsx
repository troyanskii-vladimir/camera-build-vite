import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../utils/mock-component';
import ReviewForm from './review-form';
import { makeFakeComment, makeFakeProduct } from '../../utils/mocks';


describe('Component: ReviewForm', () => {
  const fakeProduct = makeFakeProduct();
  const fakeComment = makeFakeComment();

  it('should render correctly', () => {
    const usernameText = 'Ваше имя';
    const advantageText = 'Достоинства';
    const disadvantageText = 'Недостатки';
    const reviewText = 'Комментарий';
    const { withStoreComponent } = withStore(<ReviewForm productId={fakeProduct.id} onCloseButtonClick={() => (null)} onSuccessSend={() => (null)} />, {});

    render(withStoreComponent);

    expect(screen.getByText(usernameText)).toBeInTheDocument();
    expect(screen.getByText(advantageText)).toBeInTheDocument();
    expect(screen.getByText(disadvantageText)).toBeInTheDocument();
    expect(screen.getByText(reviewText)).toBeInTheDocument();
  });


  it('should render correctly when user enter text in inputs', async () => {
    const usernameTestId = 'usernameElement';
    const advantageTestId = 'advantageElement';
    const disadvantageTestId = 'disadvantageElement';
    const reviewTestId = 'reviewElement';
    const expectedUsernameValue = fakeComment.userName;
    const expectedAdvantageValue = fakeComment.advantage;
    const expectedDisadvantageValue = fakeComment.disadvantage;
    const expectedReviewValue = fakeComment.review;
    const { withStoreComponent } = withStore(<ReviewForm productId={fakeProduct.id} onCloseButtonClick={() => (null)} onSuccessSend={() => (null)} />, {});

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId(usernameTestId),
      expectedUsernameValue,
    );
    await userEvent.type(
      screen.getByTestId(advantageTestId),
      expectedAdvantageValue,
    );
    await userEvent.type(
      screen.getByTestId(disadvantageTestId),
      expectedDisadvantageValue,
    );
    await userEvent.type(
      screen.getByTestId(reviewTestId),
      expectedReviewValue,
    );

    expect(screen.getByDisplayValue(expectedUsernameValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedAdvantageValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedDisadvantageValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
  });
});
