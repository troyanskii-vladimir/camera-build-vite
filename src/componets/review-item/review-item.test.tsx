import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { makeFakeReview } from '../../utils/mocks';


describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const fakeReview = makeFakeReview();
    const expectedText = fakeReview.userName;

    render(<ReviewItem review={fakeReview} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
