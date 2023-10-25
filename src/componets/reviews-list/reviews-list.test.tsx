import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { withHistory } from '../../utils/mock-component';
import { makeFakeReview } from '../../utils/mocks';


describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const fakeReviews = [makeFakeReview(), makeFakeReview()];
    const expectedText = fakeReviews[0].userName;
    const preparedComponent = withHistory(<ReviewsList reviews={fakeReviews} onCreateReviewButtonClick={() => (null)} />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
