import React from 'react';

function CustomerReviews() {
  // Dummy data for customer reviews
  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      review: 'Great service! Highly recommended.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Jane Smith',
      review: 'Excellent experience. Will use again.',
      rating: 4,
    },
     {
      id: 3,
      name: 'Dropht Wilyam',
      review: 'Excellent experience. Will see Now for foon .',
      rating: 10,
    },
     {
      id: 4,
      name: 'Jane Smith',
      review: 'Excellent experience. Will use again.',
      rating: 4,
    },
    
  ];

  return (
    <div className="customer-reviews">
      <h3>Customer Reviews   HHHHHHHHHH </h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h4>{review.name}</h4>
            <p>{review.review}</p>
            <p>Rating: {review.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerReviews;
